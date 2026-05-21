import Image from "next/image";
import SellRequestForm from "@/components/forms/SellRequestForm";

export default function CTASection() {
  return (
    <section className="bg-[radial-gradient(circle_at_top,#f7f1e6_0%,#f2e8d9_58%,#eee2d1_100%)] px-6 py-24 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2.2rem] border border-[#e3d5c2] bg-[#fffdfa] shadow-[0_28px_60px_rgba(47,35,22,0.1)]">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <div className="order-2 flex items-center px-7 py-10 md:order-1 md:px-12 md:py-14">
              <div className="max-w-xl">
                <div className="mb-6 text-[#b27a2a]">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 64 24"
                    className="h-6 w-16"
                  >
                    <path
                      d="M2 20h60M10 20l8-10 7 7 9-12 8 9 6-6 6 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <p className="text-sm font-medium uppercase tracking-[0.26em] text-[#a46f24]">
                  Reclaim your game room
                </p>

                <h2 className="mt-4 text-5xl leading-[0.96] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-6xl">
                  Ready to get rid of your pool table?
                </h2>

                <p className="mt-5 max-w-lg text-lg leading-8 text-[#4b4e53]">
                  We make it easy. Get your room back with our professional
                  removal.
                </p>

                <SellRequestForm itemType="Pool table" />
              </div>
            </div>

            <div className="order-1 min-h-[280px] md:order-2 md:min-h-[420px]">
              <div className="relative h-full w-full">
                <Image
                  src="/images/categories/pool-background.png"
                  alt="Pool table in a premium game room"
                  fill
                  sizes="(max-width: 767px) 100vw, 55vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,28,0.08)_0%,rgba(10,18,28,0.12)_100%)] md:bg-[linear-gradient(90deg,rgba(255,253,250,0.18)_0%,rgba(255,253,250,0)_20%,rgba(10,18,28,0.16)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_45%)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
