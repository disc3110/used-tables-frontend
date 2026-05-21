import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  IsArray,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  ValidateNested,
} from "class-validator";

export class SellRequestImageDto {
  @ApiProperty({ example: "https://res.cloudinary.com/demo/image/upload/v1/used-billiard-store/sell-requests/abc.jpg" })
  @IsString()
  @IsUrl()
  url!: string;

  @ApiProperty({ example: "used-billiard-store/sell-requests/abc123" })
  @IsString()
  @MaxLength(500)
  publicId!: string;

  @ApiPropertyOptional({ example: 1280 })
  @IsOptional()
  @IsInt()
  @Min(1)
  width?: number;

  @ApiPropertyOptional({ example: 960 })
  @IsOptional()
  @IsInt()
  @Min(1)
  height?: number;

  @ApiPropertyOptional({ example: "pool-table-front" })
  @IsOptional()
  @IsString()
  @MaxLength(260)
  originalFilename?: string;
}

export class CreateSellRequestDto {
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

  @ApiPropertyOptional({ example: "8ft Brunswick pool table" })
  @IsOptional()
  @IsString()
  @MaxLength(160)
  itemType?: string;

  @ApiPropertyOptional({ example: "Burnaby" })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  location?: string;

  @ApiPropertyOptional({ example: "Table is in very good condition and on the main floor." })
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  message?: string;

  @ApiPropertyOptional({ type: [SellRequestImageDto] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(3)
  @ValidateNested({ each: true })
  @Type(() => SellRequestImageDto)
  images?: SellRequestImageDto[];
}
