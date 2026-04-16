import Link from "next/link";

export default function CategorySection() {
  return (
    <section className="px-6 py-16 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold">Browse by Category</h2>
        <p className="text-gray-500 mt-2">
          Find the perfect table for your space.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pool Tables */}
        <Link href="/products/pool-tables">
          <div className="h-40 rounded-2xl bg-gray-100 flex items-center justify-center text-lg font-semibold hover:bg-gray-200 transition cursor-pointer">
            Pool Tables
          </div>
        </Link>

        {/* Ping Pong */}
        <Link href="/products/ping-pong">
          <div className="h-40 rounded-2xl bg-gray-100 flex items-center justify-center text-lg font-semibold hover:bg-gray-200 transition cursor-pointer">
            Ping Pong Tables
          </div>
        </Link>

        {/* Foosball */}
        <Link href="/products/foosball">
          <div className="h-40 rounded-2xl bg-gray-100 flex items-center justify-center text-lg font-semibold hover:bg-gray-200 transition cursor-pointer">
            Foosball Tables
          </div>
        </Link>

      </div>
    </section>
  );
}