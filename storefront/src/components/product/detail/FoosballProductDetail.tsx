import Image from "next/image";
import ProductPurchaseActions from "@/components/product/ProductPurchaseActions";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
}

const conditionLabels: Record<Product["condition"], string> = {
  excellent: "Excellent",
  "very-good": "Very Good",
  good: "Good",
  restored: "Restored",
};

export default function FoosballProductDetail({ product }: Props) {
  const primaryImage = product.images[0];
  const specs = [
    ["Rod Feel", "Smooth, responsive play"],
    ["Cabinet", product.brand ? `${product.brand} build` : "Solid cabinet"],
    ["Use Case", "Game rooms, offices, family rooms"],
  ];

  return (
    <main className="bg-[radial-gradient(circle_at_top_left,#fffaf2_0%,#f4eee4_44%,#edf1ef_100%)] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <section className="grid gap-10 lg:grid-cols-[420px_minmax(0,1fr)] lg:items-start">
          <aside className="space-y-6 lg:sticky lg:top-28">
            <section className="rounded-[2rem] border border-[#dfd3c1] bg-[#fffdfa] p-7 shadow-[0_22px_46px_rgba(43,35,28,0.08)] md:p-8">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#8e6b38]">
                Foosball Table
              </p>
              <h1 className="mt-4 text-5xl leading-[0.98] text-[#111f2d] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                {product.name}
              </h1>
              <p className="mt-6 text-3xl font-semibold text-[#101f2e]">
                ${product.startingPrice}
              </p>
              <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-[#8e6b38]">
                {product.quantity === 1
                  ? "1 table currently available"
                  : `${product.quantity} tables currently available`}
              </p>
              <p className="mt-6 text-base leading-7 text-[#4e5157]">
                {product.shortDescription}
              </p>
            </section>

            <ProductPurchaseActions
              productSlug={product.slug}
              available={product.available}
              quantity={product.quantity}
            />
          </aside>

          <section className="space-y-7">
            <div className="overflow-hidden rounded-[2rem] border border-[#dfd3c1] bg-[#fffdfa] p-5 shadow-[0_22px_46px_rgba(43,35,28,0.08)]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.6rem] bg-[linear-gradient(135deg,#efe7dc_0%,#f9f6f0_48%,#dfe8e3_100%)]">
                {primaryImage ? (
                  <Image
                    src={primaryImage.url}
                    alt={primaryImage.alt || product.name}
                    fill
                    sizes="(max-width: 1023px) 100vw, 62vw"
                    className="object-contain p-8"
                    priority
                  />
                ) : null}
                <div className="absolute left-6 top-6 h-2 w-24 rounded-full bg-[#b8322a]" />
                <div className="absolute right-6 top-6 h-2 w-24 rounded-full bg-[#245f74]" />
              </div>
            </div>

            <section className="rounded-[2rem] border border-[#dfd3c1] bg-[#fffdfa] p-7 shadow-[0_18px_38px_rgba(43,35,28,0.07)] md:p-8">
              <h2 className="text-[1.9rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                Built for Quick Matches
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#4e5157]">
                {product.description}
              </p>
              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {specs.map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[1.1rem] border border-[#eadfce] bg-[#fcfaf6] px-5 py-4"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#8e6b38]">
                      {label}
                    </p>
                    <p className="mt-2 text-base text-[#122233]">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-3">
              {[
                ["Condition", conditionLabels[product.condition]],
                ["Brand", product.brand ?? "Foosball"],
                ["Dimensions", product.dimensions ?? "Available on request"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-[1.4rem] border border-[#dfd3c1] bg-[#fffdfa] px-5 py-5 shadow-[0_14px_30px_rgba(43,35,28,0.06)]"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#8e6b38]">
                    {label}
                  </p>
                  <p className="mt-2 text-base text-[#122233]">{value}</p>
                </div>
              ))}
            </section>
          </section>
        </section>
      </div>
    </main>
  );
}
