<script setup lang="ts">
const { formatPrice } = useHelpers();
const { cart, toggleCart, isUpdatingCart } = useCart();
</script>

<template>
  <div class="fixed top-0 bottom-0 right-0 z-50 flex flex-col w-11/12 max-w-lg overflow-x-hidden bg-white shadow-lg">
    <Icon name="ion:close-outline" class="absolute p-1 rounded-lg shadow-lg top-8 left-6 md:left-8 cursor-pointer" size="24" @click="toggleCart(false)" />
    <EmptyCart v-if="cart && cart.products.length > 0" class="rounded-lg shadow-lg p-1.5 hover:bg-red-400 hover:text-white" />

    <div class="mt-8 text-center">
      {{ $t('messages.shop.cart') }}
      <span v-if="cart?.products.length > 0"> ({{ cart?.products.length }}) </span>
    </div>

    <ClientOnly>
      <template v-if="cart.products.length > 0">
        <ul class="flex flex-col flex-1 gap-4 p-6 overflow-hidden sm:p-4.5 xs:p-4 mt-4">
          <CartCard v-for="(item, index) in cart.products" :key="index" :item />
        </ul>
        <div class="flex xs:flex-col sm:flex-row w-full sm:p-4.5 xs:p-4 sm:mb-4 gap-4 justify-center">
          <NuxtLink
            class="sm:w-52 xs:w-full block p-3 text-lg text-center text-white bg-secondary rounded-lg shadow-md justify-evenly hover:bg-secondary-dark"
            to="/products"
            @click.prevent="toggleCart()">
            <span class="mx-2">{{ $t('messages.shop.continue_shopping') }}</span>
          </NuxtLink>
          <NuxtLink
            class="sm:w-52 xs:w-full block p-3 text-lg text-center text-white bg-primary rounded-lg shadow-md justify-evenly hover:bg-primary-medium "
            to="/checkout"
            @click.prevent="toggleCart()">
            <span class="mx-2">{{ $t('messages.shop.checkout') }}</span>
            <span v-html="formatPrice(cart.total_price)" />
          </NuxtLink>
        </div>
      </template>
      <!-- Empty Cart Message -->
      <EmptyCartMessage v-else />
    </ClientOnly>
    <!-- Cart Loading Overlay -->
    <div v-if="isUpdatingCart" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-25">
      <LoadingIcon />
    </div>
  </div>

</template>
