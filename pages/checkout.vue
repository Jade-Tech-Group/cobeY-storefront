<script setup lang="ts">
import type { BillingAddress, Cart, DeliveryAddress } from "~/types";

const { t } = useI18n();
const { cart, isUpdatingCart } = useCart();
const { isProcessingOrder, proccessCheckout, errorOrder, paymentLink } =
  useCheckout();
const buttonText = ref<string>(
  isProcessingOrder.value
    ? t("messages.general.processing")
    : t("messages.shop.checkoutButton")
);
const isCheckoutDisabled = computed<boolean>(
  () => isProcessingOrder.value || !activePaymentMethod.value
);
const newDeliveryAddress = ref<DeliveryAddress>({
  id: "",
  name: "",
  last_name: "",
  title: "",
  dni: "",
  deliveryAddress_street: "",
  country: "",
  state: "",
  city: "",
  postal_code: "",
  phone_number: "",
  email: "",
});

const billingData = ref<BillingAddress>({
  name: "",
  lastName: "",
  last_name: "",
  address: "",
  countryId: 53,
  country: "",
  state: "",
  city: "",
  phone: "",
  email: "",
  postCode: "",
  id: "",
});
const customerNote = ref<string>("");
const editDeliveryAddress = ref<boolean>(false);
const addDeliveryAddress = ref<boolean>(false);
const stProfile = useProfileStore();
const activeDeliveryAddress = ref(stProfile.getDeliveryData[0]?.id || "");

onBeforeMount(async () => {
  await stProfile.fetchBillingData();
  await stProfile.fetchDeliveryAddress();
  activeDeliveryAddress.value = stProfile.getDeliveryData[0]?.id || "";
  isProcessingOrder.value = false;
  billingData.value = stProfile.getBillingData;
});

function changeDeliveryAddress(id: string) {
  activeDeliveryAddress.value = id;
}

async function updateDeliveryAddress(id: string) {
  editDeliveryAddress.value = true;
  await stProfile.fetchDeliveryAdderessById(id);
}

async function closeAddShipping() {
  addDeliveryAddress.value = false;
  activeDeliveryAddress.value = stProfile.getNewDeliveryData.id;
}

async function deleteDeliveryAddress(id: string) {
  await stProfile.deleteDeliveryAddress(id);
  await stProfile.fetchDeliveryAddress();
  editDeliveryAddress.value = false;
}

watch(stProfile.getDeliveryData, () => {
  if (stProfile.getDeliveryData.length === 0) {
    activeDeliveryAddress.value = "";
  }
});

const dialogShow = ref<boolean>(false);
const dialogAction = ref<string>("success");
const dialogPrimaryText = ref<string>("");
const dialogSecondaryText = ref<string>("");
const dialogMainTxt = ref<string>("");
const dialogToPrimary = ref<string>("");
const dialogToSecondary = ref<string>("");
const router = useRouter();

