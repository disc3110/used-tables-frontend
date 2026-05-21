"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Pool Tables",
    href: "/products/pool-tables",
    cta: "Shop Pool Tables",
    imageSrc: "/images/categories/pool-background.png",
    imageAlt: "Pool table",
  },
  {
    title: "Ping Pong Tables",
    href: "/products/ping-pong",
    cta: "Shop Ping Pong Tables",
    imageSrc: "/images/categories/ping-pong-background.png",
    imageAlt: "Ping pong table",
  },
  {
    title: "Grills",
    href: "/products/grill",
    cta: "Shop Grills",
    imageSrc: "/images/categories/grill-background.png",
    imageAlt: "Grill",
  },
  {
    title: "Foosball Tables",
    href: "/products/foosball",
    cta: "Shop Foosball Tables",
    imageSrc: "/images/categories/foosball-background.png",
    imageAlt: "Foosball table",
  },
];

export default function CategorySection() {
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

  const totalPages = Math.ceil(categories.length / visibleCount);
  const currentPage = Math.min(
    Math.floor(activeIndex / visibleCount),
    totalPages - 1,
  );
  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  const pageIndices = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i * visibleCount),
    [totalPages, visibleCount],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const nearestIndex = cardRefs.current.reduce((closest, card, i) => {
        if (!card) return closest;
        const dist = Math.abs(card.offsetLeft - track.scrollLeft);
        const closestCard = cardRefs.current[closest];
        const closestDist = closestCard
          ? Math.abs(closestCard.offsetLeft - track.scrollLeft)
          : Number.POSITIVE_INFINITY;
        return dist < closestDist ? i : closest;
      }, 0);
      setActiveIndex(nearestIndex);
    };

    handleScroll();
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

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
    if (canGoPrev) scrollToIndex(pageIndices[currentPage - 1]);
  };

  const handleNext = () => {
    if (canGoNext) scrollToIndex(pageIndices[currentPage + 1]);
  };

  return (
    <section className="bg-[radial-gradient(circle_at_top,#fffaf4_0%,#f6efe4_58%,#f3eadc_100%)] px-6 py-24 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.26em] text-[#a46f24]">
              Shop Your Way
            </p>
            <h2 className="mt-4 text-5xl leading-[0.94] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-7xl">
              Browse by Category
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#4b4e53]">
              Find the perfect table for your space.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous category"
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
              aria-label="Next category"
              onClick={handleNext}
              disabled={!canGoNext}
              className="hidden h-12 w-12 items-center justify-center rounded-full border border-[#d6c5ab] bg-white/75 text-[#8b611f] shadow-[0_10px_24px_rgba(51,38,23,0.08)] transition hover:border-[#b9883e] hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 md:inline-flex"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                &rarr;
              </span>
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category, index) => (
            <div
              key={category.title}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className="min-w-0 shrink-0 snap-start basis-[92%] sm:basis-[72%] md:basis-[calc(50%-0.75rem)] lg:basis-[calc((100%-3rem)/3)]"
            >
              <Link href={category.href} className="group block">
                <article className="overflow-hidden rounded-[1.8rem] border border-[#e5d9c9] bg-[#fffdfa] shadow-[0_18px_42px_rgba(46,34,20,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_58px_rgba(46,34,20,0.14)]">
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={category.imageSrc}
                      alt={category.imageAlt}
                      fill
                      sizes="(max-width: 767px) 92vw, (max-width: 1023px) 72vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="bg-[linear-gradient(180deg,#fffdfa_0%,#f8f3eb_100%)] px-7 py-6">
                    <h3 className="text-[2rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                      {category.title}
                    </h3>

                    <div className="mt-4 inline-flex items-center gap-2 text-base font-medium text-[#a46f24] transition group-hover:text-[#85561c]">
                      <span>{category.cta}</span>
                      <span
                        aria-hidden="true"
                        className="text-lg leading-none transition duration-300 group-hover:translate-x-1"
                      >
                        &rarr;
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {pageIndices.map((pageIndex, index) => {
            const isActive = index === currentPage;
            return (
              <button
                key={pageIndex}
                type="button"
                aria-label={`Go to category page ${index + 1}`}
                onClick={() => scrollToIndex(pageIndex)}
                className={`h-2.5 rounded-full transition ${
                  isActive ? "w-8 bg-[#b9883e]" : "w-2.5 bg-[#dbcdb9]"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
