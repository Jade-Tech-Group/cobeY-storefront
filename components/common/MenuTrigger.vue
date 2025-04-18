<script setup lang="ts">
const { toggleMobileMenu } = useHelpers();
</script>

<template>
  <Icon
    name="ion:menu-outline"
    size="28"
    class="mr-2 cursor-pointer"
    @click="toggleMobileMenu"
  />
</template>
