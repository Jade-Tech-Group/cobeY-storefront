<script setup lang="ts">
import type Product  from '~/types';

const route = useRoute();
const props = defineProps({
  node: { type: Object as PropType<Product>, required: true },
  index: { type: Number, default: 1 },
});

const imgWidth = 280;
const imgHeight = Math.round(imgWidth * 1.125);

const filterQuery = ref(route.query?.filter as string);
const paColor = ref(filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || []);
const { t, locale } = useI18n();
// watch filterQuery
watch(
  () => route.query,
  () => {
    filterQuery.value = route.query.filter as string;
    paColor.value = filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || [];
  },
);
</script>

<template>
 <div class="flex flex-col justify-between relative group border rounded-lg p-4 max-h-[409px]">
    <NuxtLink v-if="node.id" :to="`/product/${decodeURIComponent(node.id)}`" :title="node.name[locale]">
      <SaleBadge :node class="absolute top-2 right-2" />
      <NuxtImg
        v-if="node.standard_image"
        :width="imgWidth"
        :height="imgHeight"
        :src="node.standard_image"
        :alt="node.name.es || 'Product image'"
        :title="node.name.es"
        :loading="index <= 3 ? 'eager' : 'lazy'"
        :sizes="`sm:${imgWidth / 2}px md:${imgWidth}px`"
        class="rounded-lg object-top object-cover w-full aspect-9/8"
        placeholder
        placeholder-class="blur-xl" />
    </NuxtLink>
    <div class="p-2 h-24">
      <NuxtLink v-if="node.id" :to="`/product/${decodeURIComponent(node.id)}`" :title="node.name.es">
        <h2 class="mb-2 font-light leading-tight group-hover:text-primary">{{ node.name.es }}</h2>
      </NuxtLink>
      <ProductPrice class="text-sm" :sale-price="node.sale_price" :regular-price="node.price" />
    </div>
    <div class="mt-auto">
      <AddToCartButton class="flex-1 w-full"/>
    </div>
  </div>
</template>
