<script setup lang="ts">
const router = useRouter();
const { formatDate, scrollToTop } = useHelpers();

const stOrders = useOrdersStore();

await stOrders.fetchAll();

const refresh = () => {
  scrollToTop();
  stOrders.fetchAll();
};

const goToOrder = (id: string): void => {
  router.push(`/order-summary/${id}`);
};
</script>

<template>
  <div class="bg-white rounded-lg flex shadow min-h-[250px] p-4 md:p-12 justify-center items-center">
    <div v-if="stOrders.orders && stOrders.orders.length" class="w-full">
      <table class="w-full text-left table-auto" aria-label="Order List">
        <thead>
          <tr>
            <th>{{ $t('messages.shop.order') }}</th>
            <th>{{ $t('messages.general.date') }}</th>
            <th>{{ $t('messages.general.status') }}</th>
            <th class="text-right">{{ $t('messages.shop.total') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in stOrders.orders" :key="order.id" class="cursor-pointer hover:underline" @click="goToOrder(order.id)">
            <td class="rounded-l-lg">{{ order.order_number }}</td>
            <td>{{ formatDate(order.createdAt) }}</td>
            <td class="max-w-20"><OrderStatusLabel v-if="order.status" :order="order" /></td>
            <td class="text-right rounded-r-lg">{{ order.total_price }}</td>
          </tr>
        </tbody>
      </table>
      <div class="text-center flex justify-center w-full mt-8">
        <button type="button" @click="refresh" class="flex items-center gap-1 text-sm leading-none hover:bg-gray-50 p-2 rounded">
          <span>{{ $t('messages.general.refresh') }}</span>
          <Icon name="ion:refresh-outline" />
        </button>
      </div>
    </div>
    <div v-else-if="stOrders.orders && stOrders.orders.length === 0" class="min-h-[250px] flex items-center justify-center text-gray-500 text-lg">No orders found.</div>
    <LoadingIcon v-else size="24" stroke="2" />
  </div>
</template>

<style lang="postcss" scoped>
tbody tr:nth-child(odd) {
  background-color: #fafafa;
}

tbody tr {
  @apply text-sm text-gray-500 hover:text-gray-800;
}

td,
th {
  @apply py-2 px-3;
}
</style>
