<template>
  <div class="relative">
    <div class="relative h-[250px] overflow-hidden"><img
        src="https://raw.githubusercontent.com/RamiroSB/imagenes/main/banner-contactenos1.png"
        alt="Product showcase"
        class="absolute inset-0 object-cover w-full h-full transform"
      />
      <div class="absolute inset-0 bg-black bg-opacity-25"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <h1 class="text-4xl font-bold text-white text-center px-4">
          {{ aboutus.data[0].title[locale] }}
        </h1>
      </div>
    </div>
    <div class="container flex items-start gap-16 relative -mt-16 bg-white rounded-t-3xl sm:p-8 xs:p-4 shadow-lg">
      <div class="my-8 ">
        <p v-html="aboutus.data[0].smalldescription[locale]"></p>
        <p v-html="aboutus.data[0].description[locale]"></p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAboutUs } from '~/stores/aboutUs';

const {locale} = useI18n()

const aboutusStore = useAboutUs();
const aboutus = computed(() => aboutusStore.aboutus);
const loading = computed(() => aboutusStore.loading);

onBeforeMount(async() => {
  await aboutusStore.getAboutUsInfo();
});
</script>
