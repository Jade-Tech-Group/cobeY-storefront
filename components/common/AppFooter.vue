<script setup lang="ts">
const { user } = useAuth();
</script>

<template>
  <footer class="bg-primary-dark order-last text-white px-2">
    <div
      class="container flex flex-wrap justify-between gap-12 my-24 md:gap-24"
    >
      <div class="mr-auto flex flex-col items-start justify-center">
        <Logo class="w-[160px]" />
        <WebsiteShortDescription />
        <LangSwitcher class="mt-8" />
      </div>
      <div class="w-3/7 lg:w-auto">
        <div class="mb-1 font-semibold text-secondary-dark text-lg">
          {{ $t("messages.general.product", 2) }}
        </div>
        <div class="text-sm">
          <NuxtLink to="products?filter=featured[true]" class="py-1.5 block">{{
            $t("messages.shop.featuredProducts")
          }}</NuxtLink>
          <NuxtLink to="/products?filter=sale[true]" class="py-1.5 block">{{
            $t("messages.shop.onSale")
          }}</NuxtLink>
        </div>
      </div>
      <div class="w-3/7 lg:w-auto">
        <div class="mb-1 font-semibold text-secondary-dark text-lg">
          {{ $t("messages.general.customerService") }}
        </div>
        <div class="text-sm">
          <NuxtLink to="/contact" class="py-1.5 block">{{
            $t("messages.general.contactUs")
          }}</NuxtLink>
          <!-- <a href="/" class="py-1.5 block">{{
            $t("messages.general.shippingReturns")
          }}</a> -->
          <a href="/" class="py-1.5 block">{{
            $t("messages.general.privacyPolicy")
          }}</a>
          <a href="/" class="py-1.5 block">{{
            $t("messages.general.termsConditions")
          }}</a>
        </div>
      </div>
      <div class="w-3/7 lg:w-auto">
        <div class="mb-1 font-semibold text-secondary-dark text-lg">
          {{ $t("messages.account.myAccount") }}
        </div>
        <div class="text-sm">
          <NuxtLink
            :to="user ? `/my-account/` : `/login-and-register/`"
            class="py-1.5 block"
            >{{
              $t(
                user
                  ? "messages.account.myAccount"
                  : "messages.account.loginToAccount"
              )
            }}</NuxtLink
          >
          <NuxtLink
            :to="
              user
                ? `/my-account/?tab=orders`
                : `/login-and-register`
            "
            class="py-1.5 block"
            >{{ $t("messages.shop.orderHistory") }}</NuxtLink
          >
          <!-- <a href="/" class="py-1.5 block">{{
            $t("messages.general.newsletter")
          }}</a> -->
        </div>
      </div>
    </div>
    <div
      class="container border-t flex items-center justify-center mb-4 border-secondary"
    >
      <div class="md:w-96 xs:w-full flex flex-row xs:justify-center sm:justify-start">
       
        <p class="py-4 text-center text-md">
          <a href="https://jadetechgroup.com" title="JADE" target="_blank" class="w-full flex gap-4 items-center justify-center"
            >Desarrollado por: <img src="/icons/jade.svg" alt="jade" width="80"/></a
          >
        </p>
      </div>
      <SocialIcons class="ml-auto" />
    </div>
  </footer>
</template>

<style scoped lang="postcss">
a {
  @apply hover:underline;
}
</style>
