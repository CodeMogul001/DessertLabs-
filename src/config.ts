/**
 * DessertLabs Website Configuration
 * 
 * Replace placeholders with official business details as they are supplied.
 */

export interface BusinessConfig {
  businessName: string;
  tagline: string;
  supportingText: string;
  locationLine: string;
  locationFullName: string;
  deliveryNotice: string;
  aboutText: string;
  
  // WhatsApp Configuration
  // Digits only, including 234 country code, no +, spaces, or leading 0.
  // Example: "2348012345678"
  whatsappNumber: string;
  
  // TikTok Configuration
  tiktokUrl: string;
  tiktokHandle: string;
  
  // Official Logo Path (e.g. "/logo.png" or "/dessertlabs-logo.png" when uploaded)
  logoUrl: string;
}

export const INITIAL_CONFIG: BusinessConfig = {
  businessName: "DessertLabs",
  tagline: "A Little Sweetness, Made for Every Moment.",
  supportingText: "From beautiful cakes and delicious pastries to satisfying meals, discover something special at DessertLabs.",
  locationLine: "Made with care in Ilorin, delivered to you.",
  locationFullName: "Ilorin, Kwara State, Nigeria",
  deliveryNotice: "Enjoy your favourites delivered to you. Contact us on WhatsApp to confirm delivery availability, fees, and estimated delivery time for your location.",
  aboutText: "At DessertLabs, we believe good food makes everyday moments more special. From cakes and pastries to delicious meals, we're here to help you find something you'll love. Based in Ilorin, we make it easy to explore our offerings and place your order directly with us.",
  
  // Official WhatsApp number: +234 702 581 5616
  whatsappNumber: "2347025815616",
  
  // Official TikTok profile URL
  tiktokUrl: "https://www.tiktok.com/@thedessertlab_ng?_r=1&_t=ZS-9AVixqx8mhw",
  tiktokHandle: "@thedessertlab_ng",
  
  // Logo path: When uploaded to /public/logo.png, set to "/logo.png"
  logoUrl: "",
};

/**
 * Storage key for user-customized config in preview/testing
 */
const CONFIG_STORAGE_KEY = "dessertlabs_config_v2";

export function getActiveConfig(): BusinessConfig {
  if (typeof window === "undefined") return INITIAL_CONFIG;
  try {
    localStorage.removeItem("dessertlabs_config_override");
    const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (saved) {
      return { ...INITIAL_CONFIG, ...JSON.parse(saved) };
    }
  } catch {
    // fallback
  }
  return INITIAL_CONFIG;
}

export function saveActiveConfig(config: Partial<BusinessConfig>): void {
  try {
    const current = getActiveConfig();
    const updated = { ...current, ...config };
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save config to localStorage", e);
  }
}

/**
 * Formats WhatsApp click-to-chat URL:
 * https://wa.me/WHATSAPPNUMBER?text=ENCODED_MESSAGE
 */
export function buildWhatsAppUrl(message: string, overrideNumber?: string): string {
  const config = getActiveConfig();
  const rawNumber = overrideNumber || config.whatsappNumber;
  // Sanitize: remove any non-digit characters
  const cleanNumber = rawNumber.replace(/\D/g, "");
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}
