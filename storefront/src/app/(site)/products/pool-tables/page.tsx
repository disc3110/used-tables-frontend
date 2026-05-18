import CategoryLandingPage from "@/components/sections/CategoryLandingPage";
import { getProductsByCategory } from "@/lib/products";

export default async function PoolTablesPage() {
  const products = await getProductsByCategory("pool-tables");

  return (
    <CategoryLandingPage
      title="Pool Tables"
      description="Discover premium used pool tables selected for craftsmanship, playability, and timeless game-room presence."
      heroImageSrc="/images/categories/pool-background.png"
      heroImageAlt="Luxury pool table in a premium game room"
      includedItems={[
        {
          title: "Installation Included",
          description:
            "Professional delivery, setup, and leveling in Metro Vancouver.",
        },
        {
          title: "Accessories Included",
          description:
            "Basic cues, balls, and triangle included so you’re ready to play.",
        },
        {
          title: "New Cloth Included",
          description:
            "Choose your cloth color and refresh the table’s playing surface.",
        },
      ]}
      sellTitle="Looking to sell your pool table?"
      sellImageSrc="/images/hero/used-table-vancouver.png"
      sellImageAlt="Used pool table in a premium showroom"
      products={products}
    />
  );
}
