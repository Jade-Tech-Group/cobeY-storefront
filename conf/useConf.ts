export default {
    api: {
      baseUrl: 'http://localhost:3000/api/v1',
      services: {
        auth: {
          login: '/auth/login',
        },
        categories: {
          list: '/category',
          add: '/category',
          edit: '/category',
          del: '/category',
        },
        banner: {
          list: '/banner',
        },
        product: {
          list: '/product',
          available: '/product/available/web',
          byCategory: '/product',
          byId: '/product',
        },
        order: {
          list: '/order',
        }
      },
    },
  };
  