import type Product from "~/types";

/**
 * @name useFiltering
 * @description A composable that handles the filtering of products. For reference this
 * is what the filter query looks like: ?filter=pa_color[green,blue],pa_size[md]
 */
export function useFiltering() {
  const route = useRoute();
  const router = useRouter();
  const runtimeConfig = useRuntimeConfig(); // Declare a variable for the runtime config and the filter and order functions
  const { updateProductList } = useProducts();

  const filterQuery = useState<string>("filter", () => "");

  filterQuery.value = route.query.filter as string;

  /**
   * Get the filter value from the url
   * @param {string} filterName
   * @returns {string[]} - An array of filter values
   * @example getFilter('pa_color') // ["green", "blue"]
   */
  function getFilter(filterName: string): string[] {
    return (
      filterQuery.value
        ?.split(`${filterName}[`)[1]
        ?.split("]")[0]
        ?.split(",") || []
    );
  }

  /**
   * Set the filter value in the url
   * @param {string}
   * @param {string[]}
   * @example Just like the example above, but in reverse. setFilter('pa_color', ['green', 'blue'])
   */
  function setFilter(filterName: string, filterValue: string[]) {
    let newFilterQuery = filterQuery.value || "";

    // If there are filters and filterName is not one of them, add the filter query
    if (!filterQuery.value?.includes(filterName)) {
      newFilterQuery = filterQuery.value
        ? `${filterQuery.value},${filterName}[${filterValue}]`
        : `${filterName}[${filterValue}]`;
    } else {
      // If filterValue is empty, remove the filter query
      newFilterQuery = !filterValue.length
        ? filterQuery.value.replace(
            `${filterName}[${getFilter(filterName)}]`,
            ""
          )
        : filterQuery.value.replace(
            `${filterName}[${getFilter(filterName)}]`,
            `${filterName}[${filterValue}]`
          );
    }

    // remove the first or last comma
    newFilterQuery = newFilterQuery.replace(/^,/, "").replace(/,$/, "");

    // if there is 2 or more commas in a row, replace them with one
    newFilterQuery = newFilterQuery.replace(/,{2,}/g, ",");

    // Update the filter query
    filterQuery.value = newFilterQuery;

    router.push({ query: { ...route.query, filter: newFilterQuery } });

    // remove pagination from the url
    const path = route.path.includes("/page/")
      ? route.path.split("/page/")[0]
      : route.path;

    // if the filter query is empty, remove it from the url
    if (!newFilterQuery) {
      router.push({
        path,
        query: { ...route.query, filter: undefined },
      });
    } else {
      router.push({
        path,
        query: { ...route.query, filter: newFilterQuery },
      });
    }

    setTimeout(() => {
      updateProductList();
    }, 50);
  }

  /**
   * Reset the filter value in the url
   */
  function resetFilter(): void {
    const { scrollToTop } = useHelpers();
    filterQuery.value = "";
    router.push({ query: { ...route.query, filter: undefined } });

    setTimeout(() => {
      updateProductList();
      scrollToTop();
    }, 50);
  }

  /**
   * Check if there are any filters active
   * @returns {boolean}
   */
  const isFiltersActive = computed<boolean>(() => !!filterQuery.value);

  /**
   * Filter the products based on the active filters
   * @param {Product[]} products - An array of all the products
   * @returns {Product[]} - An array of filtered products
   */
  function filterProducts(products: Product[]) {
    return products.filter((product) => {
      // Category filter
      const category = getFilter("category") || []; // ["category-slug"]
      const categoryCondition = category.length
        ? category.includes(product.category_id)
        : true;

      // price filter
      const priceRange = getFilter("price") || []; // ["0", "100"]
      // Variable products returns an array of prices, so we need to find the highest price.
      const productPrice = product.sale_price
        ? parseFloat(
            [...product.sale_price.split(",")].reduce((a, b) =>
              String(Math.max(Number(a), Number(b)))
            )
          )
        : 0;
      const priceCondition = priceRange.length
        ? productPrice >= parseFloat(priceRange[0] as string) &&
          productPrice <= parseFloat(priceRange[1] as string)
        : true;
      // onSale filter
      const onSale = getFilter("onSale") || [];
      const saleItemsOnSale = onSale.length ? product.sale_percent > 0 : true;

      // featured filter
      const featured = getFilter("featured") || [];
      const saleItemsfeatured = featured.length ? product.featured : true;
      
      return categoryCondition  && priceCondition && saleItemsfeatured && saleItemsOnSale
    });
  }

  return { getFilter, setFilter, resetFilter, isFiltersActive, filterProducts };
}
