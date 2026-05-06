import AllTablesCatalog from "@/components/sections/AllTablesCatalog";
import { products } from "@/data/products";

export default function ProductsPage() {
  return <AllTablesCatalog products={products} />;
}
