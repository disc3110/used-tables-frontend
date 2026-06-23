import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateCheckoutSessionDto {
  @ApiProperty({ example: "BERINGER-used-pool-table" })
  @IsString()
  productSlug!: string;

  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  quantity?: number;

  @ApiPropertyOptional({ enum: ["standard", "gold"], default: "standard" })
  @IsOptional()
  @IsIn(["standard", "gold"])
  accessoryPackage?: "standard" | "gold";
}
