<script setup>
const props = defineProps({
  products: { type: Array, default: null },
});
</script>

<template>
  <div v-if="products" class="grid sm:gap-8 xs:gap-4">
    <ProductCard
      v-for="(node, i) in products"
      :key="node.databaseId"
      class="w-full"
      :node="node"
      :index="i"
      :class="{
        hidden: i === products.length - 1,
        'lg:block': i === products.length - 1,
      }" />
  </div>
</template>
