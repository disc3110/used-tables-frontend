import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#081a2a]/96 text-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-6">
        <Link
          href="/"
          className="max-w-[10.5rem] text-balance text-lg leading-tight text-[#f7efe3] [font-family:Georgia,Times,'Times_New_Roman',serif] sm:max-w-none md:text-[2rem]"
        >
          Used Billiard Store
        </Link>

        <div className="hidden items-center justify-center gap-10 text-[0.98rem] text-white/88 md:flex">
          <Link href="/products" className="transition hover:text-[#f3c46e]">
            Shop
          </Link>

          <Link href="/about" className="transition hover:text-[#f3c46e]">
            About
          </Link>

          <Link href="/contact" className="transition hover:text-[#f3c46e]">
            Contact
          </Link>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f1c269] px-4 py-2.5 text-sm font-medium text-[#18212d] shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition hover:bg-[#f6cf84] md:px-6"
        >
          <span>Request Quote</span>
          <span aria-hidden="true" className="text-base leading-none">
            &rarr;
          </span>
        </Link>
      </div>
    </nav>
  );
}
