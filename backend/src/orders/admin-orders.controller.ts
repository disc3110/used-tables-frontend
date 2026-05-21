import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Role } from "../auth/role.enum";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { SalesQueryDto } from "../sales/dto/sales-query.dto";
import { OrdersService } from "./orders.service";

@ApiTags("admin-orders")
@ApiBearerAuth()
@Controller("admin/orders")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class AdminOrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: "List Stripe orders for the admin panel." })
  @ApiOkResponse({ description: "Orders returned successfully." })
  findAll(@Query() query: SalesQueryDto) {
    return this.ordersService.adminFindAll({ from: query.from, to: query.to });
  }
}
