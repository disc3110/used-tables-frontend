import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

type UploadResult = {
  secure_url: string;
  public_id: string;
  asset_id: string;
  width?: number;
  height?: number;
  format?: string;
};

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {}

  async uploadImage(file: {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
  }) {
    const cloudName = this.configService.getOrThrow<string>("CLOUDINARY_CLOUD_NAME");
    const apiKey = this.configService.getOrThrow<string>("CLOUDINARY_API_KEY");
    const apiSecret = this.configService.getOrThrow<string>("CLOUDINARY_API_SECRET");
    const folder = this.configService.get<string>(
      "CLOUDINARY_FOLDER",
      "used-billiard-store",
    );

    const body = new FormData();
    const dataUri = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

    body.append("file", dataUri);
    body.append("folder", folder);
    body.append("resource_type", "image");
    body.append("use_filename", "true");
    body.append("unique_filename", "true");
    body.append("filename_override", file.originalname);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`,
        },
        body,
      },
    );

    if (!response.ok) {
      const payload = await response.text();
      throw new Error(`Cloudinary upload failed: ${payload}`);
    }

    const result = (await response.json()) as UploadResult;

    return {
      url: result.secure_url,
      publicId: result.public_id,
      assetId: result.asset_id,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  }
}
