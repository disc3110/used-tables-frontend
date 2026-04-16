import Link from "next/link";

export default function CTASection() {
  return (
    <section className="px-6 py-20 bg-black text-white">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        
        <h2 className="text-3xl font-bold">
          Looking for the perfect table?
        </h2>

        <p className="text-gray-300">
          Get in touch with us and we’ll help you find the best option for your space and budget.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          
          <Link
            href="/contact"
            className="bg-white text-black px-6 py-3 rounded-lg font-medium"
          >
            Request a Quote
          </Link>

          <Link
            href="/products"
            className="border border-white px-6 py-3 rounded-lg font-medium"
          >
            Browse Tables
          </Link>

        </div>
      </div>
    </section>
  );
}