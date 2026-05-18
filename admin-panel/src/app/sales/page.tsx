import BackendUnavailableNotice from "@/components/admin/BackendUnavailableNotice";
import { isBackendUnavailableError } from "@/lib/backend-error";
import { getProtectedAdminSales } from "@/lib/server-api";

type SalesRange = "day" | "week" | "month" | "all" | "custom";

interface SalesPageProps {
  searchParams: Promise<{
    range?: SalesRange;
    from?: string;
    to?: string;
  }>;
}

const rangeFilters: { label: string; value: SalesRange }[] = [
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "All", value: "all" },
];

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(value);
}

function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function endOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(23, 59, 59, 999);
  return next;
}

function startOfRange(range: SalesRange, now: Date) {
  const start = startOfDay(now);

  if (range === "week") {
    start.setDate(start.getDate() - 6);
  }

  if (range === "month") {
    start.setDate(start.getDate() - 29);
  }

  return start;
}

function getSalesFilters(params: {
  range?: SalesRange;
  from?: string;
  to?: string;
}) {
  const validRange = rangeFilters.some((filter) => filter.value === params.range)
    ? params.range
    : undefined;
  const range = params.from || params.to ? "custom" : (validRange ?? "month");
  const now = new Date();

  if (range === "all") {
    return {
      activeRange: range,
      fromInput: "",
      toInput: "",
      label: "All sales",
    };
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
      label:
        fromInput || toInput
          ? `${fromInput || "Start"} to ${toInput || "Today"}`
          : "Custom range",
    };
  }

  const from = startOfRange(range, now);
  const to = endOfDay(now);

  return {
    activeRange: range,
    from: from.toISOString(),
    to: to.toISOString(),
    fromInput: toDateInputValue(from),
    toInput: toDateInputValue(to),
    label:
      range === "day"
        ? "Today"
        : range === "week"
          ? "Last 7 days"
          : "Last 30 days",
  };
}

export default async function SalesPage({ searchParams }: SalesPageProps) {
  const params = await searchParams;
  const filters = getSalesFilters(params);
  let sales;

  try {
    sales = await getProtectedAdminSales({
      from: filters.from,
      to: filters.to,
    });
  } catch (error) {
    if (!isBackendUnavailableError(error)) {
      throw error;
    }

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
  const totalRevenue = sales.data.reduce(
    (sum, sale) => sum + sale.unitPrice * sale.quantity,
    0,
  );
  const totalItems = sales.data.reduce((sum, sale) => sum + sale.quantity, 0);

  return (
    <div className="admin-page">
      <section className="admin-card admin-card-pad">
        <div className="admin-header">
          <div>
            <p className="admin-eyebrow">Sales</p>
            <h1 className="admin-title">Online Sales</h1>
            <p className="admin-subtitle">
              Buy Now activity is tracked here. Stripe payments can later write
              to the same sales history from webhook events.
            </p>
          </div>
        </div>

        <div className="filter-row" style={{ marginTop: 24 }}>
          {rangeFilters.map((filter) => (
            <a
              key={filter.value}
              href={`/sales?range=${filter.value}`}
              className={`filter-link ${
                filters.activeRange === filter.value ? "is-active" : ""
              }`}
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
          <p className="metric-label">Sales</p>
          <p className="metric-value">{sales.data.length}</p>
        </article>
        <article className="admin-card admin-card-pad">
          <p className="metric-label">Items Sold</p>
          <p className="metric-value">{totalItems}</p>
        </article>
        <article className="admin-card admin-card-pad">
          <p className="metric-label">Revenue</p>
          <p className="metric-value">{formatMoney(totalRevenue)}</p>
        </article>
      </section>

      <section className="admin-card admin-card-pad">
        <p className="admin-eyebrow">History</p>
        <h2 className="admin-title" style={{ fontSize: "2.3rem" }}>
          Recent Sales
        </h2>
        <p className="meta" style={{ marginTop: 10 }}>
          Showing {filters.label}
        </p>

        <div className="table-wrap" style={{ marginTop: 24 }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {sales.data.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <p className="meta">No sales yet.</p>
                  </td>
                </tr>
              ) : (
                sales.data.map((sale) => (
                  <tr key={sale.id}>
                    <td>
                      <strong>{sale.productName}</strong>
                      <div className="meta">{sale.productSlug}</div>
                    </td>
                    <td>{sale.sku}</td>
                    <td>{formatMoney(sale.unitPrice)}</td>
                    <td>{sale.quantity}</td>
                    <td>
                      <span className="badge">{sale.status}</span>
                    </td>
                    <td>{new Date(sale.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
