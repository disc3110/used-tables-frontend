import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  RawBodyRequest,
  Req,
  Headers,
} from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { Request } from "express";
import { CheckoutService } from "./checkout.service";
import { CreateCheckoutSessionDto } from "./dto/create-checkout-session.dto";

@ApiTags("checkout")
@Controller()
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post("checkout/create-session")
  @ApiOperation({ summary: "Create a Stripe Checkout session for a product." })
  @ApiCreatedResponse({ description: "Returns the Stripe hosted checkout URL." })
  createSession(@Body() body: CreateCheckoutSessionDto) {
    return this.checkoutService.createSession(body.productSlug, body.quantity ?? 1);
  }

  @Get("orders/by-session/:sessionId")
  @ApiOperation({ summary: "Retrieve an order by Stripe session ID." })
  @ApiOkResponse({ description: "Order returned." })
  findBySession(@Param("sessionId") sessionId: string) {
    return this.checkoutService.findBySessionId(sessionId);
  }

  @Post("stripe/webhook")
  @HttpCode(200)
  @ApiOperation({ summary: "Stripe webhook receiver." })
  handleWebhook(
    @Headers("stripe-signature") signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    return this.checkoutService.handleWebhook(req.rawBody!, signature);
  }
}
