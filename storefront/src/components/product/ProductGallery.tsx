"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/types/product";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  /** Tailwind class for the main image background */
  bgClassName?: string;
  /** Tailwind class applied to the <Image> itself (e.g. object-contain vs object-cover) */
  objectClassName?: string;
}

export default function ProductGallery({
  images,
  productName,
  bgClassName = "bg-[linear-gradient(180deg,#e9f4f1_0%,#dfece8_100%)]",
  objectClassName = "object-contain p-8",
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? null;

  return (
    <div className="flex flex-col gap-3">
      {/* ── Main image ── */}
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-[1.55rem] ${bgClassName}`}
      >
        {active ? (
          <Image
            key={active.url}
            src={active.url}
            alt={active.alt || productName}
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 54vw"
            className={`transition-opacity duration-300 ${objectClassName}`}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="rounded-full border border-[#c7d4cf] px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-[#6b8c82]">
              No image
            </span>
          </div>
        )}
      </div>

      {/* ── Thumbnails (only shown when there are 2+ images) ── */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={image.id}
                type="button"
                aria-label={`View image ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[0.85rem] border-2 transition duration-200 ${
                  isActive
                    ? "border-[#276f61] shadow-[0_4px_14px_rgba(27,100,80,0.22)]"
                    : "border-[#dde9e3] opacity-55 hover:opacity-90 hover:border-[#276f61]/50"
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt || `${productName} — view ${index + 1}`}
                  fill
                  sizes="72px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
