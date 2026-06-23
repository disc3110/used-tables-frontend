import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

interface SendOptions {
  to: string | string[];
  subject: string;
  html: string;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly apiKey: string;
  private readonly from: string;

  constructor(private readonly config: ConfigService) {
    this.apiKey = this.config.getOrThrow<string>("RESEND_API_KEY");
    this.from = this.config.getOrThrow<string>("RESEND_FROM");
  }

  async send(options: SendOptions): Promise<void> {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: this.from,
          reply_to: "sales@usedpooltablesvancouver.com",
          to: Array.isArray(options.to) ? options.to : [options.to],
          subject: options.subject,
          html: options.html,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        this.logger.error(`Resend error ${res.status}: ${body}`);
      }
    } catch (err) {
      this.logger.error("Failed to send email", err);
    }
  }
}
