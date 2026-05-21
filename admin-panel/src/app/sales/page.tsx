import BackendUnavailableNotice from "@/components/admin/BackendUnavailableNotice";
import { isBackendUnavailableError } from "@/lib/backend-error";
import { getProtectedAdminOrders } from "@/lib/server-api";
import type { AdminOrder, AdminPaymentStatus } from "@/lib/types";
import Link from "next/link";

type SalesRange = "day" | "week" | "month" | "all" | "custom";

interface SalesPageProps {
  searchParams: Promise<{
    range?: SalesRange;
    from?: string;
    to?: string;
    order?: string;
  }>;
}

const rangeFilters: { label: string; value: SalesRange }[] = [
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "All", value: "all" },
];

function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

function getSalesFilters(params: {
  range?: SalesRange;
  from?: string;
  to?: string;
}) {
  const validRange = rangeFilters.some((f) => f.value === params.range)
    ? params.range
    : undefined;
  const range = params.from || params.to ? "custom" : (validRange ?? "month");
  const now = new Date();

  if (range === "all") {
    return { activeRange: range, fromInput: "", toInput: "", label: "All orders" };
  }

  if (range === "custom") {
    const fromInput = params.from ?? "";
    const toInput = params.to ?? "";
    return {
      activeRange: range,
      from: fromInput ? startOfDay(new Date(`${fromInput}T00:00:00`)).toISOString() : undefined,
      to: toInput ? endOfDay(new Date(`${toInput}T00:00:00`)).toISOString() : undefined,
      fromInput,
      toInput,
      label: fromInput || toInput ? `${fromInput || "Start"} to ${toInput || "Today"}` : "Custom range",
    };
  }

  const start = startOfDay(now);
  if (range === "week") start.setDate(start.getDate() - 6);
  if (range === "month") start.setDate(start.getDate() - 29);
  const end = endOfDay(now);

  return {
    activeRange: range,
    from: start.toISOString(),
    to: end.toISOString(),
    fromInput: toDateInputValue(start),
    toInput: toDateInputValue(end),
    label: range === "day" ? "Today" : range === "week" ? "Last 7 days" : "Last 30 days",
  };
}

const paymentBadgeStyle: Record<AdminPaymentStatus, string> = {
  PAID: "color: #2d7a2d",
  UNPAID: "color: #a46f24",
  FAILED: "color: #c0392b",
  REFUNDED: "color: #555",
};

function shippingOneLiner(order: AdminOrder) {
  return [
    order.shippingLine1,
    order.shippingCity,
    order.shippingProvince,
    order.shippingPostalCode,
    order.shippingCountry,
  ]
    .filter(Boolean)
    .join(", ");
}

