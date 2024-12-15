<script setup lang="ts">
const { user, logoutUser } = useAuth();
const linkTitle = computed<string>(() => user.value?.email || 'Sign In');
</script>

<template>
  <NuxtLink to="/my-account" :title="linkTitle" class="hidden sm:inline-flex aspect-square items-center">
    <Transition name="pop-in" mode="out-in">
      <span v-if="user" class="relative avatar">
        <img
          src="https://secure.gravatar.com/avatar/af4f8d831b90b41270e66c5ef083c78b?s=96&d=mm&r=g"
          class="rounded-full transform scale-125 shadow-md overflow-hidden border border-white my-auto"
          width="22"
          height="22"
          :alt="linkTitle" />
        <div class="account-dropdown">
          <NuxtLink to="/my-account" class="hover:bg-gray-100"><Icon name="ion:person-outline" size="16" /><span>My Account</span></NuxtLink>
          <button class="text-red-600 hover:bg-red-50" @click.prevent="logoutUser">
            <Icon name="ion:log-out-outline" size="16" />
            <span>Logout</span>
          </button>
        </div>
      </span>
      <Icon v-else name="ion:person-outline" size="22" class="border border-transparent" />
    </Transition>
  </NuxtLink>
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
    @apply absolute gap-2 top-6 -right-2  z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-lg text-sm text-gray-700 hidden;

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
