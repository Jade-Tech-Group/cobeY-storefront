<script setup lang="ts">
const props = defineProps({
  drawer: { type: Boolean, default: false },
});
</script>

<template>
  <nav :class="!drawer ? `text-white font-semibold` : `text-primary-dark font-semibold`">
    <NuxtLink to="/products">{{ $t("messages.general.catalog") }}</NuxtLink>
    <NuxtLink to="/categories">{{ $t("messages.shop.category", 2) }}</NuxtLink>
    <NuxtLink to="/about-us">{{ $t("messages.general.aboutUs") }}</NuxtLink>
    <NuxtLink to="/contact">{{ $t("messages.general.contact") }}</NuxtLink>
    <NuxtLink class="lg:hidden" to="/my-account" :prefetch="false"
      >{{ $t('messages.account.myAccount') }}</NuxtLink
    >
  </nav>
</template>
