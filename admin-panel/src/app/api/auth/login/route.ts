import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL?.replace(/\/$/, "") ?? "http://localhost:4000/api";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const response = await fetch(`${BACKEND_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = (await response.json()) as {
      access_token?: string;
      message?: string;
      user?: { role?: string };
    };

    if (!response.ok) {
      return NextResponse.json(
        { message: result.message ?? "Unable to sign in right now." },
        { status: response.status },
      );
    }

    if (result.user?.role !== "admin" || !result.access_token) {
      return NextResponse.json(
        { message: "This account does not have admin access." },
        { status: 403 },
      );
    }

    (await cookies()).set(ADMIN_TOKEN_COOKIE, result.access_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json(
      { message: "Unable to sign in right now." },
      { status: 500 },
    );
  }
}
