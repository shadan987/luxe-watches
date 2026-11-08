import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Sample checkout for the LUXE watch boutique.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <p className="text-[11px] tracking-[0.22em] uppercase text-brass">Checkout</p>
      <h1 className="mt-3 mb-10 font-serif text-5xl sm:text-6xl">Place a sample order</h1>
      <CheckoutForm />
    </div>
  );
}
