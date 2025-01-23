<script setup lang="ts">
import type Product from '~/types';
const { product } = defineProps<{ product: Product }>();
</script>

<template>
  <li class="flex py-4 gap-4 items-center">
    <NuxtLink v-if="product.id" :to="`/product/${decodeURIComponent(product.id)}`">
      <img
        v-if="product?.standard_image"
        class="rounded-lg object-cover h-16 w-16"
        :src="product.standard_image || product.standard_image || '/images/placeholder.jpg'"
        :alt="product.standard_image || product.name.es || 'Product image'"
        :title="product.name.es || 'Product image'"
        width="100"
        height="120"
        loading="lazy" />
    </NuxtLink>
    <div>
      <NuxtLink v-if="product.id" class="text-lg leading-tight" :to="`/product/${decodeURIComponent(product.id)}`">{{ product.name }}</NuxtLink>
      <ProductPrice :sale-price="product.sale_price" :regular-price="product.price" class="ml-auto" />
    </div>
    <div class="ml-auto">
      <button v-if="product.id" title="Remove Item">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368" />
        </svg>
      </button>
    </div>
  </li>
</template>
