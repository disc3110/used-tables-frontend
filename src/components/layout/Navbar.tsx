import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          Billiard Store
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
          className="bg-black text-white px-4 py-2 rounded-lg text-sm"
        >
          Request Quote
        </Link>
      </div>
    </nav>
  );
}