import Link from "next/link";
import { getProductBySlug } from "@/lib/products";

type SuccessStatus = "success" | "unavailable" | "error";

interface SuccessPageProps {
  searchParams: Promise<{
    product?: string;
    status?: SuccessStatus;
  }>;
}

const copyByStatus: Record<
  SuccessStatus,
  { eyebrow: string; title: string; message: string }
> = {
  success: {
    eyebrow: "Order Started",
    title: "Thanks, your table is reserved.",
    message:
      "We updated the inventory and will use this page as the Stripe success destination when payments are connected.",
  },
  unavailable: {
    eyebrow: "Availability Changed",
    title: "This item is no longer available.",
    message:
      "The inventory changed before checkout could be completed. Please choose another table or send us a question.",
  },
  error: {
    eyebrow: "Checkout Needs Attention",
    title: "We could not complete this buy-now request.",
    message:
      "Please try again in a moment or send us a question so we can help manually.",
  },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const params = await searchParams;
  const status =
    params.status === "unavailable" || params.status === "error"
      ? params.status
      : "success";
  const product = params.product
    ? await getProductBySlug(params.product)
    : undefined;
  const copy = copyByStatus[status];

  return (
    <main className="bg-[#fbf7ef] px-6 py-20">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[#e3d5c1] bg-[#fffdfa] p-8 shadow-[0_22px_46px_rgba(47,35,22,0.08)] md:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#a46f24]">
          {copy.eyebrow}
        </p>
        <h1 className="mt-4 text-4xl leading-[1.02] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-[#4e5157]">{copy.message}</p>

        {product ? (
          <div className="mt-8 rounded-[1.25rem] border border-[#ece2d4] bg-[#fcfaf6] p-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#a46f24]">
              Product
            </p>
            <p className="mt-2 text-xl font-semibold text-[#122233]">
              {product.name}
            </p>
            <p className="mt-2 text-sm text-[#5d636c]">
              Remaining inventory: {product.quantity}
            </p>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-[#f1c269] px-6 py-3.5 text-sm font-medium text-[#18212d] shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition hover:bg-[#f5ce82]"
          >
            Browse Products
          </Link>
          {product ? (
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center justify-center rounded-full border border-[#d9c7ae] px-6 py-3.5 text-sm font-medium text-[#132334] transition hover:border-[#c89f57] hover:text-[#8b611f]"
            >
              Back to Product
            </Link>
          ) : null}
        </div>
      </section>
    </main>
  );
}
