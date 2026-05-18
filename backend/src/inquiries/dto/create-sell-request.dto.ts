import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";

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
}
