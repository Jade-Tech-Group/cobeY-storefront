<script setup lang="ts">
import type Product from '~/types';
const { t, locale } = useI18n();

const { product } = defineProps<{ product: Product }>();

// TODO fetch perma link from WP API
const format = computed(() => [
  { name: t('messages.general.product', 2), id: '/products' },
  { name: product.name },
]);
</script>

<template>
  <div class="flex text-sm leading-none text-gray-400 gap-1 items-center">
    <span>
      <NuxtLink to="/" class="hover:text-primary">{{ $t('messages.general.home') }}</NuxtLink>
      <span> /</span>
    </span>
    <span v-for="(link, i) in format" :key="i">
      <NuxtLink v-if="link.id" :to="decodeURIComponent(link.id)" class="hover:text-primary">{{ link.name }}</NuxtLink>
      <span v-else class="text-gray-800">{{ (link.name as Record<string, string>)[locale] }}</span>
      <span v-if="i + 1 < format.length"> /</span>
    </span>
  </div>
</template>
