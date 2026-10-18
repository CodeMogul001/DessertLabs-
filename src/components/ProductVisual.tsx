import React, { useState } from 'react';
import { Product } from '../data/products';
import { getProductImage } from '../utils/imageStorage';

interface ProductVisualProps {
  product: Product;
  className?: string;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({ product, className = "w-full h-full" }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const resolvedSrc = getProductImage(product);

  // If a photo source is available and hasn't failed, render the image
  if (resolvedSrc && !imgFailed) {
    return (
      <img
        src={resolvedSrc}
        alt={product.name}
        onError={() => setImgFailed(true)}
        className={`${className} object-cover object-center`}
        referrerPolicy="no-referrer"
        loading="lazy"
      />
    );
  }

  // Permanent, uneditable high-fidelity visual representations corresponding to the user's uploaded assets
  switch (product.id) {
    case 'frosted-cakes':
      return (
        <div className={`relative ${className} bg-gradient-to-b from-[#FAF4EC] via-[#F2E7DC] to-[#E5D2C1] overflow-hidden flex items-center justify-center`}>
          {/* Marble background effect */}
          <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 400 300" preserveAspectRatio="none">
            <path d="M0,80 Q100,140 200,90 T400,120 L400,0 L0,0 Z" fill="#D9C0A7" />
            <path d="M0,220 Q120,170 240,210 T400,190 L400,300 L0,300 Z" fill="#E2CFBE" />
          </svg>

          {/* Lavender turntable base */}
          <div className="absolute bottom-4 w-44 sm:w-52 h-10 sm:h-12 bg-gradient-to-r from-[#9D88C7] via-[#B8A4DF] to-[#8C76B8] rounded-full shadow-lg border border-[#856EB0]/40 flex items-center justify-center">
            <div className="w-36 sm:w-44 h-2 bg-[#D1C3EE] rounded-full opacity-60"></div>
          </div>
          <div className="absolute bottom-1 w-20 sm:w-24 h-5 bg-[#7861A3] rounded-t-lg shadow-md"></div>

          {/* White frosted round cake */}
          <div className="relative z-10 bottom-3 w-32 sm:w-38 h-28 sm:h-32 bg-gradient-to-r from-[#FAF8F5] via-[#FFFFFF] to-[#F0EBE3] rounded-xl shadow-xl border border-[#4B2E24]/10 flex flex-col justify-between p-1.5 overflow-hidden">
            {/* Top pink ruffled frosting */}
            <div className="flex justify-between items-center px-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-3.5 h-3.5 bg-gradient-to-br from-[#E88CB7] to-[#D46599] rounded-full shadow-xs border border-[#FFFDF8]/40"></div>
              ))}
            </div>

            {/* Gold "Happy Birthday" Mirror Topper in center */}
            <div className="self-center my-auto px-2 py-1 bg-gradient-to-r from-[#E5B869] via-[#FDE8A5] to-[#C99846] rounded-md shadow-md border border-[#EAC57B] text-center transform -rotate-1">
              <span className="font-serif text-[11px] sm:text-xs font-black tracking-wide text-[#4A320F] block drop-shadow-xs">
                Happy Birthday
              </span>
            </div>

