/**
 * DessertLabs Product Catalogue Data
 * 
 * Official products catalogue for DessertLabs in Ilorin, Nigeria.
 */

export interface Product {
  id: string;
  name: string;
  category?: string;
  imagePath?: string; // Path to uploaded asset, e.g. "/images/small-foil-cake.jpg"
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
    imagePath: "/images/frosted-cakes.jpg",
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
    imagePath: "/images/box-of-treats.jpg",
    description: "Celebration gift hamper featuring an assorted treat box, personalized framed artwork/photo, and a freshly baked 2-layer 6\" frosted cake.",
    customizable: true,
    availableSizes: ["6-inch 2-Layer Cake + Treat Box + Frame"],
    availableFlavours: ["Vanilla Sponge", "Rich Chocolate", "Red Velvet"],
    allowCustomMessage: true,
    allowDateSelection: true,
    minNotice: "Kindly order 48 hours in advance",
    isAvailable: true,
  },
  {
    id: "food-box",
    name: "Food Box",
    category: "Food & Meals",
    imagePath: "/images/food-box.jpg",
    description: "Complete celebration feast hamper featuring delicious fried rice, seasoned chicken, fresh sides, fruit, refreshing beverage, and a custom mini frosted Bento cake.",
    customizable: true,
    availableSizes: ["Standard Celebration Food Box", "Deluxe Food Box"],
    allowCustomMessage: true,
    allowDateSelection: true,
    minNotice: "Kindly order 24-48 hours in advance",
    isAvailable: true,
  },
  {
    id: "small-foil-cake",
    name: "Small Foil Cake",
    category: "Cakes",
    imagePath: "/images/small-foil-cake.jpg",
    description: "Freshly baked golden sponge cake in an individual foil container. Moist, fluffy, and perfect for quick cravings, tea time, or party souvenirs.",
    customizable: true,
    availableSizes: ["Small Foil (Individual Portion)"],
    availableFlavours: ["Classic Vanilla Sponge", "Rich Chocolate", "Red Velvet"],
    allowCustomMessage: true,
    allowDateSelection: true,
    minNotice: "Available for same-day delivery or advance order",
    isAvailable: true,
  },
  {
    id: "red-velvet-foil-cake",
    name: "Red Velvet foil Cake",
    category: "Cakes",
    imagePath: "/images/red-velvet-foil-cake.jpg",
    description: "Decadent, freshly baked deep-red velvet cake sealed in a foil container with the official DessertLab seal and spoon. Precision in every bite.",
    customizable: true,
    availableSizes: ["Foil Container (Standard)"],
    availableFlavours: ["Signature Red Velvet"],
    allowCustomMessage: true,
    allowDateSelection: true,
    minNotice: "Available for same-day delivery or advance order",
    isAvailable: true,
  },
  {
    id: "frosted-foil-cake",
    name: "Frosted Foil Cake",
    category: "Cakes",
    imagePath: "/photo_6_2026-10-18_05-24-03.jpg",
    description: "Delightful foil container cake decorated with smooth white frosting, piped rosette swirls, festive sprinkles, and edible shimmer.",
    customizable: true,
    availableSizes: ["Foil Container (Single Portion)"],
    availableFlavours: ["Vanilla Sponge", "Rich Chocolate", "Red Velvet"],
    allowCustomMessage: true,
    allowDateSelection: true,
    minNotice: "Available for same-day delivery or advance order",
    isAvailable: true,
  },
  {
    id: "big-foil-cake",
    name: "Big Foil Cake",
    category: "Cakes",
    imagePath: "/photo_4_2026-10-18_05-24-03.jpg",
    description: "Generously sized, freshly baked rich chocolate foil cake packaged with the official DessertLab seal and spoon. Precision in every bite.",
    customizable: true,
    availableSizes: ["Big Foil (Standard)"],
    availableFlavours: ["Rich Chocolate", "Vanilla", "Red Velvet"],
    allowCustomMessage: true,
    allowDateSelection: true,
    minNotice: "Available for same-day delivery or advance order",
    isAvailable: true,
  },
  {
    id: "money-bouquet",
    name: "Money Bouquet",
    category: "Special Orders",
    imagePath: "/photo_3_2026-10-18_05-24-03.jpg",
    description: "Handcrafted celebration money bouquet beautifully arranged with rose accents, premium designer wrapping, and personalized presentation.",
    customizable: true,
    availableSizes: ["Custom Denomination & Sizing"],
    allowCustomMessage: true,
    allowDateSelection: true,
    minNotice: "Kindly order in advance to arrange preferred denominations",
    isAvailable: true,
  },
];

const PRODUCTS_STORAGE_KEY = "dessertlabs_official_products_v11";

export function getCatalogueProducts(): Product[] {
  if (typeof window === "undefined") return INITIAL_PRODUCTS;
  try {
    // Purge older mock/empty caches
    localStorage.removeItem("dessertlabs_custom_products");
    localStorage.removeItem("dessertlabs_official_products_v2");
    localStorage.removeItem("dessertlabs_official_products_v3");
    localStorage.removeItem("dessertlabs_official_products_v4");
    localStorage.removeItem("dessertlabs_official_products_v5");
    localStorage.removeItem("dessertlabs_official_products_v6");
    localStorage.removeItem("dessertlabs_official_products_v7");
    localStorage.removeItem("dessertlabs_official_products_v8");
    localStorage.removeItem("dessertlabs_official_products_v9");
    localStorage.removeItem("dessertlabs_official_products_v10");
    
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
