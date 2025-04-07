// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from "@nuxt/kit";
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  components: [{ path: resolve("./components"), pathPrefix: false }],
  compatibilityDate: "2024-07-09",
  devtools: { enabled: true },
 
  future: {
    compatibilityVersion: 4,
  },

  plugins: [resolve("./plugins/init.ts")],
 
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxt/icon",
    "@pinia/nuxt",
    "nuxt-keen-slider",
    "notivue/nuxt"
  ],

  css: ['notivue/notification.css', 'notivue/animations.css'],

  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },

  experimental: {
    sharedPrerenderData: true,
    buildCache: true,
    defaults: {
      nuxtLink: {
        prefetch: true,
        prefetchOn: { visibility: false },
      },
    },
  },

  nitro: {
    preset: 'node-server',
    routeRules: {
      "/": { prerender: true },
      "/products/**": { swr: 3600 },
      "/order-summary/**": { ssr: false },
      "/product/**": { ssr: true },
    },
  },
  runtimeConfig: {
    apiUrl: process.env.BASE_URL,
  },
  app: {
    baseURL: '/',
    head: {
      htmlAttrs: { lang: "es" },
      link: [{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }],
    },
    pageTransition: { name: "page", mode: "default" },
  },

  ssr: true,

  hooks: {
    "pages:extend"(pages) {
      const addPage = (name: string, path: string, file: string) => {
        pages.push({ name, path, file: resolve(`./pages/${file}`) });
      };

      addPage(
        "product-page-pager",
        "/products/page/:pageNumber",
        "products.vue"
      );
      addPage(
        "product-category-page",
        "/product-category/:categorySlug",
        "product-category/[id].vue"
      );
      addPage(
        "product-department-page",
        "/product-department/:departmentSlug",
        "product-department/[id].vue"
      );
      addPage(
        "product-category-page-pager",
        "/product-category/:categorySlug/page/:pageNumber",
        "product-category/[id].vue"
      );
      addPage(
        "product-department-page-pager",
        "/product-department/:departmentSlug/page/:pageNumber",
        "product-department/[id].vue"
      );
      addPage(
        "order-received",
        "/checkout/order-received/:orderId",
        "order-summary.vue"
      );
      addPage("order-summary", "/order-summary/:orderId", "order-summary.vue");
    },
  },

  // Multilingual support
  i18n: {
    locales: [
      { code: "es", file: "es-ES.json", name: "Español 🇪🇸" },
      { code: "en", file: "en-US.json", name: "English 🇺🇸" },
    ],
    langDir: "locales",
    defaultLocale: "es",
    strategy: "no_prefix",
  },
});
