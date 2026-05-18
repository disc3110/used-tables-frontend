export const inquiryStatusValues = ["new", "read", "pending", "done"] as const;

export type InquiryStatus = (typeof inquiryStatusValues)[number];

export const inquiryTypeValues = [
  "product-questions",
  "contact",
  "sell-requests",
] as const;

export type InquiryType = (typeof inquiryTypeValues)[number];
