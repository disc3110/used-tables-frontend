"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
}

type GalleryItem = {
  id: string;
  label: string;
  type: "cloth-preview" | "photo";
  src: string;
  alt: string;
};

type ClothOption = {
  name: string;
  value: string;
};

const clothOptions: ClothOption[] = [
  { name: "Red", value: "#9f1d20" },
  { name: "Burgundy", value: "#6b1f2b" },
  { name: "Wine", value: "#5a2034" },
  { name: "Titanium", value: "#69737d" },
  { name: "Charcoal", value: "#2f3640" },
  { name: "Steel Grey", value: "#7c8791" },
  { name: "Black", value: "#151515" },
  { name: "Purple", value: "#5d3475" },
  { name: "Olive", value: "#596536" },
  { name: "Taupe", value: "#8a755d" },
  { name: "Golden", value: "#b8922f" },
  { name: "Khaki", value: "#a79263" },
  { name: "Camel", value: "#b07a42" },
  { name: "Brown", value: "#6b4a31" },
  { name: "Basic Green", value: "#0b7a3a" },
  { name: "Championship Green", value: "#0d6a34" },
  { name: "Dark Green", value: "#0b4f2d" },
  { name: "Bottle Green", value: "#0a5a3a" },
  { name: "English Green", value: "#154734" },
  { name: "Aztec", value: "#0f6957" },
  { name: "Brick", value: "#9a4e32" },
  { name: "Navy", value: "#19345b" },
  { name: "Championship Blue", value: "#1554a1" },
  { name: "Academy Blue", value: "#2468be" },
  { name: "Euro Blue", value: "#0d4f87" },
  { name: "Electric Blue", value: "#0079d8" },
];

const accessoryPackages = [
  {
    id: "standard",
    title: "Add Free Standard Package",
    priceLabel: "Included",
  },
  {
    id: "gold",
    title: "Upgrade to Gold Package $125",
    priceLabel: "+$125",
  },
];

const conditionLabels: Record<Product["condition"], string> = {
  excellent: "Excellent",
  "very-good": "Very Good",
  good: "Good",
  restored: "Restored",
};

const clothMaskStyles = (color: string) => ({
  backgroundColor: color,
  maskImage: "url(/images/pool/table-mask.png)",
  WebkitMaskImage: "url(/images/pool/table-mask.png)",
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
  mixBlendMode: "multiply" as const,
});

