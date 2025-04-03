<template>
  <OrderErrorPayment status="error" message="Hubo un fallo en el pago" :orderid="id"/>
</template>
<script lang="ts">
const route = useRoute();
const id = route.params.id as string;
</script>
