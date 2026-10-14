import React from 'react';
import { WhatsAppIcon } from './Icons';
import { buildWhatsAppUrl, getActiveConfig } from '../config';
import { useOrderTray } from '../context/OrderTrayContext';
import { ShoppingBag } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const { totalCount, setIsTrayOpen } = useOrderTray();
  const config = getActiveConfig();

  const handleFloatingWhatsApp = () => {
    const message = `Hi DessertLabs. I am browsing your website from Ilorin and would like to make an enquiry.`;
    const url = buildWhatsAppUrl(message, config.whatsappNumber);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-30 flex flex-col items-end gap-2.5 pointer-events-none">
      
      {/* Floating Order Tray Button (Appears if user has selected items) */}
      {totalCount > 0 && (
        <button
          onClick={() => setIsTrayOpen(true)}
          className="pointer-events-auto inline-flex items-center gap-2 bg-[#2B1B16] text-[#FFFDF8] px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:bg-[#4B2E24] active:scale-95 transition-all text-xs font-semibold border border-[#E7D7C5]/30"
          aria-label={`Open order tray with ${totalCount} items`}
        >
          <ShoppingBag className="w-4 h-4 text-[#B9855A]" />
          <span>Tray ({totalCount})</span>
        </button>
      )}

      {/* Floating WhatsApp Direct Chat Button */}
      <button
        onClick={handleFloatingWhatsApp}
        className="pointer-events-auto p-3.5 sm:p-4 rounded-full bg-[#4B2E24] hover:bg-[#2B1B16] text-[#FFFDF8] shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 border border-[#FFFDF8]/20 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B9855A]"
        aria-label="Chat directly with DessertLabs on WhatsApp"
        title="Chat with DessertLabs on WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6 text-[#FFFDF8]" />
      </button>

    </div>
  );
};
