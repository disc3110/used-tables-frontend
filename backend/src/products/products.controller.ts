import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { ProductQueryDto } from "./dto/product-query.dto";
import { ProductsService } from "./products.service";

@ApiTags("products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: "List products with basic storefront filters." })
  @ApiOkResponse({ description: "Products returned successfully." })
  findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAll(query);
  }

  @Get("featured")
  @ApiOperation({ summary: "List featured products for hero and curated sections." })
  @ApiQuery({ name: "limit", required: false, type: Number, example: 6 })
  @ApiOkResponse({ description: "Featured products returned successfully." })
  findFeatured(@Query("limit") limit?: number) {
    return this.productsService.findFeatured(limit);
  }

  @Get(":slug")
  @ApiOperation({ summary: "Fetch a single product by its storefront slug." })
  @ApiParam({ name: "slug", example: "beringer-used-pool-table" })
  @ApiOkResponse({ description: "Product returned successfully." })
  findOne(@Param("slug") slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Post(":slug/buy-now")
  @ApiOperation({
    summary: "Temporary storefront buy-now action that decrements inventory.",
  })
  @ApiParam({ name: "slug", example: "beringer-used-pool-table" })
  @ApiCreatedResponse({ description: "Inventory updated successfully." })
  buyNow(@Param("slug") slug: string) {
    return this.productsService.buyNow(slug);
  }
}
