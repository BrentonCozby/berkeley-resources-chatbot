import express from 'express'

import * as chatbot from '@/controllers/chatbot';

const mainRouter = express.Router()

mainRouter.post('/chatbot', chatbot.post)

export {
  mainRouter,
}
