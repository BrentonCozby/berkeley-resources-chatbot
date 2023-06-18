import JSONAPISerializer from 'json-api-serializer'

export const ChatbotSerializer = new JSONAPISerializer()
ChatbotSerializer.register('chatbot')
