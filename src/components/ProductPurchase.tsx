"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";

export function ProductPurchase({ slug }: { slug: string }) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4">
        <p className="text-[11px] tracking-[0.18em] uppercase text-stone">
          Quantity
        </p>
        <div className="flex items-center border border-line">
          <button
            type="button"
            className="h-11 w-11 text-lg"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
          >
            −
          </button>
          <span className="w-8 text-center text-sm">{quantity}</span>
          <button
            type="button"
            className="h-11 w-11 text-lg"
            aria-label="Increase quantity"
            onClick={() => setQuantity((value) => Math.min(9, value + 1))}
          >
            +
          </button>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="bg-ink px-8 py-4 text-xs tracking-[0.2em] text-ivory uppercase transition hover:bg-brass"
          onClick={() => {
            add(slug, quantity);
            setAdded(true);
          }}
        >
          {added ? "Added to bag" : "Add to bag"}
        </button>
        <Link
          href="/cart"
          className="border border-ink px-8 py-4 text-center text-xs tracking-[0.2em] uppercase hover:bg-ink hover:text-ivory"
        >
          View bag
        </Link>
      </div>
    </div>
  );
}
