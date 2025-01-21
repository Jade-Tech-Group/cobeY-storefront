<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

const { link } = defineProps<{ link: string }>();

</script>

<template>
  <DevOnly>
    <ClientOnly>

    </ClientOnly>
  </DevOnly>
</template>

<style scoped lang="postcss">
.wp-admin-link {
  @apply inline-flex items-center bg-yellow-400 leading-tight py-1 px-2 rounded gap-1 text-xs text-yellow-900 border-b border-yellow-500 uppercase transition-all duration-100 ease-in-out;

  &:hover {
    @apply bg-yellow-500 border-yellow-600 border-b;
  }
}
</style>
