import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_TOKEN_COOKIE = "ubs_admin_token";

export async function getAdminToken() {
  return (await cookies()).get(ADMIN_TOKEN_COOKIE)?.value;
}

export async function requireAdminToken() {
  const token = await getAdminToken();

  if (!token) {
    redirect("/login");
  }

  return token;
}
