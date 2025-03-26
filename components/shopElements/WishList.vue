<script setup lang="ts">
const  storeProducts = useProductsStore()
onMounted(()=>{
  storeProducts.fetchProductsFavs();
})
</script>

<template>
  <div class="bg-white rounded-lg shadow sm:min-h-72 w-full p-4 md:p-12 justify-center items-start">
    <div class="container">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-xl font-semibold">{{ $t('messages.shop.wishlist') }}</h1>
        <span class="text-gray-400">{{ $t('messages.shop.wishlistItems') }}: {{ storeProducts.prodFav.length ?? 0 }}</span>
      </div>
      <client-only>
        <ul v-if="storeProducts.prodFav && storeProducts.prodFav.length > 0" class="grid divide-y divide-gray-100">
          <WishListItem v-for="product, index in storeProducts.prodFav" :key="index" :product="product" />
        </ul>
        <div v-else class="flex text-center sm:min-h-72 text-gray-500 items-center justify-center">
          <p>{{ $t('messages.shop.wishlistNoItems') }}</p>
        </div>
      </client-only>
    </div>
  </div>
</template>
