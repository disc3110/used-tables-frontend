import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateContactInquiryDto } from "./dto/create-contact-inquiry.dto";
import { CreateQuoteRequestDto } from "./dto/create-quote-request.dto";
import { CreateSellRequestDto } from "./dto/create-sell-request.dto";
import type { InquiryStatus, InquiryType } from "./inquiry-status";

@Injectable()
export class InquiriesService {
  constructor(private readonly prisma: PrismaService) {}

  async createContactInquiry(payload: CreateContactInquiryDto) {
    const inquiry = await this.prisma.contactInquiry.create({
      data: payload,
    });

    return {
      id: inquiry.id,
      status: "received",
    };
  }

  async createQuoteRequest(payload: CreateQuoteRequestDto) {
    const inquiry = await this.prisma.quoteRequest.create({
      data: payload,
    });

    return {
      id: inquiry.id,
      status: "received",
    };
  }

  async createSellRequest(payload: CreateSellRequestDto) {
    const inquiry = await this.prisma.sellRequest.create({
      data: payload,
    });

    return {
      id: inquiry.id,
      status: "received",
    };
  }

  async findQuoteRequests(status?: InquiryStatus) {
    const data = await this.prisma.quoteRequest.findMany({
      where: status ? { status } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    return { data };
  }

  async findContactInquiries(status?: InquiryStatus) {
    const data = await this.prisma.contactInquiry.findMany({
      where: status ? { status } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    return { data };
  }

  async findSellRequests(status?: InquiryStatus) {
    const data = await this.prisma.sellRequest.findMany({
      where: status ? { status } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    return { data };
  }

  async updateInquiryStatus(type: InquiryType, id: string, status: InquiryStatus) {
    try {
      switch (type) {
        case "product-questions":
          return {
            data: await this.prisma.quoteRequest.update({
              where: { id },
              data: { status },
            }),
          };
        case "contact":
          return {
            data: await this.prisma.contactInquiry.update({
              where: { id },
              data: { status },
            }),
          };
        case "sell-requests":
          return {
            data: await this.prisma.sellRequest.update({
              where: { id },
              data: { status },
            }),
          };
      }
    } catch {
      throw new NotFoundException(`Inquiry "${id}" was not found.`);
    }
  }
}
