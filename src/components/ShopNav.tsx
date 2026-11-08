import Link from "next/link";

const items = [
  { href: "/shop", id: "all", label: "All" },
  { href: "/shop/men", id: "men", label: "Men" },
  { href: "/shop/women", id: "women", label: "Women" },
] as const;

export function ShopNav({ current }: { current: "all" | "men" | "women" }) {
  return (
    <nav className="my-8 flex flex-wrap gap-2" aria-label="Collections">
      {items.map((item) => {
        const active = item.id === current;
        return (
          <Link
            key={item.id}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`border px-4 py-2 text-[11px] tracking-[0.18em] uppercase ${
              active
                ? "border-ink bg-ink text-ivory"
                : "border-line bg-card text-ink hover:border-ink"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
