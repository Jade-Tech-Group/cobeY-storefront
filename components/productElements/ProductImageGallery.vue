<script setup lang="ts">
import type { Product } from '~/types';

const { FALLBACK_IMG } = useHelpers();

const props = defineProps({
  mainImage: { type: Object, required: true },
  gallery: { type: Object, required: true },
  node: { type: Object as PropType<Product>, required: true },
  activeVariation: { type: Object, required: false },
});

const { t, locale } = useI18n();
const imgWidth = 300;
const imgHeight = 100;
</script>

<template>
  <div class="flex justify-center items-center">
    <SaleBadge :node class="absolute text-base top-4 right-4" />
    <NuxtImg
      class="rounded-xl object-contain"
      :width="imgWidth"
      :height="imgHeight"
      :alt="node.name[locale]"
      :title="node.name[locale]"
      :src="node.standard_image || FALLBACK_IMG"
      fetchpriority="high"
      placeholder
      placeholder-class="blur-xl" />
  </div>
</template>

<style scoped>
.gallery-images {
  display: flex;
  overflow: auto;
  gap: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }
}

.gallery-images img {
  width: 72px;
  aspect-ratio: 5/6;
  object-fit: cover;
}

@media (min-width: 768px) {
  .gallery-images {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));

    img {
      width: 100%;
    }
  }
}
</style>
