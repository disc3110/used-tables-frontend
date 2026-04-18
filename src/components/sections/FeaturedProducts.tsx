import Link from "next/link";
import ProductGrid from "@/components/product/ProductGrid";
import { products } from "@/data/products";

export default function FeaturedProductsSection() {
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#7b8094]">
              Featured Selection
            </p>

            <h2 className="mt-3 text-4xl font-light tracking-[0.08em] text-[#4f5363] uppercase">
              Featured Tables
            </h2>

            <p className="mt-4 text-base leading-7 text-[#666b7d]">
              Explore a curated selection of used billiard, ping pong, and
              foosball tables chosen for quality, style, and value.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full border border-[#7b8094] px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-[#5d6273] transition hover:bg-[#5d6273] hover:text-white"
          >
            View All
          </Link>
        </div>

        <ProductGrid products={featuredProducts} />
      </div>
    </section>
  );
}