<script setup lang="ts">
import type Product from '~/types';
const { product } = defineProps<{ product: Product }>();

</script>

<template>
  <button type="button" class="cursor-pointer flex mt-4 text-sm text-gray-400 gap-2 items-center" @click="">
    <Icon v-if="product.favorite" name="ion:heart" size="18" class="text-red-400" />
    <Icon v-else name="ion:heart-outline" size="18" />
    <span>{{ product.favorite ? $t('messages.shop.wishlistRemove') : $t('messages.shop.wishlistAdd') }}</span>
  </button>
</template>
  