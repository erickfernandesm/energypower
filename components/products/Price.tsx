import { discountPercent, formatPrice, cn } from "@/lib/format";
import type { Product } from "@/types";

interface PriceProps {
  product: Pick<Product, "price" | "oldPrice">;
  size?: "sm" | "lg";
  className?: string;
}

export function Price({ product, size = "sm", className }: PriceProps) {
  const discount = discountPercent(product.price, product.oldPrice);
  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5", className)}>
      <span className={cn("font-bold tabular-nums text-fg", size === "lg" ? "text-4xl tracking-tight" : "text-lg")}>
        {formatPrice(product.price)}
      </span>
      {discount && product.oldPrice && (
        <>
          <span className={cn("tabular-nums text-muted line-through", size === "lg" ? "text-lg" : "text-sm")}>
            <span className="sr-only">Preço anterior: </span>
            {formatPrice(product.oldPrice)}
          </span>
          {size === "lg" && (
            <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-white">
              {discount}% de desconto
            </span>
          )}
        </>
      )}
    </div>
  );
}
