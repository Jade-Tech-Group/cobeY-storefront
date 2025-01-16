<script setup lang="ts">
import type Product  from '~/types';

const { updateItemQuantity } = useCart();
const { FALLBACK_IMG } = useHelpers();
const { storeSettings } = useAppConfig();
const {locale } = useI18n();

const props = defineProps<{
  item: Product
}>();

const productSlug = computed(() => `/product/${decodeURIComponent(props.item.id)}`);
const isLowStock = computed(() => (props.item.stock ? 10 >= props.item.stock : false));

const removeItem = () => {
  updateItemQuantity(props.item.id, 0);
};
</script>

<template>
  <SwipeCard @remove="removeItem">
    <div v-if="props.item" class="w-full h-full flex items-center justify-center gap-2 group px-4">
      <NuxtLink :to="productSlug">
        <NuxtImg
          width="100%"
          height="100%"
          class="w-16 h-16 rounded-md"
          :src="props.item.standard_image"
          :alt="props.item.name[locale]"
          :title="props.item.standard_image || props.item.name[locale]"
          loading="lazy" />
      </NuxtLink>
      <div class="flex-1">
        <div class="flex gap-x-2 gap-y-1 flex-wrap items-center">
          <NuxtLink class="leading-tight" :to="productSlug">{{ props.item.name[locale] }}</NuxtLink>
        </div>
        <ProductPrice class="mt-1 text-xs" :sale-price="props.item.sale_price" :regular-price="props.item.price" />
      </div>
      <div class="inline-flex gap-2 flex-col items-end">
        <QuantityInput :item />
        <div class="text-xs text-gray-400 group-hover:text-gray-700 flex leading-none items-center">
          <button
            title="Remove Item"
            aria-label="Remove Item"
            @click="removeItem"
            type="button"
            class="flex items-center gap-1 hover:text-red-500 cursor-pointer">
            <Icon name="ion:trash" class="hidden md:inline-block" size="12" />
          </button>
        </div>
      </div>
    </div>
  </SwipeCard>
</template>
