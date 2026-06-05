import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DefaultProductDetail from "@/components/product/detail/DefaultProductDetail";
import FoosballProductDetail from "@/components/product/detail/FoosballProductDetail";
import PingPongProductDetail from "@/components/product/detail/PingPongProductDetail";
import PoolProductDetail from "@/components/product/detail/PoolProductDetail";
import SmokerProductDetail from "@/components/product/detail/SmokerProductDetail";
import { getProductBySlug } from "@/lib/products";
import {
  getCategoryName,
  getProductBreadcrumbJsonLd,
  getProductJsonLd,
  serializeJsonLd,
} from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/products/${product.slug}`;
  const description = product.shortDescription.slice(0, 160);
  const images = product.images.map((image) => ({
    url: image.url,
    alt: image.alt,
  }));

  return {
    title: product.name,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${product.name} | Used Pool Tables Vancouver`,
      description,
      url: absoluteUrl(canonicalPath),
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: product.images[0]?.url ? [product.images[0].url] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  const detail = (() => {
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
  })();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(getProductJsonLd(product)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(getProductBreadcrumbJsonLd(product)),
        }}
      />
      <nav
        aria-label="Breadcrumb"
        className="-mx-6 border-b border-[#e8ddcc] bg-[#fffaf3] px-6 py-3 text-sm text-[#685b4a]"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2">
          <Link href="/" className="transition hover:text-[#a46f24]">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href={`/products/${product.category}`}
            className="transition hover:text-[#a46f24]"
          >
            {getCategoryName(product.category)}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="truncate text-[#172535]">{product.name}</span>
        </div>
      </nav>
      {detail}
    </>
  );
}
