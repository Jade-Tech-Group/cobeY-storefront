import useConf from '~/conf/useConf';
import type Product from '~/types';
import type { Cart, Coupon, ProductCart } from '~/types';
import { getItem, setItem } from './localStorage';
import { delivery_method } from '~/constants';
/**
 * @name useCart
 * @description A composable that handles the cart in local storage
 */
export function useCart() {
  const { storeSettings } = useAppConfig();
  const initialCart = {
    id: '',
    products: [],
    subtotal_price: '0',
    total_price: '0',
    amount: 0,
    coupon_discount: '0',
    coupon_id: '',
    coupon_code: '',
    delivery_cost: '0',
    delivery_method: delivery_method.STORE_PICKUP
  };
  const cart = useState<Cart>('cart', () => (initialCart));
  const cartTotal = useCookie<Number | null>("cartTotal");
  const isShowingCart = useState<boolean>('isShowingCart', () => false);
  const isUpdatingCart = useState<boolean>('isUpdatingCart', () => false);
  const isUpdatingCoupon = useState<boolean>('isUpdatingCoupon', () => false);
  const hasError = useState<boolean>('hasError', () => false);
  /**
   * @description Manages the cart by adding or updating products.
   * @param item - The product or array of products to add or update in the cart.
   */
  async function cartManager(item: Product | Product[], decrement: boolean = false) {
    // Check if the item is an array of products or a single product
    const isAuth = useCookie('user');
    const products = Array.isArray(item) ? item : [item];

    // Iterate through each product to add or update its quantity in the cart
    products.forEach((product) => {
      const existingProduct = cart.value.products.find((e) => e.id === product.id);
      if (existingProduct) {
        if (decrement) {
          existingProduct.amount = product.amount;
        } else {
          existingProduct.amount += product.amount;
        }
      } else {
        // If the product does not exist in the cart, add it
        cart.value.products.push(product);
      }
    });

    // Determine how to update the cart based on the user's authentication status
    if (isAuth.value) {
      // If the user is authenticated, add the products to the cart through the API
      addToCart(cart.value.products);
    } else {
      updateTotal()
      setItem('COBEY_PRODUCT_CART', JSON.stringify(cart.value));
    }
  }

  async function updateItemQuantity(item: Product, quantity: number) {
    const isAuth = useCookie('user');
    const existingProduct = cart.value.products.find((e) => e.id === item.id);
    if (existingProduct) {
      existingProduct.amount = quantity;
    }

    if (isAuth.value) {
      addToCart(cart.value.products);
    } else {
      updateTotal()
      setItem('COBEY_PRODUCT_CART', JSON.stringify(cart.value));
    }
  }

  function updateTotal() {
    const total = cart.value.products.reduce((accumulator, object) => {
      return accumulator + (
        object.sale_price
          ? parseFloat(object.sale_price) * object.amount
          : parseFloat(object.price) * object.amount
      );
    }, 0);
    hasError.value = false;
    cart.value.subtotal_price = total.toFixed(2);
    cart.value.total_price = total.toFixed(2);
  }

  /**
   * Refreshes the cart by fetching the latest cart data from the server or local storage.
   * @returns A promise that resolves to a boolean indicating the success of the operation.
   */
  async function refreshCart(): Promise<boolean> {
    // Retrieve the access token from the cookie
    const tokenCookie = useCookie('accessToken');
    // Check if the access token is present
    if (tokenCookie.value) {
      try {
        // Attempt to fetch the cart data from the server
        const response = await $fetch<Cart>(
          `${useConf.api.baseUrl}${useConf.api.services.cart.list}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${tokenCookie.value}`
            }
          }
        );

        // If the response is successful, update the cart state with the fetched data
        if (response) {
          cart.value = {
            ...response,
            // Sort the products by their Spanish name for consistency
            products: response.products.sort((a, b) => a.name.es.localeCompare(b.name.es)),
          };
          // Save the updated cart to local storage
          setItem('COBEY_PRODUCT_CART', JSON.stringify(cart.value));
        }
        // Indicate success
        return true;
      } catch (error: any) {
        // Throw an error if the cart refresh fails
        throw new Error('Cart could not be refreshed');
      } finally {
        // Ensure the cart update indicator is set to false after the operation
        isUpdatingCart.value = false;
      }
    } else {
      // If no access token is present, attempt to retrieve the cart from local storage
      cart.value = JSON.parse(getItem('COBEY_PRODUCT_CART') as any);
      // Indicate success
      return true;
    }
  }

  function resetInitialState() {
    cart.value = initialCart;
    setItem('COBEY_PRODUCT_CART', JSON.stringify(initialCart))
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
    setItem('COBEY_PRODUCT_CART', JSON.stringify(cart.value))
  }
  // toggle the cart visibility
  function toggleCart(state: boolean | undefined = undefined): void {
    isShowingCart.value = state ?? !isShowingCart.value;
  }

  // add an item to the cart
  async function addToCart(products: ProductCart[]): Promise<void> {
    isUpdatingCart.value = true;
    const tokenCookie = useCookie('accessToken');
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
      hasError.value = false;
      cart.value = response;
      const { storeSettings } = useAppConfig();
      if (storeSettings.autoOpenCart && !isShowingCart.value) toggleCart(true);
    } catch (error: any) {
      hasError.value = true;
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
        hasError.value = false;
      } catch (error: any) {
        hasError.value = true;
        console.log(error)
      }
    } else {
      removeFromLocalById(productId)
    }
  }

  function removeFromLocalById(productId: string): void {
    cart.value.products = cart.value.products.filter(product => product.id !== productId);
    updateTotal()
    setItem('COBEY_PRODUCT_CART', JSON.stringify(cart.value));
    isUpdatingCart.value = false
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
        hasError.value = false;
        await refreshCart()
      } catch (error: any) {
        hasError.value = true;
        console.log(error)
      }
    } else {
      resetInitialState()
    }
  }

  // Update shipping method
  async function updateShippingMethod(method: string) {
    isUpdatingCart.value = true;
    const tokenCookie = useCookie('accessToken');
    try {
      const response = await $fetch<Cart>(
        `${useConf.api.baseUrl}${useConf.api.services.cart.updateShipping}`,
        {
          method: "PUT",
          body: JSON.stringify({ method }),
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

    isUpdatingCart.value = false;
  }

  // Apply coupon
  async function applyCoupon(coupon: string): Promise<{ message: string | null }> {
    isUpdatingCoupon.value = true;
    const tokenCookie = useCookie('accessToken');
    try {
      const response = await $fetch<Cart>(
        `${useConf.api.baseUrl}${useConf.api.services.cart.apply_coupon}`,
        {
          method: "POST",
          body: JSON.stringify({ coupon }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenCookie.value}`,
          },
        }
      );
      updateCart(response);
      hasError.value = false
      isUpdatingCoupon.value = false;
    } catch (error: any) {
      hasError.value = true
      isUpdatingCoupon.value = false;
      console.log(error);
    }
    return { message: null };
  }

  // Remove coupon
  async function removeCoupon(): Promise<void> {
    const tokenCookie = useCookie('accessToken');
    try {
      isUpdatingCart.value = true;
      const response = await $fetch<Cart>(
        `${useConf.api.baseUrl}${useConf.api.services.cart.delete_coupon}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenCookie.value}`,
          },
        }
      );
      updateCart(response);
      hasError.value = false;
    } catch (error) {
      console.log(error);
      hasError.value = true;
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
    hasError,
    updateCart,
    resetInitialState,
    refreshCart,
    cartManager,
    toggleCart,
    addToCart,
    removeItem,
    emptyCart,
    updateShippingMethod,
    applyCoupon,
    removeCoupon,
    updateItemQuantity,
  };
}
