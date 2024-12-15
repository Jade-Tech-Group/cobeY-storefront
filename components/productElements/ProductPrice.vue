<script setup lang="ts">
interface ProductPriceProps {
  regularPrice?: string | null;
  salePrice?: string | null;
}

const {formatPrice} = useHelpers()
const { regularPrice, salePrice } = defineProps<ProductPriceProps>();
</script>

<template>
  <div  v-if="salePrice" class="flex font-semibold">
    <div  v-if="regularPrice && regularPrice !== salePrice">
      <span  :class="{ 'text-gray-400 line-through font-normal': salePrice }" v-html="formatPrice(regularPrice)" />
    </div>
    <span  class="ml-2" v-html="formatPrice(salePrice)" />
  </div>
</template>
