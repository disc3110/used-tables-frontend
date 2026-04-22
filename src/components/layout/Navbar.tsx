import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-[#3f4768] bg-[#505a80]/92 text-white backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          Used Pool Tables
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/products" className="hover:underline">
            Shop
          </Link>

          <Link href="/about" className="hover:underline">
            About
          </Link>

          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>

        <Link
          href="/contact"
          className="rounded-lg bg-[#ffdfab] px-4 py-2 text-sm font-medium text-[#3f3120] transition hover:bg-[#ffe7bf]"
        >
          Request Quote
        </Link>
      </div>
    </nav>
  );
}
