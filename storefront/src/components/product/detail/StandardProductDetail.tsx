import type { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function StandardProductDetail({ product }: Props) {
  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-8">
        
        <div className="flex h-72 items-center justify-center rounded-xl bg-[#f2f3f7]">
          <span className="text-sm text-[#9aa0b3] uppercase">
            Image
          </span>
        </div>

        <h1 className="text-2xl font-semibold text-[#4f5363]">
          {product.name}
        </h1>

        <p className="text-[#666b7d]">
          {product.description}
        </p>

        <div className="text-lg font-medium text-[#4f5363]">
          ${product.startingPrice}
        </div>

        <button className="rounded-lg bg-[#5d6273] px-6 py-3 text-sm text-white">
          Contact
        </button>

      </div>
    </main>
  );
}