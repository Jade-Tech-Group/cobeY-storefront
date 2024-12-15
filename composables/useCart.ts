import type { Cart, PaymentGateway } from '~/types';

/**
 * @name useCart
 * @description A composable that handles the cart in local storage
 */
export function useCart() {
  const { storeSettings } = useAppConfig();

  const cart = useState<Cart | null>('cart', () => null);
  const isShowingCart = useState<boolean>('isShowingCart', () => false);
  const isUpdatingCart = useState<boolean>('isUpdatingCart', () => false);
  const isUpdatingCoupon = useState<boolean>('isUpdatingCoupon', () => false);
  const paymentGateways = useState<PaymentGateway | null>('paymentGateways', () => null);
  const { clearAllCookies } = useHelpers();

  /** Refesh the cart from the server
   * @returns {Promise<boolean>} - A promise that resolves
   * to true if the cart was successfully refreshed
   */
  async function refreshCart(): Promise<boolean> {
    return true
  }

  function resetInitialState() {
    cart.value = null;
    paymentGateways.value = null;
  }

  function updateCart(): void {
  }

  function updatePaymentGateways(payload: PaymentGateway): void {
    paymentGateways.value = payload;
  }

  // toggle the cart visibility
  function toggleCart(state: boolean | undefined = undefined): void {
    
  }

  // add an item to the cart
  async function addToCart(): Promise<void> {
  }

  // remove an item from the cart
  async function removeItem(key: string) {
  }

  // update the quantity of an item in the cart
  async function updateItemQuantity(key: string, quantity: number): Promise<void> {

  }

  // empty the cart
  async function emptyCart(): Promise<void> {
   
  }

  // Update shipping method
  async function updateShippingMethod(shippingMethods: string) {
   
  }

  // Apply coupon
  async function applyCoupon(code: string) {
   
  }

  // Remove coupon
  async function removeCoupon(code: string): Promise<void> {
    try {
      isUpdatingCart.value = true;
    } catch (error) {
      isUpdatingCart.value = false;
    }
  }

  // Stop the loading spinner when the cart is updated
  watch(cart, (val) => {
    isUpdatingCart.value = false;
  });

  // Check if all products in the cart are virtual
  const allProductsAreVirtual = computed(() => {
  });

  return {
    cart,
    isShowingCart,
    isUpdatingCart,
    isUpdatingCoupon,
    paymentGateways,
    updateCart,
    refreshCart,
    toggleCart,
    addToCart,
    removeItem,
    updateItemQuantity,
    emptyCart,
    updateShippingMethod,
    applyCoupon,
    removeCoupon,
  };
}
