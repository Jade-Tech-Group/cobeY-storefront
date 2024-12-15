<script lang="ts" setup>
const stCategories = useCategoriesStore();

await stCategories.fetch();

useHead({
  title: `Categories`,
  meta: [{ name: 'description', content: 'All product categories' }],
  link: [{ rel: 'canonical', href: 'https://v3.woonuxt.com/categories' }],
});
</script>

<template>
  <main class="container">
    <div v-if="stCategories.getAll?.length" class="grid grid-cols-2 gap-4 my-6 md:grid-cols-3 lg:gap-8 xl:grid-cols-4">
      <CategoryCard v-for="(category, i) in stCategories.getAll" :key="i" :node="category" :image-loading="i <= 2 ? 'eager' : 'lazy'" />
    </div>
  </main>
</template>
