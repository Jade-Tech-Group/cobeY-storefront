<script setup>
const { isUpdatingCart } = useCart();
const props = defineProps({
  disabled: { type: Boolean, default: false },
});
const isLoading = ref(false);
</script>

<template>
  <button
    type="submit"
    class="rounded-lg flex font-bold bg-primary text-white text-center p-1.5 gap-2.5 items-center justify-center focus:outline-none"
    :class="{ disabled: disabled }"
    :disabled="disabled"
    @click="isLoading = true"
  >
  <LoadingIcon v-if="isUpdatingCart" stroke="4" size="12" color="#fff" />
    <img v-else
      src="/icons/cart.svg"
      width="20"
      height="20"
      alt="Free Shipping"
      loading="lazy"
    />
    <span>{{ $t("messages.shop.addToCart") }}</span>
  </button>
</template>

<style lang="postcss" scoped>
button {
  outline: none !important;
  transition: all 150ms ease-in;
}

button.disabled {
  @apply cursor-not-allowed bg-gray-400;
}
</style>
