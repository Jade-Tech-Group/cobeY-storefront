export default {
  api: {
    baseUrl: "https://cobey-api.onrender.com/api/v1",
    services: {
      auth: {
        login: "/auth/login",
        register: "/auth/register",
      },
      categories: {
        list: "/category",
        add: "/category",
        edit: "/category",
        del: "/category",
      },
      banner: {
        list: "/banner",
      },
      product: {
        list: "/product",
        available: "/product/available/web",
        byCategory: "/product",
        byId: "/product",
        favorites: "/product/favorites",
      },
      order: {
        list: "/order/client",
        create: "/order",
        byId: "/order",
      },
      profile: {
        customer: 'user/profile',
        deliveryAddress: 'deliveryAddress',
        billingData: 'user/profile',
        security: 'user/password',
      },
      cart: {
        list: "/cart",
        add: '/cart',
        delete: '/cart',
        apply_coupon: '/cart/apply-coupon',
        delete_coupon: '/cart/delete-coupon',
        updateShipping: '/cart/shippingMethod'
      },
    },
  },
};
