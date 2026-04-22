"use client";

import { useEffect, useRef, useState } from "react";
import HeroCategoryCard from "./HeroCategoryCard";

const railMarkerClasses = [
  "top-[4.4%] left-[12%] -translate-x-1/2",
  "top-[4.4%] left-[22%] -translate-x-1/2",
  "top-[4.4%] left-[36%] -translate-x-1/2",
  "top-[4.4%] left-[64%] -translate-x-1/2",
  "top-[4.4%] left-[78%] -translate-x-1/2",
  "top-[4.4%] left-[88%] -translate-x-1/2",
  "bottom-[4.4%] left-[12%] -translate-x-1/2",
  "bottom-[4.4%] left-[22%] -translate-x-1/2",
  "bottom-[4.4%] left-[36%] -translate-x-1/2",
  "bottom-[4.4%] left-[64%] -translate-x-1/2",
  "bottom-[4.4%] left-[78%] -translate-x-1/2",
  "bottom-[4.4%] left-[88%] -translate-x-1/2",
  "left-[4.4%] top-[30%] -translate-y-1/2",
  "left-[4.4%] top-[50%] -translate-y-1/2",
  "left-[4.4%] top-[70%] -translate-y-1/2",
  "right-[4.4%] top-[30%] -translate-y-1/2",
  "right-[4.4%] top-[50%] -translate-y-1/2",
  "right-[4.4%] top-[70%] -translate-y-1/2",
];

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
      const scrolled = Math.min(Math.max(-rect.top, 0), totalScrollable);

      const nextProgress = totalScrollable > 0 ? scrolled / totalScrollable : 0;

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
        <div className="absolute inset-x-0 top-[4.5%] flex items-center justify-center px-4 md:top-[5.5%]">
          <div className="relative aspect-[16/9] w-[86%] max-w-4xl drop-shadow-[0_36px_50px_rgba(45,52,70,0.22)] md:w-[90%]">
            {/* outer wood frame */}
            <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(135deg,#9b643d_0%,#774526_45%,#4b2a18_100%)] shadow-[inset_0_2px_0_rgba(255,255,255,0.18),inset_0_-4px_10px_rgba(30,18,10,0.28)]" />

            {/* rail cushion */}
            <div className="absolute inset-[2.8%] rounded-[1.7rem] bg-[linear-gradient(180deg,#4f2e1d_0%,#351f13_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" />

            {/* felt area */}
            <div className="absolute inset-x-[6.6%] inset-y-[7%] overflow-hidden rounded-[1rem] border border-white/10 bg-[radial-gradient(circle_at_top,#1bb252_0%,#109241_52%,#0a7e39_100%)] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.03),inset_0_20px_30px_rgba(255,255,255,0.05),inset_0_-18px_26px_rgba(0,0,0,0.16)]">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.045)_0%,transparent_28%,transparent_72%,rgba(0,0,0,0.08)_100%)]" />
              <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.6px,transparent_0.6px)] [background-size:14px_14px]" />

              <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white/90 select-none">
                <span className="text-[2.9rem] font-light tracking-[0.2em] leading-none uppercase md:text-[4.9rem]">
                  USED
                </span>
                <span className="mt-3 text-[1rem] font-light tracking-[0.38em] leading-none uppercase md:text-[1.7rem]">
                  BILLIARDS
                </span>
              </div>
            </div>

            {/* rail markers */}
            {railMarkerClasses.map((positionClass) => (
              <div
                key={positionClass}
                className={`absolute z-20 h-2.5 w-2.5 rounded-[2px] rotate-45 border border-white/35 bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.14)] ${positionClass}`}
              />
            ))}

            {/* Pockets */}
            <div className="absolute left-[2.6%] top-[2.6%] z-10 h-11 w-11 rounded-full bg-[#0b0c10] shadow-[inset_0_3px_6px_rgba(255,255,255,0.08),inset_0_-6px_12px_rgba(0,0,0,0.85)]" />
            <div className="absolute left-1/2 top-[1.7%] z-10 h-10 w-16 -translate-x-1/2 rounded-b-full rounded-t-[999px] bg-[#0b0c10] shadow-[inset_0_3px_6px_rgba(255,255,255,0.08),inset_0_-6px_12px_rgba(0,0,0,0.85)]" />
            <div className="absolute right-[2.6%] top-[2.6%] z-10 h-11 w-11 rounded-full bg-[#0b0c10] shadow-[inset_0_3px_6px_rgba(255,255,255,0.08),inset_0_-6px_12px_rgba(0,0,0,0.85)]" />

            <div className="absolute bottom-[2.6%] left-[2.6%] z-10 h-11 w-11 rounded-full bg-[#0b0c10] shadow-[inset_0_3px_6px_rgba(255,255,255,0.08),inset_0_-6px_12px_rgba(0,0,0,0.85)]" />
            <div className="absolute bottom-[1.7%] left-1/2 z-10 h-10 w-16 -translate-x-1/2 rounded-t-full rounded-b-[999px] bg-[#0b0c10] shadow-[inset_0_3px_6px_rgba(255,255,255,0.08),inset_0_-6px_12px_rgba(0,0,0,0.85)]" />
            <div className="absolute bottom-[2.6%] right-[2.6%] z-10 h-11 w-11 rounded-full bg-[#0b0c10] shadow-[inset_0_3px_6px_rgba(255,255,255,0.08),inset_0_-6px_12px_rgba(0,0,0,0.85)]" />
          </div>
        </div>

        {/* Bolas */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Bola 8 -> top left pocket */}
          <div
            className="absolute top-[28%] left-[42%] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[radial-gradient(circle_at_30%_30%,#4a4a4a_0%,#111111_35%,#050505_100%)] text-base font-bold text-white shadow-[0_10px_16px_rgba(0,0,0,0.24),0_18px_16px_rgba(0,0,0,0.12),inset_0_-3px_5px_rgba(0,0,0,0.28)] transition-opacity duration-200 will-change-transform md:h-12 md:w-12 md:text-lg"
            style={{
              transform: `translate(${-easedProgress * 280}px, ${-easedProgress * 200}px) scale(${ballsGone ? 0.2 : 1})`,
              opacity: ballsGone ? 0 : 1,
            }}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[0.8rem] font-bold text-black md:h-6 md:w-6 md:text-sm">
              8
            </span>
          </div>

          {/* Bola 1 -> top right pocket */}
          <div
            className="absolute top-[38%] left-[52%] flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-[radial-gradient(circle_at_30%_30%,#fff3a6_0%,#ffd84c_42%,#d5a800_100%)] text-base font-bold text-black shadow-[0_10px_16px_rgba(0,0,0,0.22),0_18px_16px_rgba(0,0,0,0.11),inset_0_-3px_5px_rgba(0,0,0,0.2)] transition-opacity duration-200 will-change-transform md:h-12 md:w-12 md:text-lg"
            style={{
              transform: `translate(${easedProgress * 335}px, ${-easedProgress * 290}px) scale(${ballsGone ? 0.2 : 1})`,
              opacity: ballsGone ? 0 : 1,
            }}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[0.8rem] font-bold text-black md:h-6 md:w-6 md:text-sm">
              1
            </span>
          </div>

          {/* Bola 3 -> bottom left pocket */}
          <div
            className="absolute top-[42%] left-[46%] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[radial-gradient(circle_at_30%_30%,#ff9494_0%,#ef4444_42%,#b91c1c_100%)] text-base font-bold text-white shadow-[0_10px_16px_rgba(0,0,0,0.22),0_18px_16px_rgba(0,0,0,0.11),inset_0_-3px_5px_rgba(0,0,0,0.2)] transition-opacity duration-200 will-change-transform md:h-12 md:w-12 md:text-lg"
            style={{
              transform: `translate(${-easedProgress * 345}px, ${easedProgress * 100}px) scale(${ballsGone ? 0.2 : 1})`,
              opacity: ballsGone ? 0 : 1,
            }}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[0.8rem] font-bold text-black md:h-6 md:w-6 md:text-sm">
              3
            </span>
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
              imageSrc="/images/products/whistler-indoor.png"
              imageAlt="Whistler Indoor ping pong table"
            />

            <HeroCategoryCard
              title="Foosball Tables"
              description="Shop durable foosball tables designed for fun and everyday play."
              href="/products/foosball"
              imageSrc="/images/products/tornado-classic.png"
              imageAlt="Foosball table"
            />
          </div>
        </div>

        {/* Texto */}
        <div className="absolute bottom-6 w-full text-center text-[#5e6375]">
          <p className="text-sm opacity-70">Keep scrolling to explore</p>
        </div>
      </div>
    </section>
  );
}
