<script setup lang="ts">
</script>

<template>
  <div v-if="true" class="flex gap-4 text-xl">
    <a v-for="item in []" :key="item" :href="item" target="_blank" rel="noreferrer" :aria-label="item">
      <Icon class="text-gray-700 hover:text-gray-900" :name="`ion:logo-${item}`" />
    </a>
  </div>
</template>
