import ProductGrid from "@/components/product/ProductGrid";
import { products } from "@/data/products";

export default function HomePage() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-8">Featured Products</h1>

      <ProductGrid products={products.slice(0, 3)} />
    </main>
  );
}