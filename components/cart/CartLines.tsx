"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { ProductImage } from "@/components/products/ProductImage";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { formatPrice } from "@/lib/format";
import { brandName } from "@/lib/products";
import { useShop } from "./ShopProvider";

interface CartLinesProps {
  /** Chamado ao clicar em um produto (ex.: fechar a gaveta). */
  onNavigate?: () => void;
}

/** Lista de itens do carrinho, usada na gaveta e na página /carrinho. */
export function CartLines({ onNavigate }: CartLinesProps) {
  const { lines, removeItem, setQuantity } = useShop();

  return (
    <ul className="divide-y divide-line">
      {lines.map(({ product, quantity, lineTotal }) => (
        <li key={product.id} className="flex gap-3.5 py-4 first:pt-0 last:pb-0 sm:gap-4">
          <Link
            href={`/produtos/${product.slug}`}
            onClick={onNavigate}
            tabIndex={-1}
            aria-hidden="true"
            className="grid size-20 shrink-0 place-items-center rounded-xl bg-raised p-2 sm:size-24"
          >
            <ProductImage product={product} decorative sizes="96px" className="size-full" />
          </Link>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted">{brandName(product)}</p>
                <Link
                  href={`/produtos/${product.slug}`}
                  onClick={onNavigate}
                  className="mt-0.5 block text-sm font-semibold leading-snug text-fg hover:text-brand sm:text-[0.9375rem]"
                >
                  {product.name}
                </Link>
              </div>
              <button
                type="button"
                onClick={() => removeItem(product.id)}
                aria-label={`Remover ${product.name} do carrinho`}
                className="-mr-2 -mt-2 grid size-10 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-accent"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            <div className="mt-auto flex items-center justify-between gap-3 pt-3">
              <QuantityStepper
                size="sm"
                value={quantity}
                min={1}
                onChange={(value) => setQuantity(product.id, value)}
                label={product.name}
              />
              <p className="font-bold tabular-nums">{formatPrice(lineTotal)}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
