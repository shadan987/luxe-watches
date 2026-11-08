import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/data/products";
import { ShopNav } from "@/components/ShopNav";

export const metadata: Metadata = {
  title: "All watches",
  description: "Browse sample men’s and women’s watches.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <p className="text-[11px] tracking-[0.22em] uppercase text-brass">Shop</p>
      <h1 className="mt-3 font-serif text-5xl sm:text-6xl">All watches</h1>
      <p className="mt-4 max-w-xl text-sm leading-6 text-stone">
        Twelve sample pieces. Filter by who they were designed for, then open a
        watch for case size, movement, and water resistance.
      </p>
      <ShopNav current="all" />
      <ProductGrid products={products} />
    </div>
  );
}
