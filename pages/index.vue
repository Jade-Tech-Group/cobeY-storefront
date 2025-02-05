<script lang="ts" setup>
import { useCategoriesStore } from "~/stores/categories";
import { useProductsStore } from "~/stores/products";

const { siteName, description, shortDescription, siteImage } = useAppConfig();

const stCategories = useCategoriesStore();
const stProducts = useProductsStore();
const stBanners = useBannerStore();

await stCategories.fetch();
await stProducts.fetchFeatured();
await stProducts.fetchOnSale();
await stBanners.fetch();

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
        slides: { perView: 7, spacing: 20 },
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
    <section class="container my-16">
      <div class="flex items-end justify-between">
        <h2 class="text-lg font-semibold md:text-2xl">
          {{ $t("messages.shop.shopByCategory") }}
        </h2>
        <NuxtLink to="/categories">{{
          $t("messages.general.viewAll")
        }}</NuxtLink>
      </div>

      <div ref="container" class="keen-slider mt-8 w-full">
        <CategoryCard
          v-for="(category, i) in stCategories.getAll"
          :key="i"
          class="keen-slider__slide"
          :node="category"
        />
      </div>
    </section>

    <section class="container my-16" v-if="stProducts.getFeatured">
      <div class="flex items-end justify-between">
        <h2 class="text-lg font-semibold md:text-2xl">
          {{ $t("messages.shop.popularProducts") }}
        </h2>
        <NuxtLink to="/products?filter=featured[true]">{{ $t("messages.general.viewAll") }}</NuxtLink>
      </div>
      <ProductRow
        :products="stProducts.getFeatured"
        class="grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-8"
      />
    </section>

    <section class="container grid gap-4 my-24 md:grid-cols-2 lg:grid-cols-4">
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

    <section class="container my-16" v-if="stProducts.getOnSale">
      <div class="flex items-end justify-between">
        <h2 class="text-lg font-semibold md:text-2xl">
          {{ $t("messages.general.productsOnSale") }}
        </h2>
        <NuxtLink to="/products?filter=onSale[true]">{{ $t("messages.general.viewAll") }}</NuxtLink>
      </div>
      <ProductRow
        :products="stProducts.getOnSale"
        class="grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-8"
      />
    </section>
  </main>
</template>

<style scoped>
.brand img {
  max-height: min(8vw, 120px);
  object-fit: contain;
  object-position: center;
}
</style>
