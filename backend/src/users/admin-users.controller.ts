import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
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
import { CreateAdminUserDto } from "./dto/create-admin-user.dto";
import { UpdateAdminUserRoleDto } from "./dto/update-admin-user-role.dto";
import { UsersService } from "./users.service";

@ApiTags("admin-users")
@ApiBearerAuth()
@Controller("admin/users")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: "List all admin-panel users." })
  @ApiOkResponse({ description: "Users returned successfully." })
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: "Create a new admin-panel user." })
  @ApiCreatedResponse({ description: "User created successfully." })
  create(@Body() payload: CreateAdminUserDto) {
    return this.usersService.create(payload);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a user's role from the admin panel." })
  @ApiParam({ name: "id" })
  @ApiOkResponse({ description: "User role updated successfully." })
  updateRole(@Param("id") id: string, @Body() payload: UpdateAdminUserRoleDto) {
    return this.usersService.updateRole(id, payload);
  }
}
