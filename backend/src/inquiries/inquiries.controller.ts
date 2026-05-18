import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateContactInquiryDto } from "./dto/create-contact-inquiry.dto";
import { CreateQuoteRequestDto } from "./dto/create-quote-request.dto";
import { CreateSellRequestDto } from "./dto/create-sell-request.dto";
import { InquiriesService } from "./inquiries.service";

@ApiTags("inquiries")
@Controller("inquiries")
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Post("contact")
  @ApiOperation({ summary: "Create a general contact inquiry." })
  @ApiCreatedResponse({ description: "Contact inquiry received." })
  createContactInquiry(@Body() payload: CreateContactInquiryDto) {
    return this.inquiriesService.createContactInquiry(payload);
  }

  @Post("product-questions")
  @ApiOperation({ summary: "Create a product question." })
  @ApiCreatedResponse({ description: "Product question received." })
  createProductQuestion(@Body() payload: CreateQuoteRequestDto) {
    return this.inquiriesService.createQuoteRequest(payload);
  }

  @Post("quotes")
  @ApiOperation({ summary: "Create a product question. Deprecated path." })
  @ApiCreatedResponse({ description: "Product question received." })
  createQuoteRequest(@Body() payload: CreateQuoteRequestDto) {
    return this.createProductQuestion(payload);
  }

  @Post("sell-requests")
  @ApiOperation({ summary: "Create a sell-your-table request." })
  @ApiCreatedResponse({ description: "Sell request received." })
  createSellRequest(@Body() payload: CreateSellRequestDto) {
    return this.inquiriesService.createSellRequest(payload);
  }
}
