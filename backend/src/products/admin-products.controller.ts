import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Role } from "../auth/role.enum";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CreateAdminProductDto } from "./dto/create-admin-product.dto";
import { UpdateAdminProductDto } from "./dto/update-admin-product.dto";
import { ProductsService } from "./products.service";

@ApiTags("admin-products")
@ApiBearerAuth()
@Controller("admin/products")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class AdminProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: "List all products for the admin panel." })
  @ApiOkResponse({ description: "Admin products returned successfully." })
  findAll() {
    return this.productsService.adminFindAll();
  }

  @Post()
  @ApiOperation({ summary: "Create a new product from the admin panel." })
  @ApiCreatedResponse({ description: "Product created successfully." })
  create(@Body() payload: CreateAdminProductDto) {
    return this.productsService.adminCreate(payload);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update an existing product from the admin panel." })
  @ApiParam({ name: "id" })
  @ApiOkResponse({ description: "Product updated successfully." })
  update(@Param("id") id: string, @Body() payload: UpdateAdminProductDto) {
    return this.productsService.adminUpdate(id, payload);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a product from the admin panel." })
  @ApiParam({ name: "id" })
  @ApiOkResponse({ description: "Product deleted successfully." })
  remove(@Param("id") id: string) {
    return this.productsService.adminDelete(id);
  }
}
