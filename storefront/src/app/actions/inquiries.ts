"use server";

import type { InquiryActionState } from "@/components/forms/inquiry-action-state";

const defaultErrorMessage =
  "We couldn't send your request right now. Please try again in a moment.";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL?.replace(/\/$/, "") ?? "http://localhost:4000/api";

function getValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getCheckboxValue(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

async function postInquiry(path: string, payload: Record<string, unknown>) {
  const response = await fetch(`${BACKEND_API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Backend request failed with status ${response.status}`);
  }

  return response.json();
}

export async function submitContactInquiry(
  _previousState: InquiryActionState,
  formData: FormData,
): Promise<InquiryActionState> {
  const fullName = getValue(formData, "fullName");
  const email = getValue(formData, "email");
  const phone = getValue(formData, "phone");
  const subject = getValue(formData, "subject");
  const message = getValue(formData, "message");

  if (!fullName || !email || !subject || !message) {
    return {
      status: "error",
      message: "Please complete the required fields before submitting.",
    };
  }

  if (!isValidEmail(email)) {
    return {
      status: "error",
      message: "Please enter a valid email address.",
    };
  }

  try {
    await postInquiry("/inquiries/contact", {
      fullName,
      email,
      phone,
      subject,
      message,
    });

    return {
      status: "success",
      message: "Thanks. Your message was sent successfully.",
    };
  } catch {
    return {
      status: "error",
      message: defaultErrorMessage,
    };
  }
}

export async function submitSellRequest(
  _previousState: InquiryActionState,
  formData: FormData,
): Promise<InquiryActionState> {
  const fullName = getValue(formData, "fullName");
  const email = getValue(formData, "email");
  const phone = getValue(formData, "phone");
  const itemType = getValue(formData, "itemType");
  const location = getValue(formData, "location");
  const message = getValue(formData, "message");
  const imagesJson = getValue(formData, "imagesJson");

  if (!fullName || !email || !phone) {
    return {
      status: "error",
      message: "Please add your name, email, and phone number.",
    };
  }

  if (!isValidEmail(email)) {
    return {
      status: "error",
      message: "Please enter a valid email address.",
    };
  }

  let images: unknown[] | undefined;

  if (imagesJson) {
    try {
      const parsed: unknown = JSON.parse(imagesJson);

      if (Array.isArray(parsed) && parsed.length > 0) {
        images = parsed.slice(0, 3);
      }
    } catch {
      // malformed JSON — proceed without images
    }
  }

  try {
    await postInquiry("/inquiries/sell-requests", {
      fullName,
      email,
      phone,
      itemType,
      location,
      message,
      ...(images ? { images } : {}),
    });

    return {
      status: "success",
      message: "Thanks. We received your sell request and will follow up soon.",
    };
  } catch {
    return {
      status: "error",
      message: defaultErrorMessage,
    };
  }
}

export async function submitQuoteRequest(
  productSlug: string,
  _previousState: InquiryActionState,
  formData: FormData,
): Promise<InquiryActionState> {
  const fullName = getValue(formData, "fullName");
  const email = getValue(formData, "email");
  const phone = getValue(formData, "phone");
  const clothColor = getValue(formData, "clothColor");
  const accessoryPackage = getValue(formData, "accessoryPackage");
  const wantsMetroVancouverInstallDelivery = getCheckboxValue(
    formData,
    "wantsMetroVancouverInstallDelivery",
  );
  const message = getValue(formData, "message");

  if (!fullName || !email || !phone) {
    return {
      status: "error",
      message: "Please add your name, email, and phone number.",
    };
  }

  if (!isValidEmail(email)) {
    return {
      status: "error",
      message: "Please enter a valid email address.",
    };
  }

  if (!accessoryPackage) {
    return {
      status: "error",
      message: "Please choose an accessory package before sending your question.",
    };
  }

  try {
    await postInquiry("/inquiries/product-questions", {
      productSlug,
      fullName,
      email,
      phone,
      clothColor,
      accessoryPackage,
      wantsMetroVancouverInstallDelivery,
      message,
    });

    return {
      status: "success",
      message: "Thanks. Your question was sent successfully.",
    };
  } catch {
    return {
      status: "error",
      message: defaultErrorMessage,
    };
  }
}
