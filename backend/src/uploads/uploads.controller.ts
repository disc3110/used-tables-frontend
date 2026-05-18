import {
  BadRequestException,
  Controller,
  Logger,
  Post,
  UnsupportedMediaTypeException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Role } from "../auth/role.enum";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { UploadImageDto } from "./dto/upload-image.dto";
import { CloudinaryService } from "./cloudinary.service";

@ApiTags("admin-uploads")
@ApiBearerAuth()
@Controller("admin/uploads")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class UploadsController {
  private readonly logger = new Logger(UploadsController.name);

  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post("image")
  @UseInterceptors(
    FileInterceptor("file", {
      limits: {
        fileSize: 8 * 1024 * 1024,
      },
    }),
  )
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "Image file to upload to Cloudinary.",
    type: UploadImageDto,
  })
  @ApiOperation({ summary: "Upload a product image to Cloudinary." })
  @ApiCreatedResponse({ description: "Image uploaded successfully." })
  async uploadImage(
    @UploadedFile() file?: {
      buffer: Buffer;
      mimetype: string;
      originalname: string;
      size?: number;
    },
  ) {
    if (!file) {
      throw new BadRequestException("Image file is required.");
    }

    if (!file.mimetype.startsWith("image/")) {
      throw new UnsupportedMediaTypeException(
        `Unsupported file type "${file.mimetype}". Please upload an image file.`,
      );
    }

    this.logger.log(
      `Received product image upload: ${file.originalname} (${file.mimetype}, ${file.size ?? file.buffer.length} bytes).`,
    );

    return this.cloudinaryService.uploadImage(file);
  }
}
