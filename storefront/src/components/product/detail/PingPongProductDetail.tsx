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

export default function PingPongProductDetail({ product }: Props) {
  const primaryImage = product.images[0];
  const highlights = [
    "Consistent bounce across the full playing surface",
    "Foldable profile for compact storage",
    "Stable frame for family play and training sessions",
  ];

  return (
    <main className="bg-[linear-gradient(135deg,#f7fbfb_0%,#eef5ef_48%,#f8f1e6_100%)] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:items-center">
          <div className="overflow-hidden rounded-[2rem] border border-[#d6e3dc] bg-[#fbfffd] p-4 shadow-[0_22px_46px_rgba(27,62,53,0.08)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.55rem] bg-[linear-gradient(180deg,#e9f4f1_0%,#dfece8_100%)]">
              {primaryImage ? (
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.alt || product.name}
                  fill
                  sizes="(max-width: 1023px) 100vw, 54vw"
                  className="object-contain p-8"
                  priority
                />
              ) : null}
              <div className="absolute inset-x-8 top-1/2 h-px bg-[#ffffff]/80" />
              <div className="absolute bottom-5 left-5 rounded-full bg-[#1d4038]/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white">
                Table Tennis
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-[2rem] border border-[#d6e3dc] bg-[#fbfffd] p-7 shadow-[0_22px_46px_rgba(27,62,53,0.08)] md:p-8">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#276f61]">
                Fast Play Setup
              </p>
              <h1 className="mt-4 text-5xl leading-[0.98] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-6xl">
                {product.name}
              </h1>
              <p className="mt-6 text-3xl font-semibold text-[#101f2e]">
                ${product.startingPrice}
              </p>
              <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-[#276f61]">
                {product.quantity === 1
                  ? "1 table currently available"
                  : `${product.quantity} tables currently available`}
              </p>
              <p className="mt-6 text-lg leading-8 text-[#40565a]">
                {product.shortDescription}
              </p>
            </section>

            <ProductPurchaseActions
              productSlug={product.slug}
              available={product.available}
              quantity={product.quantity}
            />
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-[#d6e3dc] bg-[#fbfffd] p-7 shadow-[0_18px_38px_rgba(27,62,53,0.07)] md:p-8">
            <h2 className="text-[1.9rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
              Play Characteristics
            </h2>
            <div className="mt-6 grid gap-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.1rem] border border-[#dde9e3] bg-[#f6fbf8] px-5 py-4 text-sm leading-7 text-[#294943]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#d6e3dc] bg-[#fbfffd] p-7 shadow-[0_18px_38px_rgba(27,62,53,0.07)] md:p-8">
            <h2 className="text-[1.9rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
              Product Details
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                ["Condition", conditionLabels[product.condition]],
                ["Brand", product.brand ?? "Table tennis"],
                ["Size", product.dimensions ?? "Standard size"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-[1.1rem] border border-[#dde9e3] bg-[#f6fbf8] px-5 py-4"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#276f61]">
                    {label}
                  </p>
                  <p className="mt-2 text-base text-[#122233]">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-lg leading-8 text-[#40565a]">
              {product.description}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
