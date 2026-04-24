import ProductGrid from "@/components/product/ProductGrid";
import { products } from "@/data/products";

export default function ProductsPage() {
  return (
    <main className="min-h-screen px-6 py-10 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">All Tables</h1>
        <p className="text-gray-500 mt-2">
          Browse our selection of pool tables, ping pong tables, and foosball tables.
        </p>
      </div>

      {/* Grid */}
      <ProductGrid products={products} />
    </main>
  );
}