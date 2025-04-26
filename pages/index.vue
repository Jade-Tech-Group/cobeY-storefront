<script lang="ts" setup>
import { useCategoriesStore } from "~/stores/categories";
import { useProductsStore } from "~/stores/products";
import { useI18n } from "vue-i18n";
import { ref, computed, watch, onMounted } from "vue";

const { siteName, description, shortDescription, siteImage } = useAppConfig();

const stCategories = useCategoriesStore();
const stProducts = useProductsStore();
const stBanners = useBannerStore();
const stDepartments = useDepartmentsStore();

const { t } = useI18n();

await stCategories.fetch();
await stProducts.fetchFeatured();
await stProducts.fetchOnSale();
await stProducts.fetchNews();
await stBanners.fetch();
await stDepartments.fetch();

useSeoMeta({
  title: t("messages.home.title"),
  ogTitle: siteName,
  description: description,
  ogDescription: shortDescription,
  ogImage: siteImage,
  twitterCard: `summary_large_image`,
});

import { useKeenSlider } from "keen-slider/vue.es";
import "keen-slider/keen-slider.min.css";
import Departments from "~/components/Departments.vue";

const [container] = useKeenSlider(
  {
    loop: true,
    breakpoints: {
      "(min-width: 360px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 4, spacing: 10 },
      },
      "(min-width: 1244px)": {
        slides: { perView: 5, spacing: 20 },
      },
      "(min-width: 1920px)": {
        slides: { perView: 6, spacing: 5 },
      },
    },
  },
  [
    (slider: any) => {
      let timeout: any;
      let mouseOver = false;
      function clearNextTimeout() {
        clearTimeout(timeout);
      }
      function nextTimeout() {
        clearTimeout(timeout);
        if (mouseOver) return;
        timeout = setTimeout(() => {
          slider.next();
        }, 3000);
      }
      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true;
          clearNextTimeout();
        });
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false;
          nextTimeout();
        });
        nextTimeout();
      });
      slider.on("dragStarted", clearNextTimeout);
      slider.on("animationEnded", nextTimeout);
      slider.on("updated", nextTimeout);
    },
  ]
);

// Purchase process state
const currentStep = ref(1);
const steps = computed(() => {
  const stepData = [];
  for (let i = 1; i <= 5; i++) {
    stepData.push({
      title: t(`messages.purchaseProcess.steps.${i}.title`),
      description: t(`messages.purchaseProcess.steps.${i}.description`),
    });
  }
  return stepData;
});

const nextStep = () => {
  currentStep.value = (currentStep.value % 5) + 1;
};

const prevStep = () => {
  currentStep.value = (currentStep.value - 2 + 5) % 5 + 1;
};

const stepProgress = computed(() => {
  return ((currentStep.value - 1) / 4) * 100;
});

// Auto advance after 5 seconds
const autoAdvance = () => {
  setTimeout(() => {
    nextStep();
  }, 5000);
};

watch(currentStep, (newStep) => {
  autoAdvance();
});

onMounted(() => {
  autoAdvance();
});
</script>

