import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsString, MaxLength, MinLength } from "class-validator";
import { Role } from "../../auth/role.enum";

const roleValues = [Role.Admin, Role.User] as const;

export class CreateAdminUserDto {
  @ApiProperty({ example: "Operations Manager" })
  @IsString()
  @MaxLength(120)
  fullName!: string;

  @ApiProperty({ example: "manager@usedbilliardstore.ca" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "securePassword123" })
  @IsString()
  @MinLength(8)
  @MaxLength(120)
  password!: string;

  @ApiProperty({ enum: roleValues, example: Role.User })
  @IsIn(roleValues)
  role!: (typeof roleValues)[number];
}
