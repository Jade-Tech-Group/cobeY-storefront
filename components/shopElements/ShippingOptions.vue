<script setup lang="ts">
const { formatPrice } = useHelpers();
interface ShippingOption {
  id: string;
  label: string;
  cost: number;
}

const { updateShippingMethod } = useCart();
const runtimeConfig = useRuntimeConfig();
const currencySymbol = runtimeConfig?.public?.CURRENCY_SYMBOL || '$';
const props = defineProps<{
  options: ShippingOption[];
  activeOption: string;
}>();

const setActiveOption = async (id: string) => {
  await updateShippingMethod(id);
};
</script>

<template>
  <div class="grid gap-4 shipping-options">
    <div
      v-for="option in options"
      :key="option.id"
      class="flex items-center justify-between option"
      :class="{ 'active-option': option.id === activeOption }"
      @click="setActiveOption(option.id)">
      <div>
        <div class="text-sm leading-tight text-gray-500" v-html="option.label"></div>
        <div class="font-semibold text-gray-600">{{ formatPrice(String(option.cost)) }}</div>
      </div>

      <icon name="ion:checkmark-circle" size="20" class="ml-auto text-primary checkmark opacity-0" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.shipping-options {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  .option {
    @apply bg-white border rounded-lg text-gray-600 cursor-pointer flex flex-1 text-sm py-3 px-4 gap-2 items-center hover:border-purple-300;

    &.active-option {
      @apply border-primary border-opacity-50 shadow-sm;

      & .checkmark {
        @apply opacity-100;
      }
    }
  }
}
</style>
