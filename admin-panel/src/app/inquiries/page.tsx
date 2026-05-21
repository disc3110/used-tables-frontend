import BackendUnavailableNotice from "@/components/admin/BackendUnavailableNotice";
import InquiryList from "@/components/admin/InquiryList";
import Link from "next/link";
import { isBackendUnavailableError } from "@/lib/backend-error";
import {
  getProtectedAdminContactInquiries,
  getProtectedAdminProductInquiries,
  getProtectedAdminSellRequests,
} from "@/lib/server-api";
import type {
  AdminContactInquiry,
  AdminProductInquiry,
  AdminSellRequest,
  AdminSellRequestImage,
  InquiryStatus,
} from "@/lib/types";

interface InquiriesPageProps {
  searchParams: Promise<{
    status?: InquiryStatus;
  }>;
}

const statusFilters: { label: string; value: InquiryStatus }[] = [
  { label: "New", value: "new" },
  { label: "Read", value: "read" },
  { label: "Pending", value: "pending" },
  { label: "Done", value: "done" },
];

function buildProductInquiryMailtoHref(inquiry: AdminProductInquiry) {
  const subject = `Re: ${inquiry.productSlug}`;
  const bodyLines = [
    `Hi ${inquiry.fullName},`,
    "",
    "Thanks for your question about this product.",
    "",
    `Product: ${inquiry.productSlug}`,
    `Cloth color: ${inquiry.clothColor ?? "Not selected"}`,
    `Accessory package: ${inquiry.accessoryPackage}`,
    `Metro Vancouver installation/delivery: ${
      inquiry.wantsMetroVancouverInstallDelivery ? "Yes" : "No"
    }`,
    "",
    "We'll review the details and follow up shortly.",
    "",
    "Best,",
    "Used Billiard Store",
  ];

  return `mailto:${encodeURIComponent(inquiry.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
}

function buildContactMailtoHref(inquiry: AdminContactInquiry) {
  const subject = `Re: ${inquiry.subject}`;
  const bodyLines = [
    `Hi ${inquiry.fullName},`,
    "",
    "Thanks for reaching out to Used Billiard Store.",
    "",
    "We're reviewing your message and will get back to you shortly.",
    "",
    "Best,",
    "Used Billiard Store",
  ];

  return `mailto:${encodeURIComponent(inquiry.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
}

function buildSellRequestMailtoHref(inquiry: AdminSellRequest) {
  const itemType = inquiry.itemType?.trim() || "your table";
  const subject = `Re: Selling ${itemType}`;
  const bodyLines = [
    `Hi ${inquiry.fullName},`,
    "",
    `Thanks for contacting Used Billiard Store about selling ${itemType}.`,
    "",
    "We'd be happy to review the details and follow up with next steps.",
    "",
    "Best,",
    "Used Billiard Store",
  ];

  return `mailto:${encodeURIComponent(inquiry.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
}

function SellRequestImageGallery({ images }: { images: AdminSellRequestImage[] }) {
  if (!images.length) {
    return (
      <p className="meta" style={{ marginTop: 14 }}>
        No photos attached.
      </p>
    );
  }

  return (
    <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
      {images.map((image) => (
        <a
          key={image.id}
          href={image.url}
          target="_blank"
          rel="noopener noreferrer"
          title={image.originalFilename ?? "View full image"}
          style={{
            display: "block",
            borderRadius: 10,
            overflow: "hidden",
            border: "1px solid #e0d3c2",
            flexShrink: 0,
          }}
        >
          <img
            src={image.url}
            alt={image.originalFilename ?? "Sell request photo"}
            width={96}
            height={96}
            style={{ width: 96, height: 96, objectFit: "cover", display: "block" }}
          />
        </a>
      ))}
    </div>
  );
}

export default async function InquiriesPage({ searchParams }: InquiriesPageProps) {
  const params = await searchParams;
  const activeStatus: InquiryStatus = statusFilters.some(
    (filter) => filter.value === params.status,
  )
    ? (params.status as InquiryStatus)
    : "new";
  let inquiryData;

  try {
    inquiryData = await Promise.all([
      getProtectedAdminProductInquiries(activeStatus),
      getProtectedAdminContactInquiries(activeStatus),
      getProtectedAdminSellRequests(activeStatus),
    ]);
  } catch (error) {
    if (!isBackendUnavailableError(error)) {
      throw error;
    }

    return (
      <div className="admin-page">
        <section className="admin-card admin-card-pad">
          <p className="admin-eyebrow">Inbox</p>
          <h1 className="admin-title">Inquiries</h1>
        </section>
        <BackendUnavailableNotice />
      </div>
    );
  }

  const [productInquiries, contactInquiries, sellRequests] = inquiryData;

  return (
    <div className="admin-page">
      <section className="admin-card admin-card-pad">
        <div className="admin-header">
          <div>
            <p className="admin-eyebrow">Inbox</p>
            <h1 className="admin-title">Inquiries</h1>
            <p className="admin-subtitle">
              Showing {activeStatus} inquiries by default. Use the filters to
              review older work.
            </p>
          </div>
        </div>

        <div className="filter-row" style={{ marginTop: 24 }}>
          {statusFilters.map((filter) => (
            <Link
              key={filter.value}
              href={`/inquiries?status=${filter.value}`}
              className={`filter-link ${
                activeStatus === filter.value ? "is-active" : ""
              }`}
            >
              {filter.label}
            </Link>
          ))}
        </div>
      </section>

      <InquiryList
        title="Product Questions"
        eyebrow="Storefront"
        items={productInquiries.data}
        inquiryType="product-questions"
        renderMeta={(item) => {
          const inquiry = item as AdminProductInquiry;

          return [
            inquiry.email,
            inquiry.phone,
            `Product: ${inquiry.productSlug}`,
            inquiry.clothColor
              ? `Cloth: ${inquiry.clothColor} · Package: ${inquiry.accessoryPackage}`
              : `Package: ${inquiry.accessoryPackage}`,
            `Metro Vancouver install/delivery: ${
              inquiry.wantsMetroVancouverInstallDelivery ? "Yes" : "No"
            }`,
            new Date(inquiry.createdAt).toLocaleString(),
          ];
        }}
        renderBody={(item) => (item as AdminProductInquiry).message}
        getReplyHref={(item) =>
          buildProductInquiryMailtoHref(item as AdminProductInquiry)
        }
        replyLabel="Reply to Question"
      />

      <InquiryList
        title="Contact Messages"
        eyebrow="Inbox"
        items={contactInquiries.data}
        inquiryType="contact"
        renderMeta={(item) => {
          const inquiry = item as AdminContactInquiry;

          return [
            inquiry.email,
            inquiry.phone ?? "No phone provided",
            `Subject: ${inquiry.subject}`,
            new Date(inquiry.createdAt).toLocaleString(),
          ];
        }}
        renderBody={(item) => (item as AdminContactInquiry).message}
        getReplyHref={(item) => buildContactMailtoHref(item as AdminContactInquiry)}
        replyLabel="Reply to Inquiry"
      />

      <InquiryList
        title="Sell Requests"
        eyebrow="Customer Leads"
        items={sellRequests.data}
        inquiryType="sell-requests"
        renderMeta={(item) => {
          const inquiry = item as AdminSellRequest;

          return [
            inquiry.email,
            inquiry.phone,
            `Item: ${inquiry.itemType ?? "Not specified"}`,
            `Location: ${inquiry.location ?? "Not provided"}`,
            new Date(inquiry.createdAt).toLocaleString(),
          ];
        }}
        renderBody={(item) => (item as AdminSellRequest).message}
        renderExtra={(item) => (
          <SellRequestImageGallery images={(item as AdminSellRequest).images} />
        )}
        getReplyHref={(item) => buildSellRequestMailtoHref(item as AdminSellRequest)}
        replyLabel="Reply to Sell Lead"
      />
    </div>
  );
}
