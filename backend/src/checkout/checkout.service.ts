import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailService } from "../mail/mail.service";
import { purchaseConfirmationCustomer, purchaseInternal } from "../mail/mail.templates";
import { PrismaService } from "../prisma/prisma.service";
import { StripeService } from "../stripe/stripe.service";

const SALES_EMAIL = "sales@usedpooltablesvancouver.com";

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
type StripeWebhookEvent = ReturnType<
  InstanceType<typeof import("stripe")>["webhooks"]["constructEvent"]
>;

function generateOrderNumber(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = Math.random().toString(16).slice(2, 8).toUpperCase();
  return `ORD-${date}-${suffix}`;
}

@Injectable()
export class CheckoutService {
  private readonly logger = new Logger(CheckoutService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly stripe: StripeService,
    private readonly configService: ConfigService,
    private readonly mail: MailService,
  ) {}

  async createSession(productSlug: string, quantity = 1, accessoryPackage: "standard" | "gold" = "standard") {
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
    const productTotalCents = unitPriceCents * quantity;
    const upgradeAmountCents = accessoryPackage === "gold" ? 22500 : 0;
    const subtotalCents = productTotalCents + upgradeAmountCents;
    // BC taxes: GST 5% + PST 7% = 12%. Calculated manually until Stripe Tax is configured.
    const taxCents = Math.round(subtotalCents * 0.12);
    const totalCents = subtotalCents + taxCents;
    const storefrontUrl = this.configService.getOrThrow<string>("FRONTEND_URL");

    const order = await this.prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        subtotalCents,
        taxCents,
        totalCents,
        items: {
          create: [
            {
              productId: product.id,
              productName: product.name,
              sku: product.sku,
              quantity,
              unitPriceCents,
              totalCents: productTotalCents,
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
        ...(accessoryPackage === "gold"
          ? [
              {
                price_data: {
                  currency: "cad",
                  product_data: {
                    name: "Gold Accessory Package",
                    description: "Premium accessory upgrade for your pool table",
                  },
                  unit_amount: 22500,
                },
                quantity: 1 as const,
              },
            ]
          : []),
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: "BC Taxes (GST 5% + PST 7%)",
              description: "British Columbia Goods & Services Tax and Provincial Sales Tax",
            },
            unit_amount: taxCents,
          },
          quantity: 1 as const,
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

  async handleWebhook(rawBody: Buffer | undefined, signature: string | undefined) {
    if (!rawBody?.length) {
      this.logger.warn("Stripe webhook rejected: missing raw request body.");
      throw new BadRequestException("Missing Stripe webhook body.");
    }

    if (!signature) {
      this.logger.warn("Stripe webhook rejected: missing Stripe-Signature header.");
      throw new BadRequestException("Missing Stripe webhook signature.");
    }

    let event: StripeWebhookEvent;

    try {
      event = this.stripe.client.webhooks.constructEvent(
        rawBody,
        signature,
        this.configService.getOrThrow<string>("STRIPE_WEBHOOK_SECRET"),
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown verification error";
      this.logger.warn(`Stripe webhook rejected: ${message}`);
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

    // Fire-and-forget emails — don't let a mail failure affect the webhook response
    const productName = order.items[0]?.productName ?? "Pool Table";
    const customerName = customer?.name ?? "Customer";
    const customerEmail = customer?.email ?? null;

    void this.mail.send({
      to: SALES_EMAIL,
      subject: `New Order — ${order.orderNumber} — ${productName}`,
      html: purchaseInternal({
        orderNumber: order.orderNumber,
        productName,
        subtotalCents: order.subtotalCents,
        taxCents: order.taxCents,
        totalCents: order.totalCents,
        customerName,
        customerEmail,
        customerPhone: customer?.phone ?? null,
        shippingCity: billing?.city ?? null,
        shippingProvince: billing?.state ?? null,
      }),
    });

    if (customerEmail) {
      void this.mail.send({
        to: customerEmail,
        subject: `Your order is confirmed — ${productName}`,
        html: purchaseConfirmationCustomer({
          orderNumber: order.orderNumber,
          customerName,
          productName,
          totalCents: order.totalCents,
        }),
      });
    }
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
