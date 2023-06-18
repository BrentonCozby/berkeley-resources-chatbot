import { Configuration, OpenAIApi } from 'openai'
import JSONAPISerializer from 'json-api-serializer'
import { T_Controller, T_ExpressHandler } from '@/types/misc'
import { toHttpResponse } from '@/utils/toHttpResponse'
import { toExpressHandler } from '@/controllers/utils/toExpressHandler'

const configuration = new Configuration({
  // organization: process.env.OPENAI_ORGANIZATION_ID,
  // apiKey: process.env.OPENAI_API_KEY,
  organization: 'org-kV6EPHiVl3VaA311qro3uWgO',
  apiKey: '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',
})

const openai = new OpenAIApi(configuration)

const postPhoto: T_Controller = async (request) => {
  const { body } = request

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      // {
      //   role: "system",
      //   content: "You help the user find the best resources from the list of available resources that best matches their prompt.",
      // },
      ...body.messages,
    ],
  }).catch((error) => {
    console.log(error.request)
  });

  const Serializer = new JSONAPISerializer()

  Serializer.register('chatbot')

  const responseBody = Serializer.serialize('chatbot', { result: response.data })

  return toHttpResponse({ body: responseBody })
}

const handlers: T_ExpressHandler[] = [
  toExpressHandler(postPhoto),
]

export default handlers
