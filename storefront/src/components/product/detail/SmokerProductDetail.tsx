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

export default function SmokerProductDetail({ product }: Props) {
  const primaryImage = product.images[0];
  const details = [
    ["Heat Control", "Ask us about vents, seals, and fuel style"],
    ["Cooking Area", product.dimensions ?? "Available on request"],
    ["Condition", conditionLabels[product.condition]],
  ];

  return (
    <main className="bg-[linear-gradient(135deg,#f8f3ea_0%,#edf1ea_50%,#f6f6f1_100%)] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-start">
          <div className="space-y-7">
            <div className="overflow-hidden rounded-[2rem] border border-[#ddd4c7] bg-[#fffdfa] p-5 shadow-[0_22px_46px_rgba(34,32,27,0.08)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-[linear-gradient(145deg,#ece5da_0%,#f9f6ef_48%,#dfe5de_100%)]">
                {primaryImage ? (
                  <Image
                    src={primaryImage.url}
                    alt={primaryImage.alt || product.name}
                    fill
                    sizes="(max-width: 1023px) 100vw, 58vw"
                    className="object-contain p-8"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="rounded-full border border-[#b9afa1] px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[#776955]">
                      Smoker Preview
                    </span>
                  </div>
                )}
                <div className="absolute bottom-5 left-5 rounded-full bg-[#253127]/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white">
                  Outdoor Cooking
                </div>
              </div>
            </div>

            <section className="rounded-[2rem] border border-[#ddd4c7] bg-[#fffdfa] p-7 shadow-[0_18px_38px_rgba(34,32,27,0.07)] md:p-8">
              <h2 className="text-[1.9rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                Smoker Notes
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#4f554d]">
                {product.description}
              </p>
              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {details.map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[1.1rem] border border-[#e6ded2] bg-[#fcfaf6] px-5 py-4"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#6f6842]">
                      {label}
                    </p>
                    <p className="mt-2 text-base text-[#122233]">{value}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <section className="rounded-[2rem] border border-[#ddd4c7] bg-[#fffdfa] p-7 shadow-[0_22px_46px_rgba(34,32,27,0.08)] md:p-8">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#6f6842]">
                Smoker
              </p>
              <h1 className="mt-4 text-5xl leading-[0.98] text-[#101f2e] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                {product.name}
              </h1>
              <p className="mt-6 text-3xl font-semibold text-[#101f2e]">
                ${product.startingPrice}
              </p>
              <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-[#6f6842]">
                {product.quantity === 1
                  ? "1 smoker currently available"
                  : `${product.quantity} smokers currently available`}
              </p>
              <p className="mt-6 text-base leading-7 text-[#4f554d]">
                {product.shortDescription}
              </p>
            </section>

            <ProductPurchaseActions
              productSlug={product.slug}
              available={product.available}
              quantity={product.quantity}
            />

            <section className="rounded-[2rem] border border-[#ddd4c7] bg-[#fffdfa] p-6 shadow-[0_18px_38px_rgba(34,32,27,0.07)]">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#6f6842]">
                Pickup and Delivery
              </p>
              <p className="mt-3 text-sm leading-7 text-[#4f554d]">
                Ask us about current location, loading access, and delivery
                options before checkout.
              </p>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
