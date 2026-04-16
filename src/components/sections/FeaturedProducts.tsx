import ProductGrid from "@/components/product/ProductGrid";
import { products } from "@/data/products";

export default function FeaturedProductsSection() {
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <section className="px-6 py-16 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold">Featured Tables</h2>
        <p className="text-gray-500 mt-2">
          Hand-picked tables ready for your game room.
        </p>
      </div>

      {/* Grid */}
      <ProductGrid products={featuredProducts} />
    </section>
  );
}