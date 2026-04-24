import Link from "next/link";

export default function CategorySection() {
  return (
    <section className="bg-[#47cee6] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#4d7380]">
            Shop Your Way
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#27404a]">
            Browse by Category
          </h2>
          <p className="mt-2 text-[#446470]">
            Find the perfect table for your space.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Link href="/products/pool-tables">
            <div className="flex h-40 cursor-pointer items-center justify-center rounded-2xl border border-[#79cfde] bg-white/65 text-lg font-semibold text-[#26404c] shadow-[0_18px_40px_rgba(74,120,132,0.12)] transition duration-300 hover:-translate-y-1 hover:bg-white/80">
              Pool Tables
            </div>
          </Link>

          <Link href="/products/ping-pong">
            <div className="flex h-40 cursor-pointer items-center justify-center rounded-2xl border border-[#79cfde] bg-white/65 text-lg font-semibold text-[#26404c] shadow-[0_18px_40px_rgba(74,120,132,0.12)] transition duration-300 hover:-translate-y-1 hover:bg-white/80">
              Ping Pong Tables
            </div>
          </Link>

          <Link href="/products/foosball">
            <div className="flex h-40 cursor-pointer items-center justify-center rounded-2xl border border-[#79cfde] bg-white/65 text-lg font-semibold text-[#26404c] shadow-[0_18px_40px_rgba(74,120,132,0.12)] transition duration-300 hover:-translate-y-1 hover:bg-white/80">
              Foosball Tables
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
