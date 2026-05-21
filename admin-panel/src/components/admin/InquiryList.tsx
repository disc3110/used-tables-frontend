import type React from "react";
import type {
  AdminContactInquiry,
  AdminProductInquiry,
  AdminSellRequest,
  InquiryType,
} from "@/lib/types";
import InquiryStatusControls from "./InquiryStatusControls";

type Inquiry =
  | AdminProductInquiry
  | AdminContactInquiry
  | AdminSellRequest;

interface InquiryListProps {
  title: string;
  eyebrow: string;
  items: Inquiry[];
  renderMeta: (item: Inquiry) => string[];
  renderBody: (item: Inquiry) => string | undefined | null;
  renderExtra?: (item: Inquiry) => React.ReactNode;
  getReplyHref?: (item: Inquiry) => string;
  replyLabel?: string;
  inquiryType: InquiryType;
}

export default function InquiryList({
  title,
  eyebrow,
  items,
  renderMeta,
  renderBody,
  renderExtra,
  getReplyHref,
  replyLabel = "Reply by Email",
  inquiryType,
}: InquiryListProps) {
  return (
    <section className="admin-card admin-card-pad">
      <p className="admin-eyebrow">{eyebrow}</p>
      <h2 className="admin-title" style={{ fontSize: "2.2rem" }}>
        {title}
      </h2>

      <div className="stack" style={{ marginTop: 24 }}>
        {items.length === 0 ? (
          <div className="list-card">
            <p className="meta">No items yet.</p>
          </div>
        ) : (
          items.map((item) => (
            <article key={item.id} className="list-card">
              <h3>{"productSlug" in item ? item.fullName : item.fullName}</h3>
              <div className="meta">
                {renderMeta(item).map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
              {renderBody(item) ? (
                <p style={{ marginTop: 14, lineHeight: 1.8 }}>{renderBody(item)}</p>
              ) : null}
              {renderExtra ? renderExtra(item) : null}
              {getReplyHref ? (
                <div className="admin-actions" style={{ marginTop: 18 }}>
                  <a
                    href={getReplyHref(item)}
                    className="button-secondary"
                  >
                    {replyLabel}
                  </a>
                  <InquiryStatusControls
                    id={item.id}
                    type={inquiryType}
                    currentStatus={item.status}
                  />
                </div>
              ) : null}
            </article>
          ))
        )}
      </div>
    </section>
  );
}
