<script setup lang="ts">
</script>

<template>
  <nav>
    <NuxtLink to="/products">{{ $t("messages.general.catalog") }}</NuxtLink>
    <NuxtLink to="/categories">{{ $t("messages.shop.category", 2) }}</NuxtLink>
    <NuxtLink to="/about-us">{{ $t("messages.general.aboutUs") }}</NuxtLink>
    <NuxtLink to="/contact">{{ $t("messages.general.contact") }}</NuxtLink>
    <NuxtLink class="lg:hidden" to="/my-account" :prefetch="false"
      >My Account</NuxtLink
    >
  </nav>
</template>
