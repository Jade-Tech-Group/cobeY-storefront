<script setup>
const { cart } = useCart();
const props = defineProps({
  disabled: { type: Boolean, default: false },
});
const isLoading = ref(false);
const { t } = useI18n();
const addToCartButtonText = computed(() =>
  isLoading.value ? t("messages.shop.adding") : t("messages.shop.addToCart")
);

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
    <img
      src="/icons/cart.svg"
      width="20"
      height="20"
      alt="Free Shipping"
      loading="lazy"
    />
    <span>{{ addToCartButtonText }}</span>
    <LoadingIcon v-if="isLoading" stroke="4" size="12" color="#fff" />
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
