import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductPurchase } from "@/components/ProductPurchase";
import {
  categoryLabel,
  formatPrice,
  getProduct,
  getRelated,
  products,
} from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Watch" };
  return { title: product.name, description: product.description };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const specs = [
    ["Movement", product.movement],
    ["Case", product.caseSize],
    ["Material", product.material],
    ["Water resistance", product.waterResistance],
    ["Strap", product.strap],
  ] as const;

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:py-16">
      <p className="text-xs text-stone">
        <Link href="/shop" className="hover:text-ink">
          Shop
        </Link>
        <span className="px-2">/</span>
        <Link href={`/shop/${product.category}`} className="hover:text-ink">
          {categoryLabel(product.category)}
        </Link>
      </p>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#ebe4d8]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="lg:py-4">
          <p className="text-[11px] tracking-[0.22em] uppercase text-brass">
            {categoryLabel(product.category)}
          </p>
          <h1 className="mt-3 font-serif text-5xl leading-none sm:text-6xl">
            {product.name}
          </h1>
          <p className="mt-5 text-lg">{formatPrice(product.price)}</p>
          <p className="mt-5 max-w-md text-sm leading-7 text-stone">
            {product.description}
          </p>
          <ProductPurchase slug={product.slug} />
          <dl className="mt-10 divide-y divide-line border-y border-line">
            {specs.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-6 py-3 text-sm">
                <dt className="text-stone">{label}</dt>
                <dd className="text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-serif text-4xl">More from this edit</h2>
        <div className="mt-8">
          <ProductGrid products={getRelated(product)} />
        </div>
      </section>
    </div>
  );
}
