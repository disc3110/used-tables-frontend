import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Role } from "../auth/role.enum";
import { hashPassword } from "../auth/password.util";
import { CreateAdminUserDto } from "./dto/create-admin-user.dto";
import { UpdateAdminUserRoleDto } from "./dto/update-admin-user-role.dto";

function mapDbRole(role: "ADMIN" | "USER") {
  return role === "ADMIN" ? Role.Admin : Role.User;
}

function mapApiRole(role: Role) {
  return role === Role.Admin ? "ADMIN" : "USER";
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const data = await this.prisma.user.findMany({
      orderBy: [{ role: "asc" }, { fullName: "asc" }],
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      data: data.map((user) => ({
        ...user,
        role: mapDbRole(user.role),
      })),
    };
  }

  async create(payload: CreateAdminUserDto) {
    const email = payload.email.toLowerCase();
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      throw new BadRequestException("A user with that email already exists.");
    }

    const user = await this.prisma.user.create({
      data: {
        fullName: payload.fullName,
        email,
        passwordHash: hashPassword(payload.password),
        role: mapApiRole(payload.role),
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      data: {
        ...user,
        role: mapDbRole(user.role),
      },
    };
  }

  async updateRole(id: string, payload: UpdateAdminUserRoleDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with id "${id}" was not found.`);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        role: mapApiRole(payload.role),
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      data: {
        ...user,
        role: mapDbRole(user.role),
      },
    };
  }
}
