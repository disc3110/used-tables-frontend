import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    sku: "POOL-001",
    slug: "brunswick-used-pool-table",
    name: "Brunswick Used Pool Table",
    category: "pool-tables",
    shortDescription: "Classic used pool table in excellent condition.",
    description:
      "A well-maintained used Brunswick pool table with a solid frame and smooth playing surface.",
    startingPrice: 2499,
    condition: "excellent",
    available: true,
    featured: true,
    quoteOnly: true,
    images: [
      {
        id: "1",
        url: "/images/products/pool-table-1.jpg",
        alt: "Brunswick used pool table",
      },
    ],
    clothColors: ["green", "blue", "black", "burgundy"],
    dimensions: "8 ft",
    brand: "Brunswick",
  },
  {
    id: "2",
    sku: "PING-001",
    slug: "stiga-ping-pong-table",
    name: "Stiga Ping Pong Table",
    category: "ping-pong",
    shortDescription: "Foldable table tennis table for home or office.",
    description:
      "A durable ping pong table with foldable design and easy storage.",
    startingPrice: 799,
    condition: "very-good",
    available: true,
    featured: true,
    quoteOnly: true,
    images: [
      {
        id: "1",
        url: "/images/products/ping-pong-1.jpg",
        alt: "Stiga ping pong table",
      },
    ],
    dimensions: "Standard size",
    brand: "Stiga",
  },
];