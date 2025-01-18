<script setup>
const { cart } = useCart();
const props = defineProps({
  disabled: { type: Boolean, default: false },
});
const isLoading = ref(false);
const { t } = useI18n();
// stop loading when cart is updated
watch(cart, (val) => {
  isLoading.value = false;
});
</script>

<template>
  <button
    type="submit"
    class="rounded-full flex font-bold bg-primary text-white text-center p-1.5 gap-2.5 items-center justify-center focus:outline-none"
    :class="{ disabled: disabled }"
    :disabled="disabled"
    @click="isLoading = true"
  >
  <LoadingIcon v-if="isLoading" stroke="4" size="12" color="#fff" />
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
