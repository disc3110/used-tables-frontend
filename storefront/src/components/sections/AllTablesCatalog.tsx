"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

interface AllTablesCatalogProps {
  products: Product[];
}

type FilterKey = "category" | "price" | "condition" | "size" | "brand";
type SortKey = "featured" | "price-asc" | "price-desc" | "newest";
type ViewMode = "grid" | "list";

type FilterOption = {
  label: string;
  value: string;
};

type FilterGroup = {
  key: FilterKey;
  title: string;
  items: FilterOption[];
};

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

const baseFilters: FilterGroup[] = [
  {
    key: "category",
    title: "Category",
    items: [
      { label: "Pool Tables", value: "pool-tables" },
      { label: "Ping Pong Tables", value: "ping-pong" },
      { label: "Foosball Tables", value: "foosball" },
    ],
  },
  {
    key: "price",
    title: "Price Range",
    items: [
      { label: "Under $1,000", value: "under-1000" },
      { label: "$1,000 - $2,500", value: "1000-2500" },
      { label: "$2,500 - $5,000", value: "2500-5000" },
      { label: "$5,000+", value: "5000-plus" },
    ],
  },
  {
    key: "condition",
    title: "Condition",
    items: [
      { label: "Excellent", value: "excellent" },
      { label: "Very Good", value: "very-good" },
      { label: "Good", value: "good" },
      { label: "Restored", value: "restored" },
    ],
  },
  {
    key: "size",
    title: "Size",
    items: [
      { label: "7ft", value: "7ft" },
      { label: "8ft", value: "8ft" },
      { label: "9ft", value: "9ft" },
      { label: "Standard", value: "standard" },
      { label: "Compact", value: "compact" },
    ],
  },
];

const trustHighlights = ["Quality Inspected", "Delivery & Setup", "Great Value"];
const bottomTrust = ["5-Star Service", "Local Delivery", "Expert Support"];

function normalize(value: string) {
  return value.toLowerCase().replace(/[\s-]/g, "");
}

function matchesPriceRange(product: Product, ranges: string[]) {
  if (ranges.length === 0) return true;

  return ranges.some((range) => {
    if (range === "under-1000") return product.startingPrice < 1000;
    if (range === "1000-2500") {
      return product.startingPrice >= 1000 && product.startingPrice <= 2500;
    }
    if (range === "2500-5000") {
      return product.startingPrice >= 2500 && product.startingPrice <= 5000;
    }
    if (range === "5000-plus") return product.startingPrice >= 5000;

    return true;
  });
}

function getSortedProducts(products: Product[], sort: SortKey) {
  return [...products].sort((left, right) => {
    if (sort === "price-asc") return left.startingPrice - right.startingPrice;
    if (sort === "price-desc") return right.startingPrice - left.startingPrice;
    if (sort === "newest") {
      const rightId = Number(right.id);
      const leftId = Number(left.id);

      if (Number.isFinite(rightId) && Number.isFinite(leftId)) {
        return rightId - leftId;
      }

      return right.id.localeCompare(left.id);
    }

    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1;
    }

    return left.name.localeCompare(right.name);
  });
}

