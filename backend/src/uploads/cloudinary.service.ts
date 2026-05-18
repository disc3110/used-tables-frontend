import { createHash } from "node:crypto";
import { BadGatewayException, Injectable, Logger } from "@nestjs/common";
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
  private readonly logger = new Logger(CloudinaryService.name);

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
    const uploadFolder = this.getProductsFolder(folder);
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const uploadParams = {
      filename_override: file.originalname,
      folder: uploadFolder,
      timestamp,
      unique_filename: "true",
      use_filename: "true",
    };
    const signature = this.signUploadParams(uploadParams, apiSecret);

    const body = new FormData();
    const dataUri = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

    body.append("file", dataUri);
    body.append("api_key", apiKey);
    body.append("signature", signature);
    Object.entries(uploadParams).forEach(([key, value]) => {
      body.append(key, value);
    });

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body,
      },
    );

    if (!response.ok) {
      const payload = await response.text();
      const message = this.getCloudinaryErrorMessage(payload);

      this.logger.error(
        `Cloudinary upload failed with status ${response.status}: ${message}`,
      );

      throw new BadGatewayException(
        `Cloudinary upload failed: ${message}. Check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, and upload permissions in Railway.`,
      );
    }

    const result = (await response.json()) as UploadResult;
    this.logger.log(
      `Uploaded product image to Cloudinary folder "${uploadFolder}" as "${result.public_id}".`,
    );

    return {
      url: result.secure_url,
      publicId: result.public_id,
      assetId: result.asset_id,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  }

  private getProductsFolder(folder: string) {
    const normalizedFolder = folder.replace(/^\/+|\/+$/g, "");

    return normalizedFolder.endsWith("/products")
      ? normalizedFolder
      : `${normalizedFolder}/products`;
  }

  private signUploadParams(
    params: Record<string, string>,
    apiSecret: string,
  ) {
    const payload = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    return createHash("sha1").update(`${payload}${apiSecret}`).digest("hex");
  }

  private getCloudinaryErrorMessage(payload: string) {
    try {
      const parsed = JSON.parse(payload) as { error?: { message?: string } };

      return parsed.error?.message ?? payload;
    } catch {
      return payload || "Unknown Cloudinary error";
    }
  }
}
