import React from 'react';
import { ArrowDown, MapPin, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { getActiveConfig, buildWhatsAppUrl } from '../config';

export const Hero: React.FC = () => {
  const config = getActiveConfig();

  const handleWhatsAppChat = () => {
    const message = `Hi DessertLabs. I am browsing your website and I'd like to make an enquiry about your cakes, pastries, and treats.`;
    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section 
      id="hero" 
      className="relative pt-28 pb-14 sm:pt-36 sm:pb-20 overflow-hidden bg-[#F8F1E7]"
      aria-label="Welcome to DessertLabs"
    >
      {/* Subtle architectural border accent */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#FFFDF8] rounded-2xl border border-[#4B2E24]/10 p-6 sm:p-10 md:p-14 shadow-xs relative overflow-hidden">
          
          {/* Subtle decorative corner accent in warm caramel */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#E7D7C5]/30 to-transparent rounded-bl-full pointer-events-none" />
          
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            
            {/* Location Line */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#4B2E24]/75 mb-4 sm:mb-5">
              <MapPin className="w-3.5 h-3.5 text-[#B9855A]" />
              <span>{config.locationLine}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#2B1B16] leading-[1.18] tracking-tight mb-5 sm:mb-6">
              {config.tagline}
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#4B2E24]/85 leading-relaxed max-w-2xl mb-8 sm:mb-10 font-normal">
              {config.supportingText}
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
              
              <a
                href="#catalogue"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#4B2E24] hover:bg-[#2B1B16] text-[#FFFDF8] px-7 py-3.5 rounded-xl font-medium text-sm sm:text-base transition-all duration-200 shadow-sm hover:shadow active:scale-98"
              >
                <span>Explore All Offerings</span>
                <ArrowDown className="w-4 h-4 text-[#E7D7C5]" />
              </a>

              <button
                onClick={handleWhatsAppChat}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#FFFDF8] hover:bg-[#F8F1E7] text-[#4B2E24] border border-[#4B2E24]/20 hover:border-[#4B2E24]/40 px-6 py-3.5 rounded-xl font-medium text-sm sm:text-base transition-all duration-200 active:scale-98"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#4B2E24]" />
                <span>Order on WhatsApp</span>
              </button>

            </div>

            {/* Curated Service Offerings Highlights */}
            <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-[#4B2E24]/8 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <span className="block font-serif text-base sm:text-lg font-semibold text-[#2B1B16]">Artisan Cakes</span>
                <span className="text-xs text-[#4B2E24]/60">Custom Celebration</span>
              </div>
              <div>
                <span className="block font-serif text-base sm:text-lg font-semibold text-[#2B1B16]">Fresh Pastries</span>
                <span className="text-xs text-[#4B2E24]/60">Baked to Order</span>
              </div>
              <div>
                <span className="block font-serif text-base sm:text-lg font-semibold text-[#2B1B16]">Dessert Cups</span>
                <span className="text-xs text-[#4B2E24]/60">Parfaits & Treats</span>
              </div>
              <div>
                <span className="block font-serif text-base sm:text-lg font-semibold text-[#2B1B16]">Food & Catering</span>
                <span className="text-xs text-[#4B2E24]/60">Ilorin & Surroundings</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
