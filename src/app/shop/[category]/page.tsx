import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { ShopNav } from "@/components/ShopNav";
import { getByCategory, type Category } from "@/data/products";

const copy: Record<
  Category,
  { title: string; description: string }
> = {
  men: {
    title: "Men’s watches",
    description:
      "Chronographs, divers, and a field watch. Steel cases, darker dials, and straps made for daily wear.",
  },
  women: {
    title: "Women’s watches",
    description:
      "Smaller cases, gold tone, and leather. Dress watches chosen to sit with the rest of what you wear.",
  },
};

export function generateStaticParams() {
  return [{ category: "men" }, { category: "women" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (category !== "men" && category !== "women") return { title: "Shop" };
  return { title: copy[category].title, description: copy[category].description };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (category !== "men" && category !== "women") notFound();

  const details = copy[category];
  const list = getByCategory(category);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <p className="text-[11px] tracking-[0.22em] uppercase text-brass">Shop</p>
      <h1 className="mt-3 font-serif text-5xl sm:text-6xl">{details.title}</h1>
      <p className="mt-4 max-w-xl text-sm leading-6 text-stone">{details.description}</p>
      <ShopNav current={category} />
      <ProductGrid products={list} />
    </div>
  );
}
