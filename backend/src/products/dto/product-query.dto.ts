import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

const categoryValues = ["pool-tables", "ping-pong", "foosball"] as const;
const conditionValues = ["excellent", "very-good", "good", "restored"] as const;
const sortValues = ["featured", "price-asc", "price-desc", "newest"] as const;

function transformBoolean(value: unknown) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    if (value === "true") return true;
    if (value === "false") return false;
  }

  return value;
}

export class ProductQueryDto {
  @ApiPropertyOptional({ enum: categoryValues })
  @IsOptional()
  @IsIn(categoryValues)
  category?: (typeof categoryValues)[number];

  @ApiPropertyOptional({ enum: conditionValues })
  @IsOptional()
  @IsIn(conditionValues)
  condition?: (typeof conditionValues)[number];

  @ApiPropertyOptional({ description: "Free-text search across product name, brand, and copy." })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: sortValues, default: "featured" })
  @IsOptional()
  @IsIn(sortValues)
  sort?: (typeof sortValues)[number];

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @Transform(({ value }) => transformBoolean(value))
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @Transform(({ value }) => transformBoolean(value))
  @IsBoolean()
  available?: boolean;

  @ApiPropertyOptional({ default: 12, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 12;

  @ApiPropertyOptional({ default: 0, minimum: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number = 0;
}
