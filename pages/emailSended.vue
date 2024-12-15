<template>
  <div class="container min-h-[400px] items-center py-12">
    <div class="flex flex-row justify-center items-center">
      <div class="card sm:w-7/12 xs:w-full rounded-lg">
        <div class="card-header">{{ $t("messages.account.verification") }}</div>
        <div class="w-full p-4 flex flex-col gap-4 items-center">
          <p>{{ $t("messages.account.congrats") }}</p>
          <p>
            {{ $t("messages.account.verifyText") }}
          </p>
          <p></p>
          <p>
            {{ $t("messages.account.notSendedEmail") }}
          </p>
          <button class="flex text-lg bg-primary text-white rounded-lg p-2.5 flex-row gap-2 items-center" 
          :class="{ 'opacity-50 cursor-not-allowed': isDisabled }"
          :disabled="isDisabled">
            <span v-if="isDisabled" class="text-sm"
              >{{ formattedCountdown  }}</span
            >
            <span>{{ $t("messages.account.resendEmail") }}</span>
          </button>
          <NuxtLink to="/my-account" class="text-center cursor-pointer text-primary">
            {{ $t("messages.account.backToLogin") }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const isDisabled = ref(true);
const countdown = ref(120); 
const intervalId = ref(null);

onBeforeMount(() => {
    intervalId.value = setInterval(() => {
      countdown.value -= 1;
      if (countdown.value === 0) {
        isDisabled.value = false;
        clearInterval(intervalId.value);
      }
    }, 1000);
})

const formattedCountdown = computed(() => {
  const minutes = String(Math.floor(countdown.value / 60)).padStart(2, '0');
  const seconds = String(countdown.value % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
});


useSeoMeta({
  name: "title",
  content: "Verifica tu correo electrónico",
});
</script>

<style scoped>
.card {
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #f9f9f9;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.btn {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #3e8e41;
}
</style>
