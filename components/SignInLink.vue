<script setup lang="ts">
const { user, logoutUser, unlogging } = useAuth();
const { debounce } = useHelpers();
async function logout() {
  unlogging.value = true;
  await logoutUser();
  setTimeout(() => (unlogging.value = false), 2000);
}
const linkTitle = computed<string>(() => user.value?.email || "Sign In");
</script>

<template>
  <div
    :title="linkTitle"
    class="hidden sm:inline-flex aspect-square"
  >
    <Transition name="pop-in" mode="out-in">
      <span v-if="user" class="relative avatar cursor-pointer">
        <Icon name="ion:person" class="text-white" size="22" />
        <div class="account-dropdown items-center justify-center">
          <NuxtLink to="/my-account" class="hover:bg-gray-100"
            ><Icon name="ion:person-outline" size="16" /><span>{{
              $t("messages.account.myAccount")
            }}</span></NuxtLink
          >
          <button class="text-red-600 hover:bg-red-50" @click.prevent="logout">
            <Icon name="ion:log-out-outline" size="16" />
            <span>{{ $t("messages.account.logout") }}</span>
          </button>
        </div>
      </span>
      <Icon
        v-else
        name="ion:person-outline"
        size="22"
        class="border border-transparent cursor-pointer text-white"
        @click="$router.push('/login-and-register')"
      />
    </Transition>
  </div>
</template>

<style scoped lang="postcss">
.pop-in-enter-active,
.pop-in-leave-active {
  transition: transform 0.3s;
}

.pop-in-enter-from,
.pop-in-leave-to {
  transform: scale(0);
}

.avatar {
  .account-dropdown {
    @apply flex absolute gap-2 top-6 -right-2  z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-lg text-sm text-gray-700 hidden;

    a,
    button {
      @apply flex gap-2 items-center p-2 rounded whitespace-nowrap min-w-[200px];
    }
  }

  &:hover .account-dropdown {
    @apply grid;
  }
}
</style>
