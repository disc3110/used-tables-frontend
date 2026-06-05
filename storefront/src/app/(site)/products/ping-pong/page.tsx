import type { Metadata } from "next";
import CategoryLandingPage from "@/components/sections/CategoryLandingPage";
import { getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Used Ping Pong Tables in Vancouver",
  description:
    "Browse used ping pong tables available for pickup in Vancouver, serving customers across Metro Vancouver and British Columbia.",
  alternates: {
    canonical: "/products/ping-pong",
  },
  openGraph: {
    title: "Used Ping Pong Tables in Vancouver",
    description:
      "Browse used ping pong tables available for pickup in Vancouver.",
    url: "/products/ping-pong",
  },
};

export default async function PingPongPage() {
  const products = await getProductsByCategory("ping-pong");

  return (
    <CategoryLandingPage
      title="Ping Pong Tables"
      description="Browse stylish, durable ping pong tables chosen for smooth play, smart storage, and everyday recreation."
      heroImageSrc="/images/categories/ping-pong-background.png"
      heroImageAlt="Premium ping pong table in a modern room"
      sellTitle="Looking to sell your ping pong table?"
      sellImageSrc="/images/categories/ping-pong-background.png"
      sellImageAlt="Ping pong table in a premium interior"
      products={products}
    />
  );
}
