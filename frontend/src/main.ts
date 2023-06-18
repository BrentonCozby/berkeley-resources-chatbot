import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { VueQueryPlugin } from 'vue-query'

import { mainRouter } from '@/routes/base'

import App from './App.vue'

export const app = createApp(App)
export const pinia = createPinia()

app.use(pinia)
app.use(VueQueryPlugin)
app.use(mainRouter)

app.mount('#app')
