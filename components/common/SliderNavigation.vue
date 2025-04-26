<template>
  <!-- Navigation buttons -->
  <button 
    @click="prev" 
    class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white/80 hover:bg-white/90 p-2 rounded-full shadow-lg z-10"
    aria-label="Previous"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
  </button>

  <button 
    @click="next" 
    class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white/80 hover:bg-white/90 p-2 rounded-full shadow-lg z-10"
    aria-label="Next"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  prev: () => void;
  next: () => void;
}>();
</script>