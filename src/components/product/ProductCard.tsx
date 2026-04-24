import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const categoryLabelMap: Record<Product["category"], string> = {
  "pool-tables": "Billiard",
  "ping-pong": "Ping Pong",
  foosball: "Foosball",
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <article className="flex h-full flex-col overflow-hidden rounded-[1.85rem] border border-[#e6dbc9] bg-[#fffdf9] shadow-[0_20px_44px_rgba(47,37,23,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(47,37,23,0.14)]">
        <div className="relative h-72 w-full overflow-hidden rounded-t-[1.85rem] bg-[linear-gradient(180deg,#ece3d5_0%,#e2d7c7_100%)]">
          <div className="absolute left-5 top-5 z-10 rounded-full bg-[#112030]/92 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white shadow-[0_8px_18px_rgba(6,12,20,0.22)]">
            {categoryLabelMap[product.category]}
          </div>

          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt || product.name}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,#f4ebdf_0%,#e0d4c2_100%)]">
              <span className="rounded-full border border-[#c7b9a3] px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[#8d7b60]">
                Product Preview
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <h3 className="text-[2rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
              {product.name}
            </h3>

            <p className="mt-4 text-[1rem] leading-8 text-[#4e5157]">
              {product.shortDescription}
            </p>
          </div>

          <div className="mt-8 flex items-end justify-between gap-4 border-t border-[#ede2d2] pt-5">
            <span className="text-[2rem] font-semibold leading-none text-[#101f2e]">
              ${product.startingPrice}
            </span>

            <span className="inline-flex items-center gap-2 text-sm font-medium text-[#9b6c28] transition group-hover:text-[#7b5218]">
              <span>View Details</span>
              <span
                aria-hidden="true"
                className="text-base leading-none transition duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
