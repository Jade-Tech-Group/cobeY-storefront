import type Category from "~/types";
import conf from "~/conf/useConf";
import type { Banner } from "~/types";

export const useBannerStore = defineStore("banner", {
  state: () => ({
    loading: false,
    banners: [] as Banner[],
    count: 0,
  }),
  getters: {
    getAll: (state) => state.banners,
  },
  actions: {
    async fetch(): Promise<void> {
      this.loading = true;
      try {
        const response: { data: Banner[]  } = await $fetch(
          `${conf.api.baseUrl}${conf.api.services.banner.list}`
        );
        this.banners = response.data;
        this.loading = false;
      } catch (error: unknown) {
        console.error(error);
        this.loading = false;
      }
    },
  },
});
