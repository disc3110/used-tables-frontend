import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth";

export async function POST() {
  (await cookies()).delete(ADMIN_TOKEN_COOKIE);
  return NextResponse.json({ status: "ok" });
}
