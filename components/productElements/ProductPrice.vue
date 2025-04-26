<script setup lang="ts">
interface ProductPriceProps {
  regularPrice?: string | null;
  salePrice?: string | null;
}

const {formatPrice} = useHelpers()
const { regularPrice, salePrice } = defineProps<ProductPriceProps>();
</script>

<template>
  <div v-if="salePrice" class="flex font-semibold">
    <div v-if="regularPrice && regularPrice !== salePrice" class="text-gray-400 line-through font-normal">
      <span 
      class="text-base  "
    >
      {{ formatPrice(regularPrice)}}
    </span>
    
    </div>
    <span 
      :class="{ 'ml-2': regularPrice && regularPrice !== salePrice }" 
      class="text-lg"
    >
      {{ formatPrice(salePrice).split('.')[0] }}
    </span>
    <span class="text-sm">
      .{{ formatPrice(salePrice).split('.')[1] }}
    </span>
  </div>
</template>
