import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from "class-validator";
import { AdminProductImageDto } from "./create-admin-product.dto";

const categoryValues = ["pool-tables", "ping-pong", "foosball"] as const;
const conditionValues = ["excellent", "very-good", "good", "restored"] as const;
const detailLayoutValues = [
  "pool",
  "foosball",
  "ping-pong",
  "smoker",
  "default",
] as const;

export class UpdateAdminProductDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(80)
  sku?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(160)
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(160)
  name?: string;

  @ApiPropertyOptional({ enum: categoryValues })
  @IsOptional()
  @IsIn(categoryValues)
  categorySlug?: (typeof categoryValues)[number];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(280)
  shortDescription?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  startingPrice?: number;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  quantity?: number;

  @ApiPropertyOptional({ enum: conditionValues })
  @IsOptional()
  @IsIn(conditionValues)
  condition?: (typeof conditionValues)[number];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(80)
  dimensions?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  brand?: string;

  @ApiPropertyOptional({ enum: detailLayoutValues })
  @IsOptional()
  @IsIn(detailLayoutValues)
  detailLayout?: (typeof detailLayoutValues)[number];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  clothColors?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  available?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  quoteOnly?: boolean;

  @ApiPropertyOptional({
    type: [AdminProductImageDto],
    minItems: 1,
    maxItems: 5,
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => AdminProductImageDto)
  images?: AdminProductImageDto[];
}
