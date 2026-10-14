import React from 'react';
import { TikTokIcon } from './Icons';
import { ExternalLink, Video } from 'lucide-react';
import { getActiveConfig } from '../config';

export const TikTokSection: React.FC = () => {
  const config = getActiveConfig();

  return (
    <section 
      id="tiktok" 
      className="py-14 sm:py-20 bg-[#F8F1E7]"
      aria-label="DessertLabs on TikTok"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#FFFDF8] rounded-2xl border border-[#4B2E24]/12 p-6 sm:p-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-start gap-4">
            
            <div className="p-3.5 rounded-xl bg-[#2B1B16] text-[#FFFDF8] shrink-0">
              <TikTokIcon className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#B9855A] block mb-1">
                Official Social Media
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1B16]">
                Follow DessertLabs on TikTok
              </h3>
              <p className="text-xs sm:text-sm text-[#4B2E24]/75 mt-1.5 max-w-md leading-relaxed">
                Watch cake decorating videos, behind-the-scenes bakery creations, fresh pastry drops, and order showcases on our official TikTok.
              </p>
              <p className="text-xs font-mono text-[#B9855A] mt-2 font-medium">
                {config.tiktokHandle}
              </p>
            </div>

          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <a
              href={config.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#2B1B16] hover:bg-[#4B2E24] text-[#FFFDF8] px-6 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 shadow-xs hover:shadow active:scale-98"
            >
              <TikTokIcon className="w-4 h-4" />
              <span>See More on TikTok</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
