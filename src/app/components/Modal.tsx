"use client";

import { useState } from "react";
import { getCountryName } from "@/lib/countries";
import { getReferrerName, getReferrerLogo } from "@/lib/referrers";

export function Modal({
  title,
  data,
  type,
}: {
  title: string;
  data: { x: string; y: number; country?: string }[];
  type?: 'countries' | 'cities' | 'referrers' | 'devices' | 'browsers' | 'os' | 'pages' | 'default';
}) {
  const [open, setOpen] = useState(false);

  // Hide button if data has 5 or fewer items
  const showButton = data.length > 5;

  // Helper function to get display label with icons
  const getDisplayItem = (item: { x: string; y: number; country?: string }) => {
    let displayLabel = item.x;
    let icon = null;
    let flagCode = null;

    // Handle different types
    if (type === 'countries') {
      displayLabel = getCountryName(item.x);
      flagCode = item.x;
    } else if (type === 'cities' && item.country) {
      displayLabel = `${item.x}, ${getCountryName(item.country)}`;
      flagCode = item.country;
    } else if (type === 'referrers') {
      displayLabel = getReferrerName(item.x);
      const logo = getReferrerLogo(item.x);
      if (logo) icon = logo;
    } else if (type === 'devices') {
      icon = `/devices/${item.x.toLowerCase()}.png`;
    } else if (type === 'browsers') {
      icon = `/browsers/${item.x.toLowerCase()}.png`;
    } else if (type === 'os') {
      icon = `/oss/${item.x.toLowerCase()}.png`;
    }

    return { displayLabel, icon, flagCode };
  };

  return (
    <>
      {showButton && (
        <button
          onClick={() => setOpen(true)}
          className="text-[10px] text-white bg-blue-500/90 hover:bg-blue-500/40 px-2 py-1 rounded-b-xl cursor-pointer font-semibold w-full"
        >
          View All ({data.length})
        </button>
      )}

      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0b0b0b] border border-white/10 rounded-xl w-[90%] max-w-md max-h-[80vh] overflow-y-auto p-4">
            <div className="flex justify-between items-center mb-3 sticky top-0 bg-[#0b0b0b] pb-2">
              <h2 className="text-sm font-semibold text-blue-400">
                {title} ({data.length})
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-xs text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {data.map((item, i) => {
                const { displayLabel, icon, flagCode } = getDisplayItem(item);
                
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-white/5 pb-2 text-gray-300"
                  >
                    <span className="flex items-center gap-2 truncate max-w-[70%]">
                      {/* Flag for countries/cities */}
                      {flagCode && (
                        <img
                          src={`/flags/${flagCode.toLowerCase()}.png`}
                          alt={flagCode}
                          className="w-4 h-3"
                        />
                      )}
                      
                      {/* Icon for devices/browsers/os/referrers */}
                      {icon && (
                        <img
                          src={icon}
                          alt={displayLabel}
                          className="w-4 h-4"
                        />
                      )}
                      
                      <span className="truncate">{displayLabel}</span>
                    </span>
                    <span className="text-white font-medium ml-2">{item.y}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}