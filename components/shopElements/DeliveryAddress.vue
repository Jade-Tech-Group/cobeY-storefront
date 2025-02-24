<template>
  <div
    class="bg-white rounded-lg shadow min-h-[400px] w-full p-4 md:p-12 justify-center items-start"
  >
    <div class="container sm:min-h-72">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-xl font-semibold">
          {{ $t("messages.shop.delvery_address") }}
        </h1>
        <span class="text-gray-400"
          >Elementos: {{ stProfile.getDeliveryData.length }}</span
        >
      </div>
        <div
          v-if="
            stProfile.deliveryAddress.length > 0 &&
            !editDeliveryAddress &&
            !addDeliveryAddress
          "
        >
          <ListDeliveryAddress
            :options="stProfile.getDeliveryData"
            :active-option="activeDeliveryAddress"
            @update:change="changeDeliveryAddress"
            @update:delivery="updateDeliveryAddress"
            @delete:delivery="deleteDeliveryAddress"
          />
        </div>
        <div v-if="editDeliveryAddress" class="checkout-form">
          <ShippingDetails
            v-model="stProfile.getCurrentDeliveryData"
            :isLoading="stProfile.loading"
            action="edit"
            @close="editDeliveryAddress = false"
          />
        </div>
        <div
          v-if="stProfile.deliveryAddress.length === 0 || addDeliveryAddress"
        >
          <ShippingDetails
          class="checkout-form"
            v-model="newDeliveryAddress"
            :isLoading="stProfile.loading"
            action="add"
            @close="closeAddShipping()"
          />
        </div>
      </div>
      <button
        v-if="!addDeliveryAddress && !editDeliveryAddress"
        class="flex flex-row gap-1.5 hover:bg-primary-medium cursor-pointer py-2 px-4 mt-4 rounded bg-primary text-white"
        @click="addDeliveryAddress = true"
      >
        <h2 class="text-sm font-semibold">
          {{ $t("messages.account.newAddress") }}
        </h2>
      </button>
  </div>
</template>
<script setup lang="ts">
import type { DeliveryAddress } from "~/types";
const editDeliveryAddress = ref<boolean>(false);
const addDeliveryAddress = ref<boolean>(false);
const stProfile = useProfileStore();
const activeDeliveryAddress = ref(stProfile.getDeliveryData[0]?.id || "");

function changeDeliveryAddress(id: string) {
  activeDeliveryAddress.value = id;
}

async function updateDeliveryAddress(id: string) {
  editDeliveryAddress.value = true;
  await stProfile.fetchDeliveryAdderessById(id);
}

async function deleteDeliveryAddress(id: string) {
  await stProfile.deleteDeliveryAddress(id);
  await stProfile.fetchDeliveryAddress();
  editDeliveryAddress.value = false;
}

async function closeAddShipping() {
  addDeliveryAddress.value = false;
  activeDeliveryAddress.value = stProfile.getNewDeliveryData.id;
}

const newDeliveryAddress = ref<DeliveryAddress>({
  id: "",
  name: "",
  last_name: "",
  title: "",
  dni: "",
  deliveryAddress_street: "",
  country: "",
  state: "",
  city: "",
  postal_code: "",
  phone_number: "",
  email: "",
});

onBeforeMount(async () => {
  await stProfile.fetchBillingData();
  await stProfile.fetchDeliveryAddress();
  activeDeliveryAddress.value = stProfile.getDeliveryData[0]?.id || "";
});
</script>

<style lang="postcss">
.checkout-form input[type="text"],
.checkout-form input[type="email"],
.checkout-form input[type="tel"],
.checkout-form input[type="password"],
.checkout-form textarea,
.checkout-form select,
.checkout-form .StripeElement {
  @apply bg-white border rounded-md outline-none border-gray-300 shadow-sm w-full py-2 px-4;
}

.checkout-form input.has-error,
.checkout-form textarea.has-error {
  @apply border-red-500;
}

.checkout-form label {
  @apply my-1.5 text-xs text-gray-600 uppercase;
}

.checkout-form .StripeElement {
  padding: 1rem 0.75rem;
}
</style>

