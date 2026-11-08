import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/data/products";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
