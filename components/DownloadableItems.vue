<script setup lang="ts">
const { formatDate } = useHelpers();


</script>

<template>
  <table class="w-full text-left table-auto" aria-label="Download List">
    <thead>
      <tr>
        <th>{{ $t('messages.general.product') }}</th>
        <th>{{ $t('messages.shop.downloadsRemaining') }}</th>
        <th>{{ $t('messages.shop.expires') }}</th>
        <th>{{ $t('messages.general.download') }}</th>
      </tr>
    </thead>
    <tbody>
     
    </tbody>
  </table>
</template>

<style lang="postcss" scoped>
tbody tr:nth-child(odd) {
  background-color: #fafafa;
}

thead tr {
  @apply text-xs sm:text-base;
}

tbody tr {
  @apply text-xs sm:text-sm text-gray-500;
}

td,
th {
  @apply py-2 px-3;
}
</style>
