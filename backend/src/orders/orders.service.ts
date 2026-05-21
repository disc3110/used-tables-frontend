import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async adminFindAll(filters: { from?: string; to?: string } = {}) {
    const createdAt: Prisma.DateTimeFilter = {};

    if (filters.from) createdAt.gte = new Date(filters.from);
    if (filters.to) createdAt.lte = new Date(filters.to);

    const data = await this.prisma.order.findMany({
      where: createdAt.gte || createdAt.lte ? { createdAt } : undefined,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });

    return { data };
  }
}
