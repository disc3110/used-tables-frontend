"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL?.replace(/\/$/, "") ?? "http://localhost:4000/api";

function getValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function buyNowProduct(formData: FormData) {
  const productSlug = getValue(formData, "productSlug");
  let redirectPath = "/checkout/success?status=error";

  if (!productSlug) {
    redirect(redirectPath);
  }

  try {
    const response = await fetch(
      `${BACKEND_API_URL}/products/${encodeURIComponent(productSlug)}/buy-now`,
      {
        method: "POST",
        cache: "no-store",
      },
    );

    if (response.ok) {
      revalidatePath("/");
      revalidatePath("/products");
      revalidatePath("/products/[slug]", "page");
      redirectPath = `/checkout/success?status=success&product=${encodeURIComponent(
        productSlug,
      )}`;
    } else if (response.status === 400) {
      redirectPath = `/checkout/success?status=unavailable&product=${encodeURIComponent(
        productSlug,
      )}`;
    } else {
      redirectPath = `/checkout/success?status=error&product=${encodeURIComponent(
        productSlug,
      )}`;
    }
  } catch {
    redirectPath = `/checkout/success?status=error&product=${encodeURIComponent(
      productSlug,
    )}`;
  }

  redirect(redirectPath);
}
