<script setup lang="ts">
interface PaymentOptions {
  id: string;
  label: string;
}
const props = defineProps<{
  modelValue: PaymentOptions[];
  activePaymentMethod: string;
}>();

const paymentMethod = toRef(props, "modelValue");
const emits = defineEmits(["update:modelValue"]);

const updatePaymentMethod = (value: any) => {
  emits("update:modelValue", value);
};
</script>

<template>
  <div class="flex gap-4 leading-tight flex-wrap">
    <div
      v-for="gateway in paymentMethod"
      :key="gateway.id"
      class="option"
      :class="{ 'active-option': gateway.id === activePaymentMethod }"
      @click="updatePaymentMethod(gateway)"
      :title="gateway?.label || gateway?.label || 'Payment Method'"
    >
      <img
        v-if="gateway.id === 'Tropipay'"
        src="/icons/tropipay.svg"
        width="20"
        height="20"
        alt="Add address"
        loading="lazy"
      />
      <span class="whitespace-nowrap" v-html="gateway.label" />
      <icon
        name="ion:checkmark-circle"
        size="20"
        class="ml-auto text-primary checkmark opacity-0"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.option {
  @apply bg-white border rounded-lg text-gray-600 cursor-pointer flex flex-1 text-sm py-3 px-4 gap-2 items-center hover:border-purple-300;

  &.active-option {
    @apply border-primary cursor-default border-opacity-50 shadow-sm pointer-events-none;

    & .checkmark {
      @apply opacity-100;
    }
  }
}
</style>
