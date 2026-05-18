import { Suspense } from "react";
import AllTablesCatalog from "@/components/sections/AllTablesCatalog";
import { getAllProducts } from "@/lib/products";

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <Suspense fallback={null}>
      <AllTablesCatalog products={products} />
    </Suspense>
  );
}
