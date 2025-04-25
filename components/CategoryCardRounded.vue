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
    :to="`/product-category/${decodeURIComponent(node.id)}`"
    v-if="node"
    class="flex flex-col justify-center overflow-hidden items-center gap-2"
  >
    <NuxtImg
      :width="imgWidth"
      :height="imgHeight"
      class="cover sm:h-40 sm:w-40 xs:w-24 xs:h-24 rounded-full bg-primary-light hover:bg-primary-medium"
      :src="node.image || FALLBACK_IMG"
      :alt="node.name.es"
      :title="node.name.es"
      :loading="imageLoading"
      :sizes="`sm:${imgWidth / 2}px md:${imgWidth}px`"
      placeholder
      placeholder-class="blur-xl"
    />

    <div>
      <span
        class="flex text-md font-semibold text-primary-dark md:text-base text-center uppercase"
        v-html="node.name[locale]"
      />
    </div>
  </NuxtLink>
</template>

<style lang="postcss" scoped>
.item {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  aspect-ratio: 4 / 5;
}
</style>
