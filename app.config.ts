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
    "https://github.com/Jade-Tech-Group/cobeY-storefront/blob/master/public/images/tienda.png",
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
