// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit';
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  components: [{ path: resolve('./components'), pathPrefix: false }],
  // compatibilityDate: '2024-11-01',
  compatibilityDate: '2024-07-09',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  plugins: [resolve('./plugins/init.ts')],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxt/icon',
    '@pinia/nuxt',
    'nuxt-keen-slider'
  ],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
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
    routeRules: {
      '/': { prerender: true },
      '/products/**': { swr: 3600 },
      '/order-summary/**': { ssr: false },
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      link: [{ rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    },
    pageTransition: { name: 'page', mode: 'default' },
  },

  hooks: {
    'pages:extend'(pages) {
      const addPage = (name: string, path: string, file: string) => {
        pages.push({ name, path, file: resolve(`./pages/${file}`) });
      };

      addPage('product-page-pager', '/products/page/:pageNumber', 'products.vue');
      addPage('product-category-page', '/product-category/:categorySlug', 'product-category/[id].vue');
      addPage('product-category-page-pager', '/product-category/:categorySlug/page/:pageNumber', 'product-category/[id].vue');
      addPage('order-received', '/checkout/order-received/:orderId', 'order-summary.vue');
      addPage('order-summary', '/order-summary/:orderId', 'order-summary.vue');
    },
  },

  // Multilingual support
  i18n: {
    locales: [
      { code: 'en', file: 'en-US.json', name: 'English 🇺🇸' },
      { code: 'es', file: 'es-ES.json', name: 'Español 🇪🇸' }
    ],
    langDir: 'locales',
    defaultLocale: 'es',
    strategy: 'no_prefix',
  },
})