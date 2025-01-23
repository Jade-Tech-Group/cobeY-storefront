
export function useCheckout() {
  const orderInput = useState<any>('orderInput', () => {
    return {
      customerNote: '',
      paymentMethod: '',
      shipToDifferentAddress: false,
      metaData: [{ key: 'order_via', value: 'WooNuxt' }],
    };
  });

  const isProcessingOrder = useState<boolean>('isProcessingOrder', () => false);

  const proccessCheckout = async (isPaid = false) => {
  };

  return {
    orderInput,
    isProcessingOrder,
    proccessCheckout,
  };
}
