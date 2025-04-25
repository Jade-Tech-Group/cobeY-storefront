<script lang="ts" setup>
import { useCategoriesStore } from "~/stores/categories";
import { useProductsStore } from "~/stores/products";

const { siteName, description, shortDescription, siteImage } = useAppConfig();

const stCategories = useCategoriesStore();
const stProducts = useProductsStore();
const stBanners = useBannerStore();
const stDepartments = useDepartmentsStore();

await stCategories.fetch();
await stProducts.fetchFeatured();
await stProducts.fetchOnSale();
await stProducts.fetchNews();
await stBanners.fetch();
await stDepartments.fetch();

useSeoMeta({
  title: `Home`,
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
        slides: { perView: 3, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 6, spacing: 10 },
      },
      "(min-width: 1244px)": {
        slides: { perView: 6, spacing: 20 },
      },
      "(min-width: 1920px)": {
        slides: { perView: 7, spacing: 5 },
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
</script>

<template>
  <main>
    <HeroBanner :nodes="stBanners.getAll" />
    <div class="relative">
      <div class="absolute inset-0 z-0 pointer-events-none">
        <div
          class="absolute top-[10%] -left-[20%] sm:w-[750px] sm:h-[750px] xs:w-[320px] xs:h-[320px] bg-[radial-gradient(circle_at_center,_rgba(153,178,228,0.3)_0%,_rgba(153,178,228,0.25)_15%,_rgba(153,178,228,0.2)_30%,_rgba(153,178,228,0.15)_45%,_rgba(255,255,255,0.1)_60%,_rgba(255,255,255,0.05)_75%,_rgba(255,255,255,0.02)_90%,_rgba(255,255,255,0)_100%)] rounded-full"
        ></div>
        <div
          class="absolute sm:-bottom-[10%] -bottom-56 sm:right-[20%] xs:right-[0] sm:w-[750px] sm:h-[750px] xs:w-[320px] xs:h-[320px] bg-[radial-gradient(circle_at_center,_rgba(153,178,228,0.3)_0%,_rgba(153,178,228,0.25)_15%,_rgba(153,178,228,0.2)_30%,_rgba(153,178,228,0.15)_45%,_rgba(255,255,255,0.1)_60%,_rgba(255,255,255,0.05)_75%,_rgba(255,255,255,0.02)_90%,_rgba(255,255,255,0)_100%)] rounded-full"
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

      <!-- Featured Products -->
      <section
        class="container my-16"
        style="padding: '0.5rem'"
        v-if="stProducts.getFeatured.length > 0"
      >
        <div class="flex flex-row items-center justify-between gap-2">
          <h2 class="text-lg font-semibold md:text-2xl xs:text-md">
            {{ $t("messages.shop.popularProducts") }}
          </h2>
          <div class="flex-1 border border-gray-200 text-center"></div>
          <NuxtLink
            class="rounded-full border p-3 text-primary-dark font-bold sm:text-lg xs:text-sm w-28 text-center"
            to="/products?filter=featured[true]"
            >{{ $t("messages.general.viewAll") }}</NuxtLink
          >
        </div>
        <ProductRow
          :products="stProducts.getFeatured"
          class="grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-8"
        />
      </section>

      <section
        class="grid sm:gap-12 xs:gap-4 my-24 md:grid-cols-2 lg:grid-cols-4 bg-secondary-light py-10 sm:px-[10rem] xs:px-4"
      >
        <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
          <img
            src="/icons/box.svg"
            width="60"
            height="60"
            alt="Free Shipping"
            loading="lazy"
          />
          <div>
            <h3 class="text-xl font-semibold">Envío gratis</h3>
            <p class="text-sm">Envío gratuito en pedidos superiores a 50€</p>
          </div>
        </div>
        <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
          <img
            src="/icons/moneyback.svg"
            width="60"
            height="60"
            alt="Money Back"
            loading="lazy"
          />
          <div>
            <h3 class="text-xl font-semibold">Tranquilidad de espíritu</h3>
            <p class="text-sm">Garantía de devolución de dinero de 30 días</p>
          </div>
        </div>
        <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
          <img
            src="/icons/secure.svg"
            width="60"
            height="60"
            alt="Secure Payment"
            loading="lazy"
          />
          <div>
            <h3 class="text-xl font-semibold">100% Pago Seguro</h3>
            <p class="text-sm">Tu pago está seguro con nosotros</p>
          </div>
        </div>
        <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
          <img
            src="/icons/support.svg"
            width="60"
            height="60"
            alt="Support 24/7"
            loading="lazy"
          />
          <div>
            <h3 class="text-xl font-semibold">Soporte 24/7</h3>
            <p class="text-sm">24/7 Soporte online</p>
          </div>
        </div>
      </section>

      <!-- New Products -->
      <ProductSlider :products="stProducts.getNews" class="w-full" />

      <section
        class="w-full grid sm:gap-12 xs:gap-4 py-10 lg:px-[10rem] lg:px-[5rem] sm:px-[5rem] xs:px-4 bg-white"
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
          <h2 class="text-lg font-semibold md:text-2xl">
            {{ $t("messages.shop.popularProducts") }}
          </h2>
          <div class="flex-1 border border-gray-200 text-center"></div>
          <NuxtLink
            class="rounded-full border p-3 text-primary-dark font-bold text-lg"
            to="/products?filter=featured[true]"
            >{{ $t("messages.general.viewAll") }}</NuxtLink
          >
        </div>
        <ProductRow
          :products="stProducts.getFeatured"
          class="grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-8"
        />
      </section>

      <section class="container my-16" v-if="stProducts.getOnSale.length > 0">
        <div class="flex items-center justify-between gap-2">
          <h2 class="text-lg font-semibold md:text-2xl">
            {{ $t("messages.general.productsOnSale") }}
          </h2>
          <div class="flex-1 border border-gray-200 text-center"></div>
          <NuxtLink
            class="rounded-full border p-3 text-primary-dark font-bold sm:text-lg xs:text-sm w-28 text-center"
            to="/products?filter=onSale[true]"
            >{{ $t("messages.general.viewAll") }}</NuxtLink
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
