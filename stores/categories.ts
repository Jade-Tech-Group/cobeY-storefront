import type Category from "~/types";

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    loading: false,
    categories: [] as Category[],
    count: 0,
  }),
  getters: {
    getAll: (state) => state.categories,
  },
  actions: {
    async fetch(): Promise<void> {
      this.loading = true;
      try {
        const response: { data: Category[]  } = await $fetch(
          "http://localhost:3000/api/v1/category"
        );
        this.categories = response.data;
        this.loading = false;
      } catch (error: unknown) {
        console.error(error);
        this.loading = false;
      }
    },
  },
});
