import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Bag",
  description: "Review the watches in your bag.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <p className="text-[11px] tracking-[0.22em] uppercase text-brass">Bag</p>
      <h1 className="mt-3 mb-10 font-serif text-5xl sm:text-6xl">Your selection</h1>
      <CartView />
    </div>
  );
}
