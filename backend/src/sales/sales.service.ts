import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { SalesQueryDto } from "./dto/sales-query.dto";

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  async adminFindAll(query: SalesQueryDto = {}) {
    const createdAt: Prisma.DateTimeFilter = {};

    if (query.from) {
      createdAt.gte = new Date(query.from);
    }

    if (query.to) {
      createdAt.lte = new Date(query.to);
    }

    try {
      const data = await this.prisma.sale.findMany({
        where:
          createdAt.gte || createdAt.lte
            ? {
                createdAt,
              }
            : undefined,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          product: {
            include: {
              images: {
                orderBy: {
                  sortOrder: "asc",
                },
              },
              category: true,
            },
          },
        },
      });

      return { data };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2021"
      ) {
        return { data: [] };
      }

      throw error;
    }
  }
}
