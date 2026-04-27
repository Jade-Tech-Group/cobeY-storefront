<template>
  <div class="relative font-italic overflow-hidden">
    <div class="absolute inset-0 z-0 pointer-events-none">
        <div
          class="absolute sm:top-[25%] sm:-left-[25%] xs:-top-[10%] xs:-left-[25%] sm:w-[950px] sm:h-[950px] xs:w-[320px] xs:h-[320px] bg-[radial-gradient(circle_at_center,_rgba(239,122,20,0.3)_0%,_rgba(239,122,20,0.25)_15%,_rgba(239,122,20,0.2)_30%,_rgba(239,122,20,0.15)_45%,_rgba(255,255,255,0.1)_60%,_rgba(255,255,255,0.05)_75%,_rgba(255,255,255,0.02)_90%,_rgba(255,255,255,0)_100%)] rounded-full"
        ></div>
        <div
          class="absolute sm:-bottom-[10%] -bottom-56 sm:right-[20%] xs:right-[0] sm:w-[750px] sm:h-[750px] xs:w-[320px] xs:h-[320px] bg-[radial-gradient(circle_at_center,_rgba(239,122,20,0.3)_0%,_rgba(239,122,20,0.25)_15%,_rgba(239,122,20,0.2)_30%,_rgba(239,122,20,0.15)_45%,_rgba(255,255,255,0.1)_60%,_rgba(255,255,255,0.05)_75%,_rgba(255,255,255,0.02)_90%,_rgba(255,255,255,0)_100%)] rounded-full"
        ></div>
        <div
          v-if="!isMobile() || !isTablet()"
          class="absolute -top-[10%] -right-[15%] sm:w-[950px] sm:h-[950px] xs:w-[320px] xs:h-[320px] bg-[radial-gradient(circle_at_center,_rgba(239,122,20,0.3)_0%,_rgba(239,122,20,0.25)_15%,_rgba(239,122,20,0.2)_30%,_rgba(239,122,20,0.15)_45%,_rgba(255,255,255,0.1)_60%,_rgba(255,255,255,0.05)_75%,_rgba(255,255,255,0.02)_90%,_rgba(255,255,255,0)_100%)] rounded-full"
        ></div>
      </div>
    <div class="relative h-[250px] overflow-hidden"><img
        src="https://raw.githubusercontent.com/RamiroSB/imagenes/main/banner-contactenos1.png"
        alt="Terms and Conditions"
        class="absolute inset-0 object-cover w-full h-full transform"
      />
      <div class="absolute inset-0 bg-black bg-opacity-25"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <h1 class="text-4xl font-bold text-white text-center px-4">
          {{ $t("messages.general.termsConditions") }}
        </h1>
      </div>
    </div>
    <div class="container flex items-start gap-16 relative -mt-16 bg-white rounded-t-3xl sm:p-8 xs:p-4 shadow-lg">
      <div class="my-8 " v-if="!loading && termsConditions.data && termsConditions.data.length > 0">
        <p v-html="termsConditions.data[0].smalldescription[locale]"></p>
        <p v-html="termsConditions.data[0].description[locale]"></p>
      </div>
      <div v-else-if="loading" class="w-full my-8">
        <div class="space-y-4">
          <div class="h-4 bg-gray-200 rounded animate-pulse w-2/4"></div>
          <div class="h-20 bg-gray-200 rounded animate-pulse w-full"></div>
          <div class="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div class="h-6 bg-gray-200 rounded animate-pulse w-2/3"></div>
        </div>
      </div>
      <div v-else class="w-full my-8">
        <p class="text-gray-500">{{ $t("messages.general.noContentAvailable") }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useTermsConditions } from '~/stores/termsConditions';

const {locale} = useI18n()

const termsConditionsStore = useTermsConditions();
const termsConditions = computed(() => termsConditionsStore.termsConditions);
const loading = computed(() => termsConditionsStore.loading);

onBeforeMount(async() => {
  await termsConditionsStore.getTermsConditionsInfo();
});
</script>
