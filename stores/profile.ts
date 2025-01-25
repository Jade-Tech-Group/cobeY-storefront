import useConf from "~/conf/useConf";
import type { BillingAddress, DeliveryAddress, Profile } from "~/types";

export const useProfileStore = defineStore("profile", {
    state: () => ({
        loading: false,
        billing: {} as BillingAddress,
        deliveryAddress: [] as DeliveryAddress[],
        currentDeliveryAddress: {} as DeliveryAddress,
        newDeliveryAddress: {} as DeliveryAddress,
    }),
    getters: {
        getBillingData: (state) => state.billing,
        getDeliveryData: (state) => state.deliveryAddress,
        getCurrentDeliveryData: (state) => state.currentDeliveryAddress,
        getNewDeliveryData: (state) => state.newDeliveryAddress,
    },
    actions: {
        async fetchBillingData(): Promise<void> {
            const tokenCookie = useCookie('accessToken');
            this.loading = true;
            try {
                const response = await $fetch<BillingAddress>(
                    `${useConf.api.baseUrl}/${useConf.api.services.profile.customer}`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${tokenCookie.value}`,
                        },
                    }
                );
                // Modifying the response to change 'last_name' to 'lastName'
                response.lastName = response.last_name;
                this.billing = response;
                this.loading = false;
            } catch (error: unknown) {
                console.error(error);
                this.loading = false;
            }
        },

        async fetchDeliveryAddress(): Promise<void> {
            const tokenCookie = useCookie('accessToken');
            this.loading = true;
            try {
                const response = await $fetch<{ data: DeliveryAddress[] }>(
                    `${useConf.api.baseUrl}/${useConf.api.services.profile.deliveryAddress}`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${tokenCookie.value}`,
                        },
                    }
                );
                this.deliveryAddress = response.data;
                this.loading = false;
            } catch (error: unknown) {
                console.error(error);
                this.loading = false;
            }
        },

        async fetchDeliveryAdderessById(id: string): Promise<void> {
            const tokenCookie = useCookie('accessToken');
            this.loading = true;
            try {
                const response = await $fetch<DeliveryAddress>(
                    `${useConf.api.baseUrl}/${useConf.api.services.profile.deliveryAddress}/${id}`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${tokenCookie.value}`,
                        },
                    }
                );
                this.currentDeliveryAddress = response;
                this.loading = false;
            } catch (error: unknown) {
                console.error(error);
                this.loading = false;
            }
        },

        async deleteDeliveryAddress(id: string): Promise<void> {
            const tokenCookie = useCookie('accessToken');
            this.loading = true;
            try {
                await $fetch<DeliveryAddress>(
                    `${useConf.api.baseUrl}/${useConf.api.services.profile.deliveryAddress}/${id}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${tokenCookie.value}`,
                        },
                    }
                );
                this.currentDeliveryAddress = {} as DeliveryAddress;
                this.loading = false;
            } catch (error: unknown) {
                console.error(error);
                this.loading = false;
            }
        },
        async updateDeliveryAddress(id: string, params: DeliveryAddress): Promise<void> {
            const tokenCookie = useCookie('accessToken');
            this.loading = true;
            try {
                await $fetch<DeliveryAddress>(
                    `${useConf.api.baseUrl}/${useConf.api.services.profile.deliveryAddress}/${id}`,
                    {
                        method: "PUT",
                        body: JSON.stringify(params),
                        headers: {
                            "Authorization": `Bearer ${tokenCookie.value}`,
                        },
                    }
                );
                this.loading = false;
            } catch (error: unknown) {
                console.error(error);
                this.loading = false;
            }
        },
        async addDeliveryAddress(params: DeliveryAddress): Promise<void> {
            const tokenCookie = useCookie('accessToken');
            this.loading = true;
            try {
                const response = await $fetch<DeliveryAddress>(
                    `${useConf.api.baseUrl}/${useConf.api.services.profile.deliveryAddress}`,
                    {
                        method: "POST",
                        body: JSON.stringify(params),
                        headers: {
                            "Authorization": `Bearer ${tokenCookie.value}`,
                        },
                    }
                );
                this.newDeliveryAddress = response
                this.loading = false;
            } catch (error: unknown) {
                console.error(error);
                this.loading = false;
            }
        },
    },
});
