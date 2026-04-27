import conf from "~/conf/useConf";


export const usePrivacyPolicy = defineStore("privacyPolicy", () => {
    const privacyPolicy = ref();
    const loading = ref(false);
    const hasError = ref(false);

async function getPrivacyPolicyInfo() {
    loading.value = true;
    try {
        const response = await fetch(`${conf.api.baseUrl}${conf.api.services.privacyPolicy}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        privacyPolicy.value = await response.json();
        loading.value = false;
        hasError.value = false;
        
    } catch (error) {
        loading.value = false;
        hasError.value = true;
        console.error('Error fetching privacyPolicy info:', error);
        throw error;
    }
}
return { privacyPolicy, loading, hasError, getPrivacyPolicyInfo };

});
