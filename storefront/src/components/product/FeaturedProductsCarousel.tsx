"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface FeaturedProductsCarouselProps {
  products: Product[];
}

export default function FeaturedProductsCarousel({
  products,
}: FeaturedProductsCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
        return;
      }

      if (window.innerWidth < 1024) {
        setVisibleCount(2);
        return;
      }

      setVisibleCount(3);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const totalPages = Math.ceil(products.length / visibleCount);
  const currentPage = Math.min(Math.floor(activeIndex / visibleCount), totalPages - 1);
  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  const pageIndices = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index * visibleCount),
    [totalPages, visibleCount],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const nearestIndex = cardRefs.current.reduce(
        (closestIndex, card, index) => {
          if (!card) return closestIndex;

          const distance = Math.abs(card.offsetLeft - track.scrollLeft);
          const closestCard = cardRefs.current[closestIndex];
          const closestDistance = closestCard
            ? Math.abs(closestCard.offsetLeft - track.scrollLeft)
            : Number.POSITIVE_INFINITY;

          return distance < closestDistance ? index : closestIndex;
        },
        0,
      );

      setActiveIndex(nearestIndex);
    };

    handleScroll();
    track.addEventListener("scroll", handleScroll, { passive: true });

    return () => track.removeEventListener("scroll", handleScroll);
  }, [products.length]);

  const scrollToIndex = (index: number) => {
    const target = cardRefs.current[index];
    target?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    setActiveIndex(index);
  };

  const handlePrev = () => {
    if (!canGoPrev) return;
    scrollToIndex(pageIndices[currentPage - 1]);
  };

  const handleNext = () => {
    if (!canGoNext) return;
    scrollToIndex(pageIndices[currentPage + 1]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          aria-label="Previous featured product"
          onClick={handlePrev}
          disabled={!canGoPrev}
          className="hidden h-12 w-12 items-center justify-center rounded-full border border-[#d6c5ab] bg-white/75 text-[#8b611f] shadow-[0_10px_24px_rgba(51,38,23,0.08)] transition hover:border-[#b9883e] hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 md:inline-flex"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            &larr;
          </span>
        </button>

        <button
          type="button"
          aria-label="Next featured product"
          onClick={handleNext}
          disabled={!canGoNext}
          className="hidden h-12 w-12 items-center justify-center rounded-full border border-[#d6c5ab] bg-white/75 text-[#8b611f] shadow-[0_10px_24px_rgba(51,38,23,0.08)] transition hover:border-[#b9883e] hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 md:inline-flex"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            &rarr;
          </span>
        </button>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            className="min-w-0 shrink-0 snap-start basis-[92%] sm:basis-[72%] md:basis-[calc(50%-0.75rem)] lg:basis-[calc((100%-3rem)/3)]"
          >
            <ProductCard product={product} variant="featured" />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2">
        {pageIndices.map((pageIndex, index) => {
          const isActive = index === currentPage;

          return (
            <button
              key={pageIndex}
              type="button"
              aria-label={`Go to featured product page ${index + 1}`}
              onClick={() => scrollToIndex(pageIndex)}
              className={`h-2.5 rounded-full transition ${
                isActive ? "w-8 bg-[#b9883e]" : "w-2.5 bg-[#dbcdb9]"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
