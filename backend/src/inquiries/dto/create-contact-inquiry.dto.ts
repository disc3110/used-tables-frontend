import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateContactInquiryDto {
  @ApiProperty({ example: "Jorge Garcia" })
  @IsString()
  @MaxLength(120)
  fullName!: string;

  @ApiProperty({ example: "jorge@example.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "604 555 0101", required: false })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  phone?: string;

  @ApiProperty({ example: "Request a Quote" })
  @IsString()
  @MaxLength(120)
  subject!: string;

  @ApiProperty({ example: "I would like to learn more about your 8ft pool tables." })
  @IsString()
  @MaxLength(4000)
  message!: string;
}
