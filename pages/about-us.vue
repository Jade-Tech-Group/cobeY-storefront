<template>
  <div v-if="!loading" class="flex flex-col mt-7 items-center justify-center min-h-screen">
    <h1 class="mb-8 text-3xl font-semibold text-primary" v-html="aboutus.data[0].title[locale]"></h1>
    <div class="my-8 prose">
      <p v-html="aboutus.data[0].smalldescription[locale]"></p>
      <p v-html="aboutus.data[0].description[locale]"></p>
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
