import type Product from "~/types";

// Example: ?search=shirt
export function useSearching() {
  const route = useRoute();
  const router = useRouter();
  const { updateProductList } = useProducts();
  const isShowingSearch = useState<boolean>("isShowingSearch", () => false);
  const searchQuery = useState<string>("searchQuery", () => "");
  const isSearchActive = computed<boolean>(() => !!searchQuery.value);

  searchQuery.value = route.query.search as string;

  function getSearchQuery(): string {
    return route.query.search as string;
  }

  function setSearchQuery(search: string): void {
    searchQuery.value = search;
    router.push({
      name: "products",
      query: { ...route.query, search: search || undefined },
    });
    setTimeout(() => {
      updateProductList();
    }, 50);
  }

  function clearSearchQuery(): void {
    setSearchQuery("");
  }

  const toggleSearch = (): void => {
    isShowingSearch.value = !isShowingSearch.value;
  };

  function searchProducts(products: Product[]) {
    const name = route.name ?? "products";
    const search = getSearchQuery();

    /**
     * If we are on a category page, we need to add the category slug to the
     * route, otherwise every search will redirect to the products page.
     */
    if (route.name === "product-category-slug") {
      const categorySlug = route.params.categorySlug as string;
      router.push({
        name,
        params: { categorySlug },
        query: { ...route.query, search },
      });
    } else {
      router.push({ name: "products", query: { ...route.query, search } });
    }

    return search
      ? products.filter((product: Product) => {
          const productName = product.name.es.toLowerCase() || product.name.en.toLowerCase();
          const productDescription = product.description
            ? product.description.es.toLowerCase() ||
              product.description.en.toLowerCase()
            : null;
          const query = search.toLowerCase();
          return productName?.includes(query) || productDescription?.includes(query);
        })
      : products;
  }

  return {
    getSearchQuery,
    setSearchQuery,
    clearSearchQuery,
    searchProducts,
    isSearchActive,
    isShowingSearch,
    toggleSearch,
  };
}
