import useConf from "~/conf/useConf";
import type { BillingAddress, Order } from "~/types";
import { useI18n } from "vue-i18n";

export function useCheckout() {
  const { t } = useI18n();

  const isProcessingOrder = useState<boolean>('isProcessingOrder', () => false);
  const errorOrder = useState<boolean>('errorOrder', () => false);
  const paymentLink = useCookie<string>('paymentLink');
  const { resetInitialState } = useCart()

  const paymentResponse = import.meta.env.VITE_PAYMENT_RESPONSE;

  const proccessCheckout = async (billingData: BillingAddress, deliveryAddressId: string, paymentMethod: string, note: string, coupon_id: string, delivery_method: string) => {
    const tokenCookie = useCookie('accessToken');
    const url_payment_success = `${paymentResponse}payment/success`;
    const url_payment_fail = `${paymentResponse}payment/fail`;
    try {
      const response = await $fetch<any>(
        `${useConf.api.baseUrl}${useConf.api.services.order.create}`,
        {
          method: "POST",
          body: JSON.stringify({
            billing_address: {
              name: billingData.name,
              lastName: billingData.lastName,
              address: billingData.address,
              country: billingData.country,
              countryId: 53,
              state: billingData.state,
              city: billingData.city,
              phone: billingData.phone,
              email: billingData.email,
              postCode: billingData.postCode,
              termsAndConditions: true,
            },
            coupon_id: coupon_id !== null ? coupon_id : "",
            delivery_address_id: delivery_method !== 'STORE_PICKUP' ? deliveryAddressId : '',
            payment_method: paymentMethod,
            note: note,
            url_payment_success: 'https://www.cobeymas.com/payment-success',
            url_payment_fail: 'https://www.cobeymas.com/paymentfailure',
          }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenCookie.value}`,
          },
        }
      );
      paymentLink.value = response.shortUrl
      errorOrder.value = false
    } catch (error) {
      errorOrder.value = true
      console.log(error);
    }
    resetInitialState()
  };

  return {
    isProcessingOrder,
    errorOrder,
    paymentLink,
    proccessCheckout,
  };
}