function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="space-y-5">
      {products.map((product) => {
        const primaryImage = product.images[0];

        return (
          <Link key={product.id} href={`/products/${product.slug}`} className="block">
            <article className="grid gap-5 overflow-hidden rounded-[1.6rem] border border-[#e6dbc9] bg-[#fffdfa] p-4 shadow-[0_18px_40px_rgba(47,35,22,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(47,35,22,0.12)] md:grid-cols-[220px_minmax(0,1fr)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-[#f1eadf]">
                {primaryImage ? (
                  <Image
                    src={primaryImage.url}
                    alt={primaryImage.alt || product.name}
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                ) : null}
              </div>

              <div className="flex flex-col justify-between gap-5 py-1">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#112030] px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white">
                      {product.category.replace("-", " ")}
                    </span>
                  </div>
                  <h3 className="text-[2rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                    {product.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#4e5157]">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-4 border-t border-[#ede2d2] pt-4">
                  <span className="text-2xl font-semibold text-[#101f2e]">
                    ${product.startingPrice}
                  </span>
                  <span className="text-sm font-medium text-[#9b6c28]">
                    View Details &rarr;
                  </span>
                </div>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
}

export default function AllTablesCatalog({ products }: AllTablesCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategories = searchParams.getAll("category");
  const selectedPrices = searchParams.getAll("price");
  const selectedConditions = searchParams.getAll("condition");
  const selectedSizes = searchParams.getAll("size");
  const selectedBrands = searchParams.getAll("brand");
  const sort = (searchParams.get("sort") as SortKey | null) ?? "featured";
  const view = (searchParams.get("view") as ViewMode | null) ?? "grid";

  const brandOptions = useMemo<FilterOption[]>(() => {
    const brands = new Set(
      products
        .map((product) => product.brand)
        .filter((brand): brand is string => Boolean(brand)),
    );

    return Array.from(brands)
      .sort((left, right) => left.localeCompare(right))
      .map((brand) => ({
        label: brand,
        value: normalize(brand),
      }));
  }, [products]);

  const filters = useMemo<FilterGroup[]>(
    () =>
      brandOptions.length > 0
        ? [
            ...baseFilters,
            {
              key: "brand",
              title: "Brand",
              items: brandOptions,
            },
          ]
        : baseFilters,
    [brandOptions],
  );

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const priceMatch = matchesPriceRange(product, selectedPrices);
      const conditionMatch =
        selectedConditions.length === 0 ||
        selectedConditions.includes(product.condition);
      const sizeMatch =
        selectedSizes.length === 0 ||
        selectedSizes.some((size) =>
          normalize(product.dimensions ?? "").includes(size),
        );
      const brandMatch =
        selectedBrands.length === 0 ||
        selectedBrands.includes(normalize(product.brand ?? ""));

      return (
        categoryMatch &&
        priceMatch &&
        conditionMatch &&
        sizeMatch &&
        brandMatch
      );
    });

    return getSortedProducts(filtered, sort);
  }, [
    products,
    selectedCategories,
    selectedPrices,
    selectedConditions,
    selectedSizes,
    selectedBrands,
    sort,
  ]);

  const updateParams = (key: string, value: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    const values = params.getAll(key).filter((item) => item !== value);
    params.delete(key);

    if (checked) {
      values.push(value);
    }

    values.forEach((item) => params.append(key, item));
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const isChecked = (key: FilterKey, value: string) =>
    searchParams.getAll(key).includes(value);

  const activeCategorySet = new Set(selectedCategories);

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
          {categoryCards.map((card) => {
            const categoryValue =
              card.href === "/products/pool-tables"
                ? "pool-tables"
                : card.href === "/products/ping-pong"
                  ? "ping-pong"
                  : card.href === "/products/foosball"
                    ? "foosball"
                    : null;
            const isActive = categoryValue
              ? activeCategorySet.has(categoryValue)
              : selectedCategories.length === 0;

            return (
            <Link
              key={card.title}
              href={
                categoryValue
                  ? `/products?category=${categoryValue}`
                  : "/products"
              }
              className="group block"
            >
              <article
                className={`rounded-[1.6rem] border p-6 shadow-[0_18px_40px_rgba(47,35,22,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(47,35,22,0.12)] ${
                  isActive
                    ? "border-[#d8b174] bg-[#fff7e9]"
                    : "border-[#e6dbc9] bg-[#fffdfa]"
                }`}
              >
                <div
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full ${
                    isActive
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
            );
          })}
        </section>

        <section className="mt-10 grid gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
          <div className="space-y-5 xl:space-y-6">
            <div className="rounded-[1.8rem] border border-[#e6dbc9] bg-[#fffdfa] p-6 shadow-[0_18px_40px_rgba(47,35,22,0.08)]">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-[1.8rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                  Filters
                </h2>
                <Link
                  href="/products"
                  className="text-sm font-medium text-[#a46f24] transition hover:text-[#7b5218]"
                >
                  Clear all
                </Link>
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
                          key={item.value}
                          className="flex items-center gap-3 text-sm text-[#44515d]"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked(group.key, item.value)}
                            onChange={(event) =>
                              updateParams(
                                group.key,
                                item.value,
                                event.target.checked,
                              )
                            }
                            className="h-4 w-4 rounded border-[#d8ccb8] text-[#b9883e] focus:ring-[#b9883e]"
                          />
                          <span>{item.label}</span>
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
                  Showing {filteredProducts.length === 0 ? 0 : 1} -{" "}
                  {filteredProducts.length} of {filteredProducts.length} results
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="inline-flex items-center rounded-full border border-[#e2d6c4] bg-[#fbf7f0] p-1">
                    <button
                      type="button"
                      onClick={() => setParam("view", "grid")}
                      className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] ${
                        view === "grid"
                          ? "bg-white text-[#122233] shadow-[0_4px_10px_rgba(0,0,0,0.04)]"
                          : "text-[#7c7c79]"
                      }`}
                    >
                      Grid
                    </button>
                    <button
                      type="button"
                      onClick={() => setParam("view", "list")}
                      className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] ${
                        view === "list"
                          ? "bg-white text-[#122233] shadow-[0_4px_10px_rgba(0,0,0,0.04)]"
                          : "text-[#7c7c79]"
                      }`}
                    >
                      List
                    </button>
                  </div>

                  <label className="flex items-center gap-3 text-sm text-[#59606a]">
                    <span>Sort by</span>
                    <select
                      value={sort}
                      onChange={(event) => setParam("sort", event.target.value)}
                      className="rounded-full border border-[#d9cdbb] bg-white px-4 py-2.5 text-sm text-[#122233] focus:outline-none"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="newest">Newest</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              view === "grid" ? (
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <ProductList products={filteredProducts} />
              )
            ) : (
              <div className="rounded-[1.8rem] border border-[#e6dbc9] bg-[#fffdfa] p-8 text-center shadow-[0_18px_40px_rgba(47,35,22,0.08)]">
                <h3 className="text-[2rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                  No products match these filters.
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#59606a]">
                  Clear the filters or try a wider price range.
                </p>
              </div>
            )}

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
