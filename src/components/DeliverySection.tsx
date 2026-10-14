import React, { useState } from 'react';
import { getActiveConfig, buildWhatsAppUrl } from '../config';
import { WhatsAppIcon } from './Icons';
import { Truck, MapPin, Clock } from 'lucide-react';

export const DeliverySection: React.FC = () => {
  const [customerLocation, setCustomerLocation] = useState('');
  const config = getActiveConfig();

  const handleCheckDelivery = () => {
    const loc = customerLocation.trim();
    let message = '';
    if (loc) {
      message = `Hi DessertLabs. I'd like to check delivery availability and fees to my location in Ilorin: ${loc}. Could you please let me know the details?`;
    } else {
      message = `Hi DessertLabs. I'd like to check delivery availability, fees, and estimated delivery times for my location in Ilorin.`;
    }

    const url = buildWhatsAppUrl(message, config.whatsappNumber);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section 
      id="delivery" 
      className="py-16 sm:py-24 bg-[#FFFDF8] border-t border-[#4B2E24]/8"
      aria-label="Delivery Information in Ilorin"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#F8F1E7]/70 rounded-2xl border border-[#4B2E24]/12 p-6 sm:p-10 md:p-12">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            
            <div className="max-w-xl">
              
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B9855A] mb-2">
                <Truck className="w-4 h-4" />
                <span>Ilorin Delivery & Logistics</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B1B16] mb-4">
                Delivery Information
              </h2>

              <p className="text-sm sm:text-base text-[#4B2E24]/85 leading-relaxed mb-6 font-normal">
                {config.deliveryNotice}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#4B2E24]/80">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#B9855A] shrink-0 mt-0.5" />
                  <span>Coverage includes Ilorin metropolis and confirmed surrounding areas.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#B9855A] shrink-0 mt-0.5" />
                  <span>Exact delivery fees and dispatch times are calculated based on your specific drop-off point.</span>
                </div>
              </div>

            </div>

            {/* Quick Location Enquiry Box */}
            <div className="bg-[#FFFDF8] rounded-xl p-5 border border-[#4B2E24]/15 shadow-xs w-full md:w-80 shrink-0">
              <label htmlFor="delivery-area-check" className="block text-xs font-semibold text-[#2B1B16] mb-2">
                Check Your Location
              </label>
              
              <div className="space-y-3">
                <input
                  id="delivery-area-check"
                  type="text"
                  placeholder="e.g. Tanke, GRA, Fate, Basin..."
                  value={customerLocation}
                  onChange={(e) => setCustomerLocation(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#4B2E24]/20 bg-[#FFFDF8] text-[#2B1B16] placeholder-[#4B2E24]/40 focus:outline-none focus:ring-2 focus:ring-[#B9855A]"
                />

                <button
                  onClick={handleCheckDelivery}
                  className="w-full flex items-center justify-center gap-2 bg-[#4B2E24] hover:bg-[#2B1B16] text-[#FFFDF8] py-2.5 px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors shadow-xs active:scale-98"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#FFFDF8]" />
                  <span>Check Delivery on WhatsApp</span>
                </button>
              </div>

              <span className="block text-[11px] text-[#4B2E24]/60 mt-2 text-center">
                Instant response from DessertLabs team
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
