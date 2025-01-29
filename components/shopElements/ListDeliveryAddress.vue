<script setup lang="ts">
import type { DeliveryAddress } from "~/types";

const props = defineProps<{
  options: DeliveryAddress[];
  activeOption: string;
}>();

const emit = defineEmits<{
  (e: "update:change", id: string): void;
  (e: "update:delivery", id: string): void;
  (e: "delete:delivery", id: string): void;
}>();

const setActiveOption = async (id: string) => {
  emit("update:change", id);
};
const updateDelivery = async (id: string) => {
  emit("update:delivery", id);
};
const deleteDelivery = async (id: string) => {
  emit("delete:delivery", id);
};
</script>

<template>
  <div class="flex flex-col gap-4 shipping-options">
    <div
      v-for="option in options"
      :key="option.id"
      class="flex items-center justify-between option"
    >
      <div class="w-11/12 flex flex-col gap-1">
        <div
          class="text-sm leading-tight text-gray-500"
          v-html="`${option.name} ${option.last_name}`"
        ></div>
        <div
          class="text-sm leading-tight text-gray-500"
          v-html="`${option.deliveryAddress_street ?? ''}`"
        ></div>
        <div
          class="text-sm leading-tight text-gray-500"
          v-html="`${option.state ?? ''}`"
        ></div>
      </div>
      <div class="justify-end items-center inline-flex">
        <div class="justify-center items-center flex">
          <button
            @click="() => updateDelivery(option.id)"
            type="button"
            v-ripple
            class="inline-block rounded-full p-2 uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
          >
            <img
              src="/icons/edit.svg"
              width="20"
              height="20"
              alt="edit_adrs"
              loading="lazy"
            />
          </button>
        </div>
        <div class="justify-center items-center flex">
          <button
            @click="() => deleteDelivery(option.id)"
            type="button"
            v-ripple
            class="inline-block rounded-full p-2 uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
          >
            <img
              src="/icons/delete.svg"
              width="20"
              height="20"
              alt="delete_adrs"
              loading="lazy"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.shipping-options {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  .option {
    @apply bg-white border rounded-lg text-gray-600 cursor-pointer flex flex-1 text-sm py-3 px-4 gap-2 items-center hover:border-purple-300;

    &.active-option {
      @apply border-primary  border-opacity-50 shadow-sm;

      & .checkmark {
        @apply opacity-100;
      }
    }
  }
}
</style>
