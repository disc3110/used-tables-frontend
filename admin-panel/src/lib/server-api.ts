import { redirect } from "next/navigation";
import { requireAdminToken } from "./auth";
import { AdminBackendUnavailableError } from "./backend-error";
import type {
  AdminContactInquiry,
  AdminProduct,
  AdminProductInquiry,
  AdminSale,
  AdminSellRequest,
  AdminUser,
  InquiryStatus,
} from "./types";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL?.replace(/\/$/, "") ?? "http://localhost:4000/api";

async function serverFetch<T>(path: string): Promise<T> {
  const token = await requireAdminToken();

  let response: Response;

  try {
    response = await fetch(`${BACKEND_API_URL}${path}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    throw new AdminBackendUnavailableError(BACKEND_API_URL);
  }

  if (response.status === 401 || response.status === 403) {
    redirect("/login");
  }

  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getProtectedAdminProducts() {
  return serverFetch<{ data: AdminProduct[] }>("/admin/products");
}

function withStatus(path: string, status?: InquiryStatus) {
  return status ? `${path}?status=${encodeURIComponent(status)}` : path;
}

export async function getProtectedAdminProductInquiries(status?: InquiryStatus) {
  return serverFetch<{ data: AdminProductInquiry[] }>(
    withStatus("/admin/inquiries/product-questions", status),
  );
}

export async function getProtectedAdminContactInquiries(status?: InquiryStatus) {
  return serverFetch<{ data: AdminContactInquiry[] }>(
    withStatus("/admin/inquiries/contact", status),
  );
}

export async function getProtectedAdminSellRequests(status?: InquiryStatus) {
  return serverFetch<{ data: AdminSellRequest[] }>(
    withStatus("/admin/inquiries/sell-requests", status),
  );
}

export async function getProtectedAdminSales(filters?: {
  from?: string;
  to?: string;
}) {
  const params = new URLSearchParams();

  if (filters?.from) params.set("from", filters.from);
  if (filters?.to) params.set("to", filters.to);

  const query = params.toString();

  return serverFetch<{ data: AdminSale[] }>(
    query ? `/admin/sales?${query}` : "/admin/sales",
  );
}

export async function getProtectedAdminProfile() {
  return serverFetch<{
    id: string;
    fullName: string;
    email: string;
    role: string;
  }>("/auth/profile");
}

export async function getProtectedAdminUsers() {
  return serverFetch<{ data: AdminUser[] }>("/admin/users");
}
