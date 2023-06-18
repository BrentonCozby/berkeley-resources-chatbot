import { ChatbotSerializer } from '@/serializers/chatbot'
import { chatbotHttp } from './base'
import { ChatbotResult } from '@root/../types/chatbot'

interface PostArgs {
  prompt: string;
}

export async function post({
  prompt,
}: PostArgs) {
  const { data: responseJson } = await chatbotHttp.post('/', { prompt })

  const response = ChatbotSerializer.deserialize('chatbot', responseJson)

  return response.result as ChatbotResult
}

export default post
