<script setup lang="ts">
const { cart, isUpdatingCoupon, applyCoupon, removeCoupon, hasError } = useCart();
const couponCode = ref<string>('');

async function submitCoupon(): Promise<void> {
 await applyCoupon(couponCode.value);
}
</script>

<template>
  <div>
    <form class="flex gap-1" @submit.prevent="submitCoupon" v-if="!cart.coupon_id">
      <input
        id="couponCode"
        v-model="couponCode"
        type="text"
        :placeholder="$t('messages.shop.couponCode')"
        class="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm outline-none"
        required />
      <button class="flex items-center justify-center px-4 py-2 text-white bg-gray-800 border rounded-md shadow-sm outline-none min-w-20" :disabled="isUpdatingCoupon">
        <LoadingIcon v-if="isUpdatingCoupon" color="#fff" size="16" />
        <span v-else>{{ $t('messages.general.apply') }}</span>
      </button>
    </form>
    <Transition name="scale-y" mode="out-in">
      <div v-if="hasError" class="mt-2 text-xs text-red-600" v-html="$t('messages.shop.invalidCupon')"></div>
    </Transition>
    <Transition name="scale-y" mode="out-in">
      <div v-if="cart && cart.coupon_id" class="text-xs font-semibold uppercase flex flex-wrap gap-2">
        <div class="w-full flex flex-row items-center justify-center gap-2">
          <span v-html="$t('messages.shop.coupon_applied')+':'" />
          <div class="bg-primary border-primary border rounded-md flex bg-opacity-5 border-opacity-10 text-primary leading-none p-1.5 gap-1 items-center">
            <span v-html="cart.coupon_code" />
            <Icon name="ion:close" class="rounded-full cursor-pointer hover:bg-primary hover:text-white" @click="removeCoupon()" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
