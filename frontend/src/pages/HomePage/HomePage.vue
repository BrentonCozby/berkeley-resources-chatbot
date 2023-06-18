<script setup lang="ts">
import { nextTick, ref } from 'vue'
import chatbotService from '@/services/chatbotService'
import { ChatbotResult, Message } from '@root/../types/chatbot'

const promptInput = ref()
const isLoadingMessage = ref(false)
// const messages = ref<Message[]>([])
const messages = ref<Message[]>([{"role":"user","content":"Does UC Berkeley have any entrepreneurship resources for students and alumni?"},{"role":"assistant","content":"Yes, UC Berkeley has numerous resources for entrepreneurship for both students and alumni. Some of these resources include:\n\n1. Berkeley Haas Entrepreneurship Program: This program provides courses, workshops, and events for students interested in entrepreneurship.\n\n2. SkyDeck: SkyDeck is a startup accelerator program that provides funding, workspace, and mentoring to startups founded by UC Berkeley students, alumni, faculty, researchers, and staff.\n\n3. Berkeley Entrepreneurs Association: This student-led group organizes events, workshops, and competitions to help students learn about entrepreneurship and connect with other entrepreneurs.\n\n4. Berkeley-Haas Innovation Lab: This lab provides resources and support for students to turn ideas into businesses and products.\n\n5. Berkeley Launch: This program provides workshops, mentoring, and funding for student-led startups.\n\n6. UC Berkeley Startup Competition: This annual competition provides funding, mentorship, and resources to early-stage startups.\n\n7. MyStartupXX: This program provides mentoring and resources for female entrepreneurs at UC Berkeley.\n\nOverall, UC Berkeley has a rich ecosystem of entrepreneurship resources for students and alumni, which can help them start and grow successful businesses."},{"role":"user","content":"Are there any successful startups that have come from SkyDeck?"},{"role":"assistant","content":"Yes, SkyDeck has a strong track record of incubating successful startups. Some examples of successful startups that have come from SkyDeck include:\n\n1. Lime: A transportation company that provides dockless, electric scooters and bikes in cities around the world.\n\n2. Kiwi Campus: A food delivery and autonomous delivery company that uses robots to deliver food on college campuses.\n\n3. OpenAI: A research company that develops cutting-edge artificial intelligence technology and tools.\n\n4. Repurpose: A sustainable product company that creates biodegradable dinnerware and products made from plants.\n\n5. Yonomi: A smart home company that creates apps and services to connect different devices and systems in the home.\n\nThese are just a few examples of the successful startups that have come from SkyDeck. Overall, SkyDeck has helped numerous startups grow and thrive, and has become one of the most prestigious startup accelerator programs in the world."}])
// const messages = ref<Message[]>([{"role":"user","content":"Does UC Berkeley have any entrepreneurship resources for students and alumni?"},{"role":"assistant","content":"Yes, UC Berkeley has numerous resources for entrepreneurship for both students and alumni."}])

async function scrollToBottom() {
  await nextTick()
  window.scrollTo({ top: document.body.scrollHeight, left: 0, behavior: 'instant' })
}

async function onSubmit() {
  if (isLoadingMessage.value) {
    return
  }

  isLoadingMessage.value = true;
  messages.value.push({ role: 'user', content: promptInput.value })
  promptInput.value = ''
  scrollToBottom()

  // const result = await chatbotService.post({ messages: messages.value })
  const result: ChatbotResult = {
      "id": "chatcmpl-7ScHCsqgWCtNRXcmic6QnexbArxWQ",
      "object": "chat.completion",
      "created": 1687054674,
      "model": "gpt-3.5-turbo-0301",
      "usage": {
          "prompt_tokens": 9,
          "completion_tokens": 8,
          "total_tokens": 17
      },
      "choices": [
          {
              "message": {
                  "role": "assistant",
                  "content": "A new response"
              },
              "finish_reason": "stop",
              "index": 0
          }
      ]
  }

  // messages.value = messages.value.concat(result.choices[0].message)
  // isLoadingMessage.value = false
  // scrollToBottom()

  setTimeout(() => {
    messages.value = messages.value.concat(result.choices[0].message)
    isLoadingMessage.value = false
    scrollToBottom()
  }, 1000)
}

</script>

<template>
  <div class="min-h-screen flex flex-col justify-between">
    <section>
      <div class="p-6 border-b bg-gray-100">
        <p class="text-slate-500 text-sm max-w-3xl mx-auto text-center">
          Berkeley Resources Chatbot
        </p>
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
          v-model="promptInput"
          class="block border border-slate-400 rounded px-3 py-2 w-full"
          :disabled="isLoadingMessage"
        />
      </label>
    </form>
  </div>
</template>
