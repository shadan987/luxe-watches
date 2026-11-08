import Image from "next/image";
import Link from "next/link";
import { QuickAdd } from "@/components/QuickAdd";
import { categoryLabel, formatPrice, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#ebe4d8]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-stone">
              {categoryLabel(product.category)}
            </p>
            <h3 className="mt-1 font-serif text-2xl leading-none">
              {product.name}
            </h3>
          </div>
          <p className="pt-5 text-sm">{formatPrice(product.price)}</p>
        </div>
      </Link>
      <QuickAdd slug={product.slug} />
    </article>
  );
}
