import CategoryLandingPage from "@/components/sections/CategoryLandingPage";
import { getProductsByCategory } from "@/lib/products";

export default function PingPongPage() {
  const products = getProductsByCategory("ping-pong");

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
