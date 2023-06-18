<script lang="ts" setup>
  import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="min-h-screen flex flex-col flex-wrap justify-between items-center py-8 px-4">
    <div class="w-full flex justify-start items-center">
      <RouterLink class="flex items-center" :to="{ name: 'HomePage' }">
        <img src="images/icons/left-arrow.svg" />
        <span class="ml-2 text-xs font-bold">Back</span>
      </RouterLink>
    </div>

    <div class="flex flex-col flex-wrap items-center gap-4">
      <h1 class="font-bold text-2xl text-blue-900">
        OskiGPT Assistant
      </h1>

      <img src="images/oski-bot.svg" />

      <div class="max-w-xl text-center text-slate-600">
        <p class="my-4">Hey there Berkeley Innovator!</p>
        <p class="my-4">I'm OskiGPT, your friendly Golden Bear guide, here to assist you in finding the resources that will empower your entrepreneurial journey at Cal.</p>
        <p class="my-4">Let's get started, shall we?</p>
      </div>
    </div>

    <RouterLink :to="{ name: 'AssistantChatPage' }">
      <button class="p-4 rounded-full bg-blue-900 text-white w-72">
        Continue
      </button>
    </RouterLink>
  </div>
</template>
