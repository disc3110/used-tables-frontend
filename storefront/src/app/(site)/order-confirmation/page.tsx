import Link from "next/link";

interface OrderConfirmationPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

type OrderStatus = "PENDING" | "PAID" | "FULFILLING" | "SHIPPED" | "CANCELLED" | "REFUNDED";
type PaymentStatus = "UNPAID" | "PAID" | "FAILED" | "REFUNDED";

interface OrderItem {
  id: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPriceCents: number;
  totalCents: number;
}

interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  customerEmail?: string | null;
  customerPhone?: string | null;
  customerName?: string | null;
  shippingName?: string | null;
  shippingLine1?: string | null;
  shippingLine2?: string | null;
  shippingCity?: string | null;
  shippingProvince?: string | null;
  shippingPostalCode?: string | null;
  shippingCountry?: string | null;
  totalCents: number;
  currency: string;
  paidAt?: string | null;
  items: OrderItem[];
}

const BACKEND_API_URL =
  process.env.BACKEND_API_URL?.replace(/\/$/, "") ?? "http://localhost:4000/api";

async function fetchOrder(sessionId: string): Promise<Order | null> {
  try {
    const response = await fetch(
      `${BACKEND_API_URL}/orders/by-session/${encodeURIComponent(sessionId)}`,
      { cache: "no-store" },
    );

    if (!response.ok) return null;

    return (await response.json()) as Order;
  } catch {
    return null;
  }
}

function formatMoney(cents: number, currency = "cad") {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function formatShipping(order: Order): string | null {
  const parts = [
    order.shippingLine1,
    order.shippingLine2,
    order.shippingCity,
    order.shippingProvince,
    order.shippingPostalCode,
    order.shippingCountry,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(", ") : null;
}

export default async function OrderConfirmationPage({
  searchParams,
}: OrderConfirmationPageProps) {
  const params = await searchParams;
  const sessionId = params.session_id;

  if (!sessionId) {
    return <ErrorView message="No order session found. If you completed a purchase, please contact us." />;
  }

  const order = await fetchOrder(sessionId);

  if (!order) {
    return (
      <ErrorView message="We couldn't find your order right now. If you just completed a payment, it may take a moment — please refresh this page." />
    );
  }

  const shippingAddress = formatShipping(order);
  const isPaid = order.paymentStatus === "PAID";

  return (
    <main className="bg-[#fbf7ef] px-6 py-20">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[#e3d5c1] bg-[#fffdfa] p-8 shadow-[0_22px_46px_rgba(47,35,22,0.08)] md:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#a46f24]">
          {isPaid ? "Order Confirmed" : "Order Received"}
        </p>
        <h1 className="mt-4 text-4xl leading-[1.02] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-5xl">
          {isPaid ? "Thanks, your payment went through." : "Thanks, we got your order."}
        </h1>
        <p className="mt-5 text-lg leading-8 text-[#4e5157]">
          Our team will contact you to confirm delivery and installation details.
        </p>

        <div className="mt-8 space-y-4">
          <DetailRow label="Order Number" value={order.orderNumber} mono />

          {order.items.map((item) => (
            <div
              key={item.id}
              className="rounded-[1.25rem] border border-[#ece2d4] bg-[#fcfaf6] p-5"
            >
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#a46f24]">
                Product
              </p>
              <p className="mt-2 text-xl font-semibold text-[#122233]">
                {item.productName}
              </p>
              <p className="mt-1 text-sm text-[#5d636c]">
                SKU: {item.sku} &nbsp;·&nbsp; Qty: {item.quantity}
              </p>
            </div>
          ))}

          <DetailRow
            label="Total Paid"
            value={formatMoney(order.totalCents, order.currency)}
          />

          {order.customerEmail ? (
            <DetailRow label="Email" value={order.customerEmail} />
          ) : null}

          {shippingAddress ? (
            <DetailRow label="Ship To" value={shippingAddress} />
          ) : null}

          {!isPaid ? (
            <div className="rounded-[1rem] border border-[#f1c269] bg-[#fffbf0] px-4 py-3 text-sm text-[#7a5a18]">
              Payment processing — if you completed payment, please refresh this page in a moment.
            </div>
          ) : null}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-[#f1c269] px-6 py-3.5 text-sm font-medium text-[#18212d] shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition hover:bg-[#f5ce82]"
          >
            Browse More Products
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-[#d9c7ae] px-6 py-3.5 text-sm font-medium text-[#132334] transition hover:border-[#c89f57] hover:text-[#8b611f]"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}

function DetailRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#f0e8dc] py-3 last:border-0">
      <span className="text-sm text-[#6b7280]">{label}</span>
      <span
        className={`text-right text-sm font-medium text-[#122233] ${mono ? "font-mono" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

function ErrorView({ message }: { message: string }) {
  return (
    <main className="bg-[#fbf7ef] px-6 py-20">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[#e3d5c1] bg-[#fffdfa] p-8 shadow-[0_22px_46px_rgba(47,35,22,0.08)] md:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#a46f24]">
          Order Lookup
        </p>
        <h1 className="mt-4 text-4xl leading-[1.02] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif]">
          Something went wrong.
        </h1>
        <p className="mt-5 text-lg leading-8 text-[#4e5157]">{message}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-[#f1c269] px-6 py-3.5 text-sm font-medium text-[#18212d] shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition hover:bg-[#f5ce82]"
          >
            Browse Products
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-[#d9c7ae] px-6 py-3.5 text-sm font-medium text-[#132334] transition hover:border-[#c89f57] hover:text-[#8b611f]"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
