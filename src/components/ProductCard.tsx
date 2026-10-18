import React, { useState, useEffect } from 'react';
import { Product } from '../data/products';
import { buildWhatsAppUrl, getActiveConfig } from '../config';
import { WhatsAppIcon } from './Icons';
import { ArrowRight, Plus, Check, Camera, Upload } from 'lucide-react';
import { useOrderTray } from '../context/OrderTrayContext';
import { getProductImage, saveProductImageLocally } from '../utils/imageStorage';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const [resolvedImage, setResolvedImage] = useState<string | undefined>(() => getProductImage(product));
  const [imageError, setImageError] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const { addToTray } = useOrderTray();
  const config = getActiveConfig();

  useEffect(() => {
    const handleUpdate = () => {
      setResolvedImage(getProductImage(product));
      setImageError(false);
    };
    window.addEventListener('dessertlabs_image_updated', handleUpdate);
    return () => window.removeEventListener('dessertlabs_image_updated', handleUpdate);
  }, [product]);

  // Quick WhatsApp message when customer taps WhatsApp directly on the card
  const handleDirectWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hi DessertLabs. I love this ${product.name} and I'd like you to recreate it for me.`;
    const url = buildWhatsAppUrl(message, config.whatsappNumber);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleQuickAddTray = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToTray({
      product,
      quantity: 1,
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        saveProductImageLocally(product.id, result);
        if (product.imagePath) {
          saveProductImageLocally(product.imagePath, result);
        }
        setResolvedImage(result);
        setImageError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const categoryNameMap: Record<string, string> = {
    cakes: 'Cake',
    pastries: 'Pastry',
    desserts: 'Dessert',
    'food-meals': 'Food & Meals',
    'special-orders': 'Special Order',
  };

  return (
    <article 
      onClick={() => onSelect(product)}
      className="group bg-[#FFFDF8] rounded-xl border border-[#4B2E24]/12 hover:border-[#4B2E24]/30 transition-all duration-200 overflow-hidden flex flex-col cursor-pointer shadow-xs hover:shadow-md"
    >
      {/* Product Image Frame (Consistent 4:3 Aspect Ratio) */}
      <div className="relative aspect-[4/3] w-full bg-[#F8F1E7] overflow-hidden border-b border-[#4B2E24]/8">
        
        {!imageError && resolvedImage ? (
          <img
            src={resolvedImage}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          /* Elegant Editorial Placeholder with direct upload action for provided asset */
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-[#F8F1E7]/70">
            <div className="w-12 h-12 rounded-full border border-[#B9855A]/40 flex items-center justify-center text-[#4B2E24] font-serif text-lg font-bold mb-1.5">
              {product.name?.charAt(0) || 'D'}
            </div>
            <span className="text-xs uppercase tracking-wider text-[#B9855A] font-medium">
              {product.category ? (categoryNameMap[product.category.toLowerCase()] || product.category) : 'DessertLabs'}
            </span>
            <span className="text-[11px] text-[#4B2E24]/60 mt-0.5 font-mono">
              {product.imagePath || 'Photo Attached'}
            </span>

            {/* Quick 1-tap upload helper for photo_1_2026-10-18_05-24-03.jpg */}
            <label 
              onClick={(e) => e.stopPropagation()}
              className="mt-2 text-[11px] font-medium text-[#4B2E24] hover:text-[#2B1B16] cursor-pointer inline-flex items-center gap-1.5 bg-[#FFFDF8] hover:bg-[#E7D7C5]/40 px-3 py-1.5 rounded-lg border border-[#4B2E24]/20 shadow-xs transition-colors"
              title="Click to select and display the uploaded photo"
            >
              <Upload className="w-3.5 h-3.5 text-[#B9855A]" />
              <span>Attach Image File</span>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileUpload}
              />
            </label>
          </div>
        )}

        {/* Category Indicator (only if provided) */}
        {product.category && (
          <div className="absolute top-3 left-3">
            <span className="text-[11px] tracking-wide font-medium text-[#4B2E24] bg-[#FFFDF8]/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-[#4B2E24]/10 shadow-xs">
              {categoryNameMap[product.category.toLowerCase()] || product.category}
            </span>
          </div>
        )}

        {/* Quick Add Tray Floating Button */}
        <button
          onClick={handleQuickAddTray}
          aria-label={`Add ${product.name} to order tray`}
          className={`absolute bottom-3 right-3 p-2 rounded-lg transition-all duration-200 shadow-sm ${
            addedAnimation 
              ? 'bg-[#B9855A] text-[#FFFDF8]' 
              : 'bg-[#FFFDF8] hover:bg-[#F8F1E7] text-[#4B2E24] border border-[#4B2E24]/15'
          }`}
          title="Add to tray"
        >
          {addedAnimation ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>

      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        
        <div>
          {/* Product Name */}
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2B1B16] leading-snug group-hover:text-[#4B2E24] transition-colors">
            {product.name}
          </h3>

          {/* Price (Only if provided) */}
          {product.price ? (
            <p className="text-sm font-semibold text-[#B9855A] mt-1.5 font-mono">
              {product.price}
            </p>
          ) : (
            <p className="text-xs text-[#4B2E24]/60 mt-1 italic">
              Price upon options & sizing
            </p>
          )}

          {/* Short Description (Only if provided) */}
          {product.description && (
            <p className="text-xs sm:text-sm text-[#4B2E24]/75 mt-2 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* Card Actions */}
        <div className="mt-4 pt-3.5 border-t border-[#4B2E24]/8 flex items-center justify-between gap-2">
          
          <button
            onClick={() => onSelect(product)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#4B2E24] hover:text-[#2B1B16] group-hover:translate-x-0.5 transition-all"
          >
            <span>Choose & Customise</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B9855A]" />
          </button>

          <button
            onClick={handleDirectWhatsApp}
            title="Enquire on WhatsApp"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
            className="inline-flex items-center gap-1.5 text-xs text-[#2B1B16] bg-[#E7D7C5]/40 hover:bg-[#E7D7C5] px-2.5 py-1.5 rounded-md transition-colors font-medium"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-[#4B2E24]" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>

        </div>

      </div>

    </article>
  );
};
