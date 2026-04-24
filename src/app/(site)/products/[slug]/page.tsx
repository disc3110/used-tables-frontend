import { notFound } from "next/navigation";
import { products } from "@/data/products";
import PoolProductDetail from "@/components/product/detail/PoolProductDetail";
import StandardProductDetail from "@/components/product/detail/StandardProductDetail";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const product = products.find((p) => p.slug === slug);

  if (!product) return notFound();

  if (!product) return notFound();

  if (product.detailLayout === "pool") {
    return <PoolProductDetail product={product} />;
  }

  return <StandardProductDetail product={product} />;
  
}