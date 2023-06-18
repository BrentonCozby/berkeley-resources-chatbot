/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from 'vite'
import * as dotenvFlow from 'dotenv-flow'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vitejs.dev/config/
export default () => {
  dotenvFlow.config({
    path: '../',
  })

  process.env.VITE_SERVER_PORT = process.env.SERVER_PORT
  process.env.VITE_SERVER_HOST = process.env.SERVER_HOST

  return defineConfig({
    plugins: [
      vue(),
    ],

    server: {
      host: true,
      port: Number(process.env.FRONTEND_PORT),
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@root': path.resolve(__dirname),
      },
    },
  })
}
