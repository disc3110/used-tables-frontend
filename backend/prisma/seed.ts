import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/auth/password.util";

const prisma = new PrismaClient();

const categorySeed = [
  {
    slug: "pool-tables",
    name: "Pool Tables",
    description:
      "Premium used pool tables selected for craftsmanship and playability.",
  },
  {
    slug: "ping-pong",
    name: "Ping Pong Tables",
    description:
      "Reliable table tennis options for home game rooms and recreation spaces.",
  },
  {
    slug: "grill",
    name: "Grills",
    description:
      "High-quality outdoor cooking options for your patio or backyard.",
  },
  {
    slug: "foosball",
    name: "Foosball Tables",
    description:
      "Quality foosball tables for casual play and competitive matches.",
  },
];

/*const productSeed = [
  {
    sku: "POOL-001",
    slug: "BERINGER-used-pool-table",
    name: "BERINGER - 8ft",
    categorySlug: "pool-tables",
    shortDescription: "Classic pool table in excellent condition.",
    description:
      "A well-maintained BERINGER table with a solid frame and smooth playing surface. Perfect for home or recreational use.",
    startingPrice: 2499,
    quantity: 1,
    condition: "excellent",
    available: true,
    featured: true,
    quoteOnly: false,
    clothColors: ["green", "blue", "black", "burgundy"],
    dimensions: "8 ft",
    brand: "BERINGER",
    detailLayout: "pool",
    images: [
      {
        url: "/images/products/beringer-1.png",
        alt: "Walnut pool table",
      },
    ],
  },
  {
    sku: "POOL-002",
    slug: "restored-pool-table",
    name: "Restored Pool Table",
    categorySlug: "pool-tables",
    shortDescription: "Fully restored table blah blah.",
    description:
      "This table has been professionally restored and includes new cloth and leveling.",
    startingPrice: 2899,
    quantity: 1,
    condition: "restored",
    available: true,
    featured: true,
    quoteOnly: false,
    clothColors: ["green", "blue", "red"],
    dimensions: "8 ft",
    brand: "Restored",
    detailLayout: "pool",
    images: [
      {
        url: "/images/products/WalnutEncore.png",
        alt: "Restored pool table",
      },
    ],
  },
  {
    sku: "PING-001",
    slug: "whistler-ping-pong-table",
    name: "Whistler Ping Pong Table",
    categorySlug: "ping-pong",
    shortDescription: "Foldable and durable ping pong table.",
    description:
      "The consistently even surface delivers a reliable bounce across the table, keeping rallies smooth and every point decided by skill. Solid, stable, and refined in design, the Whistler pairs professional-level play with a sleek look suited to modern interiors.",
    startingPrice: 799,
    quantity: 1,
    condition: "very-good",
    available: true,
    featured: true,
    quoteOnly: false,
    clothColors: [],
    dimensions: "Standard size",
    brand: "Stiga",
    detailLayout: "ping-pong",
    images: [
      {
        url: "/images/products/whistler-indoor.png",
        alt: "Stiga ping pong table",
      },
    ],
  },
  {
    sku: "PING-002",
    slug: "compact-ping-pong-table",
    name: "Compact Ping Pong Table",
    categorySlug: "ping-pong",
    shortDescription: "Space-saving table for smaller rooms.",
    description:
      "Perfect for apartments or smaller spaces while still offering a great playing experience.",
    startingPrice: 499,
    quantity: 1,
    condition: "good",
    available: true,
    featured: false,
    quoteOnly: false,
    clothColors: [],
    dimensions: "Compact size",
    brand: "Stiga",
    detailLayout: "ping-pong",
    images: [
      {
        url: "/images/products/whistler-indoor.png",
        alt: "Compact ping pong table",
      },
    ],
  },
  {
    sku: "FOOS-001",
    slug: "tournament-foosball-table",
    name: "Tournament Foosball Table",
    categorySlug: "foosball",
    shortDescription: "Professional foosball table.",
    description:
      "A sturdy foosball table built for competitive play with smooth rods and solid construction.",
    startingPrice: 999,
    quantity: 1,
    condition: "excellent",
    available: true,
    featured: true,
    quoteOnly: false,
    clothColors: [],
    brand: "Tornado",
    detailLayout: "foosball",
    images: [
      {
        url: "/images/products/tornado-classic.png",
        alt: "Foosball table",
      },
    ],
  },
  {
    sku: "FOOS-002",
    slug: "casual-foosball-table",
    name: "Casual Foosball Table",
    categorySlug: "foosball",
    shortDescription: "Great for casual play at home.",
    description:
      "Affordable and fun foosball table, ideal for family and friends.",
    startingPrice: 399,
    quantity: 1,
    condition: "good",
    available: true,
    featured: false,
    quoteOnly: false,
    clothColors: [],
    brand: "Tornado",
    detailLayout: "foosball",
    images: [
      {
        url: "/images/products/tornado-classic.png",
        alt: "Foosball table casual",
      },
    ],
  },
]; */

async function main() {
  const adminEmail =
    process.env.ADMIN_SEED_EMAIL?.toLowerCase() ?? "admin@usedbilliardstore.ca";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD ?? "admin12345";
  const adminName = process.env.ADMIN_SEED_NAME ?? "Admin User";
  const userEmail =
    process.env.USER_SEED_EMAIL?.toLowerCase() ?? "user@usedbilliardstore.ca";
  const userPassword = process.env.USER_SEED_PASSWORD ?? "user12345";
  const userName = process.env.USER_SEED_NAME ?? "Store User";

  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const categoryBySlug = new Map<string, { id: string }>();

  for (const category of categorySeed) {
    const createdCategory = await prisma.category.create({
      data: category,
    });
    categoryBySlug.set(category.slug, createdCategory);
  }

  /*for (const product of productSeed) {
    const category = categoryBySlug.get(product.categorySlug);

    if (!category) {
      throw new Error(`Missing category for slug ${product.categorySlug}`);
    }

    await prisma.product.create({
      data: {
        sku: product.sku,
        slug: product.slug,
        name: product.name,
        shortDescription: product.shortDescription,
        description: product.description,
        startingPrice: product.startingPrice,
        quantity: product.quantity,
        condition: product.condition,
        available: product.available,
        featured: product.featured,
        quoteOnly: product.quoteOnly,
        clothColors: product.clothColors,
        dimensions: product.dimensions,
        brand: product.brand,
        detailLayout: product.detailLayout,
        categoryId: category.id,
        images: {
          create: product.images.map((image, index) => ({
            ...image,
            sortOrder: index,
          })),
        },
      },
    });
  } */

  await prisma.user.createMany({
    data: [
      {
        fullName: "Diego",
        email: "diego@homebilliards.ca",
        passwordHash: hashPassword("getmuz-5niwvi-Wyvsow"),
        role: "ADMIN",
      },
    ],
  });
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
