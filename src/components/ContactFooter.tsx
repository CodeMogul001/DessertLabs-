import React from 'react';
import { getActiveConfig, buildWhatsAppUrl } from '../config';
import { WhatsAppIcon, TikTokIcon } from './Icons';
import { MapPin, ArrowUp, Settings } from 'lucide-react';

interface ContactFooterProps {
  onOpenSettings?: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ onOpenSettings }) => {
  const config = getActiveConfig();

  const handleWhatsAppChat = () => {
    const message = `Hi DessertLabs. I am visiting your website and would like to reach out.`;
    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#2B1B16] text-[#FFFDF8] pt-16 pb-12 border-t border-[#4B2E24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#FFFDF8]/10">
          
          {/* Brand & Summary */}
          <div className="md:col-span-5 space-y-4">
            {config.logoUrl ? (
              <img
                src={config.logoUrl}
                alt="DessertLabs"
                className="h-10 w-auto object-contain brightness-0 invert opacity-90"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : null}

            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FFFDF8] block">
                DessertLabs
              </span>
              <span className="text-xs tracking-wider uppercase text-[#B9855A] font-medium">
                Cakes · Pastries · Desserts · Meals
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#FFFDF8]/70 max-w-sm leading-relaxed">
              Crafting sweet moments and freshly baked delights for celebrations, events, and everyday cravings in Ilorin, Nigeria.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#FFFDF8]/80 pt-1">
              <MapPin className="w-4 h-4 text-[#B9855A]" />
              <span>{config.locationFullName}</span>
            </div>
          </div>

          {/* Navigation Shortcuts */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B9855A] block">
              Quick Navigation
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-[#FFFDF8]/80">
              <li>
                <a href="#hero" className="hover:text-[#FFFDF8] transition-colors">Home</a>
              </li>
              <li>
                <a href="#catalogue" className="hover:text-[#FFFDF8] transition-colors">All Offerings</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#FFFDF8] transition-colors">About Us</a>
              </li>
              <li>
                <a href="#delivery" className="hover:text-[#FFFDF8] transition-colors">Delivery Information</a>
              </li>
            </ul>
          </div>

          {/* Official Contact & Socials */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B9855A] block">
              Direct Contact & Socials
            </span>
            
            <p className="text-xs text-[#FFFDF8]/70">
              Orders and enquiries are handled directly through official WhatsApp for fast, personalized assistance.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={handleWhatsAppChat}
                className="inline-flex items-center justify-center gap-2 bg-[#B9855A] hover:bg-[#A5734A] text-[#FFFDF8] px-4 py-2.5 rounded-lg text-xs font-medium transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp Enquiry</span>
              </button>

              <a
                href={config.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#FFFDF8]/10 hover:bg-[#FFFDF8]/20 text-[#FFFDF8] px-4 py-2.5 rounded-lg text-xs font-medium transition-colors border border-[#FFFDF8]/15"
              >
                <TikTokIcon className="w-4 h-4" />
                <span>Official TikTok</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Settings */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFFDF8]/60">
          
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} DessertLabs. All rights reserved.</span>
            <span>·</span>
            <span>Ilorin, Nigeria</span>
          </div>

          <div className="flex items-center gap-4">
            {onOpenSettings && (
              <button
                onClick={onOpenSettings}
                className="flex items-center gap-1.5 hover:text-[#FFFDF8] text-[11px] transition-colors"
                title="Business Settings & Asset Guide"
              >
                <Settings className="w-3.5 h-3.5 text-[#B9855A]" />
                <span>Business Setup & Asset Guide</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg hover:bg-[#FFFDF8]/10 text-[#FFFDF8]/80 hover:text-[#FFFDF8] transition-colors"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};
