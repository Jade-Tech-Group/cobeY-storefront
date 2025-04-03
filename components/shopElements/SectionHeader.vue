<template>
    <div class="flex dark:bg-dark-bg flex-col gap-1 items-center">
      <div class="flex flex-col items-center gap-3">
        <p
          v-if="subtitle"
          class="text-[clamp(0.7rem,.100vw,1.1rem)] text-center uppercase tracking-2xl dark:text-muted-light text-[#0005]"
        >
          {{ subtitle }}
        </p>
      </div>
      <h2
        v-if="title"
        class="text-center text-primary_medium md:text-[38px] sm:text-[28px] xs:text-[24px] font-[Gotham-Bold] leading-[46px]"
        v-html="title"
      ></h2>
      <p
        v-if="description"
        class="text-center text-neutral-500 text-2xl font-medium leading-loose"
      >
        {{ description }}
      </p>
      <slot />
    </div>
  </template>
  <script setup lang="ts">
  import { onMounted, ref } from "vue";
  const props = defineProps<{
    step?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    align?: string;
  }>();
  
  let start = false;
  switch (props.align) {
    case "left":
      start = true;
      break;
    case "start":
      start = true;
      break;
  
    default:
      break;
  }
  </script>
  