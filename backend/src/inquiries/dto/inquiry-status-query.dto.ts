import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsOptional } from "class-validator";
import { inquiryStatusValues, type InquiryStatus } from "../inquiry-status";

export class InquiryStatusQueryDto {
  @ApiPropertyOptional({ enum: inquiryStatusValues, default: "new" })
  @IsOptional()
  @IsIn(inquiryStatusValues)
  status?: InquiryStatus;
}
