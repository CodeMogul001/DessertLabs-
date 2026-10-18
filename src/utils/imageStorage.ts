/**
 * Client-side product image resolver and storage utility.
 * Allows official uploaded assets (like photo_1_2026-10-18_05-24-03.jpg)
 * to be stored and displayed seamlessly.
 */

export function getProductImage(product: { id: string; imagePath?: string }): string | undefined {
  if (typeof window !== 'undefined') {
    try {
      const byId = localStorage.getItem(`dessertlabs_img_${product.id}`);
      if (byId) return byId;
      if (product.imagePath) {
        const byPath = localStorage.getItem(`dessertlabs_img_${product.imagePath}`);
        if (byPath) return byPath;
      }
    } catch {
      // ignore
    }
  }
  return product.imagePath;
}

export function saveProductImageLocally(productIdOrPath: string, dataUrl: string): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`dessertlabs_img_${productIdOrPath}`, dataUrl);
      window.dispatchEvent(new Event('dessertlabs_image_updated'));
    } catch (e) {
      console.warn('Storage quota exceeded or error saving image', e);
    }
  }
}
