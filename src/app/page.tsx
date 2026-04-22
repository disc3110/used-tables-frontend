import HeroSection from "@/components/sections/HeroSection";
import FeaturedProductsSection from "@/components/sections/FeaturedProducts";
import CategorySection from "@/components/sections/CategorySection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <main className="bg-[#f7f3eb]">
      <HeroSection />
      <FeaturedProductsSection />
      <CategorySection />
      <WhyUsSection />
      <CTASection />
    </main>
  );
}
