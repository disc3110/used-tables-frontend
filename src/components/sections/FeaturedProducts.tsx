import Link from "next/link";
import ProductGrid from "@/components/product/ProductGrid";
import { products } from "@/data/products";

export default function FeaturedProductsSection() {
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <section id="featured-products" className="bg-[#ffdfab] px-6 py-24 snap-start">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#806d50]">
              Featured Selection
            </p>

            <h2 className="mt-3 text-4xl font-light tracking-[0.08em] text-[#4b3f2d] uppercase">
              Featured Tables
            </h2>

            <p className="mt-4 text-base leading-7 text-[#6b5a40]">
              Explore a curated selection of used billiard, ping pong, and
              foosball tables chosen for quality, style, and value.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full border border-[#806d50] px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-[#5f503a] transition hover:bg-[#806d50] hover:text-[#fff8ec]"
          >
            View All
          </Link>
        </div>

        <ProductGrid products={featuredProducts} />
      </div>
    </section>
  );
}
