<script lang="ts" setup>
import type { DeliveryAddress } from "~/types";
const { t } = useI18n();
const stProfile = useProfileStore();
const props = defineProps<{
  modelValue: DeliveryAddress;
  isLoading?: boolean;
  action?: string;
}>();

async function updateAddress(id: string, params: DeliveryAddress) {
  await stProfile.updateDeliveryAddress(id, params);
  await stProfile.fetchDeliveryAddress();
  emit("close");
}
async function addAddress(params: DeliveryAddress) {
  await stProfile.addDeliveryAddress(params);
  await stProfile.fetchDeliveryAddress();
  emit("close");
}

const emit = defineEmits<{
  (e: "close"): void;
}>();

const shipping = toRef(props, "modelValue");

const buttonText = ref<string>(
  props.action === 'edit'
    ? t("messages.account.update")
    : t("messages.account.save")
);

const handleSubmit = (e: Event) => {
  e.preventDefault();
props.action === 'edit' ? updateAddress(shipping.value.id, shipping.value): addAddress(shipping.value);
};
</script>

<template>
  <form
    @submit="handleSubmit"
    v-if="!isLoading"
    class="grid w-full gap-4 lg:grid-cols-2"
  >
    <div class="w-full">
      <label for="name">{{ $t("messages.billing.firstName") }}</label>
      <input
        id="name"
        v-model="shipping.name"
        placeholder="Albert"
        autocomplete="given-name"
        type="text"
        required
      />
    </div>

    <div class="w-full">
      <label for="last-name">{{ $t("messages.billing.lastName") }}</label>
      <input
        id="last-name"
        v-model="shipping.last_name"
        placeholder="Adams"
        autocomplete="family-name"
        type="text"
        required
      />
    </div>
   
    <div class="w-full">
      <label for="phone_number">{{ $t("messages.billing.phone") }}</label>
      <input
        id="phone_number"
        v-model="shipping.phone_number"
        placeholder="55512365"
        autocomplete="phone_number"
        type="text"
        required
      />
    </div>
    <div class="w-full">
      <label for="email">{{ $t("messages.billing.email") }}</label>
      <input
        id="email"
        v-model="shipping.email"
        placeholder="correo@gmail.com"
        autocomplete="email"
        type="text"
        required
      />
    </div>

    <div class="w-full col-span-full">
      <label for="address">{{ $t("messages.billing.address1") }}</label>
      <input
        id="address"
        v-model="shipping.deliveryAddress_street"
        placeholder="O'Connell Street 47"
        autocomplete="street-address"
        type="text"
        required
      />
    </div>

    <div class="w-full col-span-full">
      <label for="dni">{{ $t("messages.billing.dni") }}</label>
      <input
        id="dni"
        v-model="shipping.dni"
        placeholder="891208026026"
        autocomplete="dni"
        type="text"
        required
      />
    </div>

    <div class="w-full">
      <label for="country">{{ $t("messages.billing.country") }}</label>
      <CountrySelect
        id="country"
        v-model="shipping.country"
        :default-value="shipping.country"
        autocomplete="country"
      />
    </div>

    <div class="w-full">
      <label for="state"
        >{{ $t("messages.billing.state") }} ({{
          $t("messages.general.optional")
        }})</label
      >
      <input
        id="state"
        v-model="shipping.state"
        placeholder="New York"
        autocomplete="locality"
        type="text"
        required
      />
    </div>

    <div class="w-full">
      <label for="city">{{ $t("messages.billing.country") }}</label>
      <input
        id="city"
        v-model="shipping.city"
        placeholder="New York"
        autocomplete="locality"
        type="text"
        required
      />
    </div>

    <div class="w-full">
      <label for="zip">{{ $t("messages.billing.zip") }}</label>
      <input
        id="zip"
        v-model="shipping.postal_code"
        placeholder="10001"
        autocomplete="postal-code"
        type="text"
        required
      />
    </div>
    <div></div>
    <div class="w-full flex sm:flex-row gap-2 justify-end">
      <button
        @click="$emit('close')"
        class="flex items-center justify-center w-full gap-3 p-3 mt-4 font-semibold text-center text-white rounded-lg shadow-md bg-primary hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        Cancelar
      </button>
      <button
        @click="handleSubmit"
        class="flex items-center justify-center w-full gap-3 p-3 mt-4 font-semibold text-center text-white rounded-lg shadow-md bg-primary hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {{ buttonText }}
        <LoadingIcon v-if="stProfile.loading" color="#fff" size="18" />
      </button>
    </div>
  </form>
  <div v-else class="w-full h-20 flex flex-col justify-center items-center">
    <LoadingIcon size="24" stroke="2" />
  </div>
</template>
