<template>
  <form v-if="customer" class="bg-white rounded-lg shadow" @submit.prevent="saveChanges">
    <div class="grid gap-6 p-8 md:grid-cols-2">
      <h3 class="text-xl font-semibold col-span-full">{{ $t('messages.account.personalInfo') }}</h3>

      <div class="w-full">
        <label for="first-name">{{ $t('messages.billing.firstName') }}</label>
        <input id="first-name" v-model="customer.billing.firstName" placeholder="John" autocomplete="given-name" type="text" />
      </div>

      <div class="w-full">
        <label for="last-name">{{ $t('messages.billing.lastName') }}</label>
        <input id="last-name" v-model="customer.billing.lastName" placeholder="Doe" autocomplete="family-name" type="text" />
      </div>

      <div class="w-full">
        <label for="username">{{ $t('messages.account.username') }} ({{ $t('messages.general.readOnly') }})</label>
        <input id="username" v-model="customer.billing.firstName" placeholder="johndoe" autocomplete="username" type="text" readonly  />
      </div>

      <div class="w-full">
        <label for="email">{{ $t('messages.billing.email') }}</label>
        <input id="email" v-model="customer.billing.email" placeholder="johndoe@email.com" autocomplete="email" type="email" />
      </div>
    </div>
    <div class="bg-white backdrop-blur-sm bg-opacity-75 border-t col-span-full p-4 sticky bottom-0 rounded-b-lg">
      <button
        class="rounded-md flex font-semibold ml-auto text-white py-2 px-4 gap-4 items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        :class="button.color"
        :disabled="loading">
        <LoadingIcon v-if="loading" color="#fff" size="20" />
        <span>{{ button.text }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
const viewer = {
  id: 1,
  username: 'John Doe',
  firstName: 'John Doe',
  email: '1Y0rG@example.com',
}

const customer = {
  billing: {
    email: '1Y0rG@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1 234 567 8901',
    company: 'Company Name',
    address1: 'O\'Connell Street 47',
    address2: 'Apartment, studio, or floor',
    city: 'New York',
    state: 'NY',
    country: 'US',
    postcode: '10001',
  },
  shipping: {
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1 234 567 8901',
    company: 'Company Name',
    address1: 'O\'Connell Street 47',
    address2: 'Apartment, studio, or floor',
    city: 'New York',
    state: 'NY',
    country: 'US',
    postcode: '10001',
  },
}
const { t } = useI18n();

const loading = ref<boolean>(false);
const button = ref<{ text: string; color: string }>({ text: t('messages.account.updateDetails'), color: 'bg-primary hover:bg-primary-dark' });

async function saveChanges() {

}
</script>
