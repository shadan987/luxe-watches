"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { formatPrice, getProduct } from "@/data/products";

export function CheckoutForm() {
  const { lines, ready, clear } = useCart();
  const [orderId, setOrderId] = useState<string | null>(null);

  const summary = useMemo(() => {
    const items = lines
      .map((line) => {
        const product = getProduct(line.slug);
        return product ? { line, product } : null;
      })
      .filter((item) => item !== null);
    const subtotal = items.reduce(
      (total, item) => total + item.product.price * item.line.quantity,
      0,
    );
    const shipping = subtotal === 0 || subtotal >= 500 ? 0 : 25;
    return { items, subtotal, shipping, total: subtotal + shipping };
  }, [lines]);

  if (!ready) {
    return <p className="text-stone">Preparing checkout…</p>;
  }

  if (orderId) {
    return (
      <div className="mx-auto max-w-xl border border-line bg-card px-6 py-14 text-center sm:px-10">
        <p className="text-[11px] tracking-[0.22em] uppercase text-brass">
          Order placed
        </p>
        <h2 className="mt-3 font-serif text-5xl">Thank you</h2>
        <p className="mt-4 text-sm leading-6 text-stone">
          Sample order <span className="text-ink">{orderId}</span> is confirmed.
          This boutique does not charge a card or ship a watch.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block bg-ink px-8 py-4 text-xs tracking-[0.2em] text-ivory uppercase"
        >
          Continue browsing
        </Link>
      </div>
    );
  }

  if (summary.items.length === 0) {
    return (
      <div className="border border-line bg-card px-6 py-16 text-center">
        <p className="font-serif text-4xl">Nothing to check out</p>
        <Link
          href="/shop"
          className="mt-8 inline-block bg-ink px-8 py-4 text-xs tracking-[0.2em] text-ivory uppercase"
        >
          Browse watches
        </Link>
      </div>
    );
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = `LX-${Math.floor(100000 + Math.random() * 900000)}`;
    clear();
    setOrderId(id);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={onSubmit} className="space-y-5">
        <fieldset className="space-y-4">
          <legend className="font-serif text-3xl">Delivery</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First name" name="firstName" autoComplete="given-name" />
            <Field label="Last name" name="lastName" autoComplete="family-name" />
          </div>
          <Field label="Email" name="email" type="email" autoComplete="email" />
          <Field label="Address" name="address" autoComplete="street-address" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="City" name="city" autoComplete="address-level2" />
            <Field label="Postal code" name="postal" autoComplete="postal-code" />
          </div>
        </fieldset>
        <fieldset className="space-y-4">
          <legend className="font-serif text-3xl">Payment</legend>
          <p className="text-sm text-stone">
            Card details are collected for the layout only and are not sent
            anywhere.
          </p>
          <Field label="Name on card" name="cardName" autoComplete="cc-name" />
          <Field
            label="Card number"
            name="cardNumber"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="4242 4242 4242 4242"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Expiry" name="expiry" autoComplete="cc-exp" placeholder="MM/YY" />
            <Field label="CVC" name="cvc" inputMode="numeric" autoComplete="cc-csc" placeholder="123" />
          </div>
        </fieldset>
        <button
          type="submit"
          className="w-full bg-ink px-8 py-4 text-xs tracking-[0.2em] text-ivory uppercase hover:bg-brass sm:w-auto"
        >
          Place sample order · {formatPrice(summary.total)}
        </button>
      </form>

      <aside className="h-fit border border-line bg-card p-6">
        <h2 className="font-serif text-3xl">Your order</h2>
        <ul className="mt-6 space-y-4 text-sm">
          {summary.items.map(({ line, product }) => (
            <li key={product.slug} className="flex justify-between gap-4">
              <span>
                {product.name}
                <span className="text-stone"> × {line.quantity}</span>
              </span>
              <span>{formatPrice(product.price * line.quantity)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-6 space-y-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-stone">Shipping</dt>
            <dd>{summary.shipping === 0 ? "Complimentary" : formatPrice(summary.shipping)}</dd>
          </div>
          <div className="flex justify-between text-base">
            <dt>Total</dt>
            <dd>{formatPrice(summary.total)}</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  placeholder,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  inputMode?: "numeric" | "text";
}) {
  return (
    <label className="block text-sm">
      <span className="text-[11px] tracking-[0.16em] uppercase text-stone">
        {label}
      </span>
      <input
        required
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        inputMode={inputMode}
        className="mt-2 w-full border border-line bg-paper px-3 py-3 outline-none focus:border-ink"
      />
    </label>
  );
}
