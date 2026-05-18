import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Role } from "../auth/role.enum";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { InquiryStatusQueryDto } from "./dto/inquiry-status-query.dto";
import { InquiriesService } from "./inquiries.service";

@ApiTags("admin-inquiries")
@ApiBearerAuth()
@Controller("admin/inquiries")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class AdminInquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Get("product-questions")
  @ApiOperation({ summary: "List product inquiries for the admin panel." })
  @ApiOkResponse({ description: "Product inquiries returned successfully." })
  findProductQuestions(@Query() query: InquiryStatusQueryDto) {
    return this.inquiriesService.findQuoteRequests(query.status ?? "new");
  }

  @Get("quotes")
  @ApiOperation({ summary: "List product inquiries for the admin panel. Deprecated path." })
  @ApiOkResponse({ description: "Product inquiries returned successfully." })
  findQuotes(@Query() query: InquiryStatusQueryDto) {
    return this.findProductQuestions(query);
  }

  @Get("contact")
  @ApiOperation({ summary: "List contact inquiries for the admin panel." })
  @ApiOkResponse({ description: "Contact inquiries returned successfully." })
  findContact(@Query() query: InquiryStatusQueryDto) {
    return this.inquiriesService.findContactInquiries(query.status ?? "new");
  }

  @Get("sell-requests")
  @ApiOperation({ summary: "List sell requests for the admin panel." })
  @ApiOkResponse({ description: "Sell requests returned successfully." })
  findSellRequests(@Query() query: InquiryStatusQueryDto) {
    return this.inquiriesService.findSellRequests(query.status ?? "new");
  }

}
