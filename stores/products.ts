import type Product from "~/types";

export const useProductsStore = defineStore("products", {
  state: () => ({
    loading: false,
    products: [] as Product[],
    featured: [] as Product[],
    onSale: [] as Product[],
    current: {} as Product,
    related: [] as Product[],
    byCategory: [] as Product[],
    count: 0,
  }),
  getters: {
    getFeatured: (state) => state.featured,
    getOnSale: (state) => state.onSale,
    getCurrent: (state) => state.current,
    getRelateds: (state) => state.related,
    getAll: (state) => state.products,
  },
  actions: {
    async fetchFeatured(): Promise<void> {
      this.loading = true;
      try {
        const response: { data: Product[] } = await $fetch(
          "http://localhost:3000/api/v1/product/available/web?featured=true"
        );
        this.featured = response.data;
        this.loading = false;
      } catch (error: unknown) {
        console.error(error);
        this.loading = false;
      }
    },
    async fetchByCategory(category_id: string): Promise<void> {
      this.loading = true;
      try {
        const response: { data: Product[] } = await $fetch(
          `http://localhost:3000/api/v1/product?&category_id=${category_id}&available=true`
        );
        this.byCategory = response.data;
        this.loading = false;
      } catch (error: unknown) {
        console.error(error);
        this.loading = false;
      }
    },
    
    async fetchOnSale(): Promise<void> {
      this.loading = true;
      try {
        const response: { data: Product[] } = await $fetch(
          "http://localhost:3000/api/v1/product?available=true&on_sale=true"
        );
        this.onSale = response.data;
        this.loading = false;
      } catch (error: unknown) {
        console.error(error);
        this.loading = false;
      }
    },
    
    async fetchAll(): Promise<void> {
      this.loading = true;
      try {
        const response: { data: Product[] } = await $fetch(
          "http://localhost:3000/api/v1/product/available/web"
        );
        this.products = response.data;
        this.loading = false;
      } catch (error: unknown) {
        console.error(error);
        this.loading = false;
      }
    },
    
    async fetchById(id: string): Promise<void> {
      this.loading = true;
      try {
        const response = await $fetch(
          `http://localhost:3000/api/v1/product/${id}`
        );
        this.current = response as Product;
        this.loading = false;
      } catch (error: unknown) {
        console.error(error);
        this.loading = false;
      }
    },
    async fetchRelatedCategory(
      category_id: string,
      page: number = 1,
      size: number = 10
    ): Promise<void> {
      this.loading = true;
      try {
        const response: { data: Product[] } = await $fetch(
          `http://localhost:3000/api/v1/product?page=${page}&size=${size}&category_id=${category_id}&available=true`
        );
        this.related = response.data as Product[];
        this.loading = false;
      } catch (error: unknown) {
        console.error(error);
        this.loading = false;
      }
    },
  },
});
