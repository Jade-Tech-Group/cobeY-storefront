import type Category from "~/types";
import conf from "~/conf/useConf";

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
        const response = await $fetch<{data: Category[]}>(
          `${conf.api.baseUrl}${conf.api.services.categories.list}`
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
