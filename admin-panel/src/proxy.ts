import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_TOKEN_COOKIE } from "./lib/auth";

export function proxy(request: NextRequest) {
  const token = request.cookies.get(ADMIN_TOKEN_COOKIE)?.value;
  const pathname = request.nextUrl.pathname;
  const isLoginRoute = pathname === "/login";
  const isApiAuthRoute = pathname.startsWith("/api/auth");
  const isPublicAsset =
    pathname.startsWith("/_next") || pathname === "/favicon.ico";

  if (isPublicAsset) {
    return NextResponse.next();
  }

  if (!token && !isLoginRoute && !isApiAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isLoginRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*).*)"],
};
