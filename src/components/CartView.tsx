"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice, getProduct } from "@/data/products";

export function CartView() {
  const { lines, ready, setQuantity, remove } = useCart();

  if (!ready) {
    return <p className="text-stone">Opening your bag…</p>;
  }

  const items = lines
    .map((line) => {
      const product = getProduct(line.slug);
      return product ? { line, product } : null;
    })
    .filter((item) => item !== null);

  if (items.length === 0) {
    return (
      <div className="border border-line bg-card px-6 py-16 text-center">
        <p className="font-serif text-4xl">Your bag is empty</p>
        <p className="mx-auto mt-3 max-w-md text-sm text-stone">
          The men’s and women’s edits are ready when you are.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block bg-ink px-8 py-4 text-xs tracking-[0.2em] text-ivory uppercase"
        >
          Browse watches
        </Link>
      </div>
    );
  }

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.line.quantity,
    0,
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
      <ul className="divide-y divide-line border-y border-line">
        {items.map(({ line, product }) => (
          <li key={product.slug} className="flex gap-4 py-6 sm:gap-6">
            <Link
              href={`/product/${product.slug}`}
              className="relative h-32 w-24 shrink-0 overflow-hidden bg-[#ebe4d8] sm:h-40 sm:w-32"
            >
              <Image
                src={product.image}
                alt=""
                fill
                sizes="128px"
                className="object-cover"
              />
            </Link>
            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] tracking-[0.18em] uppercase text-stone">
                    {product.category === "men" ? "Men" : "Women"}
                  </p>
                  <Link
                    href={`/product/${product.slug}`}
                    className="font-serif text-2xl leading-tight"
                  >
                    {product.name}
                  </Link>
                </div>
                <p className="text-sm">
                  {formatPrice(product.price * line.quantity)}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between pt-4">
                <div className="flex items-center border border-line">
                  <button
                    type="button"
                    className="h-9 w-9"
                    aria-label={`Decrease ${product.name}`}
                    onClick={() => setQuantity(product.slug, line.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm">{line.quantity}</span>
                  <button
                    type="button"
                    className="h-9 w-9"
                    aria-label={`Increase ${product.name}`}
                    onClick={() => setQuantity(product.slug, line.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="text-[11px] tracking-[0.16em] uppercase text-stone hover:text-ink"
                  onClick={() => remove(product.slug)}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="h-fit border border-line bg-card p-6">
        <h2 className="font-serif text-3xl">Summary</h2>
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-stone">Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-stone">Shipping</dt>
            <dd>{subtotal >= 500 ? "Complimentary" : formatPrice(25)}</dd>
          </div>
          <div className="flex justify-between border-t border-line pt-3 text-base">
            <dt>Total</dt>
            <dd>{formatPrice(subtotal + (subtotal >= 500 ? 0 : 25))}</dd>
          </div>
        </dl>
        <Link
          href="/checkout"
          className="mt-6 block bg-ink px-6 py-4 text-center text-xs tracking-[0.2em] text-ivory uppercase hover:bg-brass"
        >
          Checkout
        </Link>
        <p className="mt-3 text-xs leading-5 text-stone">
          Demo checkout only. No payment is taken.
        </p>
      </aside>
    </div>
  );
}