<template>
  <main>
    <HeroBanner :nodes="stBanners.getAll" />
    <div class="relative overflow-hidden">
      <div class="absolute inset-0 z-0 pointer-events-none">
        <div
          class="absolute sm:top-[41%] sm:-left-[25%] xs:-top-[10%] xs:-left-[25%] sm:w-[950px] sm:h-[950px] xs:w-[320px] xs:h-[320px] bg-[radial-gradient(circle_at_center,_rgba(239,122,20,0.3)_0%,_rgba(239,122,20,0.25)_15%,_rgba(239,122,20,0.2)_30%,_rgba(239,122,20,0.15)_45%,_rgba(255,255,255,0.1)_60%,_rgba(255,255,255,0.05)_75%,_rgba(255,255,255,0.02)_90%,_rgba(255,255,255,0)_100%)] rounded-full"
        ></div>
        <div
          class="absolute sm:-bottom-[10%] -bottom-56 sm:right-[30%] xs:right-[0] sm:w-[750px] sm:h-[750px] xs:w-[320px] xs:h-[320px] bg-[radial-gradient(circle_at_center,_rgba(239,122,20,0.3)_0%,_rgba(239,122,20,0.25)_15%,_rgba(239,122,20,0.2)_30%,_rgba(239,122,20,0.15)_45%,_rgba(255,255,255,0.1)_60%,_rgba(255,255,255,0.05)_75%,_rgba(255,255,255,0.02)_90%,_rgba(255,255,255,0)_100%)] rounded-full"
        ></div>
        <div
          v-if="!isMobile() || !isTablet()"
          class="absolute -top-[10%] -right-[15%] sm:w-[950px] sm:h-[950px] xs:w-[320px] xs:h-[320px] bg-[radial-gradient(circle_at_center,_rgba(239,122,20,0.3)_0%,_rgba(239,122,20,0.25)_15%,_rgba(239,122,20,0.2)_30%,_rgba(239,122,20,0.15)_45%,_rgba(255,255,255,0.1)_60%,_rgba(255,255,255,0.05)_75%,_rgba(255,255,255,0.02)_90%,_rgba(255,255,255,0)_100%)] rounded-full"
        ></div>
      </div>
      <section class="container sm:my-16">
        <div
          class="grid justify-center xs:grid-cols-1 gap-4 sm:grid-cols-3 my-8 items-center"
        >
          <Departments
            v-for="(dep, i) in stDepartments.getAll"
            :key="i"
            class="w-full"
            :node="dep"
          />
        </div>
      </section>

      <!-- Promoción Especial -->

      <!-- Featured Products -->
      <section
        class="container my-16"
        style="padding: '0.5rem'"
        v-if="stProducts.getFeatured.length > 0"
      >
        <div class="flex flex-row items-center justify-between gap-2">
          <h2 class="w-8/12 text-lg font-semibold md:text-2xl xs:text-md">
            {{ t("messages.shop.popularProducts") }}
          </h2>

          <NuxtLink
            class="rounded-full border p-3 text-primary-dark font-bold sm:text-lg xs:text-sm"
            to="/products?filter=featured[true]"
            >{{ t("messages.general.viewAll") }}</NuxtLink
          >
        </div>
        <ProductRow
          :products="stProducts.getFeatured"
          class="grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-8"
        />
      </section>

      <!-- Why Choose Us -->
      <section class="relative overflow-hidden my-16 py-8">
        <div
          class="absolute z-0 inset-0 bg-gradient-to-r from-primary-dark/40 to-secondary-dark/40"
        ></div>
        <div class="container z-10">
          <div class="text-center mb-12 relative z-10">
            <h2 class="text-3xl sm:text-4xl font-bold text-primary mb-4">
              {{ t("messages.features.title") }}
            </h2>
            <p class="text-primary-dark max-w-2xl mx-auto">
              {{ t("messages.features.subtitle") }}
            </p>
          </div>

          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="group">
              <div
                class="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative z-10"
              >
                <div
                  class="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4"
                >
                  <svg
                    class="w-6 h-6 text-primary-dark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold mb-2">
                  {{ t("messages.features.quality.title") }}
                </h3>
                <p class="text-gray-600">
                  {{ t("messages.features.quality.description") }}
                </p>
              </div>
            </div>

            <div class="group">
              <div
                class="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative z-10"
              >
                <div
                  class="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4"
                >
                  <svg
                    class="w-6 h-6 text-primary-dark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold mb-2">
                  {{ t("messages.features.variety.title") }}
                </h3>
                <p class="text-gray-600">
                  {{ t("messages.features.variety.description") }}
                </p>
              </div>
            </div>

            <div class="group">
              <div
                class="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative z-10"
              >
                <div
                  class="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4"
                >
                  <svg
                    class="w-6 h-6 text-primary-dark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold mb-2">
                  {{ t("messages.features.support.title") }}
                </h3>
                <p class="text-gray-600">
                  {{ t("messages.features.support.description") }}
                </p>
              </div>
            </div>

            <div class="group">
              <div
                class="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative z-10"
              >
                <div
                  class="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4"
                >
                  <svg
                    class="w-6 h-6 text-primary-dark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold mb-2">
                  {{ t("messages.features.delivery.title") }}
                </h3>
                <p class="text-gray-600">
                  {{ t("messages.features.delivery.description") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- New Products -->
      <div class="container">
        <div class="flex flex-row items-center justify-between gap-2">
          <h2 class="w-8/12 text-lg font-semibold md:text-2xl">
            {{ t("messages.shop.latestProducts") }}
          </h2>

          <NuxtLink
            class="rounded-full border p-3 text-primary-dark font-bold sm:text-lg xs:text-sm"
            to="/products?filter=featured[true]"
            >{{ t("messages.general.viewAll") }}</NuxtLink
          >
        </div>
        <ProductSlider :products="stProducts.getNews" class="w-full" />
      </div>

      <section
        class="w-full grid sm:gap-12 xs:gap-4 py-10 lg:px-[10rem] sm:px-[5rem] xs:px-4 bg-white"
      >
        <div ref="container" class="keen-slider w-full">
          <CategoryCardRounded
            v-for="(category, i) in stCategories.getAll"
            :key="i"
            class="keen-slider__slide"
            :node="category"
          />
        </div>
      </section>

      <section
        class="container my-16"
        style="padding: '0.5rem'"
        v-if="stProducts.getFeatured.length > 0"
      >
        <div class="flex flex-row items-center justify-between gap-2">
          <h2 class="w-8/12 text-lg font-semibold md:text-2xl">
            {{ t("messages.shop.popularProducts") }}
          </h2>

          <NuxtLink
            class="rounded-full border p-3 text-primary-dark font-bold sm:text-lg xs:text-sm"
            to="/products?filter=featured[true]"
            >{{ t("messages.general.viewAll") }}</NuxtLink
          >
        </div>
        <ProductRow
          :products="stProducts.getFeatured"
          class="grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-8"
        />
      </section>

      <!-- Purchase Process -->
      <section class="relative overflow-hidden my-16 py-8">
        <div class="absolute"></div>
        <div class="container z-10">
          <div class="text-center mb-12 relative z-10">
            <h2 class="text-3xl sm:text-4xl font-bold text-primary mb-4">
              {{ t('messages.purchaseProcess.title') }}
            </h2>
            <p class="text-primary-dark max-w-2xl mx-auto">
              {{ t('messages.purchaseProcess.subtitle') }}
            </p>
          </div>

          <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div
              v-for="(step, index) in steps"
              :key="step.title"
              class="group relative"
            >
              <div
                class="p-6 relative z-10 sm:h-[280px] xs:h-[200px] flex flex-col justify-between border-zinc-200"
                :class="{
                  'bg-white': currentStep !== index + 1,
                  'bg-gradient-to-br from-secondary-dark/10 to-white/90': currentStep === index + 1,
                  'shadow-lg': currentStep === index + 1,
                  'border-2 border-primary': currentStep === index + 1,
                  'rounded-xl': true,
                  'hover:shadow-md': currentStep !== index + 1,
                  'hover:shadow-xl': currentStep === index + 1,
                  'transition-all duration-300': true,
                }"
              >
                <div
                  class="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  :class="{
                    'bg-primary-light': currentStep === index + 1,
                    'bg-white': currentStep !== index + 1,
                  }"
                >
                  <svg
                    v-if="currentStep === index + 1"
                    class="w-6 h-6 text-primary-dark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                 
                </div>
                <h3 class="text-xl font-semibold mb-2">
                  {{ step.title }}
                </h3>
                <p class="text-gray-600 flex-grow">
                  {{ step.description }}
                </p>
              </div>

              <!-- Step Number Overlay -->
              <div
                class="absolute sm:-top-6 sm:-left-6 xs:-top-4 xs:left-[40%] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold z-10"
                :class="{
                  'bg-primary': currentStep === index + 1,
                  'bg-gray-400': currentStep !== index + 1,
                  'scale-125': currentStep === index + 1,
                  'shadow-md': currentStep === index + 1,
                }"
              >
                {{ index + 1 }}
              </div>

              <!-- Highlight Effect -->
              <div
                v-if="currentStep === index + 1"
                class="absolute inset-0 rounded-xl"
                :class="{
                  'animate-pulse': currentStep === index + 1,
                }"
              >
                <div
                  class="absolute inset-0 bg-primary/10 rounded-xl"
                ></div>
              </div>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="mt-8">
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div
                class="h-2.5 rounded-full transition-all duration-500 bg-gradient-to-r from-secondary to-primary"
                :style="{ width: `${stepProgress}%` }"
              ></div>
            </div>
            <p class="text-gray-600 text-sm mt-2 text-center">
              {{ currentStep }}/{{ steps.length }}
            </p>
          </div>
        </div>
      </section>

      <section class="container my-16" v-if="stProducts.getOnSale.length > 0">
        <div class="flex items-center justify-between gap-2">
          <h2 class="w-8/12 text-lg font-semibold md:text-2xl">
            {{ t("messages.general.productsOnSale") }}
          </h2>

          <NuxtLink
            class="rounded-full border p-3 text-primary-dark font-bold sm:text-lg xs:text-sm"
            to="/products?filter=onSale[true]"
            >{{ t("messages.general.viewAll") }}</NuxtLink
          >
        </div>
        <ProductRow
          :products="stProducts.getOnSale"
          class="grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-8"
        />
      </section>
    </div>
  </main>
</template>

<style scoped>
.brand img {
  max-height: min(8vw, 120px);
  object-fit: contain;
  object-position: center;
}
</style>
