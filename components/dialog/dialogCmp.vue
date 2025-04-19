<template>
  <div
    v-if="dialogShow"
    class="scale-custom-contact fixed top-0 z-40 flex items-center justify-center bg-[#08080866] px-4 animate-scale-in"
  >
    <div
      class="relative flex max-w-[520px] flex-col gap-6 rounded-[32px] bg-white sm:p-12 xs:p-4 items-center"
    >
      <CloseIcon
        v-if="closable"
        class="absolute right-6 top-6 cursor-pointer"
      />
      <img
        :src="
          action === 'success'
            ? '/icons/icon-success.svg'
            : action === 'error'
            ? '/icons/icon-error.svg'
            : '/icons/icon-warning.svg'
        "
        alt="icon delete"
        class="size-12"
      />
      <span class="text-xl text-center">{{ mainTxt }}</span>
      <div
        class="flex xs:flex-col sm:flex-row w-full sm:p-4.5 xs:p-4 sm:mb-4 gap-4 justify-center"
      >
        <NuxtLink
          class="sm:w-52 xs:w-full block p-3 text-lg text-center text-white bg-primary rounded-lg shadow-md justify-evenly hover:bg-primary-medium"
          :to="toPrimary"
          @click.prevent="$emit('onClickPrimary')"
        >
          <span class="mx-2">{{ primaryText }}</span>
        </NuxtLink>
        <NuxtLink
          class="sm:w-52 xs:w-full block p-3 text-lg text-center text-white bg-secondary rounded-lg shadow-md justify-evenly hover:bg-secondary-dark"
          :to="toSecondary"
          @click.prevent="$emit('onClickSecondary')"
        >
          <span class="mx-2">{{ secondaryText }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  dialogShow: { type: Boolean, default: false },
  closable: { type: Boolean, default: false },
  primaryText: { type: String, default: "" },
  secondaryText: { type: String, default: "" },
  mainTxt: { type: String, default: "" },
  toPrimary: { type: String, default: "" },
  toSecondary: { type: String, default: "" },
  action: { type: String, default: "success" },
});
</script>
<style scoped>
@keyframes scale-in {
  from {
    transform: scale(0.8) translateY(-20px);
    opacity: 0;
  }
  50% {
    transform: scale(1.05) translateY(0);
    opacity: 0.8;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.animate-scale-in {
  animation: scale-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.scale-custom-contact {
  width: 100%;
  height: 100%;
}
</style>
