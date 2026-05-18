import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Role } from "../auth/role.enum";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { SalesQueryDto } from "./dto/sales-query.dto";
import { SalesService } from "./sales.service";

@ApiTags("admin-sales")
@ApiBearerAuth()
@Controller("admin/sales")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class AdminSalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  @ApiOperation({ summary: "List sales for the admin panel." })
  @ApiOkResponse({ description: "Sales returned successfully." })
  findAll(@Query() query: SalesQueryDto) {
    return this.salesService.adminFindAll(query);
  }
}
