import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";
import { StripeService } from "../stripe/stripe.service";

// Shorthand types derived from the Stripe client so we stay type-safe without
// importing the namespace directly (which conflicts with CommonJS exports).
type StripeCheckoutSession = Awaited<
  ReturnType<InstanceType<typeof import("stripe")>["checkout"]["sessions"]["retrieve"]>
>;
type StripePaymentIntent = Awaited<
  ReturnType<InstanceType<typeof import("stripe")>["paymentIntents"]["retrieve"]>
>;
type StripeCharge = Awaited<
  ReturnType<InstanceType<typeof import("stripe")>["charges"]["retrieve"]>
>;

function generateOrderNumber(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = Math.random().toString(16).slice(2, 8).toUpperCase();
  return `ORD-${date}-${suffix}`;
}

@Injectable()
export class CheckoutService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stripe: StripeService,
    private readonly configService: ConfigService,
  ) {}

  async createSession(productSlug: string, quantity = 1) {
    const product = await this.prisma.product.findUnique({
      where: { slug: productSlug },
      select: {
        id: true,
        sku: true,
        slug: true,
        name: true,
        startingPrice: true,
        quantity: true,
        available: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product "${productSlug}" was not found.`);
    }

    if (!product.available || product.quantity < quantity) {
      throw new BadRequestException("This product is no longer available.");
    }

    const unitPriceCents = product.startingPrice * 100;
    const totalCents = unitPriceCents * quantity;
    const storefrontUrl = this.configService.getOrThrow<string>("FRONTEND_URL");

    const order = await this.prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        subtotalCents: totalCents,
        totalCents,
        items: {
          create: [
            {
              productId: product.id,
              productName: product.name,
              sku: product.sku,
              quantity,
              unitPriceCents,
              totalCents,
            },
          ],
        },
      },
    });

    const session = await this.stripe.client.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: product.name,
              description: `SKU: ${product.sku}`,
            },
            unit_amount: unitPriceCents,
          },
          quantity,
        },
      ],
      success_url: `${storefrontUrl}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${storefrontUrl}/products/${product.slug}`,
      phone_number_collection: { enabled: true },
      billing_address_collection: "required",
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        productId: product.id,
      },
      client_reference_id: order.id,
    });

    await this.prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return { url: session.url! };
  }

  async findBySessionId(sessionId: string) {
    const order = await this.prisma.order.findUnique({
      where: { stripeSessionId: sessionId },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException("Order not found.");
    }

    return order;
  }

  async handleWebhook(rawBody: Buffer, signature: string) {
    let event: ReturnType<typeof this.stripe.client.webhooks.constructEvent>;

    try {
      event = this.stripe.client.webhooks.constructEvent(
        rawBody,
        signature,
        this.configService.getOrThrow<string>("STRIPE_WEBHOOK_SECRET"),
      );
    } catch {
      throw new BadRequestException("Invalid Stripe webhook signature.");
    }

    switch (event.type) {
      case "checkout.session.completed":
        await this.handleCheckoutCompleted(
          event.data.object as StripeCheckoutSession,
        );
        break;
      case "checkout.session.expired":
        await this.handleCheckoutExpired(
          event.data.object as StripeCheckoutSession,
        );
        break;
      case "payment_intent.payment_failed":
        await this.handlePaymentFailed(
          event.data.object as StripePaymentIntent,
        );
        break;
      case "charge.refunded":
        await this.handleChargeRefunded(event.data.object as StripeCharge);
        break;
    }

    return { received: true };
  }

  private async handleCheckoutCompleted(session: StripeCheckoutSession) {
    const orderId =
      session.metadata?.orderId ?? session.client_reference_id ?? null;

    if (!orderId) return;

    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) return;
    if (order.paymentStatus === "PAID") return; // idempotency guard

    const customer = session.customer_details;
    // Billing address is on customer_details.address when billing_address_collection is enabled
    const billing = customer?.address ?? null;
    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : (session.payment_intent?.id ?? null);

    await this.prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: orderId },
        data: {
          status: "PAID",
          paymentStatus: "PAID",
          stripePaymentIntentId: paymentIntentId,
          customerEmail: customer?.email ?? null,
          customerPhone: customer?.phone ?? null,
          customerName: customer?.name ?? null,
          shippingName: customer?.name ?? null,
          shippingLine1: billing?.line1 ?? null,
          shippingLine2: billing?.line2 ?? null,
          shippingCity: billing?.city ?? null,
          shippingProvince: billing?.state ?? null,
          shippingPostalCode: billing?.postal_code ?? null,
          shippingCountry: billing?.country ?? null,
          paidAt: new Date(),
        },
      });

      for (const item of order.items) {
        if (!item.productId) continue;

        await tx.product.updateMany({
          where: { id: item.productId, quantity: { gt: 0 } },
          data: { quantity: { decrement: item.quantity } },
        });

        const updated = await tx.product.findUnique({
          where: { id: item.productId },
          select: { quantity: true, available: true },
        });

        if (updated && updated.quantity <= 0 && updated.available) {
          await tx.product.update({
            where: { id: item.productId },
            data: { available: false },
          });
        }
      }
    });
  }

  private async handleCheckoutExpired(session: StripeCheckoutSession) {
    const orderId =
      session.metadata?.orderId ?? session.client_reference_id ?? null;

    if (!orderId) return;

    await this.prisma.order.updateMany({
      where: { id: orderId, status: "PENDING" },
      data: { status: "CANCELLED" },
    });
  }

  private async handlePaymentFailed(intent: StripePaymentIntent) {
    await this.prisma.order.updateMany({
      where: { stripePaymentIntentId: intent.id, paymentStatus: "UNPAID" },
      data: { paymentStatus: "FAILED" },
    });
  }

  private async handleChargeRefunded(charge: StripeCharge) {
    const intentId =
      typeof charge.payment_intent === "string"
        ? charge.payment_intent
        : (charge.payment_intent?.id ?? null);

    if (!intentId) return;

    await this.prisma.order.updateMany({
      where: { stripePaymentIntentId: intentId },
      data: { status: "REFUNDED", paymentStatus: "REFUNDED" },
    });
  }
}
