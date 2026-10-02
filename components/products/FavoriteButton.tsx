"use client";

import { Heart } from "lucide-react";
import { useShop } from "@/components/cart/ShopProvider";
import { cn } from "@/lib/format";

interface FavoriteButtonProps {
  productId: string;
  productName: string;
  className?: string;
}

export function FavoriteButton({ productId, productName, className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useShop();
  const active = isFavorite(productId);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(productId)}
      aria-pressed={active}
      aria-label={active ? `Remover ${productName} dos favoritos` : `Favoritar ${productName}`}
      className={cn(
        "grid size-10 place-items-center rounded-full border border-line bg-ink/70 backdrop-blur transition-colors hover:border-fg/40",
        active ? "text-accent" : "text-muted hover:text-fg",
        className,
      )}
    >
      <Heart key={String(active)} className={cn("size-[18px]", active && "animate-pop fill-current")} />
    </button>
  );
}
