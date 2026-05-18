import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL?.replace(/\/$/, "") ?? "http://localhost:4000/api";

async function readJsonResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text) as { message?: string; url?: string };
  } catch {
    return { message: text };
  }
}

export async function POST(request: Request) {
  const token = (await cookies()).get(ADMIN_TOKEN_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "Image file is required." },
        { status: 400 },
      );
    }

    const payload = new FormData();
    payload.append("file", file);

    const uploadUrl = `${BACKEND_API_URL}/admin/uploads/image`;
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    });

    const result = await readJsonResponse(response);

    if (!response.ok) {
      console.error(
        `[admin upload] Backend upload failed with status ${response.status}: ${result.message ?? "No error message returned."}`,
      );

      return NextResponse.json(
        { message: result.message ?? "Upload failed." },
        { status: response.status },
      );
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(
      `[admin upload] Unable to reach backend API at ${BACKEND_API_URL}.`,
      error,
    );

    return NextResponse.json(
      {
        message: `Unable to reach the backend upload API at ${BACKEND_API_URL}. Check BACKEND_API_URL in Vercel and make sure Railway is running.`,
      },
      { status: 500 },
    );
  }
}
