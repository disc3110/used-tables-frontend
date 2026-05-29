"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import ProductPurchaseActions from "@/components/product/ProductPurchaseActions";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
}

type GalleryItem = {
  id: string;
  label: string;
  src: string;
  alt: string;
};

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

export default function PoolProductDetail({ product }: Props) {
  const [selectedPackage, setSelectedPackage] = useState(
    accessoryPackages[0].id,
  );

  const galleryItems = useMemo<GalleryItem[]>(
    () =>
      product.images.map((image, index) => ({
        id: image.id || `photo-${index}`,
        label: index === 0 ? "Main View" : `View ${index + 1}`,
        src: image.url,
        alt: image.alt || product.name,
      })),
    [product],
  );

  const [selectedImageId, setSelectedImageId] = useState(
    galleryItems[0]?.id ?? "",
  );
  const selectedImage =
    galleryItems.find((item) => item.id === selectedImageId) ??
    galleryItems[0] ??
    null;

  const detailItems = [
    {
      label: "Availability",
      value:
        product.quantity === 1
          ? "1 table available"
          : `${product.quantity} tables available`,
    },
    { label: "Size", value: product.dimensions ?? "8 ft" },
    {
      label: "Material",
      value: product.brand
        ? `${product.brand} hardwood frame`
        : "Hardwood frame",
    },
    { label: "Pockets", value: "Leather drop pockets" },
    { label: "Condition", value: conditionLabels[product.condition] },
  ];

  return (
    <main className="bg-[radial-gradient(circle_at_top,#fffaf3_0%,#f6efe3_56%,#f2e9da_100%)] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">

          {/* ── Gallery (sticky left) ── */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="grid gap-4 md:grid-cols-[84px_minmax(0,1fr)] md:items-start">

              {/* Thumbnail strip */}
              <div className="order-2 flex gap-3 overflow-x-auto pb-1 md:order-1 md:flex-col md:overflow-visible">
                {galleryItems.map((item) => {
                  const isActive = item.id === selectedImage?.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedImageId(item.id)}
                      className={`relative shrink-0 overflow-hidden rounded-2xl border transition h-20 w-20 md:h-22 md:w-22 ${
                        isActive
                          ? "border-[#c89f57] shadow-[0_10px_24px_rgba(200,159,87,0.18)]"
                          : "border-transparent hover:border-[#d9c2a0]"
                      }`}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="88px"
                        className="object-contain p-1 drop-shadow-[0_8px_12px_rgba(47,35,22,0.16)]"
                      />
                    </button>
                  );
                })}
              </div>

              {/* Main image */}
              <div className="order-1 overflow-visible">
                <div className="relative aspect-[4/3] w-full">
                  {selectedImage ? (
                    <Image
                      key={selectedImage.id}
                      src={selectedImage.src}
                      alt={selectedImage.alt}
                      fill
                      sizes="(max-width: 1023px) 100vw, 42vw"
                      className="object-contain drop-shadow-[0_24px_30px_rgba(47,35,22,0.18)] transition-opacity duration-300"
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="space-y-8">

            {/* Title / price card */}
            <div className="rounded-[2rem] border border-[#e3d5c1] bg-[#fffdfa] p-7 shadow-[0_22px_46px_rgba(47,35,22,0.08)] md:p-8">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#a46f24]">
                Premium Pool Table
              </p>
              <h1 className="mt-4 text-5xl leading-[0.96] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-6xl">
                {product.name}
              </h1>

              {/* Pre-owned badge */}
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#e3d5c1] bg-[#fdf5e6] px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-[#8c6831]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c89f57]" />
                Pre-owned
              </span>

              <p className="mt-5 text-3xl font-semibold text-[#101f2e]">
                Starting at ${product.startingPrice}
              </p>
              <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-[#8c6831]">
                {product.quantity === 1
                  ? "1 table currently available"
                  : `${product.quantity} tables currently available`}
              </p>
              <p className="mt-6 text-lg leading-8 text-[#4e5157]">
                {product.shortDescription}
              </p>
            </div>

            {/* What's included */}
            <div className="rounded-[1.8rem] border border-[#e3d5c1] bg-[#fffaf3] p-6 shadow-[0_16px_34px_rgba(47,35,22,0.06)] md:p-7">
              <h2 className="text-[1.55rem] leading-[1.04] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                Included with your table
              </h2>
              <div className="mt-5 space-y-3">
                {[
                  "Professional installation included (In Metro Vancouver)",
                  "Basic accessory kit included",
                  "Cloth color choice included",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#f5e4bc] text-[#9b6c28]">
                      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5">
                        <path
                          d="M4.5 10.5L8 14l7.5-8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <p className="text-sm leading-7 text-[#24313f]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Accessory packages */}
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

            <ProductPurchaseActions
              productSlug={product.slug}
              available={product.available}
              quantity={product.quantity}
              accessoryPackage={selectedPackage}
              showInstallDeliveryOption
            />

            {/* Product details */}
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

            {/* Description */}
            <div className="rounded-[2rem] border border-[#e3d5c1] bg-[#fffdfa] p-7 shadow-[0_22px_46px_rgba(47,35,22,0.08)] md:p-8">
              <h2 className="text-[1.9rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                Description
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#4e5157]">
                {product.description}
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
