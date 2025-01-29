<template>
    <div class="Wrapper">
        <div :data-type="item.type" :class="{
            ' border border-success-100 shadow-notify-success': item.type === 'success',
            ' border border-error-100 shadow-notify-error': item.type === 'error',
            ' border border-yellow-100 shadow-notify-warning': item.type === 'warning',
            ' border border-blue-100 shadow-notify-info': item.type === 'info',
        }"
            class="bg-white w-[340px] lg:w-fit bg-white p-4 22:p-6 flex justify-center items-center gap-4 2xl:gap-6 rounded">
            <img v-if="item.type === 'success'" src="/icons/icon-success.svg" alt="icon delete"
                class="size-12" />
            <img v-else-if="item.type === 'error'" src="/icons/icon-error.svg" alt="icon delete"
                class="size-12" />
            <img v-else-if="item.type === 'warning'" src="/icons/icon-warning.svg" alt="icon delete"
                class="size-12" />
            <div :role="item.ariaRole" :aria-live="item.ariaLive"
                class="w-full 2xl:w-[293px] flex flex-col gap-1 xl:gap-2">
                <p
                    class="text-base-black font-medium text-base lg:text-lg leading-[19.2px] lg:leading-[21.6px] font-roboto">
                    {{ item.title }}</p>
                <p class="text-neutral-600 font-roboto text-sm lg:text-md leading-[14.4px] lg:leading-[16.8px]">
                    {{ item.message }}</p>
            </div>
            <button @click="item.clear" class="ml-auto bg-transparent border-none text-neutral-600">
                ✖
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { NotivueItem } from 'notivue';

defineProps<{
    item: NotivueItem;
}>();
</script>