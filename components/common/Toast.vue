<template>
    <div v-if="visible" class="toast" :class="type" @click="close">
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    message: String,
    type: {
      type: String,
      default: 'info',
    },
    duration: {
      type: Number,
      default: 3000,
    },
  });
  
  const visible = ref(true);
  
  watch(visible, (newValue) => {
    if (newValue) {
      setTimeout(() => {
        visible.value = false;
      }, props.duration);
    }
  });
  
  const close = () => {
    visible.value = false;
  };
  </script>
  
  <style scoped>
  .toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    transition: opacity 0.5s;
  }
  .toast.info {
    background-color: blue;
  }
  .toast.success {
    background-color: green;
  }
  .toast.error {
    background-color: red;
  }
  </style>