            {/* Bottom pink ruffled border */}
            <div className="flex justify-between items-center px-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-3.5 h-3.5 bg-gradient-to-tr from-[#D46599] to-[#E88CB7] rounded-full shadow-xs border border-[#FFFDF8]/40"></div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'box-of-treats-frame-cake':
      return (
        <div className={`relative ${className} bg-gradient-to-br from-[#F5ECE3] via-[#EFE2D4] to-[#E3D0BE] overflow-hidden flex items-center justify-center p-3`}>
          {/* Red Gift Hamper Box */}
          <div className="relative w-36 sm:w-42 h-32 sm:h-36 bg-gradient-to-br from-[#E52535] to-[#B31222] rounded-xl shadow-xl border border-[#910A18] p-2 flex flex-col justify-between transform -rotate-2">
            <div className="flex gap-1 items-center justify-center">
              <div className="w-7 h-10 bg-[#1D3557] rounded-xs shadow-xs border border-[#457B9D] flex items-center justify-center">
                <span className="text-[6px] text-[#FFF] font-bold">MILK</span>
              </div>
              <div className="w-5 h-8 bg-[#E63946] rounded-full shadow-xs border border-[#F1FAEE]"></div>
              <div className="w-7 h-12 bg-[#3A0CA3] rounded-xs shadow-xs border border-[#7209B7] flex items-center justify-center">
                <span className="text-[6px] text-[#FFF] font-bold">WINE</span>
              </div>
            </div>
            <div className="text-center py-0.5 bg-[#800715] rounded-xs">
              <span className="text-[8px] font-bold text-[#FFE3E5] uppercase tracking-wider">Treats Box</span>
            </div>
          </div>

          {/* Picture Frame */}
          <div className="absolute top-2 right-3 w-20 sm:w-24 h-24 sm:h-28 bg-[#442319] border-2 border-[#D4AF37] rounded-md shadow-lg transform rotate-6 p-1 flex flex-col items-center justify-center text-center">
            <div className="w-full h-full bg-[#EBD8C8] rounded-xs flex flex-col items-center justify-center p-1">
              <span className="text-[7px] font-serif font-bold text-[#442319] leading-tight">Born to be</span>
              <span className="text-[8px] font-serif font-black text-[#8B3A22]">Cherished</span>
            </div>
          </div>

          {/* Mini 2-layer cake */}
          <div className="absolute bottom-2 left-3 w-16 sm:w-18 h-16 sm:h-18 bg-[#FFFDF8] rounded-full border border-[#D46599] shadow-md flex items-center justify-center p-1 transform -rotate-3">
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#E88CB7] bg-[#FFF8FA] flex items-center justify-center">
              <span className="text-[7px] font-serif font-bold text-[#D46599]">6" Cake</span>
            </div>
          </div>
        </div>
      );

