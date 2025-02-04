/**
 * App configuration.
 * This file is used to configure the app settings.
 * Below are the default values.
 */
export default defineAppConfig({
  siteName: "COBE Y +",
  shortDescription:
    "Tienda online. Proveemos productos de alta calidad garantizada y con precios muy competentes",
  description: `
      Aquí encontrarás los mejores productos del mercado`,
  baseUrl: "https://cobey-api.onrender.com/api/v1",
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
