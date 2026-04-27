<template>
  <div class="relative font-italic overflow-hidden">
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div
        class="absolute sm:top-[25%] sm:-left-[25%] xs:-top-[10%] xs:-left-[25%] sm:w-[950px] sm:h-[950px] xs:w-[320px] xs:h-[320px] bg-[radial-gradient(circle_at_center,_rgba(239,122,20,0.3)_0%,_rgba(239,122,20,0.25)_15%,_rgba(239,122,20,0.2)_30%,_rgba(239,122,20,0.15)_45%,_rgba(255,255,255,0.1)_60%,_rgba(255,255,255,0.05)_75%,_rgba(255,255,255,0.02)_90%,_rgba(255,255,255,0)_100%)] rounded-full"
      ></div>
      <div
        class="absolute -bottom-[10%] sm:right-[20%] xs:right-[0] sm:w-[750px] sm:h-[750px] xs:w-[320px] xs:h-[320px] bg-[radial-gradient(circle_at_center,_rgba(239,122,20,0.3)_0%,_rgba(239,122,20,0.25)_15%,_rgba(239,122,20,0.2)_30%,_rgba(239,122,20,0.15)_45%,_rgba(255,255,255,0.1)_60%,_rgba(255,255,255,0.05)_75%,_rgba(255,255,255,0.02)_90%,_rgba(255,255,255,0)_100%)] rounded-full"
      ></div>
    </div>
    <div class="relative h-[250px] overflow-hidden">
      <img
        src="https://raw.githubusercontent.com/RamiroSB/imagenes/main/banner-contactenos1.png"
        alt="Contact"
        class="absolute inset-0 object-cover w-full h-full transform"
      />
      <div class="absolute inset-0 bg-black bg-opacity-25"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <h1 class="text-4xl font-bold text-white text-center px-4">
          {{ $t("messages.general.contactUs") }}
        </h1>
      </div>
    </div>
    <div class="container flex items-start gap-16 relative -mt-16 bg-white rounded-t-3xl sm:p-8 xs:p-4 shadow-lg">
      <div class="my-8 w-full grid md:grid-cols-2 gap-8">
        <div class="space-y-6">
          <div>
            <h2 class="text-2xl font-bold mb-4 text-primary">{{ $t("messages.contact.contactInfo") }}</h2>
            <div class="space-y-4">
              <p class="flex items-center gap-2">
                <span class="text-2xl">✉️</span>
                <span>ventas@cobeymas.com</span>
              </p>
              <p class="flex items-center gap-2">
                <span class="text-2xl">📞</span>
                <span>+53 5 259 9746</span>
              </p>
            </div>
          </div>
          <div class="prose">
            <p>{{ $t("messages.contact.description") }}</p>
          </div>
        </div>
        <div>
          <h2 class="text-2xl font-bold mb-4 text-primary">{{ $t("messages.contact.sendUsMessage") }}</h2>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">{{ $t("messages.contact.name") }}</label>
              <input
                v-model="formData.name"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                :placeholder="$t('messages.contact.namePlaceholder')"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">{{ $t("messages.contact.email") }}</label>
              <input
                v-model="formData.email"
                type="email"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                :placeholder="$t('messages.contact.emailPlaceholder')"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">{{ $t("messages.contact.message") }}</label>
              <textarea
                v-model="formData.message"
                required
                rows="5"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                :placeholder="$t('messages.contact.messagePlaceholder')"
              ></textarea>
            </div>
            <button
              type="submit"
              :disabled="isPending"
              class="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isPending ? $t("messages.contact.sending") : $t("messages.contact.sendMessage") }}
            </button>
          </form>
          <div v-if="successMessage" class="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
            {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useContact } from '~/composables/useContact';

const { isPending, sendMessage } = useContact();

const formData = ref({
  name: '',
  email: '',
  message: ''
});

const successMessage = ref('');
const errorMessage = ref('');

const handleSubmit = async () => {
  successMessage.value = '';
  errorMessage.value = '';
  
  const result = await sendMessage(formData.value);
  
  if (result.success) {
    successMessage.value = 'Message sent successfully!';
    formData.value = { name: '', email: '', message: '' };
  } else {
    errorMessage.value = result.error || 'Error sending message. Please try again.';
  }
};
</script>
