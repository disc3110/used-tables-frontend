"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { buyNowProduct } from "@/app/actions/checkout";
import QuoteRequestForm from "@/components/forms/QuoteRequestForm";

interface ProductPurchaseActionsProps {
  productSlug: string;
  available: boolean;
  quantity: number;
  clothColor?: string;
  accessoryPackage?: string;
  showInstallDeliveryOption?: boolean;
}

function BuyNowButton({ available }: { available: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={!available || pending}
      className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f1c269] px-7 py-3.5 text-sm font-medium text-[#18212d] shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition hover:bg-[#f5ce82] disabled:cursor-not-allowed disabled:opacity-55"
    >
      {pending ? "Processing..." : available ? "Buy Now" : "Sold Out"}
    </button>
  );
}

export default function ProductPurchaseActions({
  productSlug,
  available,
  quantity,
  clothColor,
  accessoryPackage = "standard",
  showInstallDeliveryOption = false,
}: ProductPurchaseActionsProps) {
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  const canBuy = available && quantity > 0;

  return (
    <section className="">
      <div className="flex flex-col gap-4 sm:flex-row">
        <form action={buyNowProduct}>
          <input type="hidden" name="productSlug" value={productSlug} />
          <BuyNowButton available={canBuy} />
        </form>

        <button
          type="button"
          onClick={() => setIsQuestionOpen((current) => !current)}
          className="inline-flex min-h-12 items-center justify-center rounded-full border bg-amber-50 border-[#d9c7ae] px-7 py-3.5 text-sm font-medium text-[#132334] transition hover:border-[#c89f57] hover:text-[#8b611f]"
          aria-expanded={isQuestionOpen}
        >
          Ask a Question
        </button>
      </div>

      {!canBuy ? (
        <p className="mt-4 text-sm leading-6 text-[#8c6831]">
          This item is currently unavailable, but you can still ask about
          similar inventory.
        </p>
      ) : null}

      {isQuestionOpen ? (
        <QuoteRequestForm
          productSlug={productSlug}
          clothColor={clothColor}
          accessoryPackage={accessoryPackage}
          showInstallDeliveryOption={showInstallDeliveryOption}
        />
      ) : null}
    </section>
  );
}
