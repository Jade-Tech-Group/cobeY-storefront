<script setup lang="ts">
import type Product from "~/types";
const { product } = defineProps<{ product: Product }>();
const storeProducts = useProductsStore();
const wished = ref(product.favorite);
const loading = ref(false);

async function manageWishes(iswished: boolean) {
  loading.value = true;
  if (!iswished) {
    await storeProducts.createFav(product.id);
    if (!storeProducts.hasError) {
      wished.value = true;
    }
  } else {
    await storeProducts.deleteFav(product.id);
    if (!storeProducts.hasError) {
      wished.value = false;
    }
  }
  loading.value = false;
}
</script>

<template>
  <button
    type="button"
    class="flex cursor-pointer flex mt-4 text-sm text-gray-400 gap-2 items-center justify-center"
    @click="manageWishes(wished)"
  >
    <div v-if="!loading" class="flex">
      <Icon
        v-if="product.favorite"
        name="ion:heart"
        size="18"
        class="text-red-400"
      />
      <Icon v-else name="ion:heart-outline" size="18" />
    </div>
    <LoadingIcon v-else color="#35083f" size="16" />
    <span>{{
      wished
        ? $t("messages.shop.wishlistRemove")
        : $t("messages.shop.wishlistAdd")
    }}</span>
  </button>
</template>
