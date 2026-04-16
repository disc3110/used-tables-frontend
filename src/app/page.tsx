import FeaturedProductsSection from "@/components/sections/FeaturedProducts";
import CategorySection from "@/components/sections/CategorySection";

export default function HomePage() {
  return (
    <main>
      {/* HERO irá aquí después */}
      <FeaturedProductsSection />
      <CategorySection />
    </main>
  );
}