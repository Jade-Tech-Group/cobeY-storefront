import useConf from "~/conf/useConf";
import type Product from "~/types";

let allProducts = [] as Product[];

export function useProducts() {
  // Declare the state variables and the setter functions
  const products = useState<Product[]>("products");

  /**
   * Sets the products state variable and the allProducts variable.
   * @param {Product[]} newProducts - The new products to set.
   */
  function setProducts(newProducts: Product[]): void {
    if (!Array.isArray(newProducts))
      throw new Error("Products must be an array.");
    products.value = newProducts ?? [];
    allProducts = JSON.parse(JSON.stringify(newProducts));
  }

  const updateProductList = async (): Promise<void> => {
    const { scrollToTop } = useHelpers();
    const { isFiltersActive, filterProducts } = useFiltering();
    const { isSortingActive, sortProducts } = useSorting();
    const { isSearchActive, searchProducts } = useSearching();

    scrollToTop();

    try {
      let newProducts = [...allProducts];
      if (isFiltersActive.value) newProducts = filterProducts(newProducts);
      if (isSortingActive.value) newProducts = sortProducts(newProducts);
      if (isSearchActive.value) newProducts = searchProducts(newProducts);

      products.value = newProducts;
    } catch (error) {
      console.error(error);
    }
  };


  return { products, allProducts, setProducts, updateProductList };
}
