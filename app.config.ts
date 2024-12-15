/**
 * App configuration.
 * This file is used to configure the app settings.
 * Below are the default values.
 */
export default defineAppConfig({
  siteName: "Cove Y+",
  shortDescription:
    "This is an example of store. It provides a modern, fast, and SEO friendly ecommerce store built with Nuxt.",
  description: `
      This is an example of a store. It provides a modern, fast, and SEO friendly ecommerce store built with Nuxt.`,
  baseUrl: "https://localhost:9000",
  siteImage:
    "https://user-images.githubusercontent.com/5116925/218879668-f4c1f9fd-bef4-44b0-bc7f-e87d994aa3a1.png",
  storeSettings: {
    autoOpenCart: false,
    showReviews: true,  
    showFilters: true,
    showOrderByDropdown: true,
    showSKU: true,
    showRelatedProducts: true,
    showProductCategoriesOnSingleProduct: true,
    showBreadcrumbOnSingleProduct: true,
    showMoveToWishlist: true,
    hideBillingAddressForVirtualProducts: false,
    initStoreOnUserActionToReduceServerLoad: true,
    saleBadge: "percent", // 'percent', 'onSale' or 'hidden'
  },
});
