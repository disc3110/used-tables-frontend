import CategoryLandingPage from "@/components/sections/CategoryLandingPage";
import { getProductsByCategory } from "@/lib/products";

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
