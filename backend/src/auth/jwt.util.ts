import { createHmac, timingSafeEqual } from "node:crypto";
import { UnauthorizedException } from "@nestjs/common";
import type { AuthenticatedUser } from "./auth.types";

type JwtPayload = Omit<AuthenticatedUser, "iat" | "exp">;

function base64UrlEncode(value: string | Buffer) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));

  return Buffer.from(`${normalized}${padding}`, "base64").toString("utf8");
}

function parseExpiryToSeconds(rawValue: string) {
  const match = rawValue.match(/^(\d+)([smhd])$/);

  if (!match) {
    const fallback = Number(rawValue);
    return Number.isFinite(fallback) ? fallback : 60 * 60 * 24 * 7;
  }

  const value = Number(match[1]);
  const unit = match[2];

  switch (unit) {
    case "s":
      return value;
    case "m":
      return value * 60;
    case "h":
      return value * 60 * 60;
    case "d":
      return value * 60 * 60 * 24;
    default:
      return 60 * 60 * 24 * 7;
  }
}

export function signJwt(
  payload: JwtPayload,
  secret: string,
  expiresIn: string,
) {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = issuedAt + parseExpiryToSeconds(expiresIn);

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(
    JSON.stringify({
      ...payload,
      iat: issuedAt,
      exp: expiresAt,
    }),
  );
  const signature = createHmac("sha256", secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest();

  return `${encodedHeader}.${encodedPayload}.${base64UrlEncode(signature)}`;
}

export function verifyJwt(token: string, secret: string): AuthenticatedUser {
  const [encodedHeader, encodedPayload, encodedSignature] = token.split(".");

  if (!encodedHeader || !encodedPayload || !encodedSignature) {
    throw new UnauthorizedException("Invalid token format.");
  }

  const expectedSignature = createHmac("sha256", secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest();
  const actualSignature = Buffer.from(
    encodedSignature.replace(/-/g, "+").replace(/_/g, "/"),
    "base64",
  );

  if (
    expectedSignature.length !== actualSignature.length ||
    !timingSafeEqual(expectedSignature, actualSignature)
  ) {
    throw new UnauthorizedException("Invalid token signature.");
  }

  const payload = JSON.parse(base64UrlDecode(encodedPayload)) as AuthenticatedUser;

  if (payload.exp <= Math.floor(Date.now() / 1000)) {
    throw new UnauthorizedException("Token has expired.");
  }

  return payload;
}
