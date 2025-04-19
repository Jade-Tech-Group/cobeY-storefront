<script setup lang="ts">
import type Product from "~/types";
import Toast from "../common/Toast.vue";
import { useToast } from "~/composables/useToast";
const { toastList } = useToast();
const route = useRoute();
const props = defineProps({
  node: { type: Object as PropType<Product>, required: true },
  index: { type: Number, default: 1 },
});

const imgWidth = 280;
const imgHeight = Math.round(imgWidth * 1.125);

const filterQuery = ref(route.query?.filter as string);
const paColor = ref(
  filterQuery.value?.split("pa_color[")[1]?.split("]")[0]?.split(",") || []
);
const { t, locale } = useI18n();
const { cartManager, hasError } = useCart();
watch(
  () => route.query,
  () => {
    filterQuery.value = route.query.filter as string;
    paColor.value =
      filterQuery.value?.split("pa_color[")[1]?.split("]")[0]?.split(",") || [];
  }
);

const addToCart = async (item: Product) => {
  await cartManager(item);
  !hasError.value
    ? push.success({
        duration: 2000,
        title: t("messages.notification.perfect"),
        message: t("messages.notification.updatedCart"),
      })
    : push.success({
        duration: 2000,
        title: t("messages.notification.error"),
        message: t("messages.notification.updatedCartError"),
      });
};
</script>

<template>
  <div
    class="flex flex-col justify-between relative group border rounded-lg p-4 max-h-[409px] bg-zinc-100"
  >
    <NuxtLink
      v-if="node.id"
      :to="`/product/${decodeURIComponent(node.id)}`"
      :title="node.name[locale]"
    >
      <SaleBadge :node class="absolute top-2 right-2" />
      <NuxtImg
        v-if="node.standard_image"
        :width="imgWidth"
        :height="imgHeight"
        :src="node.standard_image"
        :alt="node.name[locale] || 'Product image'"
        :title="node.name[locale]"
        :loading="index <= 3 ? 'eager' : 'lazy'"
        :sizes="`sm:${imgWidth / 2}px md:${imgWidth}px`"
        class="rounded-lg object-top object-cover w-full aspect-9/8 to-transparent"
        placeholder
        placeholder-class="blur-xl"
      />
    </NuxtLink>
    <div class="p-2 h-24 overflow-y-hidden">
      <NuxtLink
        v-if="node.id"
        :to="`/product/${decodeURIComponent(node.id)}`"
        :title="node.name[locale]"
      >
        <h2 class="mb-1 font-normal leading-tight group-hover:text-primary whitespace-normal line-clamp-2">
          {{ node.name[locale] }}
        </h2>
      </NuxtLink>
      <ProductPrice
        class="text-sm"
        :sale-price="node.sale_price"
        :regular-price="node.price"
      />
    </div>
    <div
      class="w-full flex xs:flex-col sm:flex-row gap-2 items-center border-t pt-2"
    >
      <div>
        <QuantityCard
          :item="node"
          @increment="(quantity: number)=> node.amount = quantity"
        />
      </div>
      <AddToCartButton class="flex-1 w-full" @click="addToCart(node)" />
    </div>
  </div>
  <Toast
    v-for="(toast, index) in toastList"
    :key="index"
    :message="toast.message"
    :type="toast.type"
    :duration="toast.duration"
  />
</template>
