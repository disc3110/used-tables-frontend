import BackendUnavailableNotice from "@/components/admin/BackendUnavailableNotice";
import { isBackendUnavailableError } from "@/lib/backend-error";
import {
  getProtectedAdminContactInquiries,
  getProtectedAdminProducts,
  getProtectedAdminProfile,
  getProtectedAdminProductInquiries,
  getProtectedAdminSales,
  getProtectedAdminSellRequests,
} from "@/lib/server-api";

export default async function DashboardPage() {
  let dashboardData;

  try {
    dashboardData = await Promise.all([
      getProtectedAdminProfile(),
      getProtectedAdminProducts(),
      getProtectedAdminProductInquiries(),
      getProtectedAdminContactInquiries(),
      getProtectedAdminSellRequests(),
      getProtectedAdminSales(),
    ]);
  } catch (error) {
    if (!isBackendUnavailableError(error)) {
      throw error;
    }

    return (
      <div className="admin-page">
        <section className="admin-card admin-card-pad">
          <p className="admin-eyebrow">Overview</p>
          <h1 className="admin-title">Admin Dashboard</h1>
        </section>
        <BackendUnavailableNotice />
      </div>
    );
  }

  const [profile, products, productInquiries, contactInquiries, sellRequests, sales] =
    dashboardData;

  const recentInquiries = [
    ...productInquiries.data.map((item) => ({
      id: `product-${item.id}`,
      title: item.fullName,
      meta: [
        "Product question",
        item.email,
        item.phone,
        `Product: ${item.productSlug}`,
      ],
      message: item.message,
      createdAt: item.createdAt,
    })),
    ...contactInquiries.data.map((item) => ({
      id: `contact-${item.id}`,
      title: item.fullName,
      meta: ["Contact message", item.email, item.phone ?? "No phone provided"],
      message: item.message,
      createdAt: item.createdAt,
    })),
    ...sellRequests.data.map((item) => ({
      id: `sell-${item.id}`,
      title: item.fullName,
      meta: ["Sell request", item.email, item.phone],
      message: item.message,
      createdAt: item.createdAt,
    })),
  ]
    .sort(
      (left, right) =>
        new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="admin-page">
      <section className="admin-card admin-card-pad">
        <div className="admin-header">
          <div>
            <p className="admin-eyebrow">Overview</p>
            <h1 className="admin-title">Admin Dashboard</h1>
            <p className="meta" style={{ marginTop: 12 }}>
              Signed in as {profile.email} · {profile.role}
            </p>
          </div>
        </div>
      </section>

      <section className="admin-grid three">
        <article className="admin-card admin-card-pad">
          <p className="metric-label">Products</p>
          <p className="metric-value">{products.data.length}</p>
        </article>
        <article className="admin-card admin-card-pad">
          <p className="metric-label">Sales</p>
          <p className="metric-value">{sales.data.length}</p>
        </article>
        <article className="admin-card admin-card-pad">
          <p className="metric-label">Inquiries</p>
          <p className="metric-value">
            {productInquiries.data.length +
              contactInquiries.data.length +
              sellRequests.data.length}
          </p>
        </article>
      </section>

      <section className="admin-card admin-card-pad">
        <p className="admin-eyebrow">Latest Activity</p>
        <h2 className="admin-title" style={{ fontSize: "2.3rem" }}>
          Recent Inquiries
        </h2>

        <div className="stack" style={{ marginTop: 24 }}>
          {recentInquiries.length === 0 ? (
            <div className="list-card">
              <p className="meta">No inquiries yet.</p>
            </div>
          ) : (
            recentInquiries.map((inquiry) => (
              <article key={inquiry.id} className="list-card">
                <h3>{inquiry.title}</h3>
                <div className="meta">
                  {inquiry.meta.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
                {inquiry.message ? (
                  <p style={{ marginTop: 14, lineHeight: 1.8 }}>
                    {inquiry.message}
                  </p>
                ) : null}
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
