import ProductPurchaseActions from "@/components/product/ProductPurchaseActions";
import ProductGallery from "@/components/product/ProductGallery";
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

const highlights = [
  "Consistent bounce across the full playing surface",
  "Foldable profile for compact storage",
  "Stable frame for family play and training sessions",
];

/** Split a description string into paragraphs on blank lines or single newlines. */
function toparagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .flatMap((chunk) => chunk.split(/\n/))
    .map((p) => p.trim())
    .filter(Boolean);
}

export default function PingPongProductDetail({ product }: Props) {
  const paragraphs = toparagraphs(product.description);

  return (
    <main className="bg-[linear-gradient(135deg,#f7fbfb_0%,#eef5ef_48%,#f8f1e6_100%)] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* ── Hero: gallery + info ── */}
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:items-start">

          {/* Gallery card */}
          <div className="overflow-hidden rounded-[2rem] border border-[#d6e3dc] bg-[#fbfffd] p-4 shadow-[0_22px_46px_rgba(27,62,53,0.08)]">
            <ProductGallery
              images={product.images}
              productName={product.name}
              bgClassName="bg-[linear-gradient(180deg,#e9f4f1_0%,#dfece8_100%)]"
              objectClassName="object-contain p-8"
            />

            {/* Category tag */}
            <div className="mt-3 px-1">
              <span className="inline-block rounded-full bg-[#1d4038]/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white">
                Table Tennis
              </span>
            </div>
          </div>

          {/* Purchase info */}
          <div className="space-y-5">
            <div className="rounded-[2rem] border border-[#d6e3dc] bg-[#fbfffd] p-7 shadow-[0_22px_46px_rgba(27,62,53,0.08)] md:p-8">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#276f61]">
                Fast Play Setup
              </p>
              <h1 className="mt-4 text-5xl leading-[0.98] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-6xl">
                {product.name}
              </h1>

              {/* Pre-owned badge */}
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#d6e3dc] bg-[#f0f8f3] px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-[#276f61]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#276f61]" />
                Pre-owned
              </span>

              <p className="mt-5 text-3xl font-semibold text-[#101f2e]">
                ${product.startingPrice}
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-[#276f61]">
                {product.quantity === 1
                  ? "1 table currently available"
                  : `${product.quantity} tables currently available`}
              </p>
              <p className="mt-6 text-lg leading-8 text-[#40565a]">
                {product.shortDescription}
              </p>
            </div>

            <ProductPurchaseActions
              productSlug={product.slug}
              available={product.available}
              quantity={product.quantity}
            />
          </div>
        </section>

        {/* ── Specs row: highlights + details ── */}
        <section className="grid gap-6 lg:grid-cols-2">

          {/* Play characteristics */}
          <div className="rounded-[2rem] border border-[#d6e3dc] bg-[#fbfffd] p-7 shadow-[0_18px_38px_rgba(27,62,53,0.07)] md:p-8">
            <h2 className="text-[1.9rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
              Play Characteristics
            </h2>
            <div className="mt-6 grid gap-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[1.1rem] border border-[#dde9e3] bg-[#f6fbf8] px-5 py-4"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#276f61]"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm leading-7 text-[#294943]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product specs */}
          <div className="rounded-[2rem] border border-[#d6e3dc] bg-[#fbfffd] p-7 shadow-[0_18px_38px_rgba(27,62,53,0.07)] md:p-8">
            <h2 className="text-[1.9rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
              Product Details
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {(
                [
                  ["Condition", conditionLabels[product.condition]],
                  ["Brand", product.brand ?? "Table tennis"],
                  ["Size", product.dimensions ?? "Full size"],
                ] as [string, string][]
              ).map(([label, value]) => (
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
          </div>
        </section>

        {/* ── Description: full width, prose layout ── */}
        {paragraphs.length > 0 && (
          <section className="rounded-[2rem] border border-[#d6e3dc] bg-[#fbfffd] p-7 shadow-[0_18px_38px_rgba(27,62,53,0.07)] md:p-10">
            <h2 className="text-[1.9rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
              About This Table
            </h2>

            <div className="mt-6 columns-1 gap-8 space-y-5 text-[1.05rem] leading-8 text-[#40565a] lg:columns-2">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
