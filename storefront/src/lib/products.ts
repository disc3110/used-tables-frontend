import { products as localProducts } from "@/data/products";
import type {
  ClothColor,
  Product,
  ProductCategory,
  ProductCondition,
  ProductDetailLayout,
} from "@/types/product";

type BackendCategory = {
  id: string;
  slug: string;
  name: string;
};

type BackendProductImage = {
  id: string;
  url: string;
  alt: string;
};

type BackendProduct = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  startingPrice: number;
  quantity: number;
  condition: string;
  available: boolean;
  featured: boolean;
  quoteOnly: boolean;
  images: BackendProductImage[];
  clothColors?: string[];
  dimensions?: string | null;
  brand?: string | null;
  detailLayout: string;
  category: BackendCategory;
};

type ProductsResponse = {
  data: BackendProduct[];
  meta?: {
    total: number;
    limit: number;
    offset: number;
  };
};

type FeaturedProductsResponse = {
  data: BackendProduct[];
};

const NOT_FOUND_RESPONSE = Symbol("not-found-response");

const BACKEND_API_URL =
  process.env.BACKEND_API_URL?.replace(/\/$/, "") ?? "http://localhost:4000/api";

const validCategories = new Set<ProductCategory>([
  "pool-tables",
  "ping-pong",
  "foosball",
  "grill",
]);
const validConditions = new Set<ProductCondition>([
  "excellent",
  "very-good",
  "good",
  "restored",
]);
const validDetailLayouts = new Set<ProductDetailLayout>([
  "pool",
  "foosball",
  "ping-pong",
  "smoker",
  "default",
]);
const validClothColors = new Set<ClothColor>([
  "green",
  "blue",
  "red",
  "black",
  "burgundy",
  "grey",
]);

function getFallbackProducts(): Product[] {
  return localProducts.filter(isPubliclyAvailable);
}

function isPubliclyAvailable(product: Product) {
  return product.available && product.quantity > 0;
}

function getCategoryDetailLayout(category: ProductCategory): ProductDetailLayout {
  switch (category) {
    case "pool-tables":
      return "pool";
    case "ping-pong":
      return "ping-pong";
    case "foosball":
      return "foosball";
    case "grill":
      return "smoker";
  }
}

function mapBackendProduct(product: BackendProduct): Product {
  const category = validCategories.has(product.category.slug as ProductCategory)
    ? (product.category.slug as ProductCategory)
    : "pool-tables";

  const condition = validConditions.has(product.condition as ProductCondition)
    ? (product.condition as ProductCondition)
    : "good";

  // Always derive layout from category so the correct detail page is shown
  // regardless of what value is stored in the backend.
  const detailLayout = getCategoryDetailLayout(category);

  const clothColors = (product.clothColors ?? []).filter((color): color is ClothColor =>
    validClothColors.has(color as ClothColor),
  );

  return {
    id: product.id,
    sku: product.sku,
    slug: product.slug,
    name: product.name,
    category,
    shortDescription: product.shortDescription,
    description: product.description,
    startingPrice: product.startingPrice,
    quantity: product.quantity ?? 1,
    condition,
    available: product.available,
    featured: product.featured,
    quoteOnly: product.quoteOnly,
    images: product.images.map((image) => ({
      id: image.id,
      url: image.url,
      alt: image.alt,
    })),
    clothColors: clothColors.length > 0 ? clothColors : undefined,
    dimensions: product.dimensions ?? undefined,
    brand: product.brand ?? undefined,
    detailLayout,
  };
}

async function fetchBackendJson<T>(
  path: string,
): Promise<T | null | typeof NOT_FOUND_RESPONSE> {
  try {
    const response = await fetch(`${BACKEND_API_URL}${path}`, {
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NOT_FOUND_RESPONSE;
      }

      throw new Error(`Backend request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.warn(
      `[products] Falling back to local data for ${path}.`,
      error instanceof Error ? error.message : error,
    );

    return null;
  }
}

export async function getAllProducts(): Promise<Product[]> {
  const response = await fetchBackendJson<ProductsResponse>(
    "/products?limit=100&offset=0",
  );

  if (!response) {
    return getFallbackProducts();
  }

  if (response === NOT_FOUND_RESPONSE) {
    return [];
  }

  return response.data.map(mapBackendProduct).filter(isPubliclyAvailable);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const response = await fetchBackendJson<FeaturedProductsResponse>(
    "/products/featured?limit=6",
  );

  if (!response) {
    return getFallbackProducts().filter((product) => product.featured);
  }

  if (response === NOT_FOUND_RESPONSE) {
    return [];
  }

  return response.data
    .map(mapBackendProduct)
    .filter((product) => product.featured && isPubliclyAvailable(product));
}

export async function getProductsByCategory(
  category: ProductCategory,
): Promise<Product[]> {
  const response = await fetchBackendJson<ProductsResponse>(
    `/products?category=${category}&limit=100&offset=0`,
  );

  if (!response) {
    return getFallbackProducts().filter((product) => product.category === category);
  }

  if (response === NOT_FOUND_RESPONSE) {
    return [];
  }

  return response.data.map(mapBackendProduct).filter(isPubliclyAvailable);
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  const response = await fetchBackendJson<BackendProduct>(
    `/products/${encodeURIComponent(slug)}`,
  );

  if (!response) {
    return getFallbackProducts().find((product) => product.slug === slug);
  }

  if (response === NOT_FOUND_RESPONSE) {
    return undefined;
  }

  const product = mapBackendProduct(response);

  return isPubliclyAvailable(product) ? product : undefined;
}
