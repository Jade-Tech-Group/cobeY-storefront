<script setup lang="ts">
const props = defineProps({
  drawer: { type: Boolean, default: false },
});
const { user, logoutUser, unlogging } = useAuth();
</script>

<template>
  <nav class="text-primary-dark sm:text-white font-semibold">
    <NuxtLink to="/products">{{ $t("messages.general.catalog") }}</NuxtLink>
    <NuxtLink to="/categories">{{ $t("messages.shop.category", 2) }}</NuxtLink>
    <NuxtLink to="/about-us">{{ $t("messages.general.aboutUs") }}</NuxtLink>
    <!-- <NuxtLink to="/contact">{{ $t("messages.general.contact") }}</NuxtLink> -->
    <div>
      <NuxtLink  v-if="user" class="lg:hidden" to="/my-account" :prefetch="false"
        >{{ $t('messages.account.myAccount') }}</NuxtLink
      >
      <NuxtLink  v-else class="lg:hidden"  @click="$router.push('/login-and-register')" :prefetch="false"
        >{{ $t('messages.account.login_or_register') }}</NuxtLink
      >
    </div>
  </nav>
</template>
