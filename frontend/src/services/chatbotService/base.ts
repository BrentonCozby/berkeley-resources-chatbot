import { createHttpInstance } from '@/services/httpService'

const {
  VITE_SERVER_HOST: HOST,
  VITE_SERVER_PORT: PORT,
} = import.meta.env

/**
 * An http instance for making requests to the Chatbot Service
 */
export const chatbotHttp = createHttpInstance({
  baseURL: `http://${HOST}:${PORT}/chatbot`,
})
