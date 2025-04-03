<template>
  <div class="h-screen flex flex-col justify-center items-center outline px-6">
    <SectionHeader class="my-4 mb-16">
      <HeaderDescription class="max-w-[600px] text-md text-gray-900">
        <b>¡Vaya!</b> Hubo un fallo en el pago. Vuelva a intentarlo
      </HeaderDescription>
    </SectionHeader>
    <NuxtLink
      :to="`/order-summary/${props.orderid}`"
      class="xs:w-fit"
      ><span class="xs:w-fit">Revisar estado de la orden</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
  orderid: {
    type: String,
  },
});
</script>
