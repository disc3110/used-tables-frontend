import type { Metadata } from "next";
import CategoryLandingPage from "@/components/sections/CategoryLandingPage";
import { getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Used Grills in Vancouver",
  description:
    "Browse used grills available for pickup in Vancouver, serving customers throughout British Columbia.",
  alternates: {
    canonical: "/products/grill",
  },
  openGraph: {
    title: "Used Grills in Vancouver",
    description: "Browse used grills available for pickup in Vancouver.",
    url: "/products/grill",
  },
};

export default async function GrillPage() {
  const products = await getProductsByCategory("grill");

  return (
    <CategoryLandingPage
      title="Grills"
      description="Shop premium grills built for fast play, family fun, and a refined game-room aesthetic."
      heroImageSrc="/images/categories/grill-background.png"
      heroImageAlt="Luxury grill in a styled interior"
      sellTitle="Looking to sell your grill?"
      sellImageSrc="/images/categories/grill-background.png"
      sellImageAlt="Grill in a premium room"
      products={products}
    />
  );
}
