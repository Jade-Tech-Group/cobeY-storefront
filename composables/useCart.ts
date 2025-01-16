import useConf from '~/conf/useConf';
import type Product from '~/types';
import type { Cart, ProductCart } from '~/types';
/**
 * @name useCart
 * @description A composable that handles the cart in local storage
 */
export function useCart() {
  const { storeSettings } = useAppConfig();
  const cart = useState<Cart>('cart', () => ({
    id: '',
    products: [],
    subtotal_price: '0',
    total_price: '0',
    amount: 0,
    coupon_discount: '0',
    coupon_id: '',
    delivery_cost: '0'
  }));
  const cartOnCoockie = useCookie<Cart | null>("cartOnCoockie");
  const isShowingCart = useState<boolean>('isShowingCart', () => false);
  const isUpdatingCart = useState<boolean>('isUpdatingCart', () => false);
  const isUpdatingCoupon = useState<boolean>('isUpdatingCoupon', () => false);

  async function cartManager(product: Product, toAdd: boolean, cartOrigin: boolean, onLoad: boolean) {
    const auth = useCookie('user');
    if (auth) {
      await refreshCart();
      cart.value = cart.value || {
        id: '',
        products: [],
        subtotal_price: '0',
        total_price: '0',
        amount: 0,
        coupon_discount: '0',
        coupon_id: '',
        delivery_cost: '0'
      };
      cartOnCoockie.value?.products.forEach((localProduct: Product) => {
        const existingProduct = cart.value.products.find(
          (obj: Product) => obj.id === localProduct.id
        );
        if (existingProduct) {
          existingProduct.amount += localProduct.amount;
        } else {
          cart.value?.products.push(localProduct);
        }
      });
    }

    if (toAdd) {
      if (!cartOrigin) {
        let repeat = cart.value?.products.filter((obj: Product) => obj.id === product.id);

        if (repeat.length > 0) {
          const existingProduct = repeat[0];
          if (existingProduct) {
            existingProduct.amount += product.amount;
            if (product.stock <= existingProduct.amount) {
              existingProduct.amount = product.stock;
            }
          }
        } else {
          cart.value?.products.push(product);
        }
      }
    } else {
      cart.value?.products.forEach((obj: ProductCart) => {
        if (obj.id === product.id) {
          product.amount = obj.amount;
        }
      });
    }

    // Calculate prices
    const cartTotal = cart.value.products.reduce((accumulator: number, object: Product) => {
      return accumulator + (object.sale_price ? parseFloat(object.sale_price) * object.amount : parseFloat(object.price) * object.amount);
    }, 0);

    cart.value.subtotal_price = cartTotal.toFixed(2);
    cart.value.total_price = cartTotal.toFixed(2);
    // this.updateLocalStore();
    if (auth) addToCart(cart.value.products);
  }

  async function refreshCart(): Promise<boolean> {
    const tokenCookie = useCookie('accessToken');
    try {
      const response: Cart = await $fetch(
        `${useConf.api.baseUrl}${useConf.api.services.cart.list}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${tokenCookie.value}`
          }
        }
      );

      if (response) {
        const sortedProducts = response.products.sort((a, b) =>
          a.name.es.localeCompare(b.name.es)
        );

        cart.value = {
          ...response,
          products: sortedProducts,
        };
      }

      return true;
    } catch (error: any) {
      console.log(error);
      resetInitialState();
      throw new Error('Cart could not be refreshed');
    } finally {
      isUpdatingCart.value = false;
    }
  }

  function resetInitialState() {
    cart.value = {
      id: '',
      products: [],
      subtotal_price: '0',
      total_price: '0',
      amount: 0,
      coupon_discount: '0',
      coupon_id: '',
      delivery_cost: '0'
    };
  }

  function updateCart(payload?: Cart | null): void {
    // cart.value = payload || null;
  }
  // toggle the cart visibility
  function toggleCart(state: boolean | undefined = undefined): void {
    isShowingCart.value = state ?? !isShowingCart.value;
  }

  // add an item to the cart
  async function addToCart(products: ProductCart[]): Promise<void> {
    const tokenCookie = useCookie('accessToken');
    console.log(tokenCookie)
    isUpdatingCart.value = true;

    try {
      const response: Cart = await $fetch(
        `${useConf.api.baseUrl}${useConf.api.services.cart.add}`,
        {
          method: "POST",
          body: JSON.stringify({ products }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenCookie.value}`,
          },
        }
      );
      cart.value = response;
      const { storeSettings } = useAppConfig();
      if (storeSettings.autoOpenCart && !isShowingCart.value) toggleCart(true);
    } catch (error: any) {
      console.error(error);
    }
  }

  // remove an item from the cart
  async function removeItem(key: string) {
    isUpdatingCart.value = true;
    // const { updateItemQuantities } = await GqlUpDateCartQuantity({ key, quantity: 0 });
    // updateCart(updateItemQuantities?.cart);
  }

  // update the quantity of an item in the cart
  async function updateItemQuantity(key: string, quantity: number): Promise<void> {
    isUpdatingCart.value = true;
    try {
      // const { updateItemQuantities } = await GqlUpDateCartQuantity({ key, quantity });
      // updateCart(updateItemQuantities?.cart);
    } catch (error: any) {
      console.log(error)
    }
  }

  // empty the cart
  async function emptyCart(): Promise<void> {
    try {
      isUpdatingCart.value = true;
      // const { emptyCart } = await GqlEmptyCart();
      // updateCart(emptyCart?.cart);
    } catch (error: any) {
      // logGQLError(error);
    }
  }

  // Update shipping method
  async function updateShippingMethod(shippingMethods: string) {
    isUpdatingCart.value = true;
    // updateCart(updateShippingMethod?.cart);
  }

  // Apply coupon
  async function applyCoupon(code: string): Promise<{ message: string | null }> {
    try {
      isUpdatingCoupon.value = true;
      // const { applyCoupon } = await GqlApplyCoupon({ code });
      // updateCart(applyCoupon?.cart);
      isUpdatingCoupon.value = false;
    } catch (error: any) {
      isUpdatingCoupon.value = false;
      console.log(error);
    }
    return { message: null };
  }

  // Remove coupon
  async function removeCoupon(code: string): Promise<void> {
    try {
      isUpdatingCart.value = true;
      // const { removeCoupons } = await GqlRemoveCoupons({ codes: [code] });
      // updateCart(removeCoupons?.cart);
    } catch (error) {
      console.log(error);
      isUpdatingCart.value = false;
    }
  }

  // Stop the loading spinner when the cart is updated
  watch(cart, (val) => {
    isUpdatingCart.value = false;
  });

  const isBillingAddressEnabled = computed(() => (storeSettings.hideBillingAddressForVirtualProducts));

  return {
    cart,
    isShowingCart,
    isUpdatingCart,
    isUpdatingCoupon,
    isBillingAddressEnabled,
    updateCart,
    refreshCart,
    cartManager,
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
