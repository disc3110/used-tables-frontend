import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Stripe = require("stripe");

@Injectable()
export class StripeService {
  readonly client: InstanceType<typeof Stripe>;

  constructor(private readonly configService: ConfigService) {
    this.client = new Stripe(
      this.configService.getOrThrow<string>("STRIPE_SECRET_KEY"),
    );
  }
}
