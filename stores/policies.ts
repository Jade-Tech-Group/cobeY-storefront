import conf from "~/conf/useConf";


export const usePolicies = defineStore("policies", () => {
    const policies = ref();
    const loading = ref(false);
    const hasError = ref(false);

async function getPolicies() {
    loading.value = true;
    try {
        const response = await fetch(`${conf.api.baseUrl}${conf.api.services.policy}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        policies.value = result;
        loading.value = false;
        hasError.value = false;
        
    } catch (error) {
        loading.value = false;
        hasError.value = true;
        console.error('Error fetching policies info:', error);
        throw error;
    }
}
return { policies, loading, hasError, getPolicies };

});
