import type { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function PoolProductDetail({ product }: Props) {
  return (
    <main className="bg-[#f2f3f7] px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
        
        {/* Image */}
        <div className="flex items-center justify-center rounded-[2rem] bg-white p-10 shadow-[0_20px_60px_rgba(90,92,110,0.15)]">
          <span className="text-sm tracking-[0.2em] text-[#9aa0b3] uppercase">
            Image
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center space-y-6">
          
          <h1 className="text-4xl font-light tracking-[0.08em] text-[#4f5363] uppercase">
            {product.name}
          </h1>

          <p className="text-base leading-7 text-[#666b7d]">
            {product.description}
          </p>

          <div className="text-2xl font-medium text-[#4f5363]">
            Starting at ${product.startingPrice}
          </div>

          <div className="text-sm uppercase tracking-[0.2em] text-[#7b8094]">
            Condition: {product.condition}
          </div>

          {/* CTA */}
          <div className="pt-4">
            <button className="rounded-full bg-[#5d6273] px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#4f5363]">
              Request a Quote
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}