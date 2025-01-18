import useConf from '~/conf/useConf';
import type Product from '~/types';
import type { Cart, Coupon, ProductCart } from '~/types';
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
  const cartTotal = useCookie<Number | null>("cartTotal");
  const cartOnCoockie = useCookie<Cart | null>("cartOnCoockie");
  const couponOnCoockie = useCookie<Coupon | null>("couponOnCoockie");
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
    cartTotal.value = cart.value.products.reduce((accumulator: number, object: Product) => {
      return accumulator + (object.sale_price ? parseFloat(object.sale_price) * object.amount : parseFloat(object.price) * object.amount);
    }, 0);

    cart.value.subtotal_price =  cartTotal.value.toFixed(2);
    cart.value.total_price =  cartTotal.value.toFixed(2);
    if (auth) addToCart(cart.value.products);
  }

  async function refreshCart(): Promise<boolean> {
    const tokenCookie = useCookie('accessToken');
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
    cart.value = payload || {
      id: '',
      products: [],
      subtotal_price: '0',
      total_price: '0',
      amount: 0,
      coupon_discount: '0',
      coupon_id: '',
      delivery_cost: '0'
    };
    cartOnCoockie.value = cart.value
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
      cart.value = response;
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
  }

  async function updateItemQuantity(productId: string, quantity:number): Promise<void> {
    const tokenCookie = useCookie('accessToken');
    isUpdatingCart.value = true;
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
  }

  async function emptyCart(): Promise<void> {
    const tokenCookie = useCookie('accessToken');
    isUpdatingCart.value = true;
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
