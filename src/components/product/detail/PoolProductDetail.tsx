"use client";

import type { Product } from "@/types/product";
import { useState } from "react";
import Image from "next/image";

interface Props {
  product: Product;
}

const clothColors = [
  { name: "Green", value: "#0a8f43" },
  { name: "Blue", value: "#1e3a8a" },
  { name: "Red", value: "#991b1b" },
  { name: "Gray", value: "#4b5563" },
];

export default function PoolProductDetail({ product }: Props) {
  const [selectedColor, setSelectedColor] = useState(clothColors[0]);

  return (
    <main className="bg-[#f2f3f7] px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
        {/* Image */}
        <div className="relative w-full max-w-xl aspect-[16/9]">
          {/* Imagen base */}
          <Image
            src="/images/pool/table.png"
            alt="Pool table"
            fill
            className="object-contain"
          />

          {/* Overlay del cloth */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: selectedColor.value,
              maskImage: "url(/images/pool/table-mask.png)",
              WebkitMaskImage: "url(/images/pool/table-mask.png)",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              mixBlendMode: "multiply",
              opacity: 0.85,
            }}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-4xl font-light tracking-[0.08em] text-[#4f5363] uppercase">
            {product.name}
          </h1>

          <p className="text-base leading-7 text-[#666b7d]">
            {product.description}
          </p>

          <div className="text-2xl font-medium text-[#4f5363]">
            Starting at ${product.startingPrice}
          </div>

          <div className="pt-4 space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-[#7b8094]">
              Cloth Color
            </p>

            <div className="flex gap-3">
              {clothColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`h-8 w-8 rounded-full border-2 transition ${
                    selectedColor.name === color.name
                      ? "border-black scale-110"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </div>

          <div className="text-sm uppercase tracking-[0.2em] text-[#7b8094]">
            Condition: {product.condition}
          </div>

          {/* CTA */}
          <div className="pt-4">
            <button className="rounded-full bg-[#5d6273] px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#4f5363]">
              Request a Quote
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
