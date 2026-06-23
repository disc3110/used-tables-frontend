import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailService } from "../mail/mail.service";
import {
  contactInquiryInternal,
  quoteRequestInternal,
  sellRequestInternal,
} from "../mail/mail.templates";
import { PrismaService } from "../prisma/prisma.service";
import { CreateContactInquiryDto } from "./dto/create-contact-inquiry.dto";
import { CreateQuoteRequestDto } from "./dto/create-quote-request.dto";
import { CreateSellRequestDto } from "./dto/create-sell-request.dto";
import type { InquiryStatus, InquiryType } from "./inquiry-status";

const SALES_EMAIL = "sales@usedpooltablesvancouver.com";

@Injectable()
export class InquiriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
    private readonly config: ConfigService,
  ) {}

  async createContactInquiry(payload: CreateContactInquiryDto) {
    const inquiry = await this.prisma.contactInquiry.create({ data: payload });

    void this.mail.send({
      to: SALES_EMAIL,
      subject: `New Contact Message — ${payload.subject}`,
      html: contactInquiryInternal(payload),
    });

    return { id: inquiry.id, status: "received" };
  }

  async createQuoteRequest(payload: CreateQuoteRequestDto) {
    const inquiry = await this.prisma.quoteRequest.create({ data: payload });

    void this.mail.send({
      to: SALES_EMAIL,
      subject: `New Quote Request — ${payload.productSlug}`,
      html: quoteRequestInternal(payload),
    });

    return { id: inquiry.id, status: "received" };
  }

  async createSellRequest(payload: CreateSellRequestDto) {
    const { images, ...sellRequestData } = payload;

    const inquiry = await this.prisma.sellRequest.create({
      data: {
        ...sellRequestData,
        ...(images?.length
          ? {
              images: {
                create: images.map((image) => ({
                  url: image.url,
                  publicId: image.publicId,
                  width: image.width,
                  height: image.height,
                  originalFilename: image.originalFilename,
                })),
              },
            }
          : {}),
      },
    });

    void this.mail.send({
      to: SALES_EMAIL,
      subject: `New Sell Request — ${payload.itemType ?? payload.fullName}`,
      html: sellRequestInternal({
        ...payload,
        imageUrls: images?.map((i) => i.url) ?? [],
      }),
    });

    return { id: inquiry.id, status: "received" };
  }

  async findQuoteRequests(status?: InquiryStatus) {
    const data = await this.prisma.quoteRequest.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: "desc" },
    });
    return { data };
  }

  async findContactInquiries(status?: InquiryStatus) {
    const data = await this.prisma.contactInquiry.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: "desc" },
    });
    return { data };
  }

  async findSellRequests(status?: InquiryStatus) {
    const data = await this.prisma.sellRequest.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: "desc" },
      include: { images: { orderBy: { createdAt: "asc" } } },
    });
    return { data };
  }

  async updateInquiryStatus(type: InquiryType, id: string, status: InquiryStatus) {
    try {
      switch (type) {
        case "product-questions":
          return { data: await this.prisma.quoteRequest.update({ where: { id }, data: { status } }) };
        case "contact":
          return { data: await this.prisma.contactInquiry.update({ where: { id }, data: { status } }) };
        case "sell-requests":
          return { data: await this.prisma.sellRequest.update({ where: { id }, data: { status } }) };
      }
    } catch {
      throw new NotFoundException(`Inquiry "${id}" was not found.`);
    }
  }
}
