import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-ivory">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <p className="font-serif text-4xl tracking-[0.16em]">LUXE</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-ivory/70">
            A demonstration boutique of men’s and women’s watches. Prices,
            stock, and checkout are sample data — nothing is charged.
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-brass-soft">
            Shop
          </p>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            <li>
              <Link href="/shop/men" className="hover:text-ivory">
                Men’s watches
              </Link>
            </li>
            <li>
              <Link href="/shop/women" className="hover:text-ivory">
                Women’s watches
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-ivory">
                Your bag
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-brass-soft">
            Atelier
          </p>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            <li>Two-year warranty on every piece</li>
            <li>Free returns within 30 days</li>
            <li>Servicing through our workshop</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs tracking-[0.14em] uppercase text-ivory/50">
        © {new Date().getFullYear()} Luxe Watches
      </div>
    </footer>
  );
}
