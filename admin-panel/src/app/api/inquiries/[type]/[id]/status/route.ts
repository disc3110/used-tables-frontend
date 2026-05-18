import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminProductsMutation } from "@/lib/api";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth";

interface RouteContext {
  params: Promise<{
    type: string;
    id: string;
  }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  const token = (await cookies()).get(ADMIN_TOKEN_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const { type, id } = await context.params;
    const result = await adminProductsMutation(
      `/admin/inquiries/${encodeURIComponent(type)}/${encodeURIComponent(id)}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      },
    );

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to update the inquiry status right now.",
      },
      { status: 500 },
    );
  }
}
