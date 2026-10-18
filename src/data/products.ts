/**
 * DessertLabs Product Catalogue Data
 * 
 * Official products catalogue for DessertLabs in Ilorin, Nigeria.
 */

export interface Product {
  id: string;
  name: string;
  category?: string;
  imagePath?: string; // Path to uploaded asset, e.g. "/photo_2_2026-10-18_05-24-03.jpg"
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
 * Official catalogue offerings.
 */
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "frosted-cakes",
    name: "Frosted Cakes",
    category: "Cakes",
    imagePath: "/photo_1_2026-10-18_05-24-03.jpg",
    description: "Custom celebration frosted cake handcrafted with delicate frosting, custom lettering, and tailored birthday finish.",
    customizable: true,
    availableSizes: ["6-inch (Standard)", "8-inch (Medium)", "10-inch (Large)", "Bento Mini"],
    availableFlavours: ["Vanilla Sponge", "Rich Chocolate", "Red Velvet"],
    allowCustomMessage: true,
    allowDateSelection: true,
    minNotice: "Kindly order 24-48 hours in advance",
    isAvailable: true,
  },
  {
    id: "box-of-treats-frame-cake",
    name: "Box of treats plus frame and 2 layers 6\" frosted cake",
    category: "Special Packages",
    imagePath: "/photo_2_2026-10-18_05-24-03.jpg",
    description: "Celebration gift hamper featuring an assorted treat box, personalized framed artwork/photo, and a freshly baked 2-layer 6\" frosted cake.",
    customizable: true,
    availableSizes: ["6-inch 2-Layer Cake + Treat Box + Frame"],
    availableFlavours: ["Vanilla Sponge", "Rich Chocolate", "Red Velvet"],
    allowCustomMessage: true,
    allowDateSelection: true,
    minNotice: "Kindly order 48 hours in advance",
    isAvailable: true,
  },
];

const PRODUCTS_STORAGE_KEY = "dessertlabs_official_products_v4";

export function getCatalogueProducts(): Product[] {
  if (typeof window === "undefined") return INITIAL_PRODUCTS;
  try {
    // Purge older mock/empty caches
    localStorage.removeItem("dessertlabs_custom_products");
    localStorage.removeItem("dessertlabs_official_products_v2");
    localStorage.removeItem("dessertlabs_official_products_v3");
    
    const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
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
