export type ProductCategory = "pool-tables" | "ping-pong" | "foosball";

export type ProductDetailLayout = "pool" | "standard";

export type ProductCondition = "excellent" | "very-good" | "good" | "restored";

export type ClothColor =
  | "green"
  | "blue"
  | "red"
  | "black"
  | "burgundy"
  | "grey";

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  startingPrice: number;
  condition: ProductCondition;
  available: boolean;
  featured: boolean;
  quoteOnly: boolean;
  images: ProductImage[];
  clothColors?: ClothColor[];
  dimensions?: string;
  brand?: string;
  detailLayout: ProductDetailLayout;
}