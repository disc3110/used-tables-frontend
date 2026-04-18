"use client";

import { useEffect, useRef, useState } from "react";
import HeroCategoryCard from "./HeroCategoryCard";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      const totalScrollable = sectionHeight - viewportHeight;
      const scrolled = Math.min(
        Math.max(-rect.top, 0),
        totalScrollable
      );

      const nextProgress =
        totalScrollable > 0 ? scrolled / totalScrollable : 0;

      setProgress(nextProgress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ballsGone = progress > 0.88;
  const easedProgress = 1 - Math.pow(1 - Math.min(progress, 1), 3);

  return (
    <section ref={sectionRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#e7e8ee]">
        {/* Mesa */}
        <div className="absolute inset-x-0 top-[6%] flex items-center justify-center">
          <div className="relative flex aspect-[16/9] w-[58%] max-w-3xl items-center justify-center rounded-2xl border-8 border-[#6d4c2f] bg-[#0a8f43]">
            <div className="flex flex-col items-center justify-center text-center text-white/90 select-none">
              <span className="text-[2.6rem] font-light tracking-[0.22em] leading-none uppercase md:text-[3.4rem]">
                USED
              </span>
              <span className="mt-2 text-[1rem] font-light tracking-[0.42em] leading-none uppercase md:text-[1.35rem]">
                BILLIARDS
              </span>
            </div>

            {/* Pockets */}
            <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-black" />
            <div className="absolute -top-3 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-black" />
            <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-black" />

            <div className="absolute -bottom-3 -left-3 h-8 w-8 rounded-full bg-black" />
            <div className="absolute -bottom-3 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-black" />
            <div className="absolute -bottom-3 -right-3 h-8 w-8 rounded-full bg-black" />
          </div>
        </div>

        {/* Bolas */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Bola 8 -> top left pocket */}
          <div
            className="absolute top-[28%] left-[42%] w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg transition-opacity duration-200 will-change-transform"
            style={{
              transform: `translate(${-easedProgress * 260}px, ${-easedProgress * 300}px) scale(${ballsGone ? 0.2 : 1})`,
              opacity: ballsGone ? 0 : 1,
            }}
          >
            8
          </div>

          {/* Bola 1 -> top right pocket */}
          <div
            className="absolute top-[38%] left-[52%] w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center text-lg font-bold shadow-lg transition-opacity duration-200 will-change-transform"
            style={{
              transform: `translate(${easedProgress * 260}px, ${-easedProgress * 220}px) scale(${ballsGone ? 0.2 : 1})`,
              opacity: ballsGone ? 0 : 1,
            }}
          >
            1
          </div>

          {/* Bola 3 -> bottom left pocket */}
          <div
            className="absolute top-[42%] left-[46%] w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg transition-opacity duration-200 will-change-transform"
            style={{
              transform: `translate(${-easedProgress * 260}px, ${easedProgress * 200}px) scale(${ballsGone ? 0.2 : 1})`,
              opacity: ballsGone ? 0 : 1,
            }}
          >
            3
          </div>
        </div>

        {/* Category cards */}
        
        <div className="absolute inset-x-0 bottom-16 z-10 px-6">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
            <HeroCategoryCard
              title="Pool Tables"
              description="Explore classic, restored, and premium used billiard tables."
              href="/products/pool-tables"
              imageSrc="/images/products/WalnutEncore.png"
              imageAlt="Walnut Encore pool table"
            />

            <HeroCategoryCard
              title="Ping Pong Tables"
              description="Find foldable and full-size table tennis options for every space."
              href="/products/ping-pong"
            />

            <HeroCategoryCard
              title="Foosball Tables"
              description="Shop durable foosball tables designed for fun and everyday play."
              href="/products/foosball"
            />
          </div>
        </div>

        {/* Texto */}
        <div className="absolute bottom-6 w-full text-center text-[#5e6375]">
          <p className="text-sm opacity-70">
            {ballsGone ? "Keep scrolling to explore" : "Scroll to sink the balls"}
          </p>
        </div>
      </div>
    </section>
  );
}