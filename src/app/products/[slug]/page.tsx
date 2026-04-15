import { notFound } from "next/navigation";
import { products } from "@/data/products";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const product = products.find((p) => p.slug === slug);

  if (!product) return notFound();

  return (
    <main className="min-h-screen px-6 py-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center rounded-xl">
          <span className="text-gray-400">Image</span>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-600">{product.description}</p>

          <div className="text-xl font-semibold">
            Starting at ${product.startingPrice}
          </div>

          <div className="text-sm text-gray-500">
            Condition: {product.condition}
          </div>

          <div className="flex gap-4 pt-4">
            <button className="bg-black text-white px-6 py-3 rounded-lg">
              Request a Quote
            </button>

            <button className="border border-gray-300 px-6 py-3 rounded-lg">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}