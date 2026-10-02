"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Check, ShoppingBag } from "lucide-react";
import { useShop } from "@/components/cart/ShopProvider";
import { brandName } from "@/lib/products";
import { discountPercent, cn } from "@/lib/format";
import type { Product, ProductBadge } from "@/types";
import { FavoriteButton } from "./FavoriteButton";
import { Price } from "./Price";
import { ProductImage } from "./ProductImage";

const badgeLabels: Record<ProductBadge, string> = {
  "mais-vendido": "Mais vendido",
  oferta: "Oferta",
  novo: "Novo",
};

const badgeStyles: Record<ProductBadge, string> = {
  "mais-vendido": "bg-brand text-black",
  oferta: "bg-accent text-white",
  novo: "bg-fg text-black",
};

interface ProductCardProps {
  product: Product;
  /** Carrega a imagem com prioridade (primeira dobra). */
  priority?: boolean;
}

export function ProductCard({ product, priority }: ProductCardProps) {
  const router = useRouter();
  const { addItem } = useShop();
  const [added, setAdded] = useState(false);
  const discount = discountPercent(product.price, product.oldPrice);
  const href = `/produtos/${product.slug}`;

  function handleAdd() {
    addItem(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  function handleBuy() {
    addItem(product.id, 1, { silent: true });
    router.push("/carrinho");
  }

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-brand/50">
      <div className="relative aspect-square overflow-hidden bg-[radial-gradient(circle_at_50%_38%,#232328_0%,var(--color-surface)_70%)]">
        <Link href={href} tabIndex={-1} aria-hidden="true" className="block size-full p-5 sm:p-7">
          <ProductImage
            product={product}
            decorative
            priority={priority}
            className="size-full transition-transform duration-500 ease-out-quint group-hover:scale-[1.06]"
          />
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.badge && (
            <span className={cn("rounded-full px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wide", badgeStyles[product.badge])}>
              {badgeLabels[product.badge]}
            </span>
          )}
          {discount && (
            <span className="rounded-full border border-accent/60 bg-ink/80 px-2.5 py-1 text-[0.6875rem] font-bold text-fg backdrop-blur">
              -{discount}%
            </span>
          )}
        </div>

        <FavoriteButton productId={product.id} productName={product.name} className="absolute right-3 top-3" />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted">{brandName(product)}</p>
        <h3 className="mt-1.5 text-[0.9375rem] font-semibold leading-snug text-fg sm:text-base">
          <Link href={href} className="outline-offset-4 transition-colors hover:text-brand">
            {product.name}
          </Link>
        </h3>

        <Price product={product} className="mt-3" />

        <div className="mt-auto flex flex-col gap-1 pt-4">
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Adicionar ${product.name} ao carrinho`}
            className={cn(
              "inline-flex h-11 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-[background-color,transform] duration-200 active:scale-[0.97]",
              added ? "bg-fg text-black" : "bg-brand text-black hover:bg-brand-strong",
            )}
          >
            {added ? <Check className="size-4" /> : <ShoppingBag className="size-4" />}
            <span aria-live="polite">{added ? "Adicionado" : "Adicionar"}</span>
          </button>
          <button
            type="button"
            onClick={handleBuy}
            aria-label={`Comprar ${product.name} agora`}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full text-sm font-semibold text-muted transition-colors hover:text-fg"
          >
            Comprar agora
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
