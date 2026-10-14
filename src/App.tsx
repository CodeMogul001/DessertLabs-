import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CatalogueSection } from './components/CatalogueSection';
import { ProductModal } from './components/ProductModal';
import { OrderTrayDrawer } from './components/OrderTrayDrawer';
import { AboutSection } from './components/AboutSection';
import { DeliverySection } from './components/DeliverySection';
import { TikTokSection } from './components/TikTokSection';
import { ContactFooter } from './components/ContactFooter';
import { FloatingActions } from './components/FloatingActions';
import { ConfigGuideModal } from './components/ConfigGuideModal';
import { OrderTrayProvider } from './context/OrderTrayContext';
import { Product } from './data/products';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [configRevision, setConfigRevision] = useState(0);

  const handleConfigUpdated = () => {
    setConfigRevision(prev => prev + 1);
  };

  return (
    <OrderTrayProvider>
      <div className="min-h-screen flex flex-col bg-[#F8F1E7] text-[#2B1B16] selection:bg-[#E7D7C5] selection:text-[#2B1B16]">
        
        {/* Navigation Bar */}
        <Header onOpenSettings={() => setIsConfigOpen(true)} />

        {/* Main Single-Page Content Flow */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero />

          {/* Product Catalogue Section - All Offerings */}
          <CatalogueSection 
            key={configRevision}
            onSelectProduct={(product) => setSelectedProduct(product)} 
            onOpenSettings={() => setIsConfigOpen(true)}
          />

          {/* About DessertLabs */}
          <AboutSection />

          {/* Delivery Information */}
          <DeliverySection />

          {/* Official TikTok Integration */}
          <TikTokSection />
        </main>

        {/* Footer and Contact */}
        <ContactFooter onOpenSettings={() => setIsConfigOpen(true)} />

        {/* Floating Actions (WhatsApp & Tray) */}
        <FloatingActions />

        {/* Product Customisation & WhatsApp Modal */}
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />

        {/* Temporary Multi-Product Order Tray Drawer */}
        <OrderTrayDrawer />

        {/* Business Settings & Asset Guide Modal */}
        <ConfigGuideModal
          isOpen={isConfigOpen}
          onClose={() => setIsConfigOpen(false)}
          onConfigUpdated={handleConfigUpdated}
        />

      </div>
    </OrderTrayProvider>
  );
}
