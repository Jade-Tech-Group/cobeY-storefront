<template>
    <div
      class="sm:min-h-[600px] xs:min-h-screen flex flex-col justify-center items-center outline sm:px-6 px-4 py-8"
    >
      <img
        src="/icons/welcomeParty.svg"
        width="100"
        height="100"
        class="opacity-75"
      />
      <SectionHeader class="sm:w-1/2 xs:w-full my-4 mb-8">
        <HeaderDescription class="w-[400px] text-gray-900">
          <b>¡Felicidades!</b>
          Su pago se completó con éxito. Nos pondremos en contacto con usted por
          correo para darle todos los detalles.
        </HeaderDescription>
      </SectionHeader>
      <div
        class="flex xs:flex-col sm:flex-row w-full sm:p-4.5 xs:p-4 sm:mb-4 gap-4 justify-center"
      >
        <NuxtLink
          to="/"
          class="sm:w-52 xs:w-full block p-3 text-lg text-center text-white bg-primary rounded-lg shadow-md justify-evenly hover:bg-primary-medium"
          ><span class="xs:w-fit">Ir al Inicio</span></NuxtLink
        >
        <NuxtLink
          @click="handleMainButtonAction"
          class="sm:w-52 xs:w-full block p-3 text-lg text-center text-white bg-secondary rounded-lg shadow-md justify-evenly hover:bg-secondary-dark cursor-pointer"
          ><span class="xs:w-fit">Ir a mis Pedidos</span>
        </NuxtLink>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  // Vue
  import { onBeforeMount } from "vue";
  // Router
  import { useRouter } from "vue-router";
  import { useRoute } from "vue-router";
  const route = useRoute();
  const id = route.params.id as string;
  // Components
  
  /**
   * Router
   */
  const router = useRouter();
  
  /**
   * Store
   */
  const orderStore = useOrdersStore();
  
  /**
   * Functions to go to see the orders or to the home
   */
  const handleMainButtonAction = () => {
    router.push(`/order-summary/${id}`);
  };
  
  /**
   * Hooks
   */
  onBeforeMount(async () => {
    await orderStore.patchOrdersStatus(id);
  });
  </script>
  