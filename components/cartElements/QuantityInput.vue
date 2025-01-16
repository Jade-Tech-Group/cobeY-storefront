<script setup lang="ts">
const { updateItemQuantity, isUpdatingCart, cart } = useCart();
const { debounce } = useHelpers();

const { item } = defineProps({ item: { type: Object, required: true } });

const quantity = ref(item.amount);
const hasNoMoreStock = computed(() => (item.stock? 10 <= quantity.value : false));

const incrementQuantity = () => quantity.value++;
const decrementQuantity = () => quantity.value--;

watch(
  quantity,
  debounce(() => {
    if (quantity.value !== "") {
      updateItemQuantity(item.key, quantity.value);
    }
  }, 250),
);

const onFocusOut = () => {
  if (quantity.value === "") { 
    const cartItem = cart.value?.products?.find(node => node.id === item.id);
    if (cartItem) {
      quantity.value = cartItem.amount;
    }
  }
};
</script>

<template>
  <div class="flex rounded bg-white text-sm leading-none shadow-sm shadow-gray-200 isolate">
    <button
      title="Decrease Quantity"
      aria-label="Decrease Quantity"
      @click="decrementQuantity"
      type="button"
      class="focus:outline-none border-r w-6 h-8 border rounded-l border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed"
      :disabled="isUpdatingCart || quantity <= 0">
      <Icon name="ion:remove" size="14" />
    </button>
    <input
      v-model.number="quantity"
      type="number"
      min="0"
      :max="item.stock"
      aria-label="Quantity"
      @focusout="onFocusOut"
      class="flex items-center justify-center w-8  text-center text-xs focus:outline-none border-y border-gray-300" />
    <button
      title="Increase Quantity"
      aria-label="Increase Quantity"
      @click="incrementQuantity"
      type="button"
      class="focus:outline-none border-l w-6 h-8 border rounded-r hover:bg-gray-50 border-gray-300 disabled:cursor-not-allowed disabled:bg-gray-100"
      :disabled="isUpdatingCart || hasNoMoreStock">
      <Icon name="ion:add" size="14" />
    </button>
  </div>
</template>

<style scoped lang="postcss">
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
