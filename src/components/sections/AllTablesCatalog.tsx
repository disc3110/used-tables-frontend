import Image from "next/image";
import Link from "next/link";
import ProductGrid from "@/components/product/ProductGrid";
import type { Product } from "@/types/product";

interface AllTablesCatalogProps {
  products: Product[];
}

const categoryCards = [
  {
    title: "All Tables",
    href: "/products",
    description: "View all",
    active: true,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7">
        <path
          d="M4 7h16M4 12h16M4 17h16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Pool Tables",
    href: "/products/pool-tables",
    description: "View all",
    active: false,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7">
        <path
          d="M3 9l9-4 9 4-9 4-9-4zM5 10.5v5l7 3 7-3v-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Ping Pong Tables",
    href: "/products/ping-pong",
    description: "View all",
    active: false,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7">
        <path
          d="M14 6a4 4 0 100 8 4 4 0 000-8zM10 14l-5 5M8 10l4 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Foosball Tables",
    href: "/products/foosball",
    description: "View all",
    active: false,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7">
        <path
          d="M4 8h16v8H4zM7 8v8M12 8v8M17 8v8M2.5 11h3M18.5 11h3M2.5 13h3M18.5 13h3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const filters = [
  {
    title: "Category",
    items: ["Pool Tables", "Ping Pong Tables", "Foosball Tables"],
  },
  {
    title: "Price Range",
    items: ["Under $1,000", "$1,000 - $2,500", "$2,500 - $5,000", "$5,000+"],
  },
  {
    title: "Condition",
    items: ["Excellent", "Very Good", "Good"],
  },
  {
    title: "Size",
    items: ["7ft", "8ft", "9ft"],
  },
  {
    title: "Brand",
    items: ["Brunswick", "Olhausen", "Berlinger", "Show more"],
  },
];

const trustHighlights = ["Quality Inspected", "Delivery & Setup", "Great Value"];
const bottomTrust = ["5-Star Service", "Local Delivery", "Expert Support"];

export default function AllTablesCatalog({ products }: AllTablesCatalogProps) {
  return (
    <div className="-mx-6 bg-[#f7f3eb]">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-12">
        <section className="overflow-hidden rounded-[2.2rem] border border-[#e4d7c5] bg-[#fffdfa] shadow-[0_28px_60px_rgba(47,35,22,0.1)]">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <div className="order-2 flex items-center px-7 py-10 md:order-1 md:px-12 md:py-14">
              <div className="max-w-xl">
                <div className="mb-6 flex items-center gap-4">
                  <span className="h-px w-16 bg-[#c89f57]" />
                  <span className="text-sm font-medium uppercase tracking-[0.26em] text-[#a46f24]">
                    Curated Selection
                  </span>
                </div>

                <h1 className="text-5xl leading-[0.94] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-6xl">
                  All Tables
                </h1>

                <p className="mt-5 max-w-lg text-lg leading-8 text-[#4b4e53]">
                  Browse our selection of pool tables, ping pong tables, and
                  foosball tables.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {trustHighlights.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-[#e2d3bc] bg-[#fcf8f1] px-4 py-2 text-sm text-[#122233]"
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-[#c89f57]" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="order-1 min-h-[280px] md:order-2 md:min-h-[360px]">
              <div className="relative h-full w-full">
                <Image
                  src="/images/hero/hero-room-vancouver.png"
                  alt="Luxury game room with pool table"
                  fill
                  sizes="(max-width: 767px) 100vw, 55vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,28,0.12)_0%,rgba(10,18,28,0.18)_100%)] md:bg-[linear-gradient(90deg,rgba(255,253,250,0.14)_0%,rgba(255,253,250,0)_18%,rgba(10,18,28,0.16)_100%)]" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {categoryCards.map((card) => (
            <Link key={card.title} href={card.href} className="group block">
              <article
                className={`rounded-[1.6rem] border p-6 shadow-[0_18px_40px_rgba(47,35,22,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(47,35,22,0.12)] ${
                  card.active
                    ? "border-[#d8b174] bg-[#fff7e9]"
                    : "border-[#e6dbc9] bg-[#fffdfa]"
                }`}
              >
                <div
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full ${
                    card.active
                      ? "bg-[#102131] text-[#f1c269]"
                      : "bg-[#fbf6ee] text-[#a46f24]"
                  }`}
                >
                  {card.icon}
                </div>
                <h2 className="text-[1.9rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                  {card.title}
                </h2>
                <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#9b6c28] transition group-hover:text-[#7b5218]">
                  <span>{card.description}</span>
                  <span aria-hidden="true" className="text-base leading-none">
                    &rarr;
                  </span>
                </p>
              </article>
            </Link>
          ))}
        </section>

        <section className="mt-10 grid gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
          <div className="space-y-5 xl:space-y-6">
            <div className="rounded-[1.8rem] border border-[#e6dbc9] bg-[#fffdfa] p-6 shadow-[0_18px_40px_rgba(47,35,22,0.08)]">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-[1.8rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                  Filters
                </h2>
                <button
                  type="button"
                  className="text-sm font-medium text-[#a46f24] transition hover:text-[#7b5218]"
                >
                  Clear all
                </button>
              </div>

              <div className="space-y-6">
                {filters.map((group) => (
                  <div key={group.title} className="border-t border-[#efe5d7] pt-5 first:border-t-0 first:pt-0">
                    <h3 className="text-sm font-medium uppercase tracking-[0.22em] text-[#8c6120]">
                      {group.title}
                    </h3>
                    <div className="mt-4 space-y-3">
                      {group.items.map((item) => (
                        <label
                          key={item}
                          className="flex items-center gap-3 text-sm text-[#44515d]"
                        >
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-[#d8ccb8] text-[#b9883e] focus:ring-[#b9883e]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[1.8rem] border border-[#e6dbc9] bg-[#fffdfa] p-5 shadow-[0_18px_40px_rgba(47,35,22,0.08)] sm:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-[#59606a]">
                  Showing 1 - {products.length} of {products.length} results
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="inline-flex items-center rounded-full border border-[#e2d6c4] bg-[#fbf7f0] p-1">
                    <button
                      type="button"
                      className="rounded-full bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#122233] shadow-[0_4px_10px_rgba(0,0,0,0.04)]"
                    >
                      Grid
                    </button>
                    <button
                      type="button"
                      className="rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#7c7c79]"
                    >
                      List
                    </button>
                  </div>

                  <label className="flex items-center gap-3 text-sm text-[#59606a]">
                    <span>Sort by</span>
                    <select className="rounded-full border border-[#d9cdbb] bg-white px-4 py-2.5 text-sm text-[#122233] focus:outline-none">
                      <option>Featured</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Newest</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>

            <ProductGrid products={products} className="lg:grid-cols-3" />

            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d9ccb8] bg-[#fffdfa] text-[#8b611f] shadow-[0_8px_20px_rgba(47,35,22,0.06)] transition hover:border-[#b9883e]"
              >
                <span aria-hidden="true">&larr;</span>
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full border text-sm font-medium transition ${
                    page === 1
                      ? "border-[#b9883e] bg-[#fff4e1] text-[#8b611f]"
                      : "border-[#d9ccb8] bg-[#fffdfa] text-[#59606a] hover:border-[#b9883e]"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d9ccb8] bg-[#fffdfa] text-[#8b611f] shadow-[0_8px_20px_rgba(47,35,22,0.06)] transition hover:border-[#b9883e]"
              >
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="overflow-hidden rounded-[2.2rem] border border-[#e3d5c2] bg-[#fffdfa] shadow-[0_28px_60px_rgba(47,35,22,0.1)]">
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
              <div className="order-2 flex items-center px-7 py-10 md:order-1 md:px-12 md:py-14">
                <div className="max-w-xl">
                  <p className="text-sm font-medium uppercase tracking-[0.26em] text-[#a46f24]">
                    Sell Your Table
                  </p>
                  <h2 className="mt-4 text-5xl leading-[0.96] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-6xl">
                    Looking to sell your pool table?
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
                    src="/images/categories/pool-background.png"
                    alt="Pool table in a premium game room"
                    fill
                    sizes="(max-width: 767px) 100vw, 55vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,28,0.08)_0%,rgba(10,18,28,0.12)_100%)] md:bg-[linear-gradient(90deg,rgba(255,253,250,0.18)_0%,rgba(255,253,250,0)_20%,rgba(10,18,28,0.16)_100%)]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[1.8rem] border border-[#e3d5c2] bg-[#f4ecdf] px-6 py-6 shadow-[0_14px_28px_rgba(47,35,22,0.06)]">
          <div className="flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-center md:gap-10">
            {bottomTrust.map((item, index) => (
              <div
                key={item}
                className={`flex items-center justify-center gap-3 text-[#102131] ${
                  index > 0 ? "md:border-l md:border-[#d8ccb9] md:pl-10" : ""
                }`}
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
    </div>
  );
}
