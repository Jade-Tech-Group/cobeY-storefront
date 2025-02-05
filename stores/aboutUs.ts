import conf from "~/conf/useConf";


export const useAboutUs = defineStore("aboutus", () => {
    const aboutus = ref();
    const loading = ref(false);
    const hasError = ref(false);

async function getAboutUsInfo() {
    loading.value = true;
    try {
        const response = await fetch(`${conf.api.baseUrl}${conf.api.services.aboutUs}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        aboutus.value = await response.json();
        loading.value = false;
        hasError.value = false;
        
    } catch (error) {
        loading.value = false;
        hasError.value = true;
        console.error('Error fetching aboutUs info:', error);
        throw error;
    }
}
return { aboutus, loading, hasError, getAboutUsInfo };

});

// export const useAboutUs = defineStore("aboutus", () => {
//     const aboutus = ref();
//     const loading = ref(false);
//     const hasError = ref(false);
  
//     const getAboutUS = async () => {
//       loading.value = true;
//       await $axios
//         .get(`/aboutUs`)
//         .then((response) => {
//           aboutus.value = response.data.data;
//           loading.value = false;
//           hasError.value = false;
//         })
//         .catch((error) => {
//           loading.value = false;
//           hasError.value = true;
//         });
//     };
  
//     return { aboutus, loading, hasError, getAboutUS };
//   });