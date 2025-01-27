import useConf from "~/conf/useConf";
import type { Order } from "~/types";

export const useOrdersStore = defineStore("orders", {
  state: () => ({
    loading: false,
    orders: [] as Order[],
    currentOrder: {} as Order,
    count: 0,
  }),
  getters: {
    getAll: (state) => state.orders,
    getCurrent: (state) => state.currentOrder,
  },
  actions: {
    async fetchAll(): Promise<void> {
      this.loading = true;
      try {
        const response: { data: Order[] } = await $fetch(
          `${useConf.api.baseUrl}${useConf.api.services.order.list}`,
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
    async getById(id: string): Promise<void> {
      this.loading = true;
      try {
        const response = await $fetch<Order>(
          `${useConf.api.baseUrl}${useConf.api.services.order.byId}/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${useAuth().accessToken.value}`,
            }
          }
        );
        this.currentOrder = response;
        this.loading = false;
      } catch (error: unknown) {
        console.error(error);
        this.loading = false;
      }
    },
  },
});
