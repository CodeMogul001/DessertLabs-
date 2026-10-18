import React, { useState, useEffect } from 'react';
import { Product } from '../data/products';
import { buildWhatsAppUrl, getActiveConfig } from '../config';
import { WhatsAppIcon } from './Icons';
import { X, Plus, Minus, Calendar, ShoppingBag, Check } from 'lucide-react';
import { useOrderTray } from '../context/OrderTrayContext';
import { ProductVisual } from './ProductVisual';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedFlavour, setSelectedFlavour] = useState<string>('');
  const [customMessage, setCustomMessage] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  const [addedToTrayFeedback, setAddedToTrayFeedback] = useState(false);

  const { addToTray } = useOrderTray();
  const config = getActiveConfig();

  // Reset state when a product is opened
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedSize(product.availableSizes?.[0] || '');
      setSelectedFlavour(product.availableFlavours?.[0] || '');
      setCustomMessage('');
      setPreferredDate('');
      setAdditionalNotes('');
      setAddedToTrayFeedback(false);
      // Lock body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product) return null;

  // Build the prefilled WhatsApp message according to the prompt specifications
  const constructWhatsAppMessage = (): string => {
    let msg = `Hi DessertLabs. I love this ${product.name} and I'd like you to recreate it for me.\n`;
    if (quantity > 1) {
      msg += `Quantity: ${quantity}\n`;
    }
    if (selectedSize) {
      msg += `Size / Portion: ${selectedSize}\n`;
    }
    if (selectedFlavour) {
      msg += `Flavour: ${selectedFlavour}\n`;
    }
    if (customMessage.trim()) {
      msg += `Custom Inscription / Details: "${customMessage.trim()}"\n`;
    }
    if (preferredDate) {
      msg += `Preferred Date: ${preferredDate}\n`;
    }
    if (additionalNotes.trim()) {
      msg += `Special Requests: ${additionalNotes.trim()}\n`;
    }

    return msg.trim();
  };

  const handleOrderOnWhatsApp = () => {
    const message = constructWhatsAppMessage();
    const url = buildWhatsAppUrl(message, config.whatsappNumber);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAddToOrderTray = () => {
    addToTray({
      product,
      quantity,
      selectedSize: selectedSize || undefined,
      selectedFlavour: selectedFlavour || undefined,
      customMessage: customMessage.trim() || undefined,
      preferredDate: preferredDate || undefined,
      additionalNotes: additionalNotes.trim() || undefined,
    });
    setAddedToTrayFeedback(true);
    setTimeout(() => {
      setAddedToTrayFeedback(false);
      onClose();
    }, 800);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#2B1B16]/70 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FFFDF8] rounded-2xl border border-[#4B2E24]/20 max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
      >
        
        {/* Modal Top Navigation / Close Button */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#4B2E24]/10 bg-[#F8F1E7]/50">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#B9855A]">
              Product Selection
            </span>
            {product.category && (
              <span className="text-xs text-[#4B2E24]/60">· {product.category}</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#4B2E24] hover:bg-[#E7D7C5]/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B9855A]"
            aria-label="Close product selection"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1">
          
          {/* Header Image & Title */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
            
            <div className="sm:col-span-5 aspect-[4/3] rounded-xl overflow-hidden bg-[#F8F1E7] border border-[#4B2E24]/10 relative">
              <ProductVisual product={product} className="w-full h-full" />
            </div>

            <div className="sm:col-span-7 flex flex-col justify-between">
              <div>
                <h2 id="modal-product-title" className="font-serif text-xl sm:text-2xl font-bold text-[#2B1B16]">
                  {product.name}
                </h2>
                
                {product.price ? (
                  <p className="text-base font-semibold text-[#B9855A] mt-1 font-mono">
                    {product.price}
                  </p>
                ) : (
                  <p className="text-xs text-[#4B2E24]/60 mt-1 italic">
                    Price shared upon selecting details
                  </p>
                )}

                {product.description && (
                  <p className="text-xs sm:text-sm text-[#4B2E24]/80 mt-2 leading-relaxed">
                    {product.description}
                  </p>
                )}
              </div>

              {product.minNotice && (
                <div className="mt-3 text-[11px] text-[#B9855A] bg-[#F8F1E7] px-2.5 py-1.5 rounded-md border border-[#E7D7C5]">
                  {product.minNotice}
                </div>
              )}
            </div>

          </div>

          {/* Quantity Selector */}
          <div className="bg-[#F8F1E7]/50 rounded-xl p-3.5 border border-[#4B2E24]/8 flex items-center justify-between">
            <div>
              <span className="block text-xs font-semibold text-[#2B1B16]">Quantity</span>
              <span className="text-[11px] text-[#4B2E24]/60">Select number of portions / items</span>
            </div>
            
            <div className="flex items-center gap-2 bg-[#FFFDF8] rounded-lg border border-[#4B2E24]/15 px-2 py-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 text-[#4B2E24] hover:bg-[#F8F1E7] rounded disabled:opacity-30"
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center font-semibold text-sm text-[#2B1B16]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 text-[#4B2E24] hover:bg-[#F8F1E7] rounded"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Size or Portion Options (If provided) */}
          {product.availableSizes && product.availableSizes.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-[#2B1B16] mb-1.5">
                Size or Portion
              </label>
              <div className="grid grid-cols-2 gap-2">
                {product.availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`text-xs py-2 px-3 rounded-lg border text-left transition-colors font-medium ${
                      selectedSize === size
                        ? 'bg-[#4B2E24] text-[#FFFDF8] border-[#4B2E24]'
                        : 'bg-[#FFFDF8] text-[#2B1B16] border-[#4B2E24]/15 hover:border-[#4B2E24]/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Flavour Options (If provided) */}
          {product.availableFlavours && product.availableFlavours.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-[#2B1B16] mb-1.5">
                Flavour Selection
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.availableFlavours.map((flavour) => (
                  <button
                    key={flavour}
                    type="button"
                    onClick={() => setSelectedFlavour(flavour)}
                    className={`text-xs py-2 px-3 rounded-lg border text-center transition-colors font-medium truncate ${
                      selectedFlavour === flavour
                        ? 'bg-[#4B2E24] text-[#FFFDF8] border-[#4B2E24]'
                        : 'bg-[#FFFDF8] text-[#2B1B16] border-[#4B2E24]/15 hover:border-[#4B2E24]/40'
                    }`}
                  >
                    {flavour}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom Inscription / Message on Cake */}
          {product.allowCustomMessage && (
            <div>
              <label htmlFor="custom-msg-input" className="block text-xs font-semibold text-[#2B1B16] mb-1">
                Custom Inscription / Lettering
              </label>
              <input
                id="custom-msg-input"
                type="text"
                placeholder='e.g. "Happy 25th Birthday Fatima!"'
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#4B2E24]/20 bg-[#FFFDF8] text-[#2B1B16] placeholder-[#4B2E24]/40 focus:outline-none focus:ring-2 focus:ring-[#B9855A]"
              />
            </div>
          )}

          {/* Preferred Delivery / Pickup Date */}
          {product.allowDateSelection && (
            <div>
              <label htmlFor="preferred-date-input" className="block text-xs font-semibold text-[#2B1B16] mb-1">
                Preferred Delivery or Pickup Date
              </label>
              <div className="relative">
                <input
                  id="preferred-date-input"
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#4B2E24]/20 bg-[#FFFDF8] text-[#2B1B16] focus:outline-none focus:ring-2 focus:ring-[#B9855A]"
                />
              </div>
            </div>
          )}

          {/* Additional Instructions */}
          <div>
            <label htmlFor="additional-notes-input" className="block text-xs font-semibold text-[#2B1B16] mb-1">
              Additional Instructions / Questions
            </label>
            <textarea
              id="additional-notes-input"
              rows={2}
              placeholder="Any specific requests, allergies, or questions for DessertLabs..."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-[#4B2E24]/20 bg-[#FFFDF8] text-[#2B1B16] placeholder-[#4B2E24]/40 focus:outline-none focus:ring-2 focus:ring-[#B9855A] resize-none"
            />
          </div>

          {/* Live WhatsApp Message Preview */}
          <div className="bg-[#F8F1E7] rounded-xl p-3 border border-[#E7D7C5]">
            <span className="block text-[11px] font-semibold text-[#4B2E24] uppercase tracking-wider mb-1">
              WhatsApp Message Preview
            </span>
            <p className="text-xs text-[#4B2E24]/80 whitespace-pre-wrap font-sans leading-relaxed bg-[#FFFDF8] p-2.5 rounded-lg border border-[#4B2E24]/10">
              {constructWhatsAppMessage()}
            </p>
          </div>

        </div>

        {/* Modal Action Buttons */}
        <div className="px-5 py-4 border-t border-[#4B2E24]/10 bg-[#FFFDF8] flex flex-col sm:flex-row items-center gap-3">
          
          {/* Primary Action: Direct WhatsApp Order */}
          <button
            onClick={handleOrderOnWhatsApp}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 bg-[#4B2E24] hover:bg-[#2B1B16] text-[#FFFDF8] py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 shadow-xs hover:shadow active:scale-98"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#FFFDF8]" />
            <span>Order This on WhatsApp</span>
          </button>

          {/* Secondary Action: Add to Order Tray */}
          <button
            onClick={handleAddToOrderTray}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
              addedToTrayFeedback
                ? 'bg-[#B9855A] text-[#FFFDF8] border-[#B9855A]'
                : 'bg-[#FFFDF8] hover:bg-[#F8F1E7] text-[#4B2E24] border-[#4B2E24]/20'
            }`}
          >
            {addedToTrayFeedback ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Tray</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-[#B9855A]" />
                <span>Add to Tray</span>
              </>
            )}
          </button>

        </div>

      </div>
    </div>
  );
};
