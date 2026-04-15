import type { Product } from "@/types/product";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`}>
        <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition cursor-pointer">
            
            {/* Imagen */}
            <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
            <span className="text-sm text-gray-400">Image</span>
            </div>

            {/* Info */}
            <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold">{product.name}</h3>

            <p className="text-sm text-gray-500">
                {product.shortDescription}
            </p>

            <div className="flex items-center justify-between pt-2">
                <span className="font-medium text-gray-900">
                ${product.startingPrice}
                </span>

                <span className="text-sm font-medium text-blue-600">
                View Details
                </span>
            </div>
            </div>
        </div>
    </Link>
  );
}