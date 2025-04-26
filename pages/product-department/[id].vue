<script setup lang="ts">
const { setProducts, updateProductList } = useProducts();
const { isQueryEmpty } = useHelpers();
const { storeSettings } = useAppConfig();
const route = useRoute();
const id = route.params.id;

const stProducts = useProductsStore();

await stProducts.fetchByDepartment(id as string);
await stProducts.fetchOnSale();

setProducts(stProducts.byDepartment);

onMounted(() => {
  if (!isQueryEmpty.value) updateProductList();
});

watch(
  () => route.query,
  () => {
    if (route.name !== "product-department-id") return;
    updateProductList();
  }
);

useHead({
  title: "Products",
  meta: [{ hid: "description", name: "description", content: "Products" }],
});
</script>

<template>
  <div class="relative overflow-hidden">
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div
        class="absolute sm:top-[25%] sm:-left-[25%] xs:-top-[10%] xs:-left-[25%] sm:w-[950px] sm:h-[950px] xs:w-[320px] xs:h-[320px] bg-[radial-gradient(circle_at_center,_rgba(239,122,20,0.3)_0%,_rgba(239,122,20,0.25)_15%,_rgba(239,122,20,0.2)_30%,_rgba(239,122,20,0.15)_45%,_rgba(255,255,255,0.1)_60%,_rgba(255,255,255,0.05)_75%,_rgba(255,255,255,0.02)_90%,_rgba(255,255,255,0)_100%)] rounded-full"
      ></div>
      <div
        class="absolute sm:-bottom-[10%] -bottom-56 sm:right-[20%] xs:right-[0] sm:w-[750px] sm:h-[750px] xs:w-[320px] xs:h-[320px] bg-[radial-gradient(circle_at_center,_rgba(239,122,20,0.3)_0%,_rgba(239,122,20,0.25)_15%,_rgba(239,122,20,0.2)_30%,_rgba(239,122,20,0.15)_45%,_rgba(255,255,255,0.1)_60%,_rgba(255,255,255,0.05)_75%,_rgba(255,255,255,0.02)_90%,_rgba(255,255,255,0)_100%)] rounded-full"
      ></div>
      <div
        v-if="!isMobile() || !isTablet()"
        class="absolute -top-[10%] -right-[15%] sm:w-[950px] sm:h-[950px] xs:w-[320px] xs:h-[320px] bg-[radial-gradient(circle_at_center,_rgba(239,122,20,0.3)_0%,_rgba(239,122,20,0.25)_15%,_rgba(239,122,20,0.2)_30%,_rgba(239,122,20,0.15)_45%,_rgba(255,255,255,0.1)_60%,_rgba(255,255,255,0.05)_75%,_rgba(255,255,255,0.02)_90%,_rgba(255,255,255,0)_100%)] rounded-full"
      ></div>
    </div>
    <div class="relative h-[250px] overflow-hidden">
      <img
        src="https://www.shutterstock.com/image-photo/online-shopping-business-ecommerce-internet-260nw-2286700843.jpg"
        alt="Product showcase"
        class="absolute inset-0 object-cover w-full h-full transform"
      />
      <div class="absolute inset-0 bg-black bg-opacity-25"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <h1 class="text-4xl font-bold text-white text-center px-4">
          {{ $t("messages.shop.discoverProducts") }}
        </h1>
      </div>
    </div>
    <div
      class="container flex items-start gap-16 relative -mt-16 bg-white rounded-t-3xl sm:p-8 xs:p-2 shadow-lg"
    >
      <Filters
        v-if="storeSettings.showFilters"
        :hide-departments="true"
        :departmet="id"
      />

      <div class="w-full">
        <div
          class="flex items-center justify-between w-full gap-4 mt-8 md:gap-8"
        >
          <ProductResultCount />
          <OrderByDropdown
            class="hidden md:inline-flex"
            v-if="storeSettings.showOrderByDropdown"
          />
          <ShowFilterTrigger
            v-if="storeSettings.showFilters"
            class="md:hidden"
          />
        </div>
        <ProductGrid />
      </div>
    </div>
  </div>
</template>
