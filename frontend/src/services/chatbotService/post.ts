import { ChatbotSerializer } from '@/serializers/chatbot'
import { photosHttp } from './base'
import { ChatbotResult, Message } from '@root/../types/chatbot'

interface PostArgs {
  messages: Message[];
}

export async function post({
  messages,
}: PostArgs) {
  const { data: responseJson } = await photosHttp.post('/', { messages })

  const response = ChatbotSerializer.deserialize('chatbot', responseJson)

  return response.result as ChatbotResult
}

export default post
