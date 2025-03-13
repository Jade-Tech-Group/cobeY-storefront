<template>
    <AppHeader/>
    <div class="flex items-center justify-center min-h-[52vh] bg-gray-100 w-full">
        <div v-if="error.statusCode === 404" class="flex flex-col justify-center items-center w-[352px] gap-4">
            <img src="./public/images/404.png" alt="404 image"/>
            <div class="text-center">
                <!-- <h1 class="text-9xl font-bold text-primary mb-4">{{ error.statusCode }}</h1> -->
                <h2 class=" font-bold text-gray-800 mb-4">
                {{ error.statusCode === 404 ?  $t('messages.error.pageNotFound').toUpperCase()  : $t('error.somethingWentWrong') }}
                </h2>
                <p class="text-gray-600 text-sm mb-8">{{ $t('messages.error.pageNotFoundText') }}</p>
                <nuxt-link 
                to="/" 
                class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                {{ $t('messages.general.goHome') }}
                </nuxt-link>
            </div>

        </div>
    </div>
    <AppFooter/>
  </template>
  
  <script lang="ts" setup>

  defineProps({
    error: {
      type: Object,
      required: true
    }
  });

  </script>