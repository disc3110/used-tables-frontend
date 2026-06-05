import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProductsSection from "@/components/sections/FeaturedProducts";
import CategorySection from "@/components/sections/CategorySection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/sections/Footer";
import { getFeaturedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: {
    absolute: "Used Pool Tables Vancouver | Delivery & Installation",
  },
  description:
    "Browse quality used pool tables in Vancouver. Professional installation is included for pool tables in Metro Vancouver, with inventory available to buyers across British Columbia.",
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main className="bg-[#f7f3eb] scroll-smooth snap-y snap-mandatory">
      <HeroSection />
      <FeaturedProductsSection products={featuredProducts} />
      <CategorySection />
      <WhyUsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
