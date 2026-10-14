/**
 * DessertLabs Product Catalogue Data
 * 
 * Only official products confirmed by the owner should be added here.
 * All made-up product names have been removed.
 */

export interface Product {
  id: string;
  name: string;
  category?: string;
  imagePath?: string; // Path to uploaded asset, e.g. "/images/my-cake.jpg"
  price?: string; // Optional: specify if confirmed, e.g. "₦15,000" or leave undefined
  description?: string; // Optional short description
  customizable?: boolean;
  availableSizes?: string[];
  availableFlavours?: string[];
  allowCustomMessage?: boolean;
  allowDateSelection?: boolean;
  minNotice?: string;
  isAvailable?: boolean;
}

/**
 * Initial catalogue list.
 * Kept strictly empty of made-up names until the owner provides their preferred choices.
 */
export const INITIAL_PRODUCTS: Product[] = [];

const PRODUCTS_STORAGE_KEY = "dessertlabs_official_products_v2";

export function getCatalogueProducts(): Product[] {
  if (typeof window === "undefined") return INITIAL_PRODUCTS;
  try {
    // Purge old mock products cache if present
    localStorage.removeItem("dessertlabs_custom_products");
    
    const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  return INITIAL_PRODUCTS;
}

export function saveCatalogueProducts(products: Product[]): void {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error("Failed to save products", e);
  }
}
