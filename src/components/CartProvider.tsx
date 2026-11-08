"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartLine = {
  slug: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  ready: boolean;
  count: number;
  add: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "luxe-watches-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) {
          setLines(
            parsed.filter(
              (line) =>
                typeof line.slug === "string" &&
                Number.isInteger(line.quantity) &&
                line.quantity > 0,
            ),
          );
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((total, line) => total + line.quantity, 0);

    return {
      lines,
      ready,
      count,
      add(slug, quantity = 1) {
        setLines((current) => {
          const existing = current.find((line) => line.slug === slug);
          if (!existing) return [...current, { slug, quantity }];
          return current.map((line) =>
            line.slug === slug
              ? { ...line, quantity: Math.min(9, line.quantity + quantity) }
              : line,
          );
        });
      },
      setQuantity(slug, quantity) {
        setLines((current) =>
          quantity < 1
            ? current.filter((line) => line.slug !== slug)
            : current.map((line) =>
                line.slug === slug
                  ? { ...line, quantity: Math.min(9, quantity) }
                  : line,
              ),
        );
      },
      remove(slug) {
        setLines((current) => current.filter((line) => line.slug !== slug));
      },
      clear() {
        setLines([]);
      },
    };
  }, [lines, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
