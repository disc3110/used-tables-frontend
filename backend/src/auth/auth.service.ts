import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";
import type { AuthenticatedUser } from "./auth.types";
import { verifyPassword } from "./password.util";
import { Role } from "./role.enum";
import { signJwt } from "./jwt.util";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !verifyPassword(password, user.passwordHash)) {
      throw new UnauthorizedException("Invalid email or password.");
    }

    const role = user.role === "ADMIN" ? Role.Admin : Role.User;
    const accessToken = signJwt(
      {
        sub: user.id,
        email: user.email,
        role,
        fullName: user.fullName,
      },
      this.configService.getOrThrow<string>("JWT_SECRET"),
      this.configService.get<string>("JWT_EXPIRES_IN", "7d"),
    );

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role,
      },
    };
  }

  getProfile(user: AuthenticatedUser) {
    return {
      id: user.sub,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };
  }
}
