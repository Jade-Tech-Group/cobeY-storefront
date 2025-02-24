<script lang="ts" setup>
import type Product from "~/types";
const route = useRoute();
const { storeSettings } = useAppConfig();
const { cartManager, isUpdatingCart } = useCart();
const { t, locale } = useI18n();
const id = route.params.id as string;

const stProduct = useProductsStore();
await stProduct.fetchById(id);
const idCategory = stProduct.getCurrent.categoryId;
await stProduct.fetchRelatedCategory(idCategory, 1, 10);

if (!stProduct.getCurrent) {
  throw showError({
    statusCode: 404,
    statusMessage: t("messages.shop.productNotFound"),
  });
}

const addToCart = async (item: Product) => {
  await cartManager(item);
};
const { user } = useAuth();

const storeAuth = useAuth();
</script>

<template>
  <main class="container relative py-6 xl:max-w-7xl">
    <div v-if="stProduct.getCurrent">
      <SEOHead :info="stProduct.getCurrent" />
      <Breadcrumb
        :product="stProduct.getCurrent"
        class="mb-6"
        v-if="storeSettings.showBreadcrumbOnSingleProduct"
      />

      <div
        class="flex flex-col gap-10 md:flex-row md:justify-between lg:gap-24"
      >
        <ProductImageGallery
          v-if="stProduct.getCurrent.standard_image"
          class="relative flex-1"
          :main-image="stProduct.getCurrent"
          :gallery="[]"
          :node="stProduct.getCurrent"
        />
        <NuxtImg
          v-else
          class="relative flex-1 skeleton"
          src="/images/placeholder.jpg"
          :alt="stProduct.getCurrent?.name[locale] || 'Product'"
        />

        <div
          class="flex flex-col justify -center lg:max-w-md xl:max-w-lg md:py-2 w-full"
        >
          <div class="flex justify-between mb-4">
            <div class="flex-1">
              <h1
                class="flex flex-wrap items-center gap-2 mb-2 text-2xl font-sesmibold"
              >
                {{ stProduct.getCurrent.name[locale] }}
              </h1>
            </div>
          </div>
          <ProductPrice
            class="text-xl"
            :sale-price="stProduct.getCurrent.sale_price"
            :regular-price="stProduct.getCurrent.price"
          />
          <div class="grid gap-2 my-8 text-sm empty:hidden">
            <div class="flex items-center gap-2">
              <span class="text-gray-400"
                >{{ $t("messages.shop.availability") }}:
              </span>
              <StockStatus
                :stockStatus="
                  stProduct.getCurrent.stock !== 0 ? 'IN_STOCK' : 'OUT_OF_STOCK'
                "
              />
            </div>
          </div>
          <div
            class="mb-8 font-light prose"
            v-html="stProduct.getCurrent.description[locale]"
          ></div>

          <hr />

          <form @submit.prevent="addToCart(stProduct.getCurrent)">
            <div
              class="fixed bottom-0 left-0 z-10 flex items-center w-full gap-4 p-4 mt-12 bg-white md:static md:bg-transparent bg-opacity-90 md:p-0"
            >
              <input
                v-model="stProduct.getCurrent.amount"
                type="number"
                min="1"
                aria-label="Quantity"
                class="bg-white border rounded-lg flex text-left p-1.5 w-20 gap-4 items-center justify-center focus:outline-none"
              />
              <AddToCartButton
                class="flex-1 w-full md:max-w-52"
                :class="{ loading: isUpdatingCart }"
              />
            </div>
          </form>

          <div
            v-if="
              storeSettings.showProductCategoriesOnSingleProduct &&
              stProduct.getCurrent.categoryId
            "
          >
            <div class="grid gap-2 my-8 text-sm">
              <div class="flex items-center gap-2">
                <span class="text-gray-400"
                  >{{ $t("messages.shop.category", 1) }}:</span
                >
                <div class="product-categories">
                  <NuxtLink class="hover:text-primary"
                    >{{ stProduct.getCurrent.category.name[locale] }}
                  </NuxtLink>
                </div>
              </div>
            </div>
            <hr />
          </div>

          <div class="flex flex-wrap gap-4">
            <div v-if="user">
              <WishlistButton :product="stProduct.getCurrent" />
            </div>
            <ShareButton :product="stProduct.getCurrent" />
          </div>
        </div>
      </div>
      <div class="my-8" v-if="stProduct.getRelateds.length > 0">
        <div class="mb-6 text-xl font-semibold">
          {{ $t("messages.shop.youMayLike") }}
        </div>
        <ProductRow
          :products="stProduct.getRelateds"
          class="grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.product-categories > a:last-child .comma {
  display: none;
}

input[type="number"]::-webkit-inner-spin-button {
  opacity: 1;
}
</style>
