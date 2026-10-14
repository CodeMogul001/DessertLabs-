import React, { useMemo } from 'react';
import { Product, getCatalogueProducts } from '../data/products';
import { ProductCard } from './ProductCard';
import { WhatsAppIcon } from './Icons';
import { buildWhatsAppUrl, getActiveConfig } from '../config';
import { Sparkles, MessageCircle } from 'lucide-react';

interface CatalogueSectionProps {
  onSelectProduct: (product: Product) => void;
  onOpenSettings?: () => void;
}

export const CatalogueSection: React.FC<CatalogueSectionProps> = ({ onSelectProduct, onOpenSettings }) => {
  const products = useMemo(() => getCatalogueProducts(), []);
  const config = getActiveConfig();

  const handleCustomOrderWhatsApp = () => {
    const message = `Hi DessertLabs. I am visiting your website and I would like to inquire about your available cakes, pastries, and treats, or place a custom order.`;
    const url = buildWhatsAppUrl(message, config.whatsappNumber);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section 
      id="catalogue" 
      className="py-16 sm:py-24 bg-[#F8F1E7]"
      aria-label="DessertLabs All Offerings"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B9855A] block mb-2">
            The Menu
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1B16] tracking-tight">
            All Offerings
          </h2>
          <p className="text-sm sm:text-base text-[#4B2E24]/75 mt-3 leading-relaxed">
            Explore what DessertLabs has to offer, made with care in Ilorin. Contact us directly on WhatsApp to check availability, place orders, or request custom designs.
          </p>
        </div>

        {/* Products Grid or Awaiting Products State */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          /* Clean State: Awaiting the user's preferred products */
          <div className="bg-[#FFFDF8] rounded-2xl border border-[#4B2E24]/12 p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-xs">
            <div className="w-14 h-14 rounded-full bg-[#F8F1E7] border border-[#B9855A]/30 flex items-center justify-center mx-auto mb-4 text-[#B9855A]">
              <Sparkles className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1B16]">
              All Offerings
            </h3>

            <p className="text-xs sm:text-sm text-[#4B2E24]/80 mt-3 max-w-md mx-auto leading-relaxed">
              Our official catalogue is being prepared with our confirmed menu items. You can reach out directly on WhatsApp to explore today&apos;s available cakes, pastries, and custom orders.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleCustomOrderWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#4B2E24] hover:bg-[#2B1B16] text-[#FFFDF8] px-6 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 shadow-xs hover:shadow active:scale-98"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#FFFDF8]" />
                <span>Enquire or Order on WhatsApp</span>
              </button>

              {onOpenSettings && (
                <button
                  onClick={onOpenSettings}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFFDF8] hover:bg-[#F8F1E7] text-[#4B2E24] border border-[#4B2E24]/20 px-5 py-3.5 rounded-xl font-medium text-sm transition-all"
                >
                  <span>Manage Products</span>
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
