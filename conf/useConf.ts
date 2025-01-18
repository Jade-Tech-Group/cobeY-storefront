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
      },
      order: {
        list: "/order",
      },
      cart: {
        list: "/cart",
        add: '/cart',
        delete: '/cart'
      },
    },
  },
};
