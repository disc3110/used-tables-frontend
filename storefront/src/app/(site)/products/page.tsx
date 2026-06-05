import type { Metadata } from "next";
import { Suspense } from "react";
import AllTablesCatalog from "@/components/sections/AllTablesCatalog";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Used Game Room Products in Vancouver",
  description:
    "Shop used pool tables, ping pong tables, foosball tables, and grills in Vancouver. Pool tables include installation in Metro Vancouver; other products are pickup only.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Used Game Room Products in Vancouver",
    description:
      "Shop used pool tables and game-room products in Vancouver and British Columbia.",
    url: "/products",
  },
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <Suspense fallback={null}>
      <AllTablesCatalog products={products} />
    </Suspense>
  );
}
