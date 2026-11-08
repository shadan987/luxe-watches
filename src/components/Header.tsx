"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";

const links = [
  { href: "/shop", label: "All watches" },
  { href: "/shop/men", label: "Men" },
  { href: "/shop/women", label: "Women" },
];

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-ivory/90 backdrop-blur-md">
      <div className="bg-ink text-ivory">
        <p className="mx-auto max-w-6xl px-5 py-2 text-center text-[11px] tracking-[0.22em] uppercase">
          Complimentary shipping on orders over $500
        </p>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <button
          type="button"
          className="text-xs tracking-[0.18em] uppercase md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <Link href="/" className="font-serif text-3xl tracking-[0.18em]">
          LUXE
        </Link>

        <nav className="hidden items-center gap-8 text-xs tracking-[0.18em] uppercase md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brass">
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/cart"
          className="text-xs tracking-[0.18em] uppercase hover:text-brass"
        >
          Bag{count > 0 ? ` (${count})` : ""}
        </Link>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-line px-5 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-4 text-sm tracking-[0.16em] uppercase">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
