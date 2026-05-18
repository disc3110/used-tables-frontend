import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAdminProductDto } from "./dto/create-admin-product.dto";
import { ProductQueryDto } from "./dto/product-query.dto";
import { UpdateAdminProductDto } from "./dto/update-admin-product.dto";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: ProductQueryDto) {
    const where: Prisma.ProductWhereInput = {
      available: true,
      quantity: {
        gt: 0,
      },
      ...(query.category ? { category: { slug: query.category } } : {}),
      ...(query.condition ? { condition: query.condition } : {}),
      ...(typeof query.featured === "boolean" ? { featured: query.featured } : {}),
      ...(query.search
        ? {
            OR: [
              { name: { contains: query.search, mode: "insensitive" } },
              { brand: { contains: query.search, mode: "insensitive" } },
              { shortDescription: { contains: query.search, mode: "insensitive" } },
              { description: { contains: query.search, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const orderBy = this.getOrderBy(query.sort);

    const [data, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        orderBy,
        skip: query.offset ?? 0,
        take: query.limit ?? 12,
        include: {
          images: {
            orderBy: {
              sortOrder: "asc",
            },
          },
          category: true,
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        limit: query.limit ?? 12,
        offset: query.offset ?? 0,
      },
    };
  }

  async findFeatured(limit = 6) {
    const data = await this.prisma.product.findMany({
      where: {
        featured: true,
        available: true,
        quantity: {
          gt: 0,
        },
      },
      take: limit,
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
        category: true,
      },
    });

    return { data };
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with slug "${slug}" was not found.`);
    }

    if (!product.available || product.quantity <= 0) {
      throw new NotFoundException(`Product with slug "${slug}" was not found.`);
    }

    return product;
  }

  async buyNow(slug: string) {
    const result = await this.prisma.$transaction(async (tx) => {
      const existingProduct = await tx.product.findUnique({
        where: { slug },
        select: {
          id: true,
          sku: true,
          slug: true,
          name: true,
          startingPrice: true,
          quantity: true,
          available: true,
        },
      });

      if (!existingProduct) {
        throw new NotFoundException(`Product with slug "${slug}" was not found.`);
      }

      const updateResult = await tx.product.updateMany({
        where: {
          slug,
          available: true,
          quantity: {
            gt: 0,
          },
        },
        data: {
          quantity: {
            decrement: 1,
          },
        },
      });

      if (updateResult.count === 0) {
        throw new BadRequestException("This product is no longer available.");
      }

      const product = await tx.product.findUniqueOrThrow({
        where: { slug },
        include: {
          images: {
            orderBy: {
              sortOrder: "asc",
            },
          },
          category: true,
        },
      });

      if (product.quantity === 0 && product.available) {
        const updatedProduct = await tx.product.update({
          where: { id: product.id },
          data: {
            available: false,
          },
          include: {
            images: {
              orderBy: {
                sortOrder: "asc",
              },
            },
            category: true,
          },
        });

        return {
          product: updatedProduct,
          saleSnapshot: existingProduct,
        };
      }

      return {
        product,
        saleSnapshot: existingProduct,
      };
    });

    try {
      await this.prisma.sale.create({
        data: {
          productId: result.saleSnapshot.id,
          productSlug: result.saleSnapshot.slug,
          productName: result.saleSnapshot.name,
          sku: result.saleSnapshot.sku,
          unitPrice: result.saleSnapshot.startingPrice,
          quantity: 1,
          status: "completed",
          source: "buy-now",
        },
      });
    } catch (error) {
      if (
        !(
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2021"
        )
      ) {
        throw error;
      }
    }

    return result.product;
  }

  async adminFindAll() {
    const data = await this.prisma.product.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
        category: true,
      },
    });

    return { data };
  }

  async adminCreate(payload: CreateAdminProductDto) {
    const category = await this.findCategoryBySlug(payload.categorySlug);

    const product = await this.prisma.product.create({
      data: {
        sku: payload.sku,
        slug: payload.slug,
        name: payload.name,
        shortDescription: payload.shortDescription,
        description: payload.description,
        startingPrice: payload.startingPrice,
        quantity: payload.quantity ?? 1,
        condition: payload.condition,
        available: payload.available ?? true,
        featured: payload.featured ?? false,
        quoteOnly: payload.quoteOnly ?? false,
        clothColors: payload.clothColors ?? [],
        dimensions: payload.dimensions,
        brand: payload.brand,
        detailLayout: payload.detailLayout ?? "default",
        categoryId: category.id,
        images: {
          create: payload.images.map((image, index) => ({
            url: image.url,
            alt: image.alt ?? payload.name,
            sortOrder: index,
          })),
        },
      },
      include: {
        images: true,
        category: true,
      },
    });

    return { data: product };
  }

  async adminUpdate(id: string, payload: UpdateAdminProductDto) {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });

    if (!existingProduct) {
      throw new NotFoundException(`Product with id "${id}" was not found.`);
    }

    const categoryId = payload.categorySlug
      ? (await this.findCategoryBySlug(payload.categorySlug)).id
      : undefined;

    const product = await this.prisma.$transaction(async (tx) => {
      if (payload.images) {
        await tx.productImage.deleteMany({
          where: {
            productId: id,
          },
        });

        await tx.productImage.createMany({
          data: payload.images.map((image, index) => ({
            productId: id,
            url: image.url,
            alt: image.alt ?? payload.name ?? existingProduct.name,
            sortOrder: index,
          })),
        });
      }

      return tx.product.update({
        where: { id },
        data: {
          sku: payload.sku,
          slug: payload.slug,
          name: payload.name,
          shortDescription: payload.shortDescription,
          description: payload.description,
          startingPrice: payload.startingPrice,
          quantity: payload.quantity,
          condition: payload.condition,
          available: payload.available,
          featured: payload.featured,
          quoteOnly: payload.quoteOnly,
          clothColors: payload.clothColors,
          dimensions: payload.dimensions,
          brand: payload.brand,
          detailLayout: payload.detailLayout,
          categoryId,
        },
        include: {
          images: {
            orderBy: {
              sortOrder: "asc",
            },
          },
          category: true,
        },
      });
    });

    return { data: product };
  }

  async adminDelete(id: string) {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingProduct) {
      throw new NotFoundException(`Product with id "${id}" was not found.`);
    }

    await this.prisma.product.delete({
      where: { id },
    });

    return {
      id,
      status: "deleted",
    };
  }

  private getOrderBy(sort?: ProductQueryDto["sort"]): Prisma.ProductOrderByWithRelationInput[] {
    switch (sort) {
      case "price-asc":
        return [{ startingPrice: "asc" }, { createdAt: "desc" }];
      case "price-desc":
        return [{ startingPrice: "desc" }, { createdAt: "desc" }];
      case "newest":
        return [{ createdAt: "desc" }];
      case "featured":
      default:
        return [{ featured: "desc" }, { createdAt: "desc" }];
    }
  }

  private async findCategoryBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        slug,
      },
    });

    if (!category) {
      throw new BadRequestException(`Category with slug "${slug}" does not exist.`);
    }

    return category;
  }
}
