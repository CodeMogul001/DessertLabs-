import React, { useState } from 'react';
import { getActiveConfig, saveActiveConfig, buildWhatsAppUrl } from '../config';
import { Product, getCatalogueProducts, saveCatalogueProducts } from '../data/products';
import { X, Check, Copy, ExternalLink, Info, Phone, Video, Image as ImageIcon, Plus, Trash2, Tag } from 'lucide-react';
import { WhatsAppIcon, TikTokIcon } from './Icons';

interface ConfigGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigUpdated: () => void;
}

export const ConfigGuideModal: React.FC<ConfigGuideModalProps> = ({
  isOpen,
  onClose,
  onConfigUpdated,
}) => {
  const currentConfig = getActiveConfig();
  const [activeTab, setActiveTab] = useState<'settings' | 'products'>('products');
  
  // Settings form state
  const [whatsappNumber, setWhatsappNumber] = useState(currentConfig.whatsappNumber);
  const [tiktokUrl, setTiktokUrl] = useState(currentConfig.tiktokUrl);
  const [tiktokHandle, setTiktokHandle] = useState(currentConfig.tiktokHandle);
  const [logoUrl, setLogoUrl] = useState(currentConfig.logoUrl);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Products manager state
  const [productsList, setProductsList] = useState<Product[]>(() => getCatalogueProducts());
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductImage, setNewProductImage] = useState('');
  const [newProductCustomizable, setNewProductCustomizable] = useState(false);
  const [productSavedSuccess, setProductSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveActiveConfig({
      whatsappNumber: whatsappNumber.replace(/\D/g, ''),
      tiktokUrl: tiktokUrl.trim(),
      tiktokHandle: tiktokHandle.trim(),
      logoUrl: logoUrl.trim(),
    });
    setSavedSuccess(true);
    onConfigUpdated();
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    const newProd: Product = {
      id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: newProductName.trim(),
      price: newProductPrice.trim() || undefined,
      description: newProductDescription.trim() || undefined,
      imagePath: newProductImage.trim() || undefined,
      customizable: newProductCustomizable,
      allowCustomMessage: newProductCustomizable,
      allowDateSelection: true,
      isAvailable: true,
    };

    const updated = [...productsList, newProd];
    setProductsList(updated);
    saveCatalogueProducts(updated);
    onConfigUpdated();

    // Reset inputs
    setNewProductName('');
    setNewProductPrice('');
    setNewProductDescription('');
    setNewProductImage('');
    setNewProductCustomizable(false);
    setProductSavedSuccess(true);
    setTimeout(() => setProductSavedSuccess(false), 2000);
  };

  const handleDeleteProduct = (id: string) => {
    const updated = productsList.filter(p => p.id !== id);
    setProductsList(updated);
    saveCatalogueProducts(updated);
    onConfigUpdated();
  };

  const testWhatsAppUrl = buildWhatsAppUrl(
    "Hi DessertLabs. This is a test message from my website preview to verify the WhatsApp integration.",
    whatsappNumber
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2B1B16]/75 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FFFDF8] rounded-2xl border border-[#4B2E24]/20 max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#4B2E24]/10 bg-[#F8F1E7]/60">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#2B1B16]">
              DessertLabs Management & Setup
            </h3>
            <p className="text-xs text-[#4B2E24]/70">
              Manage your All Offerings catalogue and official contacts.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#4B2E24] hover:bg-[#E7D7C5]/50"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#4B2E24]/10 bg-[#FFFDF8] px-5">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'products'
                ? 'border-[#4B2E24] text-[#2B1B16]'
                : 'border-transparent text-[#4B2E24]/60 hover:text-[#2B1B16]'
            }`}
          >
            All Offerings ({productsList.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-[#4B2E24] text-[#2B1B16]'
                : 'border-transparent text-[#4B2E24]/60 hover:text-[#2B1B16]'
            }`}
          >
            Contact & WhatsApp Details
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto p-5 space-y-6 flex-1 text-xs sm:text-sm">
          
          {activeTab === 'products' ? (
            <div className="space-y-5">
              
              <div className="p-3.5 rounded-xl bg-[#F8F1E7] border border-[#E7D7C5]">
                <p className="text-xs text-[#4B2E24]/85 leading-relaxed">
                  All made-up product names have been removed. You can share your preferred product choices directly in the chat, or add them using the form below.
                </p>
              </div>

              {/* Add Product Form */}
              <form onSubmit={handleAddProduct} className="p-4 rounded-xl border border-[#4B2E24]/15 bg-[#FFFDF8] space-y-3">
                <span className="block font-serif text-sm font-bold text-[#2B1B16]">
                  Add an Official Product
                </span>

                <div>
                  <label className="block text-[11px] font-semibold text-[#2B1B16] mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vanilla Celebration Cake"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#4B2E24]/20 bg-[#FFFDF8] text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2B1B16] mb-1">
                      Price (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₦15,000 (or leave blank)"
                      value={newProductPrice}
                      onChange={(e) => setNewProductPrice(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#4B2E24]/20 bg-[#FFFDF8] text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#2B1B16] mb-1">
                      Image Path (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. /images/cake.jpg"
                      value={newProductImage}
                      onChange={(e) => setNewProductImage(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#4B2E24]/20 bg-[#FFFDF8] text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#2B1B16] mb-1">
                    Description (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Short description of the product"
                    value={newProductDescription}
                    onChange={(e) => setNewProductDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#4B2E24]/20 bg-[#FFFDF8] text-xs"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="custom-toggle"
                    checked={newProductCustomizable}
                    onChange={(e) => setNewProductCustomizable(e.target.checked)}
                    className="rounded border-[#4B2E24]/30 text-[#4B2E24] focus:ring-[#B9855A]"
                  />
                  <label htmlFor="custom-toggle" className="text-xs text-[#4B2E24]/80">
                    Allow custom message/inscription request
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#4B2E24] hover:bg-[#2B1B16] text-[#FFFDF8] rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>{productSavedSuccess ? 'Product Added!' : 'Add to All Offerings'}</span>
                </button>
              </form>

              {/* Current Products List */}
              <div>
                <span className="block font-serif text-sm font-bold text-[#2B1B16] mb-2">
                  Current Offerings ({productsList.length})
                </span>

                {productsList.length === 0 ? (
                  <p className="text-xs text-[#4B2E24]/60 italic p-3 bg-[#F8F1E7]/50 rounded-lg border border-[#4B2E24]/10">
                    No products added yet. The catalogue is ready for your preferred choices.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {productsList.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-3 rounded-lg border border-[#4B2E24]/10 bg-[#FFFDF8] flex items-center justify-between gap-3"
                      >
                        <div>
                          <p className="font-semibold text-xs text-[#2B1B16]">{prod.name}</p>
                          <div className="text-[11px] text-[#4B2E24]/60 flex items-center gap-2 mt-0.5">
                            {prod.price && <span className="font-mono text-[#B9855A]">{prod.price}</span>}
                            {prod.imagePath && <span>Photo: {prod.imagePath}</span>}
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="text-[#4B2E24]/40 hover:text-red-700 p-1"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ) : (
            /* Settings Tab */
            <form onSubmit={handleSaveSettings} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-[#2B1B16] mb-1 flex items-center gap-1.5">
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#4B2E24]" />
                  <span>Official Business WhatsApp Number</span>
                </label>
                <input
                  type="text"
                  placeholder="2348012345678 (digits only, Nigeria code 234, no +)"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#4B2E24]/20 bg-[#FFFDF8] text-xs font-mono"
                />
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[11px] text-[#4B2E24]/60">
                    Include 234 without leading zero or plus sign.
                  </span>
                  <a
                    href={testWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#B9855A] font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Test number</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2B1B16] mb-1 flex items-center gap-1.5">
                    <TikTokIcon className="w-3.5 h-3.5 text-[#2B1B16]" />
                    <span>TikTok Handle</span>
                  </label>
                  <input
                    type="text"
                    placeholder="@dessertlabs"
                    value={tiktokHandle}
                    onChange={(e) => setTiktokHandle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#4B2E24]/20 bg-[#FFFDF8] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2B1B16] mb-1">
                    TikTok Profile URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://www.tiktok.com/@dessertlabs"
                    value={tiktokUrl}
                    onChange={(e) => setTiktokUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#4B2E24]/20 bg-[#FFFDF8] text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2B1B16] mb-1 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#B9855A]" />
                  <span>Uploaded Logo Asset Path</span>
                </label>
                <input
                  type="text"
                  placeholder='e.g. "/logo.png"'
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#4B2E24]/20 bg-[#FFFDF8] text-xs font-mono"
                />
              </div>

              <button
                type="submit"
                className="bg-[#4B2E24] hover:bg-[#2B1B16] text-[#FFFDF8] px-4 py-2 rounded-lg text-xs font-medium transition-colors"
              >
                {savedSuccess ? 'Saved Successfully!' : 'Save & Apply'}
              </button>

            </form>
          )}

        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#4B2E24]/10 bg-[#F8F1E7]/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#4B2E24] text-[#FFFDF8] text-xs font-medium hover:bg-[#2B1B16]"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
