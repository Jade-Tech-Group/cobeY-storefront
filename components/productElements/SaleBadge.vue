<script setup lang="ts">
import type Product from '~/types';

const { t } = useI18n();
const { node } = defineProps({
  node: { type: Object as PropType<Product>, required: true },
}); 
const { storeSettings } = useAppConfig();
</script>

<template>
  <span v-if="node.sale_percent > 0" class="red-badge">{{ Math.round(((node.sale_percent) / 100) * 100) + ` %` }}</span>
</template>

<style lang="postcss" scoped>
.red-badge {
  @apply rounded-md bg-red-400 text-xs text-white tracking-tight px-1.5 leading-6 z-10;
  background: #000 linear-gradient(0deg, #f87171, #f87171);
}
</style>
