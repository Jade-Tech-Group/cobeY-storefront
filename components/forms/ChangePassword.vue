<template>
  <form
    class="bg-white rounded-lg shadow mt-4"
    @submit.prevent="updatePassword"
  >
    <div class="grid p-8 gap-6 md:grid-cols-2">
      <h3 class="font-semibold text-xl col-span-full">
        {{ $t("messages.account.changePassword") }}
      </h3>
      <input
        type="text"
        v-model="password.user_id"
        name="username"
        autocomplete="username"
        style="display: none"
      />

      <div class="w-full">
        <label for="new-password">{{ $t("messages.account.password") }}</label>
        <PasswordInput
          id="old-password"
          v-model="password.oldPassword"
          placeholder="••••••••••"
          type="text"
          required
        />
      </div>

      <div class="w-full">
        <label for="new-password-confirm">{{
          $t("messages.account.newPassword")
        }}</label>
        <PasswordInput
          id="new-password"
          v-model="password.newPassword"
          placeholder="••••••••••"
          type="text"
          required
        />
      </div>

      <Transition name="scale-y" mode="out-in">
        <div
          v-if="errorMessage"
          class="w-full text-sm text-red-500"
          v-html="errorMessage"
        ></div>
      </Transition>
    </div>

    <div
      class="bg-white backdrop-blur-sm bg-opacity-75 border-t col-span-full p-4 sticky bottom-0 rounded-b-lg"
    >
      <button
        class="rounded-md flex font-semibold ml-auto text-white py-2 px-4 gap-4 items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        :class="button.color"
        :disabled="loading"
      >
        <LoadingIcon v-if="loading" color="#fff" size="20" />
        <span>{{ button.text }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { push } from "notivue";
import { watchEffect } from "vue";
import type { Security } from "~/types";
const { t } = useI18n();
const storeProfile = useProfileStore();

const password = ref<Security>({
  user_id: "",
  newPassword: "",
  oldPassword: "",
});

watchEffect(() => {
  password.value.user_id = storeProfile.getBillingData.id;
});

const loading = ref<boolean>(false);
const button = ref<{ text: string; color: string }>({
  text: t("messages.account.updatePassword"),
  color: "bg-primary hover:bg-primary-dark",
});

const errorMessage = ref<string>("");

const updatePassword = async () => {
  loading.value = true;
  storeProfile.changePassword(password.value);
  !storeProfile.hasError
    ? push.success({
        duration: 1500,
        title: t("messages.notification.perfect"),
        message: t("messages.notification.updatedPwd"),
      })
    : push.success({
        duration: 1500,
        title: t("messages.notification.error"),
        message: t("messages.notification.updatedPwdError"),
      });
  password.value = { user_id: "", newPassword: "", oldPassword: "" };
  loading.value = false;
};
</script>
