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
  <main>

    <div class="relative h-[250px] overflow-hidden">
      <img
        src="https://img.freepik.com/fotos-premium/vista-superior-concepto-compras-linea-tarjeta-credito-telefono-inteligente-computadora-aislada-sobre-fondo-mesa-amarillo-oficina_315337-3591.jpg"
        alt="Product showcase"
        class="absolute inset-0 object-cover w-full h-full transform"
      />
      <div class="absolute inset-0 bg-black bg-opacity-25"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <h1 class="text-4xl font-bold text-white text-center px-4">
          {{ $t("messages.shop.discoverCategories") }}
        </h1>
      </div>
    </div>
    <div class="container flex items-start gap-16 relative -mt-16 bg-white rounded-t-3xl sm:p-8 xs:p-2 shadow-lg">
      <div v-if="stCategories.getAll?.length" class="grid grid-cols-2 gap-4 my-6 md:grid-cols-3 lg:gap-8 xl:grid-cols-4">
        <CategoryCard v-for="(category, i) in stCategories.getAll" :key="i" :node="category" :image-loading="i <= 2 ? 'eager' : 'lazy'" />
      </div>
    </div>
  </main>
</template>
