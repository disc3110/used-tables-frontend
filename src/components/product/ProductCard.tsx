import Link from "next/link";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="overflow-hidden rounded-[1.75rem] border border-[#e1e3ea] bg-white shadow-[0_20px_50px_rgba(90,92,110,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(90,92,110,0.18)]">
        
        {/* Image */}
        <div className="relative flex h-56 items-center justify-center bg-[#f2f3f7]">
          <span className="text-sm tracking-[0.2em] text-[#9aa0b3] uppercase">
            Image
          </span>
        </div>

        {/* Content */}
        <div className="space-y-4 p-5">
          
          <div>
            <h3 className="text-lg font-medium tracking-[0.08em] text-[#4f5363] uppercase">
              {product.name}
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#666b7d]">
              {product.shortDescription}
            </p>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-base font-medium text-[#4f5363]">
              ${product.startingPrice}
            </span>

            <span className="text-xs font-medium tracking-[0.18em] text-[#7b8094] uppercase group-hover:text-[#4f5363] transition">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}