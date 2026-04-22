import ProductGrid from "@/components/product/ProductGrid";
import { getProductsByCategory } from "@/lib/products";

export default function PingPongPage() {
  const products = getProductsByCategory("ping-pong");

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-6 pt-28 pb-10">
      <h1 className="text-3xl font-bold mb-8">Ping Pong Tables</h1>

      <ProductGrid products={products} />
    </main>
  );
}
