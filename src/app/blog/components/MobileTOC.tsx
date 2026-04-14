"use client";

import { useRef } from "react";
import { useState } from "react";

type TocItem = {
  slug: string;
  text: string;
  level: number;
};

export default function MobileTOC({ toc }: { toc: TocItem[] }) {
  const detailsRef = useRef<HTMLDetailsElement | null>(null);
  const [open, setOpen] = useState(false);

  if (!toc || toc.length === 0) return null;

  return (
    <div className="lg:hidden mb-6 sticky top-17 rounded-xl z-50 bg-black/80 backdrop-blur-xs">
      <details
        ref={detailsRef}
        open={open}
        className="bg-white/5 rounded-xl border border-gray-800 p-4"
      >
        <summary
          onClick={() => {
            setOpen(false);
          }}
          className="cursor-pointer font-semibold text-sm"
        >
          Table of Contents
        </summary>

        <ul className="mt-3 space-y-2 text-sm">
          {toc.map((item, i) => (
            <li key={i} style={{ paddingLeft: (item.level - 1) * 12 }}>
              <a
                href={`#${item.slug}`}
                onClick={() => {
                  if (detailsRef.current) {
                    detailsRef.current.open = false;
                  }
                }}
                className="text-gray-400 hover:text-blue-400 transition"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
