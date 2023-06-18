<script setup lang="ts">
  import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="min-h-screen flex flex-col flex-wrap justify-center items-center">
    <h1 class="text-slate-700 font-bold text-2xl mb-6">
      Find Your Opportunities
    </h1>
    <div class="flex flex-col gap-3">
      <RouterLink :to="{ name: 'AssistantWelcomePage' }">
        <button class="w-80 rounded-full bg-gray-200 p-3">
          OskiGPT Assistant
        </button>
      </RouterLink>
      <RouterLink :to="{ name: 'EntrepreneurshipDirectoryPage' }">
        <button class="w-80 rounded-full bg-gray-200 p-3">
          Cal Entrepreneurship Directory
        </button>
      </RouterLink>
      <RouterLink :to="{ name: 'InnovationRoadmapPage' }">
        <button class="w-80 rounded-full bg-gray-200 p-3">
          Innovation Roadmap
        </button>
      </RouterLink>
    </div>
  </div>
</template>
