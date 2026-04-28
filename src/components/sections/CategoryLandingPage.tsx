import Image from "next/image";
import Link from "next/link";
import ProductGrid from "@/components/product/ProductGrid";
import type { Product } from "@/types/product";

interface CategoryLandingPageProps {
  title: string;
  description: string;
  heroImageSrc: string;
  heroImageAlt: string;
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
    title: "Connect",
    description: "Reach out with questions or request a quote.",
  },
  {
    step: "03",
    title: "Deliver & Install",
    description: "Our team delivers, installs, and levels your table.",
  },
  {
    step: "04",
    title: "Enjoy",
    description: "Start enjoying your game room with everything ready to play.",
  },
];

const trustItems = ["5-Star Service", "Local Delivery", "Expert Support"];

export default function CategoryLandingPage({
  title,
  description,
  heroImageSrc,
  heroImageAlt,
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

          <ProductGrid products={products} />
        </div>
      </section>

      <section className="px-6 py-18 md:py-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] border border-[#e3d5c2] bg-[#fffdfa] shadow-[0_28px_60px_rgba(47,35,22,0.1)]">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="order-2 flex items-center px-7 py-10 md:order-1 md:px-12 md:py-14">
              <div className="max-w-xl">
                <p className="text-sm font-medium uppercase tracking-[0.26em] text-[#a46f24]">
                  Sell Your Table
                </p>
                <h2 className="mt-4 text-5xl leading-[0.96] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-6xl">
                  {sellTitle}
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-8 text-[#4b4e53]">
                  We make it easy. Get a fair offer and fast, professional
                  removal.
                </p>

                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-[#f1c269] px-6 py-3.5 text-sm font-medium text-[#18212d] shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition hover:bg-[#f5ce82]"
                  >
                    <span>Get a Quote</span>
                    <span aria-hidden="true" className="text-base leading-none">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="order-1 min-h-[280px] md:order-2 md:min-h-[420px]">
              <div className="relative h-full w-full">
                <Image
                  src={sellImageSrc}
                  alt={sellImageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, 55vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,28,0.08)_0%,rgba(10,18,28,0.12)_100%)] md:bg-[linear-gradient(90deg,rgba(255,253,250,0.18)_0%,rgba(255,253,250,0)_24%,rgba(10,18,28,0.16)_100%)]" />
              </div>
            </div>
          </div>
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
