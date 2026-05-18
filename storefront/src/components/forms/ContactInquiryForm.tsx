"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContactInquiry } from "@/app/actions/inquiries";
import { initialInquiryActionState } from "./inquiry-action-state";

const subjectOptions = [
  "Request a Quote",
  "Ask About a Pool Table",
  "Sell My Pool Table",
  "Delivery & Installation",
  "General Question",
];

const inputClassName =
  "rounded-[1rem] border border-[#ded1bf] bg-[#fcfaf6] px-4 py-3.5 text-[#122233] outline-none transition focus:border-[#c89f57]";

export default function ContactInquiryForm() {
  const [state, formAction, pending] = useActionState(
    submitContactInquiry,
    initialInquiryActionState,
  );
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2"
    >
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-[#132334]">Full Name</span>
        <input
          required
          name="fullName"
          type="text"
          className={inputClassName}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-[#132334]">
          Email Address
        </span>
        <input required name="email" type="email" className={inputClassName} />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-[#132334]">Phone Number</span>
        <input name="phone" type="tel" className={inputClassName} />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-[#132334]">Subject</span>
        <select
          required
          name="subject"
          defaultValue={subjectOptions[0]}
          className={inputClassName}
        >
          {subjectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="text-sm font-medium text-[#132334]">Message</span>
        <textarea
          required
          name="message"
          rows={6}
          className={inputClassName}
        />
      </label>

      <div className="md:col-span-2 flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#f1c269] px-6 py-3.5 text-sm font-medium text-[#18212d] shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition hover:bg-[#f5ce82] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span>{pending ? "Sending..." : "Get in Touch"}</span>
            <span aria-hidden="true" className="text-base leading-none">
              &rarr;
            </span>
          </button>

          {state.message ? (
            <p
              className={`mt-3 text-sm ${
                state.status === "success" ? "text-[#6d7a48]" : "text-[#a33a2b]"
              }`}
            >
              {state.message}
            </p>
          ) : null}
        </div>

        <p className="max-w-sm text-sm leading-6 text-[#6d6a63]">
          We respect your privacy and will never share your information.
        </p>
      </div>
    </form>
  );
}
