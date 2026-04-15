import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    sku: "POOL-001",
    slug: "brunswick-used-pool-table",
    name: "Brunswick Used Pool Table",
    category: "pool-tables",
    shortDescription: "Classic pool table in excellent condition.",
    description:
      "A well-maintained Brunswick table with a solid frame and smooth playing surface. Perfect for home or recreational use.",
    startingPrice: 2499,
    condition: "excellent",
    available: true,
    featured: true,
    quoteOnly: true,
    images: [
      {
        id: "1",
        url: "/images/products/pool-table-1.jpg",
        alt: "Brunswick pool table",
      },
    ],
    clothColors: ["green", "blue", "black", "burgundy"],
    dimensions: "8 ft",
    brand: "Brunswick",
  },
  {
    id: "2",
    sku: "POOL-002",
    slug: "restored-pool-table",
    name: "Restored Pool Table",
    category: "pool-tables",
    shortDescription: "Fully restored table with new cloth.",
    description:
      "This table has been professionally restored and includes new cloth and leveling.",
    startingPrice: 2899,
    condition: "restored",
    available: true,
    featured: true,
    quoteOnly: true,
    images: [
      {
        id: "1",
        url: "/images/products/pool-table-2.jpg",
        alt: "Restored pool table",
      },
    ],
    clothColors: ["green", "blue", "red"],
    dimensions: "8 ft",
  },
  {
    id: "3",
    sku: "PING-001",
    slug: "stiga-ping-pong-table",
    name: "Stiga Ping Pong Table",
    category: "ping-pong",
    shortDescription: "Foldable and durable ping pong table.",
    description:
      "A solid ping pong table perfect for home or office use. Easy to fold and store.",
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
  {
    id: "4",
    sku: "PING-002",
    slug: "compact-ping-pong-table",
    name: "Compact Ping Pong Table",
    category: "ping-pong",
    shortDescription: "Space-saving table for smaller rooms.",
    description:
      "Perfect for apartments or smaller spaces while still offering a great playing experience.",
    startingPrice: 499,
    condition: "good",
    available: true,
    featured: false,
    quoteOnly: true,
    images: [
      {
        id: "1",
        url: "/images/products/ping-pong-2.jpg",
        alt: "Compact ping pong table",
      },
    ],
  },
  {
    id: "5",
    sku: "FOOS-001",
    slug: "tournament-foosball-table",
    name: "Tournament Foosball Table",
    category: "foosball",
    shortDescription: "Professional foosball table.",
    description:
      "A sturdy foosball table built for competitive play with smooth rods and solid construction.",
    startingPrice: 999,
    condition: "excellent",
    available: true,
    featured: true,
    quoteOnly: true,
    images: [
      {
        id: "1",
        url: "/images/products/foosball-1.jpg",
        alt: "Foosball table",
      },
    ],
    brand: "Tornado",
  },
  {
    id: "6",
    sku: "FOOS-002",
    slug: "casual-foosball-table",
    name: "Casual Foosball Table",
    category: "foosball",
    shortDescription: "Great for casual play at home.",
    description:
      "Affordable and fun foosball table, ideal for family and friends.",
    startingPrice: 399,
    condition: "good",
    available: true,
    featured: false,
    quoteOnly: true,
    images: [
      {
        id: "1",
        url: "/images/products/foosball-2.jpg",
        alt: "Foosball table casual",
      },
    ],
  },
];