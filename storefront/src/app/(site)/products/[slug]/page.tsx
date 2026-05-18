import { notFound } from "next/navigation";
import DefaultProductDetail from "@/components/product/detail/DefaultProductDetail";
import FoosballProductDetail from "@/components/product/detail/FoosballProductDetail";
import PingPongProductDetail from "@/components/product/detail/PingPongProductDetail";
import PoolProductDetail from "@/components/product/detail/PoolProductDetail";
import SmokerProductDetail from "@/components/product/detail/SmokerProductDetail";
import { getProductBySlug } from "@/lib/products";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  switch (product.detailLayout) {
    case "pool":
      return <PoolProductDetail product={product} />;
    case "foosball":
      return <FoosballProductDetail product={product} />;
    case "ping-pong":
      return <PingPongProductDetail product={product} />;
    case "smoker":
      return <SmokerProductDetail product={product} />;
    default:
      return <DefaultProductDetail product={product} />;
  }
}
