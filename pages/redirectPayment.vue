<script setup lang="ts">
const stProfile = useProfileStore();
const {paymentLink} = useCheckout()
</script>

<template>
  <div class="flex flex-col items-center justify-center flex-1 py-20">
    <img
      src="/images/happy.webp"
      width="260"
      height="260"
      class="opacity-25 mb-5"
    />
    <h2 class="text-2xl font-bold mb-2">
      {{ $t("messages.shop.perfect") }} {{ stProfile.getBillingData.name }}
      {{ stProfile.getBillingData.lastName }}
    </h2>
    <span class="text-gray-400 mb-4">{{
      $t("messages.shop.required_redirect")
    }}</span>
    <NuxtLink
       :to="paymentLink"
      class="flex items-center justify-center gap-3 p-2 px-3 mt-4 font-semibold text-center text-white rounded-lg shadow-md bg-primary hover:bg-primary-dark"
    >
      {{ $t("messages.shop.goToTropipay") }}
    </NuxtLink>
  </div>
</template>