export default function PoolProductDetail({ product }: Props) {
  const [selectedColor, setSelectedColor] = useState<ClothOption>(clothOptions[0]);
  const [selectedPackage, setSelectedPackage] = useState(accessoryPackages[0].id);
  const [isClothOpen, setIsClothOpen] = useState(false);

  const galleryItems = useMemo<GalleryItem[]>(
    () => [
      {
        id: "cloth-preview",
        label: "Cloth Preview",
        type: "cloth-preview",
        src: "/images/pool/table.png",
        alt: `${product.name} cloth preview`,
      },
      {
        id: "product-main",
        label: "Main View",
        type: "photo",
        src: product.images[0]?.url ?? "/images/products/WalnutEncore.png",
        alt: product.images[0]?.alt || product.name,
      },
      {
        id: "room-view",
        label: "Room View",
        type: "photo",
        src: "/images/hero/used-table-vancouver.png",
        alt: `${product.name} in a room setting`,
      },
    ],
    [product],
  );

  const [selectedImageId, setSelectedImageId] = useState(galleryItems[0].id);
  const selectedImage =
    galleryItems.find((item) => item.id === selectedImageId) ?? galleryItems[0];

  const detailItems = [
    { label: "Size", value: product.dimensions ?? "8 ft" },
    { label: "Material", value: product.brand ? `${product.brand} hardwood frame` : "Hardwood frame" },
    { label: "Pockets", value: "Leather drop pockets" },
    { label: "Condition", value: conditionLabels[product.condition] },
  ];

  return (
    <main className="bg-[radial-gradient(circle_at_top,#fffaf3_0%,#f6efe3_56%,#f2e9da_100%)] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[2rem] border border-[#e3d5c1] bg-[#fffdfa] p-5 shadow-[0_22px_46px_rgba(47,35,22,0.08)]">
              <div className="grid gap-4 md:grid-cols-[84px_minmax(0,1fr)] md:items-start">
                <div className="order-2 flex gap-3 overflow-x-auto pb-1 md:order-1 md:flex-col md:overflow-visible">
                  {galleryItems.map((item) => {
                    const isActive = item.id === selectedImage.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedImageId(item.id)}
                        className={`group relative shrink-0 overflow-hidden rounded-2xl border transition ${
                          isActive
                            ? "border-[#c89f57] bg-[#fff5e4] shadow-[0_10px_24px_rgba(200,159,87,0.18)]"
                            : "border-[#e6dbc9] bg-[#f8f2e8] hover:border-[#d9c2a0]"
                        } h-20 w-20 md:h-22 md:w-22`}
                      >
                        {item.type === "cloth-preview" ? (
                          <div className="absolute inset-2.5">
                            <Image
                              src={item.src}
                              alt={item.alt}
                              fill
                              sizes="88px"
                              className="object-contain"
                            />
                            <div
                              className="pointer-events-none absolute inset-0"
                              style={{
                                ...clothMaskStyles(selectedColor.value),
                                opacity: 0.85,
                              }}
                            />
                          </div>
                        ) : (
                          <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            sizes="88px"
                            className="object-cover"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="order-1 overflow-hidden rounded-[1.8rem] border border-[#e7dece] bg-[linear-gradient(180deg,#fbf7f0_0%,#f0e6d7_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
                  <div className="relative aspect-[4/3] w-full">
                    {selectedImage.type === "cloth-preview" ? (
                      <div className="absolute inset-5">
                        <Image
                          src={selectedImage.src}
                          alt={selectedImage.alt}
                          fill
                          sizes="(max-width: 1023px) 100vw, 42vw"
                          className="object-contain"
                        />
                        <div
                          className="pointer-events-none absolute inset-0"
                          style={{
                            ...clothMaskStyles(selectedColor.value),
                            opacity: 0.88,
                          }}
                        />
                      </div>
                    ) : (
                      <Image
                        src={selectedImage.src}
                        alt={selectedImage.alt}
                        fill
                        sizes="(max-width: 1023px) 100vw, 42vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[2rem] border border-[#e3d5c1] bg-[#fffdfa] p-7 shadow-[0_22px_46px_rgba(47,35,22,0.08)] md:p-8">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#a46f24]">
                Premium Pool Table
              </p>
              <h1 className="mt-4 text-5xl leading-[0.96] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-6xl">
                {product.name}
              </h1>
              <p className="mt-6 text-3xl font-semibold text-[#101f2e]">
                Starting at ${product.startingPrice}
              </p>
              <p className="mt-6 text-lg leading-8 text-[#4e5157]">
                {product.shortDescription}
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#e3d5c1] bg-[#fffdfa] p-7 shadow-[0_22px_46px_rgba(47,35,22,0.08)] md:p-8">
              <button
                type="button"
                onClick={() => setIsClothOpen((current) => !current)}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <div>
                  <h2 className="text-[1.9rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                    Choose Cloth Color
                  </h2>
                  <p className="mt-2 text-sm text-[#6a6761]">
                    Selected: {selectedColor.name}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className={`text-2xl text-[#8b611f] transition duration-300 ${
                    isClothOpen ? "rotate-180" : ""
                  }`}
                >
                  ˅
                </span>
              </button>

              {isClothOpen ? (
                <div className="mt-8 grid grid-cols-3 gap-5 sm:grid-cols-4 lg:grid-cols-5">
                  {clothOptions.map((color) => {
                    const isSelected = selectedColor.name === color.name;

                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className="flex flex-col items-center gap-3 text-center"
                      >
                        <span
                          className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition ${
                            isSelected
                              ? "border-[#c89f57] shadow-[0_0_0_4px_rgba(200,159,87,0.14)]"
                              : "border-[#ddd0bc]"
                          }`}
                          style={{ backgroundColor: color.value }}
                        >
                          {isSelected ? (
                            <span className="text-lg font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                              ✓
                            </span>
                          ) : null}
                        </span>
                        <span className="text-xs leading-5 text-[#53565c]">
                          {color.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>

            <div className="rounded-[2rem] border border-[#e3d5c1] bg-[#fffdfa] p-7 shadow-[0_22px_46px_rgba(47,35,22,0.08)] md:p-8">
              <div className="mb-5">
                <h2 className="text-[1.9rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                  Full Accessory Package: *
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {accessoryPackages.map((option) => {
                  const isSelected = selectedPackage === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedPackage(option.id)}
                      className={`rounded-[1.4rem] border px-5 py-5 text-left transition ${
                        isSelected
                          ? "border-[#c89f57] bg-[#fff6e6] shadow-[0_10px_24px_rgba(200,159,87,0.12)]"
                          : "border-[#e5d9c8] bg-[#fffdfa] hover:border-[#d4b07a]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-base font-medium text-[#132334]">
                          {option.title}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] ${
                            isSelected
                              ? "bg-[#f1c269] text-[#1d2733]"
                              : "bg-[#f3ede3] text-[#7a6a56]"
                          }`}
                        >
                          {option.priceLabel}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#e3d5c1] bg-[#fffdfa] p-7 shadow-[0_22px_46px_rgba(47,35,22,0.08)] md:p-8">
              <h2 className="text-[1.9rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                Product Details
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {detailItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.2rem] border border-[#ece2d4] bg-[#fcfaf6] px-5 py-4"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#a46f24]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-base text-[#122233]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#e3d5c1] bg-[#fffdfa] p-7 shadow-[0_22px_46px_rgba(47,35,22,0.08)] md:p-8">
              <h2 className="text-[1.9rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                Description
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#4e5157]">
                {product.description}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#f1c269] px-6 py-3.5 text-sm font-medium text-[#18212d] shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition hover:bg-[#f5ce82]"
                >
                  <span>Request a Quote</span>
                  <span aria-hidden="true" className="text-base leading-none">
                    &rarr;
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-[#d9c7ae] px-6 py-3.5 text-sm font-medium text-[#132334] transition hover:border-[#c89f57] hover:text-[#8b611f]"
                >
                  Ask a Question
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
