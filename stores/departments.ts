import conf from "~/conf/useConf";
import type { Department } from "~/types";

export const useDepartmentsStore = defineStore("departments", {
  state: () => ({
    loading: false,
    departments: [] as Department[],
    count: 0,
  }),
  getters: {
    getAll: (state) => state.departments,
  },
  actions: {
    async fetch(): Promise<void> {
      this.loading = true;
      try {
        const response = await $fetch<{data: Department[]}>(
          `${conf.api.baseUrl}${conf.api.services.departments.list}`
        );
        this.departments = response.data;
        this.loading = false;
      } catch (error: unknown) {
        console.error(error);
        this.loading = false;
      }
    },
  },
});
