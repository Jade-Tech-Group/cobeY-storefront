/**
 * App configuration.
 * This file is used to configure the app settings.
 * Below are the default values.
 */
export default defineAppConfig({
  siteName: "Cobe Y +",
  shortDescription:process.env.SHORT_DESCRIPTION,
  description:process.env.DESCRIPTION,
  baseUrl: process.env.BASE_URL,
  siteImage:process.env.SITE_IMG,
  urlPaymentSuccess:process.env.URL_PAYMENT_SUCCESS,
  urlPaymentFail:process.env.URL_PAYMENT_FAIL,
  storeSettings: {
    autoOpenCart: false,
    showReviews: true,
    showFilters: true,
    showOrderByDropdown: true,
    showSKU: true,
    showRelatedProducts: true,
    showProductCategoriesOnSingleProduct: true,
    showBreadcrumbOnSingleProduct: true,
    // showMoveToWishlist: true,*
    hideBillingAddressForVirtualProducts: false,
    initStoreOnUserActionToReduceServerLoad: true,
    saleBadge: "percent", 
  },
});