export default async function SalesPage({ searchParams }: SalesPageProps) {
  const params = await searchParams;
  const filters = getSalesFilters(params);
  const expandedOrderId = params.order ?? null;

  let ordersResult: { data: AdminOrder[] };

  try {
    ordersResult = await getProtectedAdminOrders({
      from: filters.from,
      to: filters.to,
    });
  } catch (error) {
    if (!isBackendUnavailableError(error)) throw error;

    return (
      <div className="admin-page">
        <section className="admin-card admin-card-pad">
          <p className="admin-eyebrow">Sales</p>
          <h1 className="admin-title">Online Sales</h1>
        </section>
        <BackendUnavailableNotice />
      </div>
    );
  }

  const orders = ordersResult.data;
  const paidOrders = orders.filter((o) => o.paymentStatus === "PAID");
  const totalRevenueCents = paidOrders.reduce((sum, o) => sum + o.totalCents, 0);
  const totalItems = paidOrders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0),
    0,
  );

  return (
    <div className="admin-page">
      <section className="admin-card admin-card-pad">
        <div className="admin-header">
          <div>
            <p className="admin-eyebrow">Sales</p>
            <h1 className="admin-title">Online Sales</h1>
            <p className="admin-subtitle">Stripe checkout orders. Metrics count paid orders only.</p>
          </div>
        </div>

        <div className="filter-row" style={{ marginTop: 24 }}>
          {rangeFilters.map((filter) => (
            <a
              key={filter.value}
              href={`/sales?range=${filter.value}`}
              className={`filter-link ${filters.activeRange === filter.value ? "is-active" : ""}`}
            >
              {filter.label}
            </a>
          ))}
        </div>

        <form className="date-filter-form" action="/sales" style={{ marginTop: 18 }}>
          <input type="hidden" name="range" value="custom" />
          <label>
            From
            <input type="date" name="from" defaultValue={filters.fromInput} />
          </label>
          <label>
            To
            <input type="date" name="to" defaultValue={filters.toInput} />
          </label>
          <button className="button-secondary" type="submit">
            Apply Range
          </button>
        </form>
      </section>

      <section className="admin-grid three">
        <article className="admin-card admin-card-pad">
          <p className="metric-label">Paid Orders</p>
          <p className="metric-value">{paidOrders.length}</p>
        </article>
        <article className="admin-card admin-card-pad">
          <p className="metric-label">Items Sold</p>
          <p className="metric-value">{totalItems}</p>
        </article>
        <article className="admin-card admin-card-pad">
          <p className="metric-label">Revenue</p>
          <p className="metric-value">{formatMoney(totalRevenueCents)}</p>
        </article>
      </section>

      <section className="admin-card admin-card-pad">
        <p className="admin-eyebrow">History</p>
        <h2 className="admin-title" style={{ fontSize: "2.3rem" }}>
          Orders
        </h2>
        <p className="meta" style={{ marginTop: 10 }}>Showing {filters.label}</p>

        <div className="table-wrap" style={{ marginTop: 24 }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <p className="meta">No orders yet.</p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const isExpanded = expandedOrderId === order.id;
                  const firstItem = order.items[0];
                  const shipping = shippingOneLiner(order);

                  return (
                    <>
                      <tr key={order.id}>
                        <td>
                          <strong style={{ fontFamily: "monospace", fontSize: "0.85rem" }}>
                            {order.orderNumber}
                          </strong>
                        </td>
                        <td>
                          <div>{order.customerName ?? "—"}</div>
                          <div className="meta">{order.customerEmail ?? ""}</div>
                        </td>
                        <td>
                          {firstItem ? (
                            <>
                              <strong>{firstItem.productName}</strong>
                              <div className="meta">{firstItem.sku}</div>
                            </>
                          ) : "—"}
                        </td>
                        <td>{formatMoney(order.totalCents)}</td>
                        <td>
                          <span
                            className="badge"
                            style={{ ...(paymentBadgeStyle[order.paymentStatus] ? { color: paymentBadgeStyle[order.paymentStatus].replace("color: ", "") } : {}) }}
                          >
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td>
                          <span className="badge">{order.status}</span>
                        </td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>
                          <Link
                            href={`/sales?order=${isExpanded ? "" : order.id}&range=${filters.activeRange}`}
                            className="button-secondary"
                            style={{ fontSize: "0.75rem", padding: "4px 10px" }}
                          >
                            {isExpanded ? "Hide" : "Details"}
                          </Link>
                        </td>
                      </tr>

                      {isExpanded ? (
                        <tr key={`${order.id}-detail`}>
                          <td colSpan={8}>
                            <div style={{ padding: "12px 4px 16px", display: "grid", gap: 8 }}>
                              {order.customerPhone ? (
                                <div className="meta">
                                  <strong>Phone:</strong> {order.customerPhone}
                                </div>
                              ) : null}

                              {shipping ? (
                                <div className="meta">
                                  <strong>Ship to:</strong>{" "}
                                  {order.shippingName ? `${order.shippingName} — ` : ""}
                                  {shipping}
                                </div>
                              ) : null}

                              <div className="meta">
                                <strong>Items:</strong>{" "}
                                {order.items
                                  .map((i) => `${i.productName} × ${i.quantity} (${formatMoney(i.unitPriceCents)} ea)`)
                                  .join(", ")}
                              </div>

                              {order.stripeSessionId ? (
                                <div className="meta">
                                  <strong>Stripe session:</strong>{" "}
                                  <span style={{ fontFamily: "monospace", fontSize: "0.8rem" }}>
                                    {order.stripeSessionId}
                                  </span>
                                </div>
                              ) : null}

                              {order.stripePaymentIntentId ? (
                                <div className="meta">
                                  <strong>Payment intent:</strong>{" "}
                                  <span style={{ fontFamily: "monospace", fontSize: "0.8rem" }}>
                                    {order.stripePaymentIntentId}
                                  </span>
                                </div>
                              ) : null}

                              {order.paidAt ? (
                                <div className="meta">
                                  <strong>Paid at:</strong>{" "}
                                  {new Date(order.paidAt).toLocaleString()}
                                </div>
                              ) : null}
                            </div>
                          </td>
                        </tr>
                      ) : null}
                    </>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
