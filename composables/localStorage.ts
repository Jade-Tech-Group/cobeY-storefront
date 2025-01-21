/**
 * Retrieves the item with the specified key from the local storage.
 * 
 * @param key - The key of the item to retrieve.
 * @returns The parsed item, or null if the item does not exist.
 */
export const getItem = <T>(key: string): T | null => {
    // Get the item from the local storage
    const item = localStorage.getItem(key);
  
    // Parse the item and return it
    return item ? JSON.parse(item) : null;
  }
  
  /**
   * Sets the item with the specified key in the local storage.
   * 
   * @param key - The key of the item to set.
   * @param value - The value of the item to set.
   */
  export const setItem = <T>(key: string, value: T): void => {
    // Stringify the value and set it in the local storage
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  /**
   * Removes the item with the specified key from the local storage.
   * 
   * @param key - The key of the item to remove.
   */
  export const removeItem = (key: string): void => {
    // Remove the item from the local storage
    localStorage.removeItem(key);
  }