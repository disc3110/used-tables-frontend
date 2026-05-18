import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const data = await this.prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    return {
      data: data.map((category) => ({
        id: category.id,
        slug: category.slug,
        name: category.name,
        description: category.description,
        productCount: category._count.products,
      })),
    };
  }
}
