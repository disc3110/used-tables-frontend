import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";
import { Role } from "../../auth/role.enum";

const roleValues = [Role.Admin, Role.User] as const;

export class UpdateAdminUserRoleDto {
  @ApiProperty({ enum: roleValues, example: Role.Admin })
  @IsIn(roleValues)
  role!: (typeof roleValues)[number];
}
