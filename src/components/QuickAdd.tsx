"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

export function QuickAdd({ slug }: { slug: string }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      className="mt-3 self-start text-[11px] tracking-[0.18em] uppercase text-stone underline-offset-4 hover:text-ink hover:underline"
      onClick={() => {
        add(slug);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
    >
      {added ? "Added to bag" : "Add to bag"}
    </button>
  );
}
