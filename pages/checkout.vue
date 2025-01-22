<script setup lang="ts">
import type { DeliveryAddress } from '~/types';


const { t } = useI18n();
const { cart, isUpdatingCart } = useCart();
const { orderInput, isProcessingOrder, proccessCheckout } = useCheckout();

const buttonText = ref<string>(
  isProcessingOrder.value
    ? t("messages.general.processing")
    : t("messages.shop.checkoutButton")
);
const isCheckoutDisabled = computed<boolean>(
  () =>
    isProcessingOrder.value ||
    isUpdatingCart.value ||
    !orderInput.value.paymentMethod
);
const newDeliveryAddress = ref<DeliveryAddress>({
  id: '',
  name: '',
  last_name: '',
  title: '',
  dni: '',
  deliveryAddress_street: '',
  country: '',
  state: '',
  city: '',
  postal_code: '',
  phone_number: '',
  email: '',
});
const isPaid = ref<boolean>(false);
const editDeliveryAddress = ref<boolean>(false);
const updatingDeliveryAddress = ref<boolean>(false);
const stProfile = useProfileStore();
const activeDeliveryAddress = ref(stProfile.getDeliveryData[0]?.id || "");

onBeforeMount(() => {
  stProfile.fetchBillingData();
  stProfile.fetchDeliveryAddress();
});

function changeDeliveryAddress(id: string) {
  activeDeliveryAddress.value = id;
}

async function updateDeliveryAddress(id: string) {
  editDeliveryAddress.value = true;
  await stProfile.fetchDeliveryAdderessById(id);
}

async function deleteDeliveryAddress(id: string) {
  await stProfile.deleteDeliveryAddress(id);
  await stProfile.fetchDeliveryAddress();
}

const payNow = async () => {
  buttonText.value = t("messages.general.processing");
  proccessCheckout(isPaid.value);
};

interface ShippingOption {
  id: string;
  label: string;
  cost: number;
}
interface PaymentOptions {
  id: string;
  label: string;
}

const shippingOption: ShippingOption[] = [
  {
    id: "STORE_PICKUP",
    label: "Recogida en tienda",
    cost: 0.0,
  },
  {
    id: "DELIVERY",
    label: "Entrega a domicilio",
    cost: 5.0,
  },
];

const paymentMethods: PaymentOptions[] = [
  {
    id: "Tropipay",
    label: "Tropipay",
  },
];

const activePaymentMethod = ref(paymentMethods[0]?.id || "");

useSeoMeta({
  title: t("messages.shop.checkout"),
});
</script>

<template>
  <div class="flex flex-col min-h-[600px]">
    <template v-if="cart">
      <div
        v-if="cart.products.length === 0"
        class="flex flex-col items-center justify-center flex-1 mb-12"
      >
        <Icon name="ion:cart-outline" size="156" class="opacity-25 mb-5" />
        <h2 class="text-2xl font-bold mb-2">
          {{ $t("messages.shop.cartEmpty") }}
        </h2>
        <span class="text-gray-400 mb-4">{{
          $t("messages.shop.addProductsInYourCart")
        }}</span>
        <NuxtLink
          to="/products"
          class="flex items-center justify-center gap-3 p-2 px-3 mt-4 font-semibold text-center text-white rounded-lg shadow-md bg-primary hover:bg-primary-dark"
        >
          {{ $t("messages.shop.browseOurProducts") }}
        </NuxtLink>
      </div>

      <form
        v-else
        class="container flex flex-wrap items-start gap-8 my-16 justify-evenly lg:gap-20"
        @submit.prevent="payNow"
      >
        <div class="grid w-full max-w-2xl gap-8 checkout-form md:flex-1">
          <div>
            <h2 class="w-full mb-3 text-2xl font-semibold">
              {{ $t("messages.billing.billingDetails") }}
            </h2>
            <BillingDetails v-model="stProfile.getBillingData" />
          </div>

          <div>
            <h3 class="mb-4 text-xl font-semibold">
              {{ $t("messages.general.shippingSelect") }}
            </h3>
            <ShippingOptions
              :options="shippingOption"
              :active-option="cart.delivery_method"
            />
          </div>

          <Transition name="scale-y" mode="out-in">
            <div v-if="cart.delivery_method === 'DELIVERY'">
              <h2 class="mb-4 text-xl font-semibold">
                {{ $t("messages.general.shippingDetails") }}
              </h2>
              <div
                v-if="
                  stProfile.deliveryAddress.length > 0 && !editDeliveryAddress
                "
              >
                <DeliveryOptions
                  :options="stProfile.getDeliveryData"
                  :active-option="activeDeliveryAddress"
                  @update:change="changeDeliveryAddress"
                  @update:delivery="updateDeliveryAddress"
                  @delete:delivery="deleteDeliveryAddress"
                />
              </div>
              <div v-else-if="editDeliveryAddress">
                <ShippingDetails
                  v-model="stProfile.getCurrentDeliveryData"
                  v-if="editDeliveryAddress"
                  :isLoading="stProfile.loading"
                  action="edit"
                  @close="editDeliveryAddress = false"
                />
              </div>
              <div v-else>
                <ShippingDetails
                  v-model="newDeliveryAddress"
                  action="add"
                  :isLoading="stProfile.loading"
                  @close="editDeliveryAddress = false"
                />
              </div>
            </div>
          </Transition>

          <!-- Pay methods -->
          <div class="mt-2 col-span-full">
            <h2 class="mb-4 text-xl font-semibold">
              {{ $t("messages.billing.paymentOptions") }}
            </h2>
            <PaymentOptions 
              v-model="paymentMethods" 
              :activePaymentMethod="activePaymentMethod"
              class="sm:w-1/2 xs:w-full mb-4" 
              @update:model-value="method => orderInput.paymentMethod = method.id"
            />
          </div>

          <!-- Order note -->
          <div>
            <h2 class="mb-4 text-xl font-semibold">
              {{ $t("messages.shop.orderNote") }} ({{
                $t("messages.general.optional")
              }})
            </h2>
            <textarea
              id="order-note"
              v-model="orderInput.customerNote"
              name="order-note"
              class="w-full min-h-[100px]"
              rows="4"
              :placeholder="$t('messages.shop.orderNotePlaceholder')"
            ></textarea>
          </div>
        </div>

        <OrderSummary>
          <button
            class="flex items-center justify-center w-full gap-3 p-3 mt-4 font-semibold text-center text-white rounded-lg shadow-md bg-primary hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-gray-400"
            :disabled="isCheckoutDisabled"
          >
            {{ buttonText
            }}<LoadingIcon v-if="isProcessingOrder" color="#fff" size="18" />
          </button>
        </OrderSummary>
      </form>
    </template>
    <LoadingIcon v-else class="m-auto" />
  </div>
</template>

<style lang="postcss">
.checkout-form input[type="text"],
.checkout-form input[type="email"],
.checkout-form input[type="tel"],
.checkout-form input[type="password"],
.checkout-form textarea,
.checkout-form select,
.checkout-form .StripeElement {
  @apply bg-white border rounded-md outline-none border-gray-300 shadow-sm w-full py-2 px-4;
}

.checkout-form input.has-error,
.checkout-form textarea.has-error {
  @apply border-red-500;
}

.checkout-form label {
  @apply my-1.5 text-xs text-gray-600 uppercase;
}

.checkout-form .StripeElement {
  padding: 1rem 0.75rem;
}
</style>
