import { Body, Controller, Param, Patch, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Role } from "../auth/role.enum";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { UpdateInquiryStatusDto } from "./dto/update-inquiry-status.dto";
import { InquiriesService } from "./inquiries.service";
import { inquiryTypeValues, type InquiryType } from "./inquiry-status";

@ApiTags("admin-inquiry-status")
@ApiBearerAuth()
@Controller("admin/inquiries")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class AdminInquiryStatusController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Patch(":type/:id/status")
  @ApiOperation({ summary: "Update an inquiry status." })
  @ApiParam({ name: "type", enum: inquiryTypeValues })
  @ApiParam({ name: "id" })
  @ApiOkResponse({ description: "Inquiry status updated successfully." })
  updateStatus(
    @Param("type") type: InquiryType,
    @Param("id") id: string,
    @Body() payload: UpdateInquiryStatusDto,
  ) {
    return this.inquiriesService.updateInquiryStatus(type, id, payload.status);
  }
}
