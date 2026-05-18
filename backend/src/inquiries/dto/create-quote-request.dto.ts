import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

const accessoryPackageValues = ["standard", "gold"] as const;

export class CreateQuoteRequestDto {
  @ApiProperty({ example: "restored-pool-table" })
  @IsString()
  @MaxLength(160)
  productSlug!: string;

  @ApiProperty({ example: "Jorge Garcia" })
  @IsString()
  @MaxLength(120)
  fullName!: string;

  @ApiProperty({ example: "jorge@example.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "604 555 0101" })
  @IsString()
  @MaxLength(40)
  phone!: string;

  @ApiPropertyOptional({ example: "championship-blue" })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  clothColor?: string;

  @ApiProperty({ enum: accessoryPackageValues, example: "standard" })
  @IsIn(accessoryPackageValues)
  accessoryPackage!: (typeof accessoryPackageValues)[number];

  @ApiPropertyOptional({
    default: false,
    description: "Customer wants free installation and delivery in Metro Vancouver.",
  })
  @IsOptional()
  @IsBoolean()
  wantsMetroVancouverInstallDelivery?: boolean;

  @ApiPropertyOptional({ example: "Please let me know delivery timing." })
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  message?: string;
}
