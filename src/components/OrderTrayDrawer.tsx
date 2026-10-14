import React, { useState } from 'react';
import { useOrderTray } from '../context/OrderTrayContext';
import { WhatsAppIcon } from './Icons';
import { X, Trash2, Plus, Minus, MapPin, Calendar, ShoppingBag } from 'lucide-react';

export const OrderTrayDrawer: React.FC = () => {
  const { items, isTrayOpen, setIsTrayOpen, updateQuantity, removeFromTray, clearTray, sendTrayOrderToWhatsApp } = useOrderTray();
  const [deliveryArea, setDeliveryArea] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');

  if (!isTrayOpen) return null;

  const handleSendOrder = () => {
    sendTrayOrderToWhatsApp({
      deliveryArea: deliveryArea.trim() || undefined,
      preferredDate: preferredDate || undefined,
      notes: generalNotes.trim() || undefined,
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-[#2B1B16]/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tray-title"
      onClick={() => setIsTrayOpen(false)}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#FFFDF8] h-full shadow-2xl flex flex-col border-l border-[#4B2E24]/15 animate-in slide-in-from-right duration-200"
      >
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#4B2E24]/10 bg-[#F8F1E7]/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#B9855A]" />
            <h2 id="tray-title" className="font-serif text-lg sm:text-xl font-bold text-[#2B1B16]">
              Your Selection Tray
            </h2>
            <span className="text-xs bg-[#E7D7C5] text-[#2B1B16] px-2 py-0.5 rounded-full font-medium">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            onClick={() => setIsTrayOpen(false)}
            className="p-1.5 rounded-lg text-[#4B2E24] hover:bg-[#E7D7C5]/50 transition-colors"
            aria-label="Close selection tray"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {items.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-[#4B2E24]/60">
              <ShoppingBag className="w-12 h-12 text-[#E7D7C5] mb-3" />
              <p className="font-serif text-base font-medium text-[#2B1B16]">Your tray is currently empty</p>
              <p className="text-xs mt-1 max-w-xs">
                Browse our catalogue and click &quot;Add to Tray&quot; or choose products to prepare an order enquiry.
              </p>
            </div>
          ) : (
            <>
              {/* List of Selected Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div 
                    key={item.instanceId} 
                    className="p-3.5 rounded-xl border border-[#4B2E24]/10 bg-[#F8F1E7]/40 flex flex-col gap-2 relative"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-serif text-sm font-bold text-[#2B1B16]">
                          {item.product.name}
                        </h4>
                        
                        {/* Options Summary */}
                        <div className="text-[11px] text-[#4B2E24]/70 space-y-0.5 mt-1">
                          {item.selectedSize && <p>· Size: {item.selectedSize}</p>}
                          {item.selectedFlavour && <p>· Flavour: {item.selectedFlavour}</p>}
                          {item.customMessage && <p>· Message: &quot;{item.customMessage}&quot;</p>}
                          {item.preferredDate && <p>· Date: {item.preferredDate}</p>}
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromTray(item.instanceId)}
                        className="text-[#4B2E24]/50 hover:text-red-700 p-1"
                        aria-label={`Remove ${item.product.name}`}
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity Selector inside Tray Item */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#4B2E24]/8 mt-1">
                      <span className="text-xs text-[#4B2E24]/70 font-medium">Quantity</span>
                      <div className="flex items-center gap-2 bg-[#FFFDF8] rounded-md border border-[#4B2E24]/15 px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.instanceId, item.quantity - 1)}
                          className="text-[#4B2E24] hover:text-[#2B1B16]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold w-5 text-center text-[#2B1B16]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.instanceId, item.quantity + 1)}
                          className="text-[#4B2E24] hover:text-[#2B1B16]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear all tray items */}
              <div className="flex justify-end">
                <button
                  onClick={clearTray}
                  className="text-xs text-[#4B2E24]/60 hover:text-red-700 transition-colors"
                >
                  Clear all items
                </button>
              </div>

              {/* Delivery & Schedule Preferences */}
              <div className="pt-3 border-t border-[#4B2E24]/10 space-y-3">
                <span className="block text-xs font-semibold text-[#2B1B16] uppercase tracking-wider">
                  Order Details for WhatsApp
                </span>

                <div>
                  <label htmlFor="tray-delivery-area" className="block text-xs text-[#4B2E24]/80 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#B9855A]" />
                    <span>Delivery Location in Ilorin (Optional)</span>
                  </label>
                  <input
                    id="tray-delivery-area"
                    type="text"
                    placeholder="e.g. GRA, Basin, Fate, Tanke..."
                    value={deliveryArea}
                    onChange={(e) => setDeliveryArea(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-[#4B2E24]/20 bg-[#FFFDF8] text-[#2B1B16] focus:outline-none focus:ring-1 focus:ring-[#B9855A]"
                  />
                </div>

                <div>
                  <label htmlFor="tray-preferred-date" className="block text-xs text-[#4B2E24]/80 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-[#B9855A]" />
                    <span>Preferred Date (Optional)</span>
                  </label>
                  <input
                    id="tray-preferred-date"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-[#4B2E24]/20 bg-[#FFFDF8] text-[#2B1B16] focus:outline-none focus:ring-1 focus:ring-[#B9855A]"
                  />
                </div>

                <div>
                  <label htmlFor="tray-notes" className="block text-xs text-[#4B2E24]/80 mb-1">
                    General Instructions / Questions
                  </label>
                  <textarea
                    id="tray-notes"
                    rows={2}
                    placeholder="Any special timing or requirements..."
                    value={generalNotes}
                    onChange={(e) => setGeneralNotes(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-[#4B2E24]/20 bg-[#FFFDF8] text-[#2B1B16] focus:outline-none focus:ring-1 focus:ring-[#B9855A] resize-none"
                  />
                </div>
              </div>
            </>
          )}

        </div>

        {/* Drawer Footer with WhatsApp Action */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#4B2E24]/10 bg-[#FFFDF8] space-y-2">
            
            <button
              onClick={handleSendOrder}
              className="w-full flex items-center justify-center gap-2.5 bg-[#4B2E24] hover:bg-[#2B1B16] text-[#FFFDF8] py-3.5 px-4 rounded-xl font-medium text-sm transition-all duration-200 shadow-sm active:scale-98"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#FFFDF8]" />
              <span>Send Order on WhatsApp ({items.length})</span>
            </button>

            <p className="text-[11px] text-center text-[#4B2E24]/60 leading-tight">
              Tapping opens WhatsApp directly with your prepared items. No payment is taken on this site; prices and delivery are confirmed directly with DessertLabs.
            </p>

          </div>
        )}

      </div>
    </div>
  );
};
