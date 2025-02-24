<template>
  <form class="bg-white rounded-lg shadow" @submit.prevent="saveChanges">
    <div class="grid p-8 gap-6 md:grid-cols-2">
      <h3 class="font-semibold text-xl col-span-full">
        {{ $t("messages.billing.billing") }}
      </h3>

      <div class="w-full">
        <label for="billing-first-name">{{
          $t("messages.billing.firstName")
        }}</label>
        <input
          id="billing-first-name"
          v-model="storeProfile.getBillingData.name"
          placeholder="John"
          autocomplete="given-name"
          type="text"
          required
        />
      </div>

      <div class="w-full">
        <label for="billing-last-name">{{
          $t("messages.billing.lastName")
        }}</label>
        <input
          id="billing-last-name"
          v-model="storeProfile.getBillingData.lastName"
          placeholder="Doe"
          autocomplete="family-name"
          type="text"
          required
        />
      </div>

      <div class="w-full">
        <label for="billing-phone">{{ $t("messages.billing.phone") }}</label>
        <input
          id="billing-phone"
          v-model="storeProfile.getBillingData.phone"
          placeholder="+1 234 567 8901"
          autocomplete="tel"
          type="tel"
        />
      </div>

      <div class="w-full">
        <label for="billing-email">{{ $t("messages.billing.email") }}</label>
        <input
          id="billing-email"
          v-model="storeProfile.getBillingData.email"
          placeholder="johndoe@email.com"
          autocomplete="email"
          type="email"
          required
        />
      </div>

      <div class="w-full col-span-full">
        <label for="billing-address">{{
          $t("messages.billing.address1")
        }}</label>
        <input
          id="billing-address"
          v-model="storeProfile.getBillingData.address"
          placeholder="123 Main St"
          autocomplete="address-line1"
          type="text"
        />
      </div>

      <div class="w-full">
        <label for="billing-city">{{ $t("messages.billing.country") }}</label>
        <input
          id="billing-city"
          v-model="storeProfile.getBillingData.country"
          placeholder="EEUU"
          autocomplete="address-level2"
          type="text"
        />
      </div>

      <div class="w-full">
        <label for="billing-city">{{ $t("messages.billing.state") }}</label>
        <input
          id="billing-city"
          v-model="storeProfile.getBillingData.state"
          placeholder="Florida"
          autocomplete="address-level2"
          type="text"
        />
      </div>

      <div class="w-full">
        <label for="billing-city">{{ $t("messages.billing.city") }}</label>
        <input
          id="billing-city"
          v-model="storeProfile.getBillingData.city"
          placeholder="Miami"
          autocomplete="address-level2"
          type="text"
        />
      </div>

      <div class="w-full">
        <label for="billing-zip">{{ $t("messages.billing.zip") }}</label>
        <input
          id="billing-zip"
          v-model="storeProfile.getBillingData.postCode"
          placeholder="10001"
          autocomplete="postal-code"
          type="text"
        />
      </div>
    </div>
    <div
      class="bg-white backdrop-blur-sm bg-opacity-75 border-t col-span-full p-4 sticky bottom-0 rounded-b-lg"
    >
      <button
        class="rounded-md flex font-semibold ml-auto text-white py-2 px-4 gap-4 items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        :class="button.color"
        :disabled="loading"
      >
        <LoadingIcon v-if="loading" color="#fff" size="20" />
        <span>{{ button.text }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import LoadingIcon from "../common/LoadingIcon.vue";
const { t } = useI18n();
const storeProfile = useProfileStore();

onMounted(() => {
  storeProfile.fetchBillingData();
});

const loading = ref<boolean>(false);
const button = ref<{ text: string; color: string }>({
  text: t("messages.account.updateDetails"),
  color: "bg-primary hover:bg-primary-medium",
});

async function saveChanges(): Promise<void> {
  loading.value = true;
  await storeProfile.updateBilling(storeProfile.getBillingData);
  !storeProfile.hasError ? push.success({
        duration: 1500,
        title: t('messages.notification.perfect'),
        message: t('messages.notification.updatedBilling'),
      })
    : push.success({
        duration: 1500,
        title:  t('messages.notification.error'),
        message: t('messages.notification.updatedBillingError'),
      });
  loading.value = false;
}
</script>
