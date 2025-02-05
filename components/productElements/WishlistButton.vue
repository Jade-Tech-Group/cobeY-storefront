<script setup lang="ts">
import type Product from "~/types";
const { product } = defineProps<{ product: Product }>();
const storeProducts = useProductsStore();
const wished = ref(product.favorite)

async function manageWishes(iswished: boolean) {
  if (!iswished) {
    await storeProducts.createFav(product.id);
    if(!storeProducts.hasError){
      wished.value = true
    }
  } else {
    await storeProducts.deleteFav(product.id);
    if(!storeProducts.hasError){
      wished.value = false
    }
  }
}
</script>

<template>
  <button
    type="button"
    class="cursor-pointer flex mt-4 text-sm text-gray-400 gap-2 items-center"
    @click="manageWishes(wished)"
  >
    <Icon
      v-if="product.favorite"
      name="ion:heart"
      size="18"
      class="text-red-400"
    />
    <Icon v-else name="ion:heart-outline" size="18" />
    <span>{{
      wished
        ? $t("messages.shop.wishlistRemove")
        : $t("messages.shop.wishlistAdd")
    }}</span>
  </button>
</template>
