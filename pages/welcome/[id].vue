<script setup lang="ts">
const stProfile = useProfileStore();
onMounted(() => {
  stProfile.fetchBillingData();
});
</script>

<template>
  <div class="flex flex-col items-center justify-center flex-1 sm:py-20 xs:py-10">
    <img
      src="/icons/welcomeParty.svg"
      width="260"
      height="260"
      class="opacity-75 mb-5"
    />
    <h2 class="sm:text-2xl text-xl font-bold mb-2 xs:text-center">
      {{ $t("messages.account.congrats") }}
    </h2>
    <span class="sm:w-[400px] w-full text-gray-400 mb-4 text-center text-xl">{{
      $t("messages.account.activationSuccess")
    }}</span>
    <NuxtLink
      @click="$router.push('/login-and-register')"
      class="cursor-pointer flex items-center justify-center gap-3 p-2 px-3 mt-4 font-semibold text-center text-white rounded-lg shadow-md bg-primary hover:bg-primary-medium"
    >
      {{ $t("messages.account.accountLogin") }}
    </NuxtLink>
  </div>
</template>
