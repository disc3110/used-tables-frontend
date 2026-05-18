import type {
  AdminCategory,
  AdminContactInquiry,
  AdminProduct,
  AdminProductInquiry,
  AdminSellRequest,
  InquiryStatus,
} from "./types";
import { AdminBackendUnavailableError } from "./backend-error";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL?.replace(/\/$/, "") ?? "http://localhost:4000/api";

async function backendFetch<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${BACKEND_API_URL}${path}`, {
      ...init,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
    });
  } catch {
    throw new AdminBackendUnavailableError(BACKEND_API_URL);
  }

  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getAdminProducts() {
  return backendFetch<{ data: AdminProduct[] }>("/admin/products");
}

export async function getAdminCategories() {
  return backendFetch<{ data: AdminCategory[] }>("/categories");
}

function withStatus(path: string, status?: InquiryStatus) {
  return status ? `${path}?status=${encodeURIComponent(status)}` : path;
}

export async function getAdminProductInquiries(status?: InquiryStatus) {
  return backendFetch<{ data: AdminProductInquiry[] }>(
    withStatus("/admin/inquiries/product-questions", status),
  );
}

export async function getAdminContactInquiries(status?: InquiryStatus) {
  return backendFetch<{ data: AdminContactInquiry[] }>(
    withStatus("/admin/inquiries/contact", status),
  );
}

export async function getAdminSellRequests(status?: InquiryStatus) {
  return backendFetch<{ data: AdminSellRequest[] }>(
    withStatus("/admin/inquiries/sell-requests", status),
  );
}

export async function adminProductsMutation(
  path: string,
  init: RequestInit,
) {
  return backendFetch(path, init);
}
