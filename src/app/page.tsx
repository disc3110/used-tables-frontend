import FeaturedProductsSection from "@/components/sections/FeaturedProducts";
import CategorySection from "@/components/sections/CategorySection";
import WhyUsSection from "@/components/sections/WhyUsSection";

export default function HomePage() {
  return (
    <main>
      {/* HERO irá aquí después */}
      <FeaturedProductsSection />
      <CategorySection />
      <WhyUsSection />
    </main>
  );
}