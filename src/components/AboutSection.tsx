import React from 'react';
import { getActiveConfig, buildWhatsAppUrl } from '../config';
import { WhatsAppIcon } from './Icons';
import { Heart, Sparkles, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const config = getActiveConfig();

  const handleContactWhatsApp = () => {
    const message = `Hi DessertLabs. I was reading about your brand on your website and would like to learn more about your services in Ilorin.`;
    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section 
      id="about" 
      className="py-16 sm:py-24 bg-[#FFFDF8] border-y border-[#4B2E24]/8"
      aria-label="About DessertLabs"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <span className="text-xs font-semibold uppercase tracking-widest text-[#B9855A] block mb-2">
          Our Story & Approach
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1B16] tracking-tight mb-6">
          About DessertLabs
        </h2>

        {/* Brand Editorial Copy */}
        <p className="text-base sm:text-lg text-[#4B2E24]/85 leading-relaxed font-normal max-w-2xl mx-auto">
          {config.aboutText}
        </p>

        {/* Three Refined Brand Pillars */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          <div className="p-6 rounded-xl bg-[#F8F1E7]/60 border border-[#4B2E24]/8">
            <span className="font-serif text-lg font-bold text-[#2B1B16] block mb-2">
              01. Handcrafted Daily
            </span>
            <p className="text-xs sm:text-sm text-[#4B2E24]/75 leading-relaxed">
              Every cake, pastry, and dessert is made with genuine care and attention to delicious flavour and visual elegance.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#F8F1E7]/60 border border-[#4B2E24]/8">
            <span className="font-serif text-lg font-bold text-[#2B1B16] block mb-2">
              02. Made for Celebrations
            </span>
            <p className="text-xs sm:text-sm text-[#4B2E24]/75 leading-relaxed">
              From birthdays and milestones to everyday cravings and intimate gifts, customized to fit your special moment.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#F8F1E7]/60 border border-[#4B2E24]/8">
            <span className="font-serif text-lg font-bold text-[#2B1B16] block mb-2">
              03. Direct Local Service
            </span>
            <p className="text-xs sm:text-sm text-[#4B2E24]/75 leading-relaxed">
              Based right here in Ilorin, we make communication effortless with fast WhatsApp ordering and local delivery.
            </p>
          </div>

        </div>

        {/* WhatsApp Consultation Action */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleContactWhatsApp}
            className="inline-flex items-center gap-2.5 bg-[#4B2E24] hover:bg-[#2B1B16] text-[#FFFDF8] px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 shadow-xs hover:shadow active:scale-98"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#FFFDF8]" />
            <span>Chat With Us on WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
};
