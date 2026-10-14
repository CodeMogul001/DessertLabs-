import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';
import { buildWhatsAppUrl, getActiveConfig } from '../config';

export interface TrayItem {
  instanceId: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedFlavour?: string;
  customMessage?: string;
  preferredDate?: string;
  additionalNotes?: string;
}

interface OrderTrayContextType {
  items: TrayItem[];
  addToTray: (item: Omit<TrayItem, 'instanceId'>) => void;
  removeFromTray: (instanceId: string) => void;
  updateQuantity: (instanceId: string, quantity: number) => void;
  clearTray: () => void;
  isTrayOpen: boolean;
  setIsTrayOpen: (open: boolean) => void;
  totalCount: number;
  sendTrayOrderToWhatsApp: (customerDetails?: { deliveryArea?: string; preferredDate?: string; notes?: string }) => void;
}

const OrderTrayContext = createContext<OrderTrayContextType | undefined>(undefined);

const TRAY_STORAGE_KEY = 'dessertlabs_order_tray';

export const OrderTrayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<TrayItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(TRAY_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isTrayOpen, setIsTrayOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(TRAY_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save tray items', e);
    }
  }, [items]);

  const addToTray = (itemData: Omit<TrayItem, 'instanceId'>) => {
    const instanceId = `${itemData.product.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setItems(prev => [...prev, { ...itemData, instanceId }]);
    setIsTrayOpen(true);
  };

  const removeFromTray = (instanceId: string) => {
    setItems(prev => prev.filter(i => i.instanceId !== instanceId));
  };

  const updateQuantity = (instanceId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromTray(instanceId);
      return;
    }
    setItems(prev => prev.map(i => i.instanceId === instanceId ? { ...i, quantity } : i));
  };

  const clearTray = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const sendTrayOrderToWhatsApp = (customerDetails?: { deliveryArea?: string; preferredDate?: string; notes?: string }) => {
    const config = getActiveConfig();
    if (items.length === 0) return;

    let message = items.length === 1 
      ? `Hi DessertLabs. I love this ${items[0].product.name} and I'd like you to recreate it for me.\n\n`
      : `Hi DessertLabs. I love these selections from your website and I'd like you to recreate them for me:\n\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.quantity}x ${item.product.name}\n`;
      if (item.selectedSize) message += `   · Size: ${item.selectedSize}\n`;
      if (item.selectedFlavour) message += `   · Flavour: ${item.selectedFlavour}\n`;
      if (item.customMessage) message += `   · Inscription/Customisation: "${item.customMessage}"\n`;
      if (item.preferredDate) message += `   · Item Date: ${item.preferredDate}\n`;
      if (item.additionalNotes) message += `   · Note: ${item.additionalNotes}\n`;
    });

    message += `\n`;
    if (customerDetails?.preferredDate) {
      message += `Preferred Delivery/Pickup Date: ${customerDetails.preferredDate}\n`;
    }
    if (customerDetails?.deliveryArea) {
      message += `Delivery Location in Ilorin: ${customerDetails.deliveryArea}\n`;
    }
    if (customerDetails?.notes) {
      message += `General Instructions: ${customerDetails.notes}\n`;
    }

    message += `\nPlease confirm availability, pricing, and how to proceed. Thank you!`;

    const url = buildWhatsAppUrl(message, config.whatsappNumber);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <OrderTrayContext.Provider
      value={{
        items,
        addToTray,
        removeFromTray,
        updateQuantity,
        clearTray,
        isTrayOpen,
        setIsTrayOpen,
        totalCount,
        sendTrayOrderToWhatsApp,
      }}
    >
      {children}
    </OrderTrayContext.Provider>
  );
};

export const useOrderTray = () => {
  const context = useContext(OrderTrayContext);
  if (!context) {
    throw new Error('useOrderTray must be used within an OrderTrayProvider');
  }
  return context;
};
