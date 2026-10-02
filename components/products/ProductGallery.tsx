"use client";

import { useState } from "react";
import { cn } from "@/lib/format";
import type { Product } from "@/types";
import { ProductImage } from "./ProductImage";

/**
 * Galeria da página de produto.
 * Com uma foto (ou só a ilustração) mostra a imagem principal; com várias
 * fotos em `product.images`, exibe as miniaturas para alternar.
 */
export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const count = Math.max(product.images.length, 1);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-[radial-gradient(circle_at_50%_40%,#26262b_0%,var(--color-surface)_72%)]">
        <span aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]" />
        <ProductImage
          key={active}
          product={product}
          index={active}
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="relative size-full p-10 sm:p-16"
        />
      </div>

      {count > 1 && (
        <ul className="flex gap-3" aria-label="Fotos do produto">
          {Array.from({ length: count }, (_, index) => (
            <li key={index}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Ver foto ${index + 1} de ${count}`}
                aria-current={active === index}
                className={cn(
                  "size-20 overflow-hidden rounded-2xl border bg-surface p-2 transition-colors",
                  active === index ? "border-brand" : "border-line hover:border-fg/40",
                )}
              >
                <ProductImage product={product} index={index} decorative sizes="80px" className="size-full" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
