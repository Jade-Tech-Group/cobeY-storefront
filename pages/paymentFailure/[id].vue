<template>
    <OrderErrorPayment status="error" message="Hubo un fallo en el pago" :orderid="id"/>
  </template>
  <script setup lang="ts">
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const id = route.params.id as string;
  </script>
  