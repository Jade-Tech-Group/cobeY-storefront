import type Product from "~/types";

export function useSorting() {
  const route = useRoute();
  const router = useRouter();
  const { updateProductList } = useProducts();

  const orderQuery = useState<string>("order", () => "");

  orderQuery.value = route.query.orderby as string;

  function getOrderQuery(): { orderBy: string; order: string } {
    return {
      orderBy: route.query.orderby as string,
      order: route.query.order as string,
    };
  }

  function setOrderQuery(orderby: string, order?: string): void {
    router.push({
      query: {
        ...route.query,
        orderby: orderby ?? undefined,
        order: order ?? undefined,
      },
    });
    setTimeout(() => {
      updateProductList();
    }, 100);
  }

  const isSortingActive = computed<boolean>(() => !!orderQuery.value);

  // Define a function to order the products
  function sortProducts(products: Product[]): Product[] {
    if (!isSortingActive) return products;

    const orderQuery = getOrderQuery();

    if (!orderQuery.orderBy && !orderQuery.order) return products;

    const orderby: string = orderQuery.orderBy || "date";
    const order: string = orderQuery.order || "DESC";

    return products.sort((a: Product, b: Product) => {
      const aDate: any = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const bDate: any = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      const aPrice = a.sale_price
        ? parseFloat(
            [...a.sale_price.split(",")].reduce((a, b) =>
              String(Math.max(Number(a), Number(b)))
            )
          )
        : 0;
      const bPrice = b.sale_price
        ? parseFloat(
            [...b.sale_price.split(",")].reduce((a, b) =>
              String(Math.max(Number(a), Number(b)))
            )
          )
        : 0;
      const aSalePrice: number = a.sale_price
        ? parseFloat(
            [...a.sale_price.split(",")].reduce((a, b) =>
              String(Math.max(Number(a), Number(b)))
            )
          )
        : 0;
      const aRegularPrice: number = a.price
        ? parseFloat(
            [...a.price.split(",")].reduce((a, b) =>
              String(Math.max(Number(a), Number(b)))
            )
          )
        : 0;
      const bSalePrice: number = b.sale_price
        ? parseFloat(
            [...b.sale_price.split(",")].reduce((a, b) =>
              String(Math.max(Number(a), Number(b)))
            )
          )
        : 0;
      const bRegularPrice: number = b.price
        ? parseFloat(
            [...b.price.split(",")].reduce((a, b) =>
              String(Math.max(Number(a), Number(b)))
            )
          )
        : 0;
      const aDiscount: number = a.sale_percent
        ? Math.round(((aSalePrice - aRegularPrice) / aRegularPrice) * 100)
        : 0;
      const bDiscount: number = b.sale_percent
        ? Math.round(((bSalePrice - bRegularPrice) / bRegularPrice) * 100)
        : 0;
      const aName: string = a.name.es || "";
      const bName: string = b.name.en || "";

      switch (orderby) {
        case "price":
          return order !== "DESC" ? aPrice - bPrice : bPrice - aPrice;

        case "discount":
          return order !== "DESC"
            ? bDiscount - aDiscount
            : aDiscount - bDiscount;
        case "alphabetically":
          return order !== "DESC"
            ? aName.localeCompare(bName)
            : bName.localeCompare(aName);
        default:
          return order !== "DESC" ? aDate - bDate : bDate - aDate;
      }
    });
  }

  return {
    getOrderQuery,
    setOrderQuery,
    isSortingActive,
    orderQuery,
    sortProducts,
  };
}
