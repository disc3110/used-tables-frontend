import ProductGrid from "@/components/product/ProductGrid";
import { getProductsByCategory } from "@/lib/products";

export default function PoolTablesPage() {
  const products = getProductsByCategory("pool-tables");

  return (
    <main className="min-h-screen px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Pool Tables</h1>

      <ProductGrid products={products} />
    </main>
  );
}