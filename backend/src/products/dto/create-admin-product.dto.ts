import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
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

const categoryValues = ["pool-tables", "ping-pong", "foosball", "grill"] as const;
const conditionValues = ["excellent", "very-good", "good", "restored"] as const;
const detailLayoutValues = [
  "pool",
  "foosball",
  "ping-pong",
  "smoker",
  "default",
] as const;

export class AdminProductImageDto {
  @ApiProperty({ example: "/images/products/new-table.png" })
  @IsString()
  @MaxLength(500)
  url!: string;

  @ApiPropertyOptional({ example: "Restored classic pool table" })
  @IsOptional()
  @IsString()
  @MaxLength(280)
  alt?: string;
}

export class CreateAdminProductDto {
  @ApiProperty({ example: "POOL-003" })
  @IsString()
  @MaxLength(80)
  sku!: string;

  @ApiProperty({ example: "restored-classic-pool-table" })
  @IsString()
  @MaxLength(160)
  slug!: string;

  @ApiProperty({ example: "Restored Classic Pool Table" })
  @IsString()
  @MaxLength(160)
  name!: string;

  @ApiProperty({ enum: categoryValues })
  @IsIn(categoryValues)
  categorySlug!: (typeof categoryValues)[number];

  @ApiProperty({ example: "Classic table in excellent condition." })
  @IsString()
  @MaxLength(280)
  shortDescription!: string;

  @ApiProperty({ example: "Detailed product description." })
  @IsString()
  @MaxLength(5000)
  description!: string;

  @ApiProperty({ example: 2499 })
  @IsInt()
  @Min(0)
  startingPrice!: number;

  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  quantity?: number;

  @ApiProperty({ enum: conditionValues })
  @IsIn(conditionValues)
  condition!: (typeof conditionValues)[number];

  @ApiPropertyOptional({ example: "8 ft" })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  dimensions?: string;

  @ApiPropertyOptional({ example: "BERINGER" })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  brand?: string;

  @ApiPropertyOptional({ enum: detailLayoutValues, default: "default" })
  @IsOptional()
  @IsIn(detailLayoutValues)
  detailLayout?: (typeof detailLayoutValues)[number];

  @ApiPropertyOptional({ type: [String], example: ["green", "blue"] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  clothColors?: string[];

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  available?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  quoteOnly?: boolean;

  @ApiProperty({
    type: [AdminProductImageDto],
    minItems: 1,
    maxItems: 5,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => AdminProductImageDto)
  images!: AdminProductImageDto[];
}
