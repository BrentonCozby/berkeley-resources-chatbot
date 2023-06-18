export interface Message {
  role: 'user' | 'system' | 'assistant'
  content: string
}

export interface Choice {
  index: number
  message: Message
  finish_reason: string
}

export interface ChatbotResult {
  id: string
  object: string
  created: number
  choices: Choice[]
  model: string
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}
