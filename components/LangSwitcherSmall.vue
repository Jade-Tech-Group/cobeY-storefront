<script setup>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { locale, setLocaleCookie } = useI18n();
const flagImage = ref(`/icons/${locale.value}.svg`);

watch(locale, (newLocale) => {
  setLocaleCookie(newLocale);
  flagImage.value = `/icons/${newLocale}.svg`;
});

const toggleLocale = () => {
  locale.value = locale.value === "en" ? "es" : "en";
};
</script>

<template>
  <div
    id="language-switcher"
    aria-label="Language switcher"
    class="bg-transparent cursor-pointer"
    :title="locale.name"
  >
    <img :src="flagImage" :alt="locale.name" @click="toggleLocale" />
  </div>
</template>
