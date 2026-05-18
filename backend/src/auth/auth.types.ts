export type AuthenticatedUser = {
  sub: string;
  email: string;
  role: "admin" | "user";
  fullName: string;
  iat: number;
  exp: number;
};
