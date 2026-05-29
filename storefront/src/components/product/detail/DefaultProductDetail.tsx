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

export default function DefaultProductDetail({ product }: Props) {
  const primaryImage = product.images[0];

  return (
    <main className="bg-[#fbf7ef] px-6 py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-start">
        <section className="space-y-7">
          <div className="overflow-hidden rounded-[2rem] border border-[#e3d5c1] bg-[#fffdfa] shadow-[0_22px_46px_rgba(47,35,22,0.08)]">
            <div className="relative aspect-[4/3] bg-[linear-gradient(180deg,#f3eadc_0%,#e7dbc9_100%)]">
              {primaryImage ? (
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.alt || product.name}
                  fill
                  sizes="(max-width: 1023px) 100vw, 58vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="rounded-full border border-[#c7b9a3] px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[#8d7b60]">
                    Product Preview
                  </span>
                </div>
              )}
            </div>
          </div>

          <section className="rounded-[2rem] border border-[#e3d5c1] bg-[#fffdfa] p-7 shadow-[0_22px_46px_rgba(47,35,22,0.08)] md:p-8">
            <h2 className="text-[1.9rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
              Description
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#4e5157]">
              {product.description}
            </p>
          </section>
        </section>

        <aside className="space-y-6 lg:sticky lg:top-28">
          <section className="rounded-[2rem] border border-[#e3d5c1] bg-[#fffdfa] p-7 shadow-[0_22px_46px_rgba(47,35,22,0.08)] md:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#a46f24]">
              Available Inventory
            </p>
            <h1 className="mt-4 text-4xl leading-[1.02] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif]">
              {product.name}
            </h1>

            {/* Pre-owned badge */}
            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#e3d5c1] bg-[#fdf5e6] px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-[#8c6831]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c89f57]" />
              Pre-owned
            </span>

            <p className="mt-4 text-3xl font-semibold text-[#101f2e]">
              ${product.startingPrice}
            </p>
            <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-[#8c6831]">
              {product.quantity === 1
                ? "1 item currently available"
                : `${product.quantity} items currently available`}
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

          <section className="grid gap-3 rounded-[2rem] border border-[#e3d5c1] bg-[#fffdfa] p-6 shadow-[0_18px_38px_rgba(47,35,22,0.07)]">
            {[
              ["Condition", conditionLabels[product.condition]],
              ["Brand", product.brand ?? "Selected inventory"],
              ["Dimensions", product.dimensions ?? "Available on request"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[1.1rem] border border-[#ece2d4] bg-[#fcfaf6] px-5 py-4"
              >
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#a46f24]">
                  {label}
                </p>
                <p className="mt-2 text-base text-[#122233]">{value}</p>
              </div>
            ))}
          </section>
        </aside>
      </div>
    </main>
  );
}
