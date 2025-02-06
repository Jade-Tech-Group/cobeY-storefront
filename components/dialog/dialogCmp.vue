<template>
  <div
    v-if="dialogShow"
    class="scale-custom-contact fixed top-0 z-40 flex items-center justify-center bg-[#08080866] px-4"
  >
    <div
      class="relative flex max-w-[520px] flex-col gap-6 rounded-[32px] bg-white sm:p-12 xs:p-4 items-center"
    >
      <CloseIcon
        v-if="closable"
        class="absolute right-6 top-6 cursor-pointer"
      />
      <img src="/icons/icon-warning.svg" alt="icon delete" class="size-12" />
      <span class="text-xl text-center">{{ mainTxt }}</span>
      <div
        class="flex xs:flex-col sm:flex-row w-full sm:p-4.5 xs:p-4 sm:mb-4 gap-4 justify-center"
      >
        <NuxtLink
          class="sm:w-52 xs:w-full block p-3 text-lg text-center text-white bg-primary rounded-lg shadow-md justify-evenly hover:bg-primary-dark"
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
});
</script>
<style scoped>
 .scale-custom-contact {
    width: 100%;
    height: 100%;
  }
</style>
