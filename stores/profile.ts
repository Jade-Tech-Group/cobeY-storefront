import useConf from "~/conf/useConf";
import type { Profile } from "~/types";

export const useProfileStore = defineStore("profile", {
    state: () => ({
        loading: false,
        billing: {} as Profile,
    }),
    getters: {
        getBillingData: (state) => state.billing,
    },
    actions: {
        async fetchProfile(): Promise<void> {
            const tokenCookie = useCookie('accessToken');
            this.loading = true;
            try {
                const response = await $fetch<Profile>(
                    `${useConf.api.baseUrl}/${useConf.api.services.profile.customer}`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${tokenCookie.value}`,
                        },
                    }
                );
                this.billing = response;
                this.loading = false;
            } catch (error: unknown) {
                console.error(error);
                this.loading = false;
            }
        },
    },
});
