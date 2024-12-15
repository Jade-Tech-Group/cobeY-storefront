// Example: ?search=shirt
export function useSearching() {
    const route = useRoute();
    const router = useRouter();
  
    const isShowingSearch = useState<boolean>('isShowingSearch', () => false);
    const searchQuery = useState<string>('searchQuery', () => '');
    const isSearchActive = computed<boolean>(() => !!searchQuery.value);
  
    searchQuery.value = route.query.search as string;
  
    function getSearchQuery(): string {
      return route.query.search as string;
    }
  
    function setSearchQuery(search: string): void {
      
    }
  
    function clearSearchQuery(): void {
      setSearchQuery('');
    }
  
    const toggleSearch = (): void => {
      isShowingSearch.value = !isShowingSearch.value;
    };
  
    function searchProducts(){}
      
  
    return { getSearchQuery, setSearchQuery, clearSearchQuery, searchProducts, isSearchActive, isShowingSearch, toggleSearch };
  }
  