import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { getActiveConfig, buildWhatsAppUrl } from '../config';
import { useOrderTray } from '../context/OrderTrayContext';

interface HeaderProps {
  onOpenSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const config = getActiveConfig();
  const { totalCount, setIsTrayOpen } = useOrderTray();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGeneralWhatsAppOrder = () => {
    const message = `Hi DessertLabs. I am browsing your website and would like to place an order enquiry. Please share today's available items and ordering details.`;
    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'All Offerings', href: '#catalogue' },
    { name: 'About', href: '#about' },
    { name: 'Delivery', href: '#delivery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#F8F1E7]/95 backdrop-blur-md shadow-sm border-b border-[#4B2E24]/10 py-3.5' 
          : 'bg-[#F8F1E7] border-b border-[#4B2E24]/5 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo / Mark */}
          <a 
            href="#hero" 
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B9855A] rounded-lg"
            aria-label="DessertLabs Home"
          >
            {config.logoUrl ? (
              <img 
                src={config.logoUrl} 
                alt="DessertLabs Official Logo" 
                className="h-10 sm:h-12 w-auto object-contain"
                onError={(e) => {
                  // Fallback if the path hasn't been uploaded yet
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : null}

            {/* Typography Brand Identity (Preserved proportions and styling) */}
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2B1B16] leading-none group-hover:text-[#4B2E24] transition-colors">
                DessertLabs
              </span>
              <span className="text-[10px] sm:text-xs tracking-widest uppercase font-medium text-[#B9855A] mt-0.5">
                Cakes · Pastries · Ilorin
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#4B2E24]/80 hover:text-[#2B1B16] transition-colors py-1 border-b border-transparent hover:border-[#B9855A]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Order Tray Trigger */}
            <button
              onClick={() => setIsTrayOpen(true)}
              className="relative p-2.5 rounded-full text-[#4B2E24] hover:bg-[#E7D7C5]/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B9855A]"
              title="View your order tray"
              aria-label={`View order tray with ${totalCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#4B2E24] text-[#FFFDF8] text-[11px] font-semibold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Desktop WhatsApp Action */}
            <button
              onClick={handleGeneralWhatsAppOrder}
              className="hidden sm:inline-flex items-center gap-2 bg-[#4B2E24] hover:bg-[#2B1B16] text-[#FFFDF8] px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-xs hover:shadow-md active:scale-98 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B9855A]"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#FFFDF8]" />
              <span>Order on WhatsApp</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#4B2E24] hover:bg-[#E7D7C5]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B9855A]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF8] border-b border-[#4B2E24]/10 shadow-lg px-6 py-6 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#2B1B16] hover:text-[#B9855A] py-1.5 transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <div className="pt-3 border-t border-[#4B2E24]/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleGeneralWhatsAppOrder();
                }}
                className="w-full flex items-center justify-center gap-2.5 bg-[#4B2E24] active:bg-[#2B1B16] text-[#FFFDF8] py-3 px-4 rounded-lg font-medium text-sm shadow-xs"
              >
                <WhatsAppIcon className="w-5 h-5 text-[#FFFDF8]" />
                <span>Order on WhatsApp</span>
              </button>

              {onOpenSettings && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSettings();
                  }}
                  className="w-full text-center text-xs text-[#4B2E24]/60 hover:text-[#4B2E24] py-1"
                >
                  Configure WhatsApp / Logo Settings
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
