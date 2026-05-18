import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";
import { inquiryStatusValues, type InquiryStatus } from "../inquiry-status";

export class UpdateInquiryStatusDto {
  @ApiProperty({ enum: inquiryStatusValues, example: "pending" })
  @IsIn(inquiryStatusValues)
  status!: InquiryStatus;
}
