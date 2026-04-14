import HeroSection from "@/components/sections/HeroSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import CategorySection from "@/components/sections/CategorySection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">Used Billiard Store</h1>
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      <WhyUsSection />
      <CTASection />
    </main>
  );
}