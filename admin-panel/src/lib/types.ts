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

export type AdminSellRequest = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  itemType?: string | null;
  location?: string | null;
  message?: string | null;
  status: InquiryStatus;
  createdAt: string;
};

export type AdminUser = {
  id: string;
  fullName: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
};
