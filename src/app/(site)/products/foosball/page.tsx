import CategoryLandingPage from "@/components/sections/CategoryLandingPage";
import { getProductsByCategory } from "@/lib/products";

export default function FoosballPage() {
  const products = getProductsByCategory("foosball");

  return (
    <CategoryLandingPage
      title="Foosball Tables"
      description="Shop premium foosball tables built for fast play, family fun, and a refined game-room aesthetic."
      heroImageSrc="/images/categories/foosball-background.png"
      heroImageAlt="Luxury foosball table in a styled interior"
      sellTitle="Looking to sell your foosball table?"
      sellImageSrc="/images/categories/foosball-background.png"
      sellImageAlt="Foosball table in a premium room"
      products={products}
    />
  );
}
