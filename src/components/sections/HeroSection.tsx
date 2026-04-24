"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [isShortViewport, setIsShortViewport] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateViewportState = () => {
      const mobile = window.innerWidth < 768;
      const landscape = window.innerWidth > window.innerHeight;
      const shortViewport = window.innerHeight < 600;

      setIsMobile(mobile);
      setIsLandscape(landscape);
      setIsShortViewport(shortViewport);
    };

    updateViewportState();
    window.addEventListener("resize", updateViewportState);

    return () => window.removeEventListener("resize", updateViewportState);
  }, []);

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

  const easedProgress = 1 - Math.pow(1 - Math.min(progress, 1), 3);
  const isMobileLandscape = isMobile && isLandscape;
  const isCompactScreen = isMobileLandscape || isShortViewport;
  const isMobilePortrait = isMobile && !isCompactScreen;
  const ballMode = !isMobile
    ? "desktop"
    : isMobilePortrait
      ? "mobilePortrait"
      : "compact";

  const fadeBetween = (value: number, start: number, end: number) => {
    if (value <= start) return 1;
    if (value >= end) return 0;
    return 1 - (value - start) / (end - start);
  };

  const desktopBallFade = fadeBetween(progress, 0.98, 1);
  const desktopBallScale = 0.2 + 0.8 * desktopBallFade;
  const mobilePortraitBallFade = fadeBetween(progress, 0.96, 1);
  const compactContentOffset = ballMode === "compact" ? easedProgress * 18 : 0;
  const compactContentOpacity =
    ballMode === "compact" ? 1 - easedProgress * 0.14 : 1;
  const compactBackgroundOffset = ballMode === "compact" ? easedProgress * 14 : 0;

  return (
    <section ref={sectionRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#e7e8ee]">
        <div
          className="absolute inset-0"
          style={{
            transform:
              ballMode === "compact"
                ? `translateY(${compactBackgroundOffset}px)`
                : undefined,
          }}
        >
          <Image
            src="/images/hero/hero-room-vancouver.png"
            alt="Bright modern billiards room with large windows and forest view"
            fill
            priority
            className="hidden object-cover md:block"
          />
          <Image
            src="/images/hero/hero-background-mobile.png"
            alt="Modern billiards room on mobile"
            fill
            priority
            className="block object-cover md:hidden"
          />
          <div className="absolute inset-0 bg-white/10" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,12,18,0.48)_0%,rgba(9,12,18,0.14)_30%,rgba(9,12,18,0.08)_52%,rgba(9,12,18,0.36)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_42%,rgba(5,10,18,0.16)_100%)]" />
        </div>

        <div
          className="absolute inset-x-0 top-[17%] z-30 px-6 md:top-[15%]"
          style={{
            transform:
              ballMode === "compact"
                ? `translateY(${compactContentOffset}px)`
                : undefined,
            opacity: compactContentOpacity,
          }}
        >
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <div className="flex flex-col items-center text-white">
              <span className="block text-[3.4rem] font-semibold leading-none tracking-[0.26em] uppercase [text-shadow:0_10px_30px_rgba(0,0,0,0.3),0_0_18px_rgba(255,255,255,0.12)] md:text-[6.4rem]">
                Used
              </span>
              <span className="mt-3 block text-[1.05rem] font-light leading-none tracking-[0.56em] uppercase [text-shadow:0_8px_22px_rgba(0,0,0,0.28)] md:mt-4 md:text-[2rem]">
                Billiards
              </span>
              <div className="mt-5 h-px w-28 bg-white/40 md:w-40" />
            </div>

            <div className="mt-7 flex w-full max-w-3xl flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/products/pool-tables"
                className="group inline-flex min-w-[220px] items-center justify-center gap-3 rounded-full border border-white/35 bg-white/8 px-6 py-3.5 text-[0.72rem] font-medium tracking-[0.32em] text-white shadow-[0_14px_32px_rgba(0,0,0,0.12)] backdrop-blur-md transition duration-300 hover:border-white/60 hover:bg-white/14 hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
              >
                <span>POOL TABLES</span>
                <span className="text-base leading-none transition duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>

              <Link
                href="/products/ping-pong"
                className="group inline-flex min-w-[220px] items-center justify-center gap-3 rounded-full border border-white/35 bg-white/8 px-6 py-3.5 text-[0.72rem] font-medium tracking-[0.32em] text-white shadow-[0_14px_32px_rgba(0,0,0,0.12)] backdrop-blur-md transition duration-300 hover:border-white/60 hover:bg-white/14 hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
              >
                <span>PING PONG TABLES</span>
                <span className="text-base leading-none transition duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-[-20%] z-20 hidden justify-center px-3 md:bottom-[-20%] md:flex md:px-6">
          <div className="absolute bottom-[2%] h-12 w-[78vw] max-w-[980px] rounded-full bg-black/25 blur-3xl md:h-16 md:w-[70vw]" />

          <div className="relative w-[120vw] max-w-[1500px] md:w-[95vw]">
            <Image
              src="/images/hero/hero-table-vancouver.png"
              alt="Pool table"
              width={2698}
              height={1094}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        <div className="absolute inset-0 z-20 pointer-events-none">
          {ballMode !== "compact" ? (
            <>
              <div
                className="absolute left-[45%] top-[64%] flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[radial-gradient(circle_at_30%_30%,#3a3a3a_0%,#0e0e0e_45%,#050505_100%)] text-sm font-bold text-white shadow-[0_10px_16px_rgba(0,0,0,0.24),0_18px_16px_rgba(0,0,0,0.12),inset_0_-3px_5px_rgba(0,0,0,0.28)] transition-opacity duration-200 md:left-[47%] md:top-[58%] md:h-10 md:w-10 md:text-base"
                style={{
                  transform:
                    ballMode === "mobilePortrait"
                      ? `translate(${-easedProgress * 44}px, ${easedProgress * 36}px)`
                      : `translate(${-easedProgress * 380}px, ${-easedProgress * 30}px) scale(${desktopBallScale})`,
                  opacity:
                    ballMode === "mobilePortrait"
                      ? 0.9 * mobilePortraitBallFade
                      : 0.9 * desktopBallFade,
                  filter: "brightness(0.95) contrast(0.95)",
                }}
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[0.8rem] font-bold text-black md:h-5 md:w-5 md:text-sm">
                  8
                </span>
              </div>

              <div
                className="absolute left-[56%] top-[66%] flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-[radial-gradient(circle_at_30%_30%,#f6d36a_0%,#e0b84a_45%,#b88900_100%)] text-sm font-bold text-black shadow-[0_10px_16px_rgba(0,0,0,0.22),0_18px_16px_rgba(0,0,0,0.11),inset_0_-3px_5px_rgba(0,0,0,0.2)] transition-opacity duration-200 md:left-[53%] md:top-[60%] md:h-10 md:w-10 md:text-base"
                style={{
                  transform:
                    ballMode === "mobilePortrait"
                      ? `translate(${easedProgress * 52}px, ${easedProgress * 40}px)`
                      : `translate(${easedProgress * 380}px, ${-easedProgress * 60}px) scale(${desktopBallScale})`,
                  opacity:
                    ballMode === "mobilePortrait"
                      ? 0.88 * mobilePortraitBallFade
                      : 0.88 * desktopBallFade,
                  filter: "brightness(0.97) saturate(0.9)",
                }}
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[0.8rem] font-bold text-black md:h-5 md:w-5 md:text-sm">
                  1
                </span>
              </div>
            </>
          ) : null}
        </div>

        <div className="absolute bottom-5 z-30 w-full text-center text-white/85">
          <div className="flex flex-col items-center gap-3">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 animate-bounce text-white/75 drop-shadow-[0_6px_16px_rgba(0,0,0,0.2)] [animation-duration:2.8s]"
            >
              <path
                d="M6 9l6 6 6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm tracking-[0.18em] uppercase opacity-80">
              Keep scrolling to explore
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
