import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <p className="text-[11px] tracking-[0.22em] uppercase text-brass">404</p>
      <h1 className="mt-3 font-serif text-6xl">This page is not in the case</h1>
      <p className="mt-4 text-sm text-stone">
        The watch or collection you asked for is not part of this sample shop.
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-block bg-ink px-8 py-4 text-xs tracking-[0.2em] text-ivory uppercase"
      >
        Back to the shop
      </Link>
    </div>
  );
}
