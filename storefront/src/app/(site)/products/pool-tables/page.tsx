import type { Metadata } from "next";
import CategoryLandingPage from "@/components/sections/CategoryLandingPage";
import { getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Used Pool Tables for Sale in Vancouver",
  description:
    "Browse inspected used pool tables for sale in Vancouver. Pool table installation is included in Metro Vancouver, with inventory available across British Columbia.",
  alternates: {
    canonical: "/products/pool-tables",
  },
  openGraph: {
    title: "Used Pool Tables for Sale in Vancouver",
    description:
      "Quality used pool tables with professional installation included in Metro Vancouver.",
    url: "/products/pool-tables",
    images: ["/images/categories/pool-background.png"],
  },
};

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
      seoContent={{
        eyebrow: "Vancouver Pool Table Specialists",
        title: "Used pool tables across Metro Vancouver and British Columbia",
        paragraphs: [
          "Each used pool table is reviewed for condition, playability, and overall value before it is listed. Product pages show the table size, condition, available photos, and any confirmed material or pocket details.",
          "Professional pool table installation is included in the listed price for customers in Metro Vancouver. Buyers elsewhere in British Columbia can browse current inventory online and contact us to discuss pickup and available logistics.",
        ],
        highlights: [
          "Professional installation included in Metro Vancouver",
          "New cloth choice included with pool tables",
          "Pre-owned standard accessory kit included",
          "30-day returns on unused products kept in good condition",
        ],
      }}
      products={products}
    />
  );
}