    case 'money-bouquet':
      return (
        <div className={`relative ${className} bg-gradient-to-b from-[#FCEFF3] via-[#F8DFE8] to-[#EFCDD9] overflow-hidden flex items-center justify-center p-2`}>
          {/* Pink and White Designer Wrap */}
          <div className="absolute inset-x-4 bottom-2 h-44 bg-gradient-to-t from-[#E99CB6] to-[#FCEFF3] rounded-t-[50px] transform rotate-1 shadow-md opacity-70"></div>
          
          {/* Radiating folded Naira fan */}
          <div className="relative z-10 w-44 sm:w-52 h-44 sm:h-52 flex items-center justify-center">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="absolute w-7 sm:w-8 h-20 sm:h-24 bg-gradient-to-t from-[#3C7B58] via-[#85B899] to-[#E3F2EB] rounded-t-full border border-[#2D5E43]/60 shadow-xs flex flex-col items-center justify-start pt-1.5"
                style={{
                  transform: `rotate(${i * 22.5}deg) translateY(-28px)`,
                  transformOrigin: 'bottom center',
                }}
              >
                <span className="text-[7px] font-bold text-[#1F4530]">₦500</span>
              </div>
            ))}

            {/* Central Pink Rose */}
            <div className="relative z-20 w-11 sm:w-13 h-11 sm:h-13 bg-gradient-to-br from-[#FF9EBB] via-[#F46B96] to-[#C93366] rounded-full shadow-lg border-2 border-[#FFFDF8] flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-[#E5487B] border border-[#FFBFD3]"></div>
            </div>
          </div>
        </div>
      );

    case 'red-velvet-foil-cake':
      return (
        <div className={`relative ${className} bg-gradient-to-br from-[#2D452B] via-[#486B45] to-[#20361E] overflow-hidden flex items-center justify-center p-3`}>
          {/* Silver foil container */}
          <div className="relative w-40 sm:w-46 h-28 sm:h-32 bg-gradient-to-br from-[#E2E8F0] via-[#CBD5E1] to-[#94A3B8] rounded-xl border-3 border-[#F8FAFC] shadow-2xl p-2 flex flex-col justify-between">
            {/* Red Velvet sponge inside */}
            <div className="w-full h-full bg-gradient-to-b from-[#800F1C] via-[#9E1424] to-[#670A15] rounded-lg shadow-inner flex flex-col items-center justify-center relative p-1">
              
              {/* Official The Dessert Lab Sticker */}
              <div className="relative z-10 w-28 sm:w-32 bg-[#FFFDF8] rounded-md shadow-md border border-[#4B2E24]/20 p-1.5 text-center">
                <div className="flex items-center justify-center gap-1">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#800F1C]"></div>
                  <span className="font-serif text-[10px] sm:text-[11px] font-black text-[#2B1B16] leading-none">
                    The Dessert Lab
                  </span>
                </div>
                <span className="block text-[7px] text-[#A62639] font-serif italic mt-0.5">
                  Precision in every bite
                </span>
                <span className="block text-[6px] text-[#2B1B16]/80 font-mono mt-0.5">
                  07017334756, 07025815616
                </span>
              </div>

              {/* Pink spoon */}
              <div className="absolute -bottom-2 z-20 w-8 h-18 bg-gradient-to-b from-[#FFAFCC] to-[#FF8FAB] rounded-t-full shadow-md border border-[#FFF] flex flex-col items-center justify-start pt-1">
                <div className="w-4 h-5 rounded-full bg-[#FF8FAB]"></div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'big-foil-cake':
      return (
        <div className={`relative ${className} bg-gradient-to-br from-[#2D452B] via-[#486B45] to-[#20361E] overflow-hidden flex items-center justify-center p-3`}>
          {/* Silver foil container */}
          <div className="relative w-40 sm:w-46 h-28 sm:h-32 bg-gradient-to-br from-[#E2E8F0] via-[#CBD5E1] to-[#94A3B8] rounded-xl border-3 border-[#F8FAFC] shadow-2xl p-2 flex flex-col justify-between">
            {/* Chocolate fudge cake inside */}
            <div className="w-full h-full bg-gradient-to-b from-[#3E2723] via-[#4E342E] to-[#2B1B16] rounded-lg shadow-inner flex flex-col items-center justify-center relative p-1">
              
              {/* Official The Dessert Lab Sticker */}
              <div className="relative z-10 w-28 sm:w-32 bg-[#FFFDF8] rounded-md shadow-md border border-[#4B2E24]/20 p-1.5 text-center">
                <div className="flex items-center justify-center gap-1">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#800F1C]"></div>
                  <span className="font-serif text-[10px] sm:text-[11px] font-black text-[#2B1B16] leading-none">
                    The Dessert Lab
                  </span>
                </div>
                <span className="block text-[7px] text-[#A62639] font-serif italic mt-0.5">
                  Precision in every bite
                </span>
                <span className="block text-[6px] text-[#2B1B16]/80 font-mono mt-0.5">
                  07017334756, 07025815616
                </span>
              </div>

              {/* Pink spoon */}
              <div className="absolute -bottom-2 z-20 w-8 h-18 bg-gradient-to-b from-[#FFAFCC] to-[#FF8FAB] rounded-t-full shadow-md border border-[#FFF] flex flex-col items-center justify-start pt-1">
                <div className="w-4 h-5 rounded-full bg-[#FF8FAB]"></div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'frosted-foil-cake':
      return (
        <div className={`relative ${className} bg-gradient-to-br from-[#365335] via-[#4D724C] to-[#2A4429] overflow-hidden flex items-center justify-center p-3`}>
          {/* Silver foil container */}
          <div className="relative w-40 sm:w-46 h-28 sm:h-32 bg-gradient-to-br from-[#E2E8F0] via-[#CBD5E1] to-[#94A3B8] rounded-xl border-3 border-[#F8FAFC] shadow-2xl p-2 flex flex-col justify-between">
            {/* White frosted top with blue rosettes & sprinkles */}
            <div className="w-full h-full bg-gradient-to-b from-[#FFFDF8] via-[#FFFFFF] to-[#F5EFE6] rounded-lg shadow-inner relative overflow-hidden flex flex-col justify-between p-2">
              
              {/* Top-Right Sky Blue Rosette */}
              <div className="self-end w-8 h-8 rounded-full bg-gradient-to-br from-[#64B5F6] via-[#2196F3] to-[#1976D2] shadow-sm border border-[#FFF]"></div>

              {/* Multicolour confetti sprinkles in middle */}
              <div className="flex justify-around items-center px-3 opacity-90">
                <div className="w-2.5 h-1 bg-[#EF4444] rounded-full transform rotate-45"></div>
                <div className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full"></div>
                <div className="w-2.5 h-1 bg-[#10B981] rounded-full transform -rotate-12"></div>
                <div className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full"></div>
                <div className="w-2.5 h-1 bg-[#EC4899] rounded-full transform rotate-30"></div>
              </div>

              {/* Bottom-Left Sky Blue Rosette */}
              <div className="self-start w-8 h-8 rounded-full bg-gradient-to-br from-[#64B5F6] via-[#2196F3] to-[#1976D2] shadow-sm border border-[#FFF]"></div>
            </div>
          </div>
        </div>
      );

    case 'small-foil-cake':
      return (
        <div className={`relative ${className} bg-gradient-to-br from-[#365335] via-[#4D724C] to-[#2A4429] overflow-hidden flex items-center justify-center p-3`}>
          {/* White towel background wrap */}
          <div className="absolute inset-4 bg-[#F8F9FA] rounded-2xl opacity-70 transform rotate-1 shadow-md"></div>

          {/* Silver foil tin with golden baked sponge */}
          <div className="relative z-10 w-36 sm:w-42 h-26 sm:h-30 bg-gradient-to-br from-[#E2E8F0] via-[#CBD5E1] to-[#94A3B8] rounded-xl border-3 border-[#F8FAFC] shadow-xl p-2">
            <div className="w-full h-full bg-gradient-to-br from-[#F5D061] via-[#E8B83A] to-[#D49826] rounded-lg shadow-inner flex flex-col items-center justify-center p-2 relative">
              {/* Sponge cake textured pores */}
              <div className="w-1.5 h-1.5 bg-[#B88019] rounded-full absolute top-3 left-4 opacity-40"></div>
              <div className="w-1.5 h-1.5 bg-[#B88019] rounded-full absolute bottom-4 right-5 opacity-40"></div>
              <div className="w-2 h-2 bg-[#B88019] rounded-full absolute center opacity-50"></div>
              <span className="font-serif text-[10px] font-bold text-[#6D4907] tracking-wider uppercase">
                Vanilla Sponge
              </span>
            </div>
          </div>
        </div>
      );

    case 'food-box':
      return (
        <div className={`relative ${className} bg-gradient-to-br from-[#D7CCC8] via-[#EFEBE9] to-[#CFD8DC] overflow-hidden flex items-center justify-center p-2`}>
          {/* Hamper Box Grid */}
          <div className="relative w-44 sm:w-50 h-32 sm:h-36 bg-[#FFFDF8] rounded-xl shadow-xl border border-[#4B2E24]/15 p-2 grid grid-cols-2 gap-1.5">
            {/* Fried Rice */}
            <div className="bg-gradient-to-br from-[#FFE082] to-[#FFCA28] rounded-md p-1 flex flex-col justify-between border border-[#FFB300]/40">
              <span className="text-[7px] font-bold text-[#5D4037]">Fried Rice</span>
              <div className="flex gap-1 justify-center">
                <div className="w-2 h-1 bg-[#D32F2F] rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-[#388E3C] rounded-full"></div>
              </div>
            </div>

            {/* Pink Bento Cake */}
            <div className="bg-gradient-to-br from-[#FCE4EC] to-[#F8BBD0] rounded-md p-1 flex flex-col items-center justify-center border border-[#F06292]/40 text-center">
              <span className="text-[7px] font-bold text-[#880E4F]">Bento Cake</span>
              <span className="text-[6px] text-[#AD1457] font-serif">HBD</span>
            </div>

            {/* Peppered Chicken */}
            <div className="bg-gradient-to-br from-[#D84315] to-[#BF360C] rounded-md p-1 flex items-center justify-center border border-[#870000]">
              <span className="text-[7px] font-bold text-[#FFF]">Peppered Chicken</span>
            </div>

            {/* Smoothie Bottle & Sides */}
            <div className="bg-gradient-to-br from-[#FCE4EC] to-[#FFCDD2] rounded-md p-1 flex items-center justify-around border border-[#EF9A9A]">
              <span className="text-[6px] font-bold text-[#C2185B]">Smoothie</span>
              <div className="w-3 h-3 bg-[#C62828] rounded-full" title="Apple"></div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className={`relative ${className} bg-[#F8F1E7] flex flex-col items-center justify-center p-4 text-center`}>
          <div className="w-12 h-12 rounded-full border border-[#B9855A]/50 flex items-center justify-center text-[#4B2E24] font-serif text-lg font-bold mb-1">
            {product.name?.charAt(0) || 'D'}
          </div>
          <span className="text-xs uppercase tracking-wider text-[#B9855A] font-medium">
            DessertLabs
          </span>
        </div>
      );
  }
};
