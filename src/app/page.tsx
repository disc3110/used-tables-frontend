import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";

export default function HomePage() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-8">Featured Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.slice(0, 3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}