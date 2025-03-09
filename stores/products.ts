import type Product from "~/types";
import conf from "~/conf/useConf";
import useConf from "~/conf/useConf";
export const useProductsStore = defineStore("products", {
  state: () => ({
    loading: false,
    hasError: false,
    products: [] as Product[],
    featured: [] as Product[],
    prodFav: [] as Product[],
    onSale: [] as Product[],
    current: {} as Product,
    related: [] as Product[],
    byCategory: [] as Product[],
    byDepartment: [] as Product[],
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
        const response = await $fetch<{ data: Product[] }>(
          `${conf.api.baseUrl}${conf.api.services.product.available}?featured=true`
        );
        this.featured = response.data.map((r) => ({
          ...r,
          amount: 1,
        }));
        this.loading = false;
      } catch (error: unknown) {
        console.error(error);
        this.loading = false;
      }
    },

    async fetchByCategory(category_id: string): Promise<void> {
      this.loading = true;
      try {
        const response = await $fetch<{ data: Product[] }>(
          `${conf.api.baseUrl}${conf.api.services.product.available}?&category_id=${category_id}`
        );
        this.byCategory = response.data.map((r) => ({
          ...r,
          amount: 1,
        }));
        this.loading = false;
      } catch (error: unknown) {
        console.error(error);
        this.loading = false;
      }
    },
    async fetchByDepartment(department_id: string): Promise<void> {
      this.loading = true;
      try {
        const response = await $fetch<{ data: Product[] }>(
          `${conf.api.baseUrl}${conf.api.services.product.available}?&department_id=${department_id}`
        );
        this.byDepartment = response.data.map((r) => ({
          ...r,
          amount: 1,
        }));
        this.loading = false;
      } catch (error: unknown) {
        console.error(error);
        this.loading = false;
      }
    },

    async fetchOnSale(): Promise<void> {
      this.loading = true;
      try {
        const response = await $fetch<{ data: Product[] }>(
          `${conf.api.baseUrl}${conf.api.services.product.available}?on_sale=true`
        );
        this.onSale = response.data.map((r) => ({
          ...r,
          amount: 1,
        }));
        this.loading = false;
      } catch (error: unknown) {
        console.error(error);
        this.loading = false;
      }
    },

    async fetchAll(): Promise<void> {
      this.loading = true;
      try {
        const response = await $fetch<{ data: Product[] }>(
          `${conf.api.baseUrl}${conf.api.services.product.available}`
        );
        this.products = response.data.map((r) => ({
          ...r,
          amount: 1,
        }));
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
          `${conf.api.baseUrl}${conf.api.services.product.byId}/${id}`
        );
        if (response) response.amount = 1
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
        const response = await $fetch<{ data: Product[] }>(
          `${conf.api.baseUrl}${conf.api.services.product.available}?page=${page}&size=${size}&category_id=${category_id}&available=true`
        );
        this.related = response.data.map((r) => ({
          ...r,
          amount: 1,
        }));
        this.loading = false;
      } catch (error: unknown) {
        console.error(error);
        this.loading = false;
      }
    },

    async fetchProductsFavs() {
      const tokenCookie = useCookie('accessToken');
      this.loading = true;
      try {
        const resp = await $fetch<{ products: Product[] }>(`${useConf.api.baseUrl}${useConf.api.services.product.favorites}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${tokenCookie.value}`,
            },
          })
        this.prodFav = resp.products.map((r) => ({
          ...r,
          amount: 1,
        }));
        this.loading = false;
      } catch {
        this.loading = false;

      }
    },
    
    async createFav(id: string) {
      const tokenCookie = useCookie('accessToken');
      this.loading = true;
      try {
        const resp = await $fetch<Product[]>(`${useConf.api.baseUrl}${useConf.api.services.product.favorites}/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${tokenCookie.value}`,
            },
          })
        this.prodFav = resp.map((r) => ({
          ...r,
          amount: 1,
        }));
        this.hasError = false;
        this.loading = false;
      } catch(error) {
        this.hasError = true;
        console.log(error)
        this.loading = false;
      }
    },
    async deleteFav(id: string) {
      const tokenCookie = useCookie('accessToken');
      this.loading = true;
      try {
        const resp = await $fetch<Product[]>(`${useConf.api.baseUrl}${useConf.api.services.product.favorites}/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${tokenCookie.value}`,
            },
          })
        this.prodFav = resp.map((r) => ({
          ...r,
          amount: 1,
        }));
        this.loading = false;
        this.hasError = false;
      } catch(error) {
        this.hasError = true;
        console.log(error)
        this.loading = false;
      }
    },
  }
});
