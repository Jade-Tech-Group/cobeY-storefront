<script setup>
const { getFilter, setFilter, isFiltersActive } = useFiltering();
const selectedFeatured = ref(getFilter('featured') || []);
const selectedOnsale = ref(getFilter('onSale') || []);

const isOpen = ref(true);

watch(isFiltersActive, () => {
  if (!isFiltersActive.value) selectedFeatured.value = [];
});

const checkboxClickedOnSale = (e) => {
  if (selectedOnsale.value.length === 0) {
    selectedOnsale.value = [e.target.value];
    setFilter('onSale', [e.target.value]);
  } else {
    selectedOnsale.value = [];
    setFilter('onSale', []);
  }
};
const checkboxClickedFeatured = (e) => {
  if (selectedFeatured.value.length === 0) {
    selectedFeatured.value = [e.target.value];
    setFilter('featured', [e.target.value]);
  } else {
    selectedFeatured.value = [];
    setFilter('featured', []);
  }
};
</script>

<template>
  <div>
    <div class="cursor-pointer flex font-semibold mt-8 leading-none justify-between items-center" @click="isOpen = !isOpen">
    <span>{{ $t('messages.shop.onSaleFilter') }}</span>
      <Icon name="ion:chevron-down-outline" class="transform" :class="isOpen ? 'rotate-180' : ''" />
    </div>
    <div v-if="isOpen" class="mt-3 mr-1 max-h-[240px] grid gap-1 overflow-auto custom-scrollbar">
      <div class="flex gap-2 items-center">
        <input id="featured" v-model="selectedFeatured" type="checkbox" :value="true" aria-label="Featured Products Only" @click="checkboxClickedFeatured" />
        <label for="featured" class="cursor-pointer m-0 text-sm" aria-label="Only show featured products">{{ $t('messages.general.featuredProducts') }}</label>
      </div>
      <div class="flex gap-2 items-center">
        <input id="onSale" v-model="selectedOnsale" type="checkbox" :value="true" aria-label="Sale Products Only" @click="checkboxClickedOnSale" />
        <label for="onSale" class="cursor-pointer m-0 text-sm" aria-label="Only show products on sale">{{ $t('messages.general.productsOnSale') }}</label>
      </div>
    </div>
  </div>
</template>
