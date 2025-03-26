<template>
  <div class="container min-h-[400px] items-center py-12">
    <div class="flex flex-row justify-center items-center">
      <div class="card sm:w-7/12 xs:w-full rounded-lg">
        <div class="card-header">
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="31"
              viewBox="0 0 30 31"
            fill="none"
          >
            <g id="OK">
              <path
                id="Vector"
                d="M12.5687 17.4459L19.7444 10.2703C19.9673 10.0473 20.2511 9.93579 20.5957 9.93579C20.9403 9.93579 21.2241 10.0473 21.4471 10.2703C21.67 10.4932 21.7815 10.777 21.7815 11.1216C21.7815 11.4662 21.67 11.75 21.4471 11.973L13.42 20C13.1768 20.2432 12.893 20.3648 12.5687 20.3648C12.2444 20.3648 11.9606 20.2432 11.7173 20L8.55516 16.8378C8.33219 16.6148 8.2207 16.3311 8.2207 15.9865C8.2207 15.6419 8.33219 15.3581 8.55516 15.1351C8.77814 14.9121 9.06192 14.8007 9.40651 14.8007C9.75111 14.8007 10.0349 14.9121 10.2579 15.1351L12.5687 17.4459Z"
                fill="#3A8D6E"
              />
            </g></svg> {{ $t("messages.account.verification") }}
          </div>
        </div>
        <div class="w-full p-4 flex flex-col gap-4 items-center">
          <p class="text-center">
            {{ $t("messages.account.verifyText.first") }}
            {{ $t("messages.account.verifyText.second") }}
          </p>
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
          <NuxtLink @click="$router.push('/login-and-register')" class="text-center cursor-pointer text-primary">
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
  text-align: center;
  font-size: 28px;
  font-weight: 600;
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
