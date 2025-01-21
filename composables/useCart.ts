import useConf from '~/conf/useConf';
import type Product from '~/types';
import type { Cart, Coupon, ProductCart } from '~/types';
/**
 * @name useCart
 * @description A composable that handles the cart in local storage
 */
export function useCart() {
  const { storeSettings } = useAppConfig();
  const cartTotal = useCookie<Number | null>("cartTotal");
  const cartOnCoockie = useCookie<Cart>('cartOnCoockie', {
    default: () => ({
      id: '',
      products: [] as Product[],
      subtotal_price: '0',
      total_price: '0',
      amount: 0,
      coupon_discount: '0',
      coupon_id: '',
      delivery_cost: '0'
    })
  });
  const couponOnCoockie = useCookie<Coupon | null>("couponOnCoockie");
  const isShowingCart = useState<boolean>('isShowingCart', () => false);
  const isUpdatingCart = useState<boolean>('isUpdatingCart', () => false);
  const isUpdatingCoupon = useState<boolean>('isUpdatingCoupon', () => false);

  async function cartManager(item: Product | Product[]) {
    const isAuth = useCookie('user');

    if (Array.isArray(item)) {
      item.forEach((value) => {
        if (!cartOnCoockie.value.products.find((e) => e.id === value.id)) {
          cartOnCoockie.value.products.push(value);
        }
      });
    } else {
      if (!cartOnCoockie.value?.products.find((e) => e.id === item.id)) {
        cartOnCoockie.value?.products.push(item)
      } else {
        cartOnCoockie.value?.products.map((value) => {
          if (value.id === item.id) {
            value.amount += item.amount
          }
        })
      }
    }
    if (isAuth.value) addToCart(cartOnCoockie.value.products)
  }

  async function refreshCart() {
    const tokenCookie = useCookie('accessToken');
    if (tokenCookie.value) {
      try {
        const response = await $fetch<Cart>(
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

          cartOnCoockie.value = {
            ...response,
            products: sortedProducts,
          };
        }
      } catch (error: any) {
        console.log(error);
        resetInitialState();
        throw new Error('Cart could not be refreshed');
      } finally {
        isUpdatingCart.value = false;
      }
    }
  }

  function resetInitialState() {
    cartOnCoockie.value = {
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

  function resetCoupon() {
    couponOnCoockie.value = {
      id: '',
      discount_type: '',
      amount: 0,
      use_limit: 0,
      code: '',
      expiration_date: '',
      min_cost: '',
      max_cost: '',
    };
  }

  function updateCart(payload: Cart): void {
    cartOnCoockie.value = payload || {
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
  // toggle the cart visibility
  function toggleCart(state: boolean | undefined = undefined): void {
    isShowingCart.value = state ?? !isShowingCart.value;
  }

  // add an item to the cart
  async function addToCart(products: ProductCart[]): Promise<void> {
    const tokenCookie = useCookie('accessToken');
    isUpdatingCart.value = true;
    try {
      resetInitialState()
      const response = await $fetch<Cart>(
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
      cartOnCoockie.value = response;
      const { storeSettings } = useAppConfig();
      if (storeSettings.autoOpenCart && !isShowingCart.value) toggleCart(true);
    } catch (error: any) {
      console.error(error);
    }
  }

  // remove an item from the cart
  async function removeItem(productId: string) {
    const tokenCookie = useCookie('accessToken');
    isUpdatingCart.value = true;
    if (tokenCookie.value) {
      try {
        const response = await $fetch(
          `${useConf.api.baseUrl}${useConf.api.services.cart.delete}/${productId}`,
          {
            method: "DELETE",
            body: JSON.stringify({ productId }),
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${tokenCookie.value}`,
            },
          }
        );
        updateCart(response)
      } catch (error: any) {
        console.log(error)
      }
    } else {
      removeProductById(productId)
    }
  }

  function removeProductById(productId: string): void {
    cartOnCoockie.value.products = cartOnCoockie.value.products.filter(product => product.id !== productId);
  }

  async function updateItemQuantity(productId: string, quantity: number): Promise<void> {
    const tokenCookie = useCookie('accessToken');
    isUpdatingCart.value = true;
    if (tokenCookie.value) {
      try {
        const response = await $fetch(
          `${useConf.api.baseUrl}${useConf.api.services.cart.delete}/${productId}`,
          {
            method: "DELETE",
            body: JSON.stringify({ productId }),
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${tokenCookie.value}`,
            },
          }
        );
        updateCart(response)
      } catch (error: any) {
        console.log(error)
      }
    } else {
      removeProductById(productId)
    }
  }

  async function emptyCart(): Promise<void> {
    const tokenCookie = useCookie('accessToken');
    isUpdatingCart.value = true;
    if (tokenCookie.value) {
      try {
        const response = await $fetch<Cart>(
          `${useConf.api.baseUrl}${useConf.api.services.cart.delete}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${tokenCookie.value}`,
            },
          }
        );
        updateCart(response)
        cartTotal.value = 0
        await refreshCart()
      } catch (error: any) {
        console.log(error)
      }
    } else {
      resetInitialState()
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
  watch(cartOnCoockie, (val) => {
    isUpdatingCart.value = false;
  });

  const isBillingAddressEnabled = computed(() => (storeSettings.hideBillingAddressForVirtualProducts));

  return {
    cartOnCoockie,
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
