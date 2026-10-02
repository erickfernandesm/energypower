import { cn } from "@/lib/format";
import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  /** Colunas no desktop largo. */
  columns?: 3 | 4;
  /** Quantos cards da primeira linha carregam com prioridade. */
  priorityCount?: number;
  className?: string;
}

export function ProductGrid({ products, columns = 4, priorityCount = 0, className }: ProductGridProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-3 sm:gap-5",
        columns === 4 ? "md:grid-cols-3 xl:grid-cols-4" : "lg:grid-cols-3",
        className,
      )}
    >
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard product={product} priority={index < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
