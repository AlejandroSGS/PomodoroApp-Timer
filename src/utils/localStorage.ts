/**
 * Saves a value to localStorage with JSON serialization.
 * 
 * @template T - The type of value to save
 * @param key - The localStorage key
 * @param value - The value to save (will be JSON stringified)
 * @returns void
 * 
 * @example
 * saveToLocalStorage('user-settings', { theme: 'dark' });
 */
export function saveToLocalStorage<T>(key: string, value: T): void {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error(`[localStorage] Error saving key "${key}":`, error);
    }
}

/**
 * Loads a value from localStorage with JSON deserialization.
 * 
 * @template T - The expected type of the deserialized value
 * @param key - The localStorage key
 * @returns The deserialized value or null if not found/error occurred
 * 
 * @example
 * const settings = loadFromLocalStorage<Settings>('user-settings');
 */
export function loadFromLocalStorage<T>(key: string): T | null {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) return null;
        return JSON.parse(serializedValue) as T;
    } catch (error) {
        console.error(`[localStorage] Error loading key "${key}":`, error);
        return null;
    }
}

/**
 * Removes a key from localStorage.
 * 
 * @param key - The localStorage key to remove
 * @returns void
 * 
 * @example
 * removeFromLocalStorage('user-settings');
 */
export function removeFromLocalStorage(key: string): void {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`[localStorage] Error removing key "${key}":`, error);
    }
}

/**
 * Clears all items from localStorage.
 * Use with caution!
 * 
 * @returns void
 */
export function clearAllLocalStorage(): void {
    try {
        localStorage.clear();
        console.log('[localStorage] All items cleared');
    } catch (error) {
        console.error('[localStorage] Error clearing all items:', error);
    }
}