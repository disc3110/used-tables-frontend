import Link from "next/link";
import ProductGrid from "@/components/product/ProductGrid";
import TrustBenefits from "@/components/sections/TrustBenefits";
import { products } from "@/data/products";

export default function FeaturedProductsSection() {
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <section
      id="featured-products"
      className="snap-start bg-[radial-gradient(circle_at_top,#fffaf2_0%,#f6efe3_52%,#f3eadb_100%)] px-6 py-24 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.26em] text-[#a46f24]">
              Featured Selection
            </p>

            <h2 className="mt-4 max-w-2xl text-5xl leading-[0.92] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-7xl">
              Featured Tables
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#44474d]">
              Explore a curated selection of used billiard, ping pong, and
              foosball tables chosen for quality, style, and value.
            </p>

            <div className="mt-8 h-px w-24 bg-[#c89f57]" />
          </div>

          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-3 self-start rounded-full border border-[#b9883e] px-6 py-3.5 text-sm font-medium text-[#8b611f] transition hover:bg-[#b9883e] hover:text-white md:self-end"
          >
            <span>View All Tables</span>
            <span aria-hidden="true" className="text-base leading-none">
              &rarr;
            </span>
          </Link>
        </div>

        <ProductGrid products={featuredProducts} />
        <TrustBenefits />
      </div>
    </section>
  );
}
