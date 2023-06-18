<script setup lang="ts">
import { nextTick, ref } from 'vue'
import chatbotService from '@/services/chatbotService'
import { Message } from '@root/../types/chatbot'

const promptValue = ref()
const promptInputRef = ref<HTMLInputElement | null>(null)
const isLoadingMessage = ref(false)
const messages = ref<Message[]>([])

async function scrollToBottom() {
  await nextTick()
  window.scrollTo({ top: document.body.scrollHeight, left: 0, behavior: 'instant' })
}

async function onSubmit() {
  if (isLoadingMessage.value) {
    return
  }

  const prompt = promptValue.value;

  isLoadingMessage.value = true;
  messages.value.push({ role: 'user', content: promptValue.value })
  promptValue.value = ''
  scrollToBottom()

  const result = await chatbotService.post({ prompt })

  messages.value = messages.value.concat(result.choices[0].message)
  isLoadingMessage.value = false
  await scrollToBottom()
  promptInputRef.value?.focus()
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between">
    <section>
      <div class="py-8 px-4">
        <div class="w-full flex justify-start items-center">
          <RouterLink class="flex items-center" :to="{ name: 'AssistantWelcomePage' }">
            <img src="images/icons/left-arrow.svg" />
            <span class="ml-2 text-xs font-bold">Back</span>
          </RouterLink>
        </div>
        <div class="flex justify-center items-center">
          <img class="max-w-[70px]" src="images/oski-bot.svg" />
          <p class="text-lg font-bold text-blue-900">
            OskiGPT Assistant
          </p>
        </div>
      </div>
      <template v-if="messages.length">
        <div
          v-for="message in messages"
          class="p-6 border-b"
          :class="{
            'bg-gray-100': message.role === 'assistant',
          }"
        >
          <p
            class="text-slate-700 max-w-3xl mx-auto"
          >
            {{ message.content }}
          </p>
        </div>
      </template>
      <div v-if="isLoadingMessage" class="p-6 border-b bg-gray-100">
        <p class="text-slate-700 max-w-3xl mx-auto">
          Loading...
        </p>
      </div>
    </section>

    <form class="w-full max-w-3xl mx-auto p-6" @submit.prevent="onSubmit">
      <label class="flex items-center">
        <span class="block mr-2">
          Prompt:
        </span>
        <input
          v-model="promptValue"
          autofocus
          class="block border border-slate-400 rounded px-3 py-2 w-full"
          :disabled="isLoadingMessage"
          ref="promptInputRef"
        />
      </label>
    </form>
  </div>
</template>
