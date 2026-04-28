<script lang="ts" setup>
const props = defineProps({
  modelValue: { type: Object, required: true },
});

const billing = toRef(props, 'modelValue');
</script>

<template>
  <div class="grid w-full gap-4 lg:grid-cols-2">
    <div class="w-full">
      <label for="first-name">{{ $t('messages.billing.firstName') }}</label>
      <input id="first-name" v-model="billing.name" placeholder="John" autocomplete="given-name" type="text" required />
    </div>

    <div class="w-full">
      <label for="last-name">{{ $t('messages.billing.lastName') }}</label>
      <input id="last-name" v-model="billing.last_name" placeholder="Doe" autocomplete="family-name" type="text" required />
    </div>
    
    <div class="w-full">
      <label for="email">{{ $t('messages.billing.email') }}</label>
      <input id="email" v-model="billing.email" placeholder="john.doe@example.com" autocomplete="email" type="email" required />
    </div>

    <div class="w-full">
      <label for="phone">{{ $t('messages.billing.phone') }}</label>
      <input id="phone" v-model="billing.phone" placeholder="+53 5 259 9746" autocomplete="tel" type="tel" required pattern="^[0-9+()\- ]*$" />
    </div>

    <div class="w-full col-span-full">
      <label for="address">{{ $t('messages.billing.address1') }}</label>
      <input id="address" v-model="billing.address" placeholder="O'Connell Street 47" autocomplete="street-address" type="text" required />
    </div>  

    <div class="w-full">
      <label for="country">{{ $t('messages.billing.country') }}</label>
      <CountrySelect id="country" v-model="billing.country" :default-value="billing.country" autocomplete="country" />
    </div>

    
    <div class="w-full">
      <label for="state">{{ $t('messages.billing.state') }} ({{ $t('messages.general.optional') }})</label>
      <input id="city" v-model="billing.state" placeholder="New York" autocomplete="locality" type="text" required />
    </div>

    <div class="w-full">
      <label for="city">{{ $t('messages.billing.city') }}</label>
      <input id="city" v-model="billing.city" placeholder="New York" autocomplete="locality" type="text" required />
    </div>

    <div class="w-full">
      <label for="zip">{{ $t('messages.billing.zip') }}</label>
      <input id="zip" v-model="billing.postCode" placeholder="10001" autocomplete="postal-code" type="text" required />
    </div>
  </div>
</template>
