import type { Product, ProductCategory } from "@/types/product";
import {
  absoluteUrl,
  BUSINESS_ADDRESS,
  BUSINESS_DESCRIPTION,
  BUSINESS_EMAIL,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  CURRENCY,
  SERVICE_AREAS,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/lib/site";

const categoryNames: Record<ProductCategory, string> = {
  "pool-tables": "Pool Tables",
  "ping-pong": "Ping Pong Tables",
  foosball: "Foosball Tables",
  grill: "Grills",
};

export function getCategoryName(category: ProductCategory) {
  return categoryNames[category];
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function getBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BUSINESS_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en-CA",
      },
      {
        "@type": ["LocalBusiness", "Store"],
        "@id": `${SITE_URL}/#business`,
        name: BUSINESS_NAME,
        url: SITE_URL,
        telephone: BUSINESS_PHONE,
        email: BUSINESS_EMAIL,
        description: BUSINESS_DESCRIPTION,
        image: absoluteUrl("/images/hero/hero-room-vancouver.png"),
        currenciesAccepted: CURRENCY,
        address: {
          "@type": "PostalAddress",
          ...BUSINESS_ADDRESS,
        },
        areaServed: SERVICE_AREAS.map((name) => ({
          "@type": "AdministrativeArea",
          name,
        })),
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "CA",
          returnPolicyCategory:
            "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 30,
        },
      },
    ],
  };
}

export function getProductJsonLd(product: Product) {
  const productUrl = absoluteUrl(`/products/${product.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.name,
    description: product.description,
    sku: product.sku,
    category: getCategoryName(product.category),
    image: product.images.map((image) => image.url),
    itemCondition: "https://schema.org/UsedCondition",
    ...(product.brand
      ? {
          brand: {
            "@type": "Brand",
            name: product.brand,
          },
        }
      : {}),
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: CURRENCY,
      price: product.startingPrice,
      itemCondition: "https://schema.org/UsedCondition",
      availability:
        product.available && product.quantity > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@id": `${SITE_URL}/#business`,
      },
    },
  };
}

export function getProductBreadcrumbJsonLd(product: Product) {
  const categoryUrl = absoluteUrl(`/products/${product.category}`);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: getCategoryName(product.category),
        item: categoryUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: absoluteUrl(`/products/${product.slug}`),
      },
    ],
  };
}
