import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProductsSection from "@/components/sections/FeaturedProducts";
import CategorySection from "@/components/sections/CategorySection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/sections/Footer";
import { getFeaturedProducts } from "@/lib/products";
import {
  BUSINESS_NAME,
  HOME_TITLE,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: HOME_TITLE,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: "website",
    siteName: BUSINESS_NAME,
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
