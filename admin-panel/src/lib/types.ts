export type AdminCategory = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  productCount?: number;
};

export type AdminProductImage = {
  id: string;
  url: string;
  alt: string;
  sortOrder?: number;
};

export type InquiryStatus = "new" | "read" | "pending" | "done";

export type InquiryType = "product-questions" | "contact" | "sell-requests";

export type AdminProduct = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  startingPrice: number;
  quantity: number;
  condition: string;
  available: boolean;
  featured: boolean;
  quoteOnly: boolean;
  clothColors: string[];
  dimensions?: string | null;
  brand?: string | null;
  detailLayout: string;
  category: AdminCategory;
  images: AdminProductImage[];
  updatedAt?: string;
  createdAt?: string;
};

export type AdminProductInquiry = {
  id: string;
  productSlug: string;
  fullName: string;
  email: string;
  phone: string;
  clothColor?: string | null;
  accessoryPackage: string;
  wantsMetroVancouverInstallDelivery: boolean;
  message?: string | null;
  status: InquiryStatus;
  createdAt: string;
};

export type AdminSale = {
  id: string;
  productId?: string | null;
  productSlug: string;
  productName: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  status: string;
  source: string;
  createdAt: string;
};

export type AdminContactInquiry = {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
};

export type AdminSellRequestImage = {
  id: string;
  url: string;
  publicId: string;
  width?: number | null;
  height?: number | null;
  originalFilename?: string | null;
};

export type AdminSellRequest = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  itemType?: string | null;
  location?: string | null;
  message?: string | null;
  status: InquiryStatus;
  images: AdminSellRequestImage[];
  createdAt: string;
};

export type AdminOrderStatus =
  | "PENDING"
  | "PAID"
  | "FULFILLING"
  | "SHIPPED"
  | "CANCELLED"
  | "REFUNDED";

export type AdminPaymentStatus = "UNPAID" | "PAID" | "FAILED" | "REFUNDED";

export type AdminOrderItem = {
  id: string;
  productId?: string | null;
  productName: string;
  sku: string;
  quantity: number;
  unitPriceCents: number;
  totalCents: number;
};

export type AdminOrder = {
  id: string;
  orderNumber: string;
  status: AdminOrderStatus;
  paymentStatus: AdminPaymentStatus;
  stripeSessionId?: string | null;
  stripePaymentIntentId?: string | null;
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
  subtotalCents: number;
  totalCents: number;
  currency: string;
  paidAt?: string | null;
  createdAt: string;
  items: AdminOrderItem[];
};

export type AdminUser = {
  id: string;
  fullName: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
};
