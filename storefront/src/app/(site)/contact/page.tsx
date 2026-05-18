"use client";

import Image from "next/image";
import Link from "next/link";
import ContactInquiryForm from "@/components/forms/ContactInquiryForm";

const infoCards = [
  {
    title: "Location",
    body: ["Vancouver, British Columbia, Canada"],
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7">
        <path
          d="M12 21s6-5.4 6-11a6 6 0 10-12 0c0 5.6 6 11 6 11z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    title: "Phone",
    body: ["604 260 6446"],
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7">
        <path
          d="M6.5 4.5h3l1.2 4-2 1.8c.9 1.8 2.3 3.2 4.1 4.1l1.8-2 4 1.2v3c0 .8-.7 1.4-1.5 1.4A13.4 13.4 0 014.9 6c0-.8.7-1.5 1.6-1.5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Hours",
    body: [
      "Monday - Friday: 10 am - 5 pm",
      "Saturday: Noon - 4 pm",
      "Sunday: Closed",
    ],
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M12 8v4l3 2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const trustHighlights = ["Local Delivery", "Professional Installation", "Quality Guaranteed"];

export default function ContactPage() {
  return (
    <div className="-mx-6 bg-[#f7f3eb]">
      <section className="relative overflow-hidden bg-[#081a2a]">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-room-vancouver.png"
            alt="Luxury billiards room"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,20,33,0.88)_0%,rgba(8,20,33,0.68)_42%,rgba(8,20,33,0.54)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,20,33,0.16)_0%,rgba(8,20,33,0.42)_100%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-22 md:py-30">
          <div className="max-w-3xl text-white">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-[#f1c269]">
              Get In Touch
            </p>
            <h1 className="mt-4 text-5xl leading-[0.94] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-7xl">
              Contact Us
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
              We’re here to help with any questions about our used pool tables
              or services.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3">
          {infoCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[1.8rem] border border-[#e4d7c5] bg-[#fffdfa] p-7 shadow-[0_18px_40px_rgba(47,35,22,0.08)]"
            >
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#fbf5ea] text-[#b27a2a]">
                {card.icon}
              </div>
              <h2 className="text-[2rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                {card.title}
              </h2>
              <div className="mt-4 space-y-2 text-base leading-8 text-[#4e5157]">
                {card.body.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-14 md:pb-18">
        <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[minmax(0,1fr)_420px]">
          <article className="rounded-[2rem] border border-[#e3d5c2] bg-[#fffdfa] p-7 shadow-[0_22px_46px_rgba(47,35,22,0.08)] md:p-8">
            <h2 className="text-4xl leading-[0.98] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-5xl">
              Send Us a Message
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#4b4e53]">
              Have a question or ready to get a quote? Fill out the form and
              we’ll get back to you as soon as possible.
            </p>

            <ContactInquiryForm />
          </article>

          <div className="space-y-6">
            <article className="overflow-hidden rounded-[2rem] border border-[#e3d5c2] bg-[#fffdfa] shadow-[0_22px_46px_rgba(47,35,22,0.08)]">
              <div className="relative min-h-[320px]">
                <Image
                  src="/images/hero/used-table-vancouver.png"
                  alt="Metro Vancouver service area"
                  fill
                  sizes="(max-width: 1279px) 100vw, 420px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,20,33,0.16)_0%,rgba(8,20,33,0.34)_100%)]" />
                <div className="absolute inset-x-6 bottom-6 rounded-[1.4rem] border border-white/20 bg-[#081a2a]/78 px-5 py-4 text-white backdrop-blur-md">
                  <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#f1c269]">
                    Service Area
                  </p>
                  <h3 className="mt-2 text-2xl [font-family:Georgia,Times,'Times_New_Roman',serif]">
                    Metro Vancouver
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-white/78">
                    Serving Vancouver, North Shore, Richmond, Burnaby, Surrey,
                    and surrounding communities.
                  </p>
                </div>
              </div>
            </article>

            <article className="rounded-[2rem] border border-[#e3d5c2] bg-[#fffdfa] p-7 shadow-[0_22px_46px_rgba(47,35,22,0.08)]">
              <p className="text-sm font-medium uppercase tracking-[0.26em] text-[#a46f24]">
                Why Clients Choose Us
              </p>
              <h3 className="mt-4 text-4xl leading-[0.98] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                Local Service. Trusted Experts.
              </h3>
              <p className="mt-4 text-base leading-8 text-[#4b4e53]">
                Proudly serving the greater Vancouver area with quality used
                pool tables and professional installation.
              </p>

              <div className="mt-6 space-y-3">
                {trustHighlights.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-[#122233]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#c89f57]" />
                    <span className="text-sm font-medium uppercase tracking-[0.2em]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#081a2a] px-6 py-10 text-[#f6efe4]">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <article className="rounded-[1.8rem] border border-white/10 bg-white/3 px-6 py-6">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#f1c269]">
              Prefer Email?
            </p>
            <Link
              href="mailto:info@usedpooltables.ca"
              className="mt-3 block text-3xl leading-[1] [font-family:Georgia,Times,'Times_New_Roman',serif] transition hover:text-[#f1c269]"
            >
              info@usedpooltables.ca
            </Link>
            <p className="mt-3 text-sm leading-7 text-white/72">
              We typically respond within 24 hours.
            </p>
          </article>

          <article className="rounded-[1.8rem] border border-white/10 bg-white/3 px-6 py-6">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#f1c269]">
              Call Us
            </p>
            <Link
              href="tel:6042606446"
              className="mt-3 block text-3xl leading-[1] [font-family:Georgia,Times,'Times_New_Roman',serif] transition hover:text-[#f1c269]"
            >
              604 260 6446
            </Link>
            <p className="mt-3 text-sm leading-7 text-white/72">
              We’re happy to answer your questions.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
