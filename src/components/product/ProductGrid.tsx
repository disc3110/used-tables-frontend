import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  className?: string;
}

export default function ProductGrid({
  products,
  className = "md:grid-cols-2 lg:grid-cols-3",
}: ProductGridProps) {
  return (
    <div className={`grid grid-cols-1 gap-8 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
