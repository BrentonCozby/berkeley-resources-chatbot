/**
 * References:
 *   - https://github.com/tsensei/QueryGPT/blob/main/completion.js
 */

import { Configuration, OpenAIApi } from 'openai'
import JSONAPISerializer from 'json-api-serializer'
import { T_Controller, T_ExpressHandler } from '@/types/misc'
import { toHttpResponse } from '@/utils/toHttpResponse'
import { toExpressHandler } from '@/controllers/utils/toExpressHandler'
import fs from 'fs'
import path from 'path'
import Papa from 'papaparse'

let openAiConfiguration: Configuration
let openai: OpenAIApi

// Calculates the similarity score of question and context paragraphs
const compareEmbeddings = (embedding1: number[], embedding2: number[]) => {
  var length = Math.min(embedding1.length, embedding2.length);
  var dotprod = 0;

  for (var i = 0; i < length; i++) {
    dotprod += embedding1[i] * embedding2[i];
  }

  return dotprod;
};

interface FindClosestParagraphsArgs {
  promptEmbedding: number[]
  count: number
}

function findClosestParagraphs({
  promptEmbedding,
  count,
}: FindClosestParagraphsArgs) {
  const items: Array<{ paragraph: string; score: number }> = [];

  const filePath = path.resolve(__dirname, './embeddedData/berkeley_embeddings.csv');

  let csvFile = fs.readFileSync(filePath, {
    encoding: "utf-8",
    flag: "r",
  });

  const { data } = Papa.parse(csvFile, {
    header: true,
  })

  data.forEach((row) => {
    if (!row || typeof row.text !== 'string' || typeof row.embeddings !== 'string') {
      return;
    }

    const currentEmbedding = JSON.parse(row.embeddings)

    items.push({
      paragraph: row.text,
      score: compareEmbeddings(promptEmbedding, currentEmbedding),
    });
  })

  items.sort(function (a, b) {
    return b.score - a.score;
  });

  return items.slice(0, count).map((item) => item.paragraph);
};

interface AddContextToContentArgs {
  prompt: string
}

async function addContextToContent({
  prompt,
}: AddContextToContentArgs) {
  const promptEmbeddingResponse = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input: prompt,
  })

  const closestParagraphs = findClosestParagraphs({
    promptEmbedding: promptEmbeddingResponse.data.data[0].embedding,
    count: 7,
  })

  return (
    'Context:\n' +
    closestParagraphs.join('\n\n') +
    '\n\nQuestion :\n' +
    prompt + '\n'
  )
}

const chat: T_Controller = async (request) => {
  const { body } = request

  if (!openAiConfiguration || !openai) {
    openAiConfiguration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORGANIZATION_ID,
    })

    openai = new OpenAIApi(openAiConfiguration)
  }

  const content = await addContextToContent({ prompt: body.prompt });

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content,
      },
    ],
  }).catch((error) => {
    console.log('response', error.response)
    console.log('\n\n')
    console.log('data', error.response.data)
  });

  const Serializer = new JSONAPISerializer()

  Serializer.register('chatbot')

  const responseBody = Serializer.serialize('chatbot', { result: response.data })

  return toHttpResponse({ body: responseBody })
}

const handlers: T_ExpressHandler[] = [
  toExpressHandler(chat),
]

export default handlers
