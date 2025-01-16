import type { Order } from "~/types";

export const useOrdersStore = defineStore("orders", {
  state: () => ({
    loading: false,
    orders: [] as Order[],
    count: 0,
  }),
  getters: {
    getAll: (state) => state.orders,
  },
  actions: {
    async fetchAll(): Promise<void> {
      this.loading = true;
      try {
        const response: { data: Order[] } = await $fetch(
          "https://cobey-api.onrender.com/api/v1/order",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${useAuth().accessToken.value}`,
            },
            withCredentials: true,
          }
        );
        this.orders = response.data;
        this.loading = false;
      } catch (error: unknown) {
        console.error(error);
        this.loading = false;
      }
    },
  },
});
