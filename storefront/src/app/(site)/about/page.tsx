import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Used Billiard Store",
  description:
    "Vancouver's trusted source for quality used pool tables, ping pong tables, foosball tables, and grills. Learn our story, our process, and why hundreds of customers trust us.",
};

const values = [
  {
    title: "Quality Inspected",
    description:
      "Every piece goes through a hands-on review before it's listed. If it isn't worth buying, it doesn't make it to the floor.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M9 12l2 2 4-4M12 3a9 9 0 100 18A9 9 0 0012 3z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Honest Pricing",
    description:
      "No markups, no surprises. We price used equipment fairly so you get real value and leave feeling good about the deal.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Local & Personal",
    description:
      "We're a small Vancouver team. You're talking to the people who actually know the inventory — not a call centre.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M12 21c-4-4-8-7.5-8-11a8 8 0 0116 0c0 3.5-4 7-8 11zM12 10a2 2 0 100 4 2 2 0 000-4z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const steps = [
  {
    number: "01",
    title: "Browse",
    description:
      "Shop our curated listings online or come see the pieces in person at our Vancouver location.",
  },
  {
    number: "02",
    title: "Buy",
    description:
      "Purchase securely online or arrange a deal directly. We keep the process simple and straightforward.",
  },
  {
    number: "03",
    title: "Pick Up",
    description:
      "Collect your item at our location. We'll have everything ready and help you load up.",
  },
  {
    number: "04",
    title: "Enjoy",
    description:
      "Set it up, invite some friends, and get back to playing. That's the whole point.",
  },
];

const stats = [
  { value: "500+", label: "Tables Sold" },
  { value: "10+", label: "Years in Business" },
  { value: "4.9★", label: "Average Review" },
  { value: "100%", label: "Local Team" },
];

export default function AboutPage() {
  return (
    <div className="-mx-6 bg-[#f7f3eb]">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#091827]">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-room-vancouver.png"
            alt="Luxury game room with pool table in Vancouver"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,16,27,0.88)_0%,rgba(8,16,27,0.62)_46%,rgba(8,16,27,0.44)_100%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-sm text-white/70">
              <Link href="/" className="transition hover:text-[#f1c269]">Home</Link>
              <span>/</span>
              <span>About</span>
            </div>

            <p className="mt-6 text-sm font-medium uppercase tracking-[0.26em] text-[#f1c269]">
              Our Story
            </p>

            <h1 className="mt-3 text-5xl leading-[0.94] text-white [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-7xl">
              Vancouver&rsquo;s game room specialists.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/78">
              We started because good used pool tables were hard to find — and
              overpriced when you did. That&rsquo;s still the problem we solve,
              every day.
            </p>

            <div className="mt-10 h-px w-20 bg-[#c89f57]" />
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-b border-[#e8dece] bg-[#fffdfa]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 divide-x divide-y divide-[#ede3d6] md:grid-cols-4 md:divide-y-0">
            {stats.map((stat) => (
              <div key={stat.label} className="px-8 py-8 text-center">
                <p className="text-4xl font-semibold text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-[#8c6120]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="bg-[radial-gradient(circle_at_top,#fffaf3_0%,#f6efe3_56%,#f2e9da_100%)] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">

            <div className="overflow-hidden rounded-[2rem] shadow-[0_28px_60px_rgba(47,35,22,0.14)]">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/hero/hero-table-vancouver.png"
                  alt="Pool table in a Vancouver game room"
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium uppercase tracking-[0.26em] text-[#a46f24]">
                Who We Are
              </p>

              <h2 className="mt-4 text-5xl leading-[0.94] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-6xl">
                We know these tables inside out.
              </h2>

              <div className="mt-6 space-y-5 text-[1.05rem] leading-8 text-[#4b4e53]">
                <p>
                  Home Billiards started as a side project born out of
                  frustration — watching perfectly good pool tables sit in
                  storage because nobody knew how to sell them properly. We
                  stepped in to bridge that gap.
                </p>
                <p>
                  Over the years we&rsquo;ve moved hundreds of tables across
                  Greater Vancouver: pool tables, ping pong, foosball, even
                  grills. Every piece we list has been personally looked over by
                  our team. We don&rsquo;t list anything we wouldn&rsquo;t keep
                  ourselves.
                </p>
                <p>
                  We&rsquo;re a small, local team and we plan to keep it that
                  way. You get straightforward answers, fair prices, and a
                  hassle-free handoff.
                </p>
              </div>

              <div className="mt-8 h-px w-16 bg-[#c89f57]" />

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-base font-medium text-[#a46f24] transition hover:text-[#7d5219]"
                >
                  <span>Get in touch</span>
                  <span aria-hidden="true" className="text-lg leading-none">
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.26em] text-[#a46f24]">
              What We Stand For
            </p>
            <h2 className="mt-4 text-5xl leading-[0.94] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-6xl">
              Why people choose us.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-[1.9rem] border border-[#e5d9c9] bg-[#fffdfa] p-8 shadow-[0_18px_42px_rgba(46,34,20,0.07)]"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#d9b57c] bg-[#fff7eb] text-[#b27a2a]">
                  {value.icon}
                </div>
                <h3 className="text-[1.8rem] leading-[1.04] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                  {value.title}
                </h3>
                <p className="mt-4 text-[1rem] leading-8 text-[#4e5157]">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="bg-[radial-gradient(circle_at_top,#fffaf3_0%,#f6efe3_56%,#f2e9da_100%)] px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.26em] text-[#a46f24]">
              The Process
            </p>
            <h2 className="mt-4 text-5xl leading-[0.94] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-6xl">
              Simple from start to finish.
            </h2>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-[#e4d8c8] bg-[#fffdfa] shadow-[0_18px_44px_rgba(47,35,22,0.08)]">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={[
                    "px-8 py-9",
                    index > 0 ? "border-t border-[#ece2d4] md:border-t-0" : "",
                    index % 2 === 1 ? "md:border-l md:border-[#ece2d4]" : "",
                    index >= 2 ? "md:border-t md:border-[#ece2d4] xl:border-t-0" : "",
                    index > 0 ? "xl:border-l xl:border-[#ece2d4]" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#d9b57c] bg-[#fff7eb] text-sm font-semibold tracking-[0.2em] text-[#b27a2a]">
                    {step.number}
                  </div>
                  <h3 className="text-[1.8rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-[1rem] leading-8 text-[#4e5157]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2.2rem] border border-[#e4d7c5] bg-[#fffdfa] shadow-[0_28px_60px_rgba(47,35,22,0.1)]">
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">

              <div className="order-2 flex items-center px-8 py-12 md:order-1 md:px-12 md:py-16">
                <div className="max-w-lg">
                  <p className="text-sm font-medium uppercase tracking-[0.26em] text-[#a46f24]">
                    Ready to Browse?
                  </p>
                  <h2 className="mt-4 text-5xl leading-[0.96] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-6xl">
                    Find your next table today.
                  </h2>
                  <p className="mt-5 text-lg leading-8 text-[#4b4e53]">
                    Browse our current inventory — pool tables, ping pong,
                    foosball, and grills. New pieces arrive regularly.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      href="/products"
                      className="inline-flex items-center justify-center gap-3 rounded-full bg-[#f1c269] px-6 py-3.5 text-sm font-medium text-[#18212d] shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition hover:bg-[#f5ce82]"
                    >
                      <span>Shop All Products</span>
                      <span aria-hidden="true" className="text-base leading-none">
                        &rarr;
                      </span>
                    </Link>

                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-3 rounded-full border border-[#b9883e] px-6 py-3.5 text-sm font-medium text-[#8b611f] transition hover:bg-[#b9883e] hover:text-white"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>

              <div className="order-1 min-h-[280px] md:order-2 md:min-h-[420px]">
                <div className="relative h-full w-full">
                  <Image
                    src="/images/hero/used-table-vancouver.png"
                    alt="Used pool table ready for sale in Vancouver"
                    fill
                    sizes="(max-width: 767px) 100vw, 55vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,28,0.08)_0%,rgba(10,18,28,0.16)_100%)] md:bg-[linear-gradient(90deg,rgba(255,253,250,0.18)_0%,rgba(255,253,250,0)_20%,rgba(10,18,28,0.16)_100%)]" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="border-t border-[#eadfce] bg-[#f4ecdf] px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center md:flex-row md:items-center md:justify-center md:gap-10">
          {["5-Star Service", "Local Delivery", "Expert Support"].map((item, index) => (
            <div
              key={item}
              className={`flex items-center justify-center gap-3 text-[#102131] ${
                index > 0 ? "md:border-l md:border-[#d8ccb9] md:pl-10" : ""
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[#c89f57]" />
              <span className="text-sm font-medium uppercase tracking-[0.2em]">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
