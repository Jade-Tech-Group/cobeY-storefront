<script setup lang="ts">
const { FALLBACK_IMG } = useHelpers();

const props = defineProps({
  node: { type: Object, required: true },
  imageLoading: { type: String as PropType<"lazy" | "eager">, default: "lazy" },
});

const imgWidth = 220;
const imgHeight = Math.round(imgWidth * 1.125);
const { locale } = useI18n();
</script>

<template>
  <NuxtLink
    v-if="node"
    :to="`/product-department/${decodeURIComponent(node.id)}`"
    class="relative flex justify-center overflow-hidden rounded-3xl item snap-mandatory snap-x">
    <NuxtImg
      :width="imgWidth"
      :height="imgHeight"
      class="absolute inset-0 object-cover w-full h-full"
      :src="node.desktop_image || FALLBACK_IMG"
      :alt="node.name.es"
      :title="node.name.es"
      :loading="imageLoading"
      :sizes="`sm:${imgWidth / 2}px md:${imgWidth}px`"
      placeholder
      placeholder-class="blur-xl"
    />
    <div class="absolute inset-x-0 bottom-0 opacity-50 bg-gradient-to-t from-black to-transparent h-1/2" />
    <span
      class="absolute inset-x-0 top-1/2 -translate-y-1/2 left-8 z-10 text-sm font-semibold text-white uppercase md:text-2xl"
      v-html="node.name[locale]"
    />
  </NuxtLink>
</template>

<style lang="postcss" scoped>
.item {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  aspect-ratio: 7 / 4;
}
</style>
