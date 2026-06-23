function wrap(title: string, body: string) {
  return `<!DOCTYPE html><html><body style="font-family:sans-serif;color:#222;max-width:600px;margin:0 auto;padding:24px">
<h2 style="color:#1a3a2a;border-bottom:2px solid #c89f57;padding-bottom:8px">${title}</h2>
${body}
<p style="margin-top:32px;font-size:12px;color:#888">Used Pool Tables Vancouver — sales@usedpooltablesvancouver.com</p>
</body></html>`;
}

function row(label: string, value: string | undefined | null) {
  if (!value) return "";
  return `<tr><td style="padding:6px 12px 6px 0;font-weight:600;white-space:nowrap">${label}</td><td style="padding:6px 0">${value}</td></tr>`;
}

function table(rows: string) {
  return `<table style="border-collapse:collapse;width:100%;margin-top:16px">${rows}</table>`;
}

// ── Internal notification emails ──────────────────────────────────────────────

export function contactInquiryInternal(data: {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  return wrap(
    `New Contact Message — ${data.subject}`,
    table(
      row("From", data.fullName) +
      row("Email", `<a href="mailto:${data.email}">${data.email}</a>`) +
      row("Phone", data.phone) +
      row("Subject", data.subject),
    ) +
    `<p style="margin-top:20px;background:#f9f6f0;padding:16px;border-radius:8px;white-space:pre-wrap">${data.message}</p>`,
  );
}

export function quoteRequestInternal(data: {
  fullName: string;
  email: string;
  phone: string;
  productSlug: string;
  clothColor?: string;
  accessoryPackage: string;
  wantsMetroVancouverInstallDelivery?: boolean;
  message?: string;
}) {
  return wrap(
    `New Quote Request — ${data.productSlug}`,
    table(
      row("From", data.fullName) +
      row("Email", `<a href="mailto:${data.email}">${data.email}</a>`) +
      row("Phone", data.phone) +
      row("Product", data.productSlug) +
      row("Cloth color", data.clothColor) +
      row("Package", data.accessoryPackage) +
      row("Metro Vancouver install", data.wantsMetroVancouverInstallDelivery ? "Yes" : "No"),
    ) +
    (data.message
      ? `<p style="margin-top:20px;background:#f9f6f0;padding:16px;border-radius:8px;white-space:pre-wrap">${data.message}</p>`
      : ""),
  );
}

export function sellRequestInternal(data: {
  fullName: string;
  email: string;
  phone: string;
  itemType?: string;
  location?: string;
  message?: string;
  imageUrls: string[];
}) {
  const images = data.imageUrls.length
    ? data.imageUrls
        .map((url) => `<img src="${url}" style="max-width:180px;border-radius:6px;margin:4px">`)
        .join("")
    : "";

  return wrap(
    `New Sell Request — ${data.itemType ?? "Item"}`,
    table(
      row("From", data.fullName) +
      row("Email", `<a href="mailto:${data.email}">${data.email}</a>`) +
      row("Phone", data.phone) +
      row("Item type", data.itemType) +
      row("Location", data.location),
    ) +
    (data.message
      ? `<p style="margin-top:20px;background:#f9f6f0;padding:16px;border-radius:8px;white-space:pre-wrap">${data.message}</p>`
      : "") +
    (images ? `<div style="margin-top:16px">${images}</div>` : ""),
  );
}

export function purchaseInternal(data: {
  orderNumber: string;
  productName: string;
  subtotalCents: number;
  taxCents: number;
  totalCents: number;
  customerName?: string | null;
  customerEmail?: string | null;
  customerPhone?: string | null;
  shippingCity?: string | null;
  shippingProvince?: string | null;
}) {
  const fmt = (cents: number) => `$${(cents / 100).toFixed(2)} CAD`;
  return wrap(
    `New Order — ${data.orderNumber}`,
    table(
      row("Order #", data.orderNumber) +
      row("Product", data.productName) +
      row("Customer", data.customerName) +
      row("Email", data.customerEmail ? `<a href="mailto:${data.customerEmail}">${data.customerEmail}</a>` : null) +
      row("Phone", data.customerPhone) +
      row("City", [data.shippingCity, data.shippingProvince].filter(Boolean).join(", ") || null) +
      row("Subtotal", fmt(data.subtotalCents)) +
      row("BC Taxes (12%)", fmt(data.taxCents)) +
      row("Total", `<strong>${fmt(data.totalCents)}</strong>`),
    ),
  );
}

// ── Customer confirmation email ───────────────────────────────────────────────

export function purchaseConfirmationCustomer(data: {
  orderNumber: string;
  customerName: string;
  productName: string;
  totalCents: number;
}) {
  const fmt = (cents: number) => `$${(cents / 100).toFixed(2)} CAD`;
  return wrap(
    "Your order is confirmed!",
    `<p>Hi ${data.customerName},</p>
    <p>Thank you for your purchase! We've received your order and will be in touch shortly to coordinate delivery and installation.</p>` +
    table(
      row("Order #", data.orderNumber) +
      row("Product", data.productName) +
      row("Total", fmt(data.totalCents)),
    ) +
    `<p style="margin-top:24px">If you have any questions, reply to this email or call us — we're happy to help.</p>
    <p>— The Used Pool Tables Vancouver Team</p>`,
  );
}
