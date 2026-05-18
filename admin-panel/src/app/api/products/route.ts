import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminProductsMutation } from "@/lib/api";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth";

export async function POST(request: Request) {
  const token = (await cookies()).get(ADMIN_TOKEN_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const result = await adminProductsMutation("/admin/products", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to create the product right now.",
      },
      { status: 500 },
    );
  }
}
