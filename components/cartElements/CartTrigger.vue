<script setup>
const { toggleCart, cart } = useCart();
</script>

<template>
  <div
    class="relative cursor-pointer inline-flex px-4"
    title="Cart"
    @click="toggleCart"
  >
    <Icon name="ion:cart" size="24" class="mr-1 md:mr-0 text-white" />
    <ClientOnly>
      <Transition name="popIn" mode="out-in">
        <span
          v-if="cart.products && cart.products.length"
          class="bg-secondary rounded-full text-white leading-none min-w-[16px] p-[3px] -top-1 -right-1 md:-right-2 text-[10px] absolute inline-flex justify-center items-center"
        >
          {{ cart.products.length}}
        </span>
      </Transition>
    </ClientOnly>
  </div>
</template>

<style lang="postcss">
/* popIn */
.popIn-enter-active,
.popIn-leave-active {
  transition: all 200ms cubic-bezier(0, 0, 0.57, 1.61);
}

.popIn-enter-from,
.popIn-leave-to {
  transform: scale(0);
}
</style>
