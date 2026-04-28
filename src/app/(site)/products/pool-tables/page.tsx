import CategoryLandingPage from "@/components/sections/CategoryLandingPage";
import { getProductsByCategory } from "@/lib/products";

export default function PoolTablesPage() {
  const products = getProductsByCategory("pool-tables");

  return (
    <CategoryLandingPage
      title="Pool Tables"
      description="Discover premium used pool tables selected for craftsmanship, playability, and timeless game-room presence."
      heroImageSrc="/images/categories/pool-background.png"
      heroImageAlt="Luxury pool table in a premium game room"
      sellTitle="Looking to sell your pool table?"
      sellImageSrc="/images/hero/used-table-vancouver.png"
      sellImageAlt="Used pool table in a premium showroom"
      products={products}
    />
  );
}
