"use server";

import { redirect } from "next/navigation";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL?.replace(/\/$/, "") ?? "http://localhost:4000/api";

function getValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function buyNowProduct(formData: FormData) {
  const productSlug = getValue(formData, "productSlug");

  if (!productSlug) {
    redirect("/products");
  }

  let redirectUrl = `/checkout/success?status=error`;

  try {
    const response = await fetch(`${BACKEND_API_URL}/checkout/create-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ productSlug, quantity: 1 }),
    });

    if (response.ok) {
      const data = (await response.json()) as { url: string };
      redirectUrl = data.url;
    } else if (response.status === 400 || response.status === 404) {
      redirectUrl = `/checkout/success?status=unavailable&product=${encodeURIComponent(productSlug)}`;
    } else {
      redirectUrl = `/checkout/success?status=error&product=${encodeURIComponent(productSlug)}`;
    }
  } catch {
    redirectUrl = `/checkout/success?status=error&product=${encodeURIComponent(productSlug)}`;
  }

  redirect(redirectUrl);
}
