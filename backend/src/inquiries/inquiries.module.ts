import { AdminInquiryStatusController } from "./admin-inquiry-status.controller";
import { Module } from "@nestjs/common";
import { AdminInquiriesController } from "./admin-inquiries.controller";
import { InquiriesController } from "./inquiries.controller";
import { InquiriesService } from "./inquiries.service";

@Module({
  controllers: [
    InquiriesController,
    AdminInquiriesController,
    AdminInquiryStatusController,
  ],
  providers: [InquiriesService],
})
export class InquiriesModule {}
