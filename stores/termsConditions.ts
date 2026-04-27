import conf from "~/conf/useConf";


export const useTermsConditions = defineStore("termsConditions", () => {
    const termsConditions = ref();
    const loading = ref(false);
    const hasError = ref(false);

async function getTermsConditionsInfo() {
    loading.value = true;
    try {
        const response = await fetch(`${conf.api.baseUrl}${conf.api.services.termsConditions}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        termsConditions.value = await response.json();
        loading.value = false;
        hasError.value = false;
        
    } catch (error) {
        loading.value = false;
        hasError.value = true;
        console.error('Error fetching termsConditions info:', error);
        throw error;
    }
}
return { termsConditions, loading, hasError, getTermsConditionsInfo };

});
