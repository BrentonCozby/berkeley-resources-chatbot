import axios from 'axios'

export const createHttpInstance = (args?: {
  baseURL?: string
  headers?: Record<string, string>
}) => {
  const {
    baseURL,
    headers,
  } = args || {}

  const httpInstance = axios.create({
    baseURL: baseURL,
  })

  if (headers) {
    httpInstance.defaults.headers.common = headers
  }

  return httpInstance
}


export const http = createHttpInstance()
