"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { submitSellRequest } from "@/app/actions/inquiries";
import { initialInquiryActionState } from "./inquiry-action-state";

const inputClassName =
  "rounded-[1rem] border border-[#dfcfb7] bg-[#fffcf7] px-4 py-3 text-sm text-[#122233] outline-none transition focus:border-[#c89f57]";

interface SellRequestFormProps {
  itemType: string;
}

export default function SellRequestForm({ itemType }: SellRequestFormProps) {
  const [state, formAction, pending] = useActionState(
    submitSellRequest,
    initialInquiryActionState,
  );
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="mt-8 space-y-4">
      <input type="hidden" name="itemType" value={itemType} />

      <div className="grid gap-4 sm:grid-cols-2">
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

      <div className="grid gap-4 sm:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)]">
        <input
          required
          name="phone"
          type="tel"
          placeholder="Phone Number"
          className={inputClassName}
        />
        <input
          name="location"
          type="text"
          placeholder="Location"
          className={inputClassName}
        />
      </div>

      <textarea
        name="message"
        rows={3}
        placeholder="Tell us a little about the table you'd like to sell."
        className={`${inputClassName} min-h-[112px] w-full`}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-3 self-start rounded-full bg-[#f1c269] px-6 py-3.5 text-sm font-medium text-[#18212d] shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition hover:bg-[#f5ce82] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{pending ? "Sending..." : "Get a Quote"}</span>
          <span aria-hidden="true" className="text-base leading-none">
            &rarr;
          </span>
        </button>

        <Link
          href="/contact"
          className="text-sm font-medium text-[#8c6120] transition hover:text-[#6d4716]"
        >
          Learn how it works
        </Link>
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
