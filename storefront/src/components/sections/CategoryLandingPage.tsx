import Image from "next/image";
import Link from "next/link";
import ProductGrid from "@/components/product/ProductGrid";
import type { Product } from "@/types/product";

interface CategoryLandingPageProps {
  title: string;
  description: string;
  heroImageSrc: string;
  heroImageAlt: string;
  includedItems?: Array<{
    title: string;
    description: string;
  }>;
  sellTitle: string;
  sellImageSrc: string;
  sellImageAlt: string;
  products: Product[];
}

const buyingSteps = [
  {
    step: "01",
    title: "Choose",
    description:
      "Browse our available tables and find the right fit for your space.",
  },
  {
    step: "02",
    title: "Purchase",
    description: "Secure your table and finilize your order.",
  },
  {
    step: "03",
    title: "Pick Up",
    description: "Your table will be ready for pickup at our location.",
  },
  {
    step: "04",
    title: "Enjoy",
    description: "Start enjoying your game room with everything ready to play.",
  },
];

const trustItems = ["5-Star Service", "Quality Inspected", "Expert Support"];

export default function CategoryLandingPage({
  title,
  description,
  heroImageSrc,
  heroImageAlt,
  includedItems,
  sellTitle,
  sellImageSrc,
  sellImageAlt,
  products,
}: CategoryLandingPageProps) {
  return (
    <div className="-mx-6 bg-[#f7f3eb]">
      <section className="relative overflow-hidden bg-[#091827]">
        <div className="absolute inset-0">
          <Image
            src={heroImageSrc}
            alt={heroImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,16,27,0.88)_0%,rgba(8,16,27,0.65)_42%,rgba(8,16,27,0.52)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,16,27,0.12)_0%,rgba(8,16,27,0.36)_100%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
          <div className="max-w-3xl text-white">
            <div className="flex items-center gap-3 text-sm text-white/74">
              <Link href="/" className="transition hover:text-[#f1c269]">
                Home
              </Link>
              <span>/</span>
              <span>{title}</span>
            </div>

            <h1 className="mt-2 text-5xl leading-[0.94] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-7xl">
              {title}
            </h1>

            <p className="mt-3 max-w-2xl text-lg leading-8 text-white/78">
              {description}
            </p>
          </div>
        </div>
      </section>

      {includedItems?.length ? (
        <section className="px-6 py-6 md:pb-8">
          <div className="mx-auto max-w-7xl rounded-[1.9rem] border border-[#e4d8c8] bg-[#fffdfa] px-7 py-7 shadow-[0_14px_34px_rgba(47,35,22,0.06)] md:px-8 md:py-8">
            <div className="mb-6">
              <h2 className="text-[2rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                Included with every pool table
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {includedItems.map((item, index) => (
                <div
                  key={item.title}
                  className={`flex gap-4 md:px-2 ${index > 0 ? "md:border-l md:border-[#ece2d4] md:pl-6" : ""}`}
                >
                  <div className="mt-1 shrink-0 text-[#b27a2a]">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl leading-[1.1] text-[#102131] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#4e5157]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section
          id="buying-process"
          className="bg-[radial-gradient(circle_at_top,#fffaf3_0%,#f6efe3_56%,#f2e9da_100%)] px-6 py-18 md:py-20"
        >
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#e4d8c8] bg-[#fffdfa] shadow-[0_18px_44px_rgba(47,35,22,0.08)]">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
              {buyingSteps.map((item, index) => (
                <div
                  key={item.step}
                  className={`px-7 py-8 md:px-8 ${index > 0 ? "border-t border-[#ece2d4]" : ""} ${index >= 2 ? "md:border-t md:border-[#ece2d4]" : "md:border-t-0"} ${index % 2 === 1 ? "md:border-l md:border-[#ece2d4]" : "md:border-l-0"} ${index > 0 ? "xl:border-l xl:border-[#ece2d4]" : "xl:border-l-0"} xl:border-t-0`}
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#d9b57c] bg-[#fff7eb] text-sm font-semibold tracking-[0.2em] text-[#b27a2a]">
                    {item.step}
                  </div>
                  <h2 className="text-[1.8rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-[1rem] leading-8 text-[#4e5157]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="browse-products" className="px-6 py-18 md:py-22">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.26em] text-[#a46f24]">
                Collection
              </p>
              <h2 className="mt-4 text-5xl leading-[0.94] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-6xl">
                Browse {title}
              </h2>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 self-start text-sm font-medium text-[#a46f24] transition hover:text-[#7d5219] md:self-end"
            >
              <span>View all</span>
              <span aria-hidden="true" className="text-base leading-none">
                &rarr;
              </span>
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[1.9rem] border border-[#e4d8c8] bg-[#fffdfa] px-8 py-20 text-center shadow-[0_14px_34px_rgba(47,35,22,0.06)]">
              <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#d9b57c] bg-[#fff7eb] text-[#b27a2a]">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6">
                  <path
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h3 className="text-[2rem] leading-[1.1] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                Nothing available at the moment.
              </h3>
              <p className="mt-4 max-w-md text-base leading-7 text-[#4e5157]">
                We don&apos;t have any {title.toLowerCase()} in stock right now.
                Check back soon or{" "}
                <Link
                  href="/contact"
                  className="text-[#a46f24] underline-offset-2 transition hover:text-[#7d5219] hover:underline"
                >
                  send us a message
                </Link>{" "}
                and we&apos;ll let you know when something arrives.
              </p>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </section>

      <section className="border-t border-[#eadfce] bg-[#f4ecdf] px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center md:flex-row md:items-center md:justify-center md:gap-10">
          {trustItems.map((item, index) => (
            <div
              key={item}
              className={`flex items-center justify-center gap-3 text-[#102131] ${index > 0 ? "md:border-l md:border-[#d8ccb9] md:pl-10" : ""}`}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[#c89f57]" />
              <span className="text-sm font-medium uppercase tracking-[0.2em]">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
