"use client";

import { useActionState, useEffect, useMemo, useRef } from "react";
import { submitQuoteRequest } from "@/app/actions/inquiries";
import { initialInquiryActionState } from "./inquiry-action-state";

const inputClassName =
  "rounded-[1rem] border border-[#ddd0be] bg-[#fcfaf6] px-4 py-3 text-sm text-[#122233] outline-none transition focus:border-[#c89f57]";

interface QuoteRequestFormProps {
  productSlug: string;
  clothColor?: string;
  accessoryPackage?: string;
  showInstallDeliveryOption?: boolean;
}

export default function QuoteRequestForm({
  productSlug,
  clothColor = "",
  accessoryPackage = "standard",
  showInstallDeliveryOption = false,
}: QuoteRequestFormProps) {
  const action = useMemo(
    () => submitQuoteRequest.bind(null, productSlug),
    [productSlug],
  );
  const [state, formAction, pending] = useActionState(
    action,
    initialInquiryActionState,
  );
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="mt-8 space-y-5">
      <input type="hidden" name="clothColor" value={clothColor} />
      <input type="hidden" name="accessoryPackage" value={accessoryPackage} />

      <div className="grid gap-4 md:grid-cols-2">
        <input
          required
          name="fullName"
          type="text"
          placeholder="Full Name"
          className={inputClassName}
        />
        <input
          required
          name="email"
          type="email"
          placeholder="Email Address"
          className={inputClassName}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)]">
        <input
          required
          name="phone"
          type="tel"
          placeholder="Phone Number"
          className={inputClassName}
        />
        {clothColor ? (
          <div className="rounded-[1rem] border border-[#ece2d4] bg-[#fcfaf6] px-4 py-3 text-sm text-[#5d636c]">
            Cloth:{" "}
            <span className="font-medium text-[#122233]">{clothColor}</span>
            {" · "}
            Package:{" "}
            <span className="font-medium text-[#122233]">
              {accessoryPackage === "gold" ? "Gold" : "Standard"}
            </span>
          </div>
        ) : null}
      </div>

      {showInstallDeliveryOption ? (
        <label className="flex items-start gap-3 rounded-[1rem] border border-[#ece2d4] bg-[#fcfaf6] px-4 py-4 text-sm leading-6 text-[#4e5157]">
          <input
            type="checkbox"
            name="wantsMetroVancouverInstallDelivery"
            className="mt-1 h-4 w-4 accent-[#c89f57]"
          />
          <span>
            I want free installation and delivery. Available only in Metro
            Vancouver.
          </span>
        </label>
      ) : null}

      <textarea
        name="message"
        rows={4}
        placeholder="Ask a question or add delivery, access, or timing details."
        className={`${inputClassName} min-h-[124px] w-full`}
      />

      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-3 rounded-full bg-[#f1c269] px-6 py-3.5 text-sm font-medium text-[#18212d] shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition hover:bg-[#f5ce82] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{pending ? "Sending..." : "Send Question"}</span>
          <span aria-hidden="true" className="text-base leading-none">
            &rarr;
          </span>
        </button>
      </div>

      {state.message ? (
        <p
          className={`text-sm ${
            state.status === "success" ? "text-[#6d7a48]" : "text-[#a33a2b]"
          }`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