const payNow = async () => {
  buttonText.value = t("messages.general.processing");
  await proccessCheckout(
    billingData.value,
    activeDeliveryAddress.value,
    activePaymentMethod.value,
    customerNote.value,
    cart.value.coupon_id,
    cart.value.delivery_method
  );
  if (errorOrder.value) {
    dialogShow.value = true;
    dialogAction.value = "error";
    dialogPrimaryText.value = t("messages.shop");
    dialogSecondaryText.value = t("messages.shop.close");
    dialogMainTxt.value = t("messages.shop.order_error.subtitle");
    dialogToPrimary.value = "/";
    dialogToSecondary.value = "/";
  } else {
    dialogShow.value = true;
    dialogAction.value = "success";
    dialogPrimaryText.value = t("messages.shop.goToTropipay");
    dialogSecondaryText.value = t("messages.shop.close");
    dialogMainTxt.value = t("messages.shop.required_redirect");
    dialogToPrimary.value = paymentLink.value;
    dialogToSecondary.value = "/";
  }
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

const { user, returnUrl, unlogging } = useAuth();

function onClickLogin() {
  returnUrl.value = "/checkout";
}

const goToTropipay = () => {
  window.location.href = paymentLink.value;
};
</script>

<template>
  <div class="flex flex-col min-h-[600px]  relative">
    <template v-if="!user && !unlogging">
      <DialogCmp
        :dialog-show="true"
        :closable="false"
        :primary-text="$t('messages.account.login')"
        :secondary-text="$t('messages.account.register')"
        :main-txt="$t('messages.account.textWarning')"
        toPrimary="/login-and-register"
        toSecondary="/login-and-register?action=register"
        @onClickPrimary="onClickLogin"
      />
    </template>
    <template v-else>
      <div class="absolute inset-0 z-0 pointer-events-none">
        <div
          class="absolute sm:top-[25%] sm:-left-[25%] xs:-top-[10%] xs:-left-[25%] sm:w-[950px] sm:h-[950px] xs:w-[320px] xs:h-[320px] bg-[radial-gradient(circle_at_center,_rgba(239,122,20,0.3)_0%,_rgba(239,122,20,0.25)_15%,_rgba(239,122,20,0.2)_30%,_rgba(239,122,20,0.15)_45%,_rgba(255,255,255,0.1)_60%,_rgba(255,255,255,0.05)_75%,_rgba(255,255,255,0.02)_90%,_rgba(255,255,255,0)_100%)] rounded-full"
        ></div>
        <div
          class="absolute sm:-top-[40%] sm:right-[30%] xs:right-[0] sm:w-[750px] sm:h-[750px] xs:w-[320px] xs:h-[320px]  bg-[radial-gradient(circle_at_center,_rgba(239,122,20,0.3)_0%,_rgba(239,122,20,0.25)_15%,_rgba(239,122,20,0.2)_30%,_rgba(239,122,20,0.15)_45%,_rgba(255,255,255,0.1)_60%,_rgba(255,255,255,0.05)_75%,_rgba(255,255,255,0.02)_90%,_rgba(255,255,255,0)_100%)] rounded-full"
        ></div>
      </div>
      <div v-if="cart.id">
        <template v-if="cart.products.length > 0">
          <form
            class="container flex flex-wrap items-start gap-8 my-16 justify-evenly lg:gap-20"
            @submit.prevent="payNow"
          >
            <div class="grid w-full max-w-2xl gap-8 checkout-form md:flex-1">
              <div class="w-full relative bg-white rounded-lg shadow-lg p-8">
                <h2 class="w-full mb-3 text-2xl font-semibold">
                  {{ $t("messages.billing.billingDetails") }}
                </h2>
                <div
                  v-if="stProfile.loading"
                  class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50"
                >
                  <LoadingIcon />
                </div>
                <BillingDetails v-model="billingData" />
              </div>

              <div class="w-full relative bg-white rounded-lg shadow-lg p-8">
                <h3 class="mb-4 text-xl font-semibold">
                  {{ $t("messages.general.shippingSelect") }}
                </h3>
                <ShippingOptions
                  :options="shippingOption"
                  :active-option="cart.delivery_method"
                />
              </div>
              <Transition
                name="scale-y"
                mode="out-in"
                class="w-full relative bg-white rounded-lg shadow-lg p-8"
              >
                <div v-if="cart.delivery_method === 'DELIVERY'">
                  <div
                    class="w-full flex flex-row justify-between items-center"
                  >
                    <h2 class="mb-4 text-xl font-semibold">
                      {{ $t("messages.general.shippingDetails") }}
                    </h2>
                    <div
                      class="flex flex-row gap-1.5 hover:underline cursor-pointer"
                      @click="addDeliveryAddress = true"
                    >
                      <img
                        src="/icons/plus.svg"
                        width="18"
                        height="18"
                        alt="Add address"
                        loading="lazy"
                      />
                      <h2 class="text-sm font-semibold">
                        {{ $t("messages.account.newAddress") }}
                      </h2>
                    </div>
                  </div>
                  <div
                    v-if="
                      stProfile.deliveryAddress.length > 0 &&
                      !editDeliveryAddress &&
                      !addDeliveryAddress
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
                  <div v-if="editDeliveryAddress">
                    <ShippingDetails
                      v-model="stProfile.getCurrentDeliveryData"
                      :isLoading="stProfile.loading"
                      action="edit"
                      @close="editDeliveryAddress = false"
                    />
                  </div>
                  <div
                    v-if="
                      stProfile.deliveryAddress.length === 0 ||
                      addDeliveryAddress
                    "
                  >
                    <ShippingDetails
                      v-model="newDeliveryAddress"
                      :isLoading="stProfile.loading"
                      action="add"
                      @close="closeAddShipping()"
                    />
                  </div>
                </div>
              </Transition>
              <div
                class="col-span-full relative bg-white rounded-lg shadow-lg p-8"
              >
                <h2 class="mb-4 text-xl font-semibold">
                  {{ $t("messages.billing.paymentOptions") }}
                </h2>
                <PaymentOptions
                  v-model="paymentMethods"
                  :activePaymentMethod="activePaymentMethod"
                  class="sm:w-1/2 xs:w-full mb-4"
                  @update:model-value="
                    (method) => (activePaymentMethod = method.id)
                  "
                />
              </div>
              <div>
                <h2 class="mb-4 text-xl font-semibold">
                  {{ $t("messages.shop.orderNote") }} ({{
                    $t("messages.general.optional")
                  }})
                </h2>
                <textarea
                  id="order-note"
                  v-model="customerNote"
                  name="order-note"
                  class="w-full min-h-[100px]"
                  rows="4"
                  :placeholder="$t('messages.shop.orderNotePlaceholder')"
                ></textarea>
              </div>
            </div>
            <OrderSummary>
              <button
                class="flex items-center justify-center w-full gap-3 p-3 mt-4 font-semibold text-center text-white rounded-lg shadow-md bg-primary hover:bg-primary-medium disabled:cursor-not-allowed disabled:bg-gray-400"
                :disabled="isCheckoutDisabled"
              >
                {{ buttonText
                }}<LoadingIcon
                  v-if="isProcessingOrder"
                  color="#fff"
                  size="18"
                />
              </button>
            </OrderSummary>
          </form>
        </template>
        <div
          v-else
          class="flex flex-col items-center justify-center flex-1 my-24"
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
            class="flex items-center justify-center gap-3 p-2 px-3 mt-4 font-semibold text-center text-white rounded-lg shadow-md bg-primary hover:bg-primary-medium"
          >
            {{ $t("messages.shop.browseOurProducts") }}
          </NuxtLink>
        </div>
        <LoadingIcon
          v-if="isUpdatingCart"
          class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-25"
        />
      </div>
      <div v-else>
        <LoadingIcon class="mt-8" />
      </div>
      <DialogCmp
        :dialog-show="dialogShow"
        :action="dialogAction"
        :closable="false"
        :primary-text="dialogPrimaryText"
        :secondary-text="dialogSecondaryText"
        :main-txt="dialogMainTxt"
        :to-primary="dialogToPrimary"
        :to-secondary="dialogToSecondary"
        @onClickPrimary="goToTropipay"
      />
    </template>
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
