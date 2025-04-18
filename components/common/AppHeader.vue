<script setup lang="ts"></script>

<template>
  <header class="sticky top-0 z-20 bg-primary-dark shadow-sm shadow-light-500">
    <div class="container flex items-center justify-between py-4">
      <div class="flex flex-row items-center justify-center">
        <MenuTrigger class="lg:hidden text-white" />
        <Logo v-if="!isMobile() && !isTablet()" class="w-[160px]" />
        <LogoMobile v-else />
      </div>
      <div
        class="flex justify-end items-center md:w-[160px] flex-1 ml-auto gap-4 md:gap-6"
      >
        <ProductSearch class="hidden sm:inline-flex w-full mx-40" />
        <LangSwitcherSmall />
        <div class="flex flex-row justify-center gap-4 items-center">
          <SignInLink />
          <div class="flex flex-col items-center justify-center">
            <CartTrigger />
          </div>
        </div>
      </div>
    </div>
    <Transition name="scale-y" mode="out-in">
      <div class="container mb-3 -mt-1 sm:hidden">
        <ProductSearch class="flex w-full" />
      </div>
    </Transition>
    <AppHeaderNav v-if="!isMobile() && !isTablet()"/>
  </header>
</template>
