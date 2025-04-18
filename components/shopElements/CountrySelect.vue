<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
});

const { countriesToShow } = useCountry();
const emit = defineEmits(['update:modelValue']);
const { t, locale } = useI18n();
function select(evt) {
  emit('update:modelValue', evt.target.value);
}
</script>

<template>
    <select :value="modelValue" @change="select" required class="h-[42px]">
    <option value="" disabled>Select a country</option>
    <option v-for="country in countriesToShow" :key="country.code" :value="country.code">
      {{ country.name[locale] }}
    </option>
  </select>
</template>
