"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ShoppingBag, X } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { formatPrice } from "@/lib/format";
import { CartLines } from "./CartLines";
import { CheckoutButton } from "./CheckoutButton";
import { useShop } from "./ShopProvider";

export function CartDrawer() {
  const pathname = usePathname();
  const { cartOpen, setCartOpen, lines, count, total } = useShop();
  const close = () => setCartOpen(false);

  // Fecha ao trocar de página.
  useEffect(() => setCartOpen(false), [pathname, setCartOpen]);

  return (
    <Dialog
      open={cartOpen}
      onClose={close}
      label="Carrinho"
      from="right"
      className="justify-end"
      panelClassName="flex h-full w-full max-w-md flex-col border-l border-line bg-surface"
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-line pl-5 pr-2.5">
        <h2 className="display text-2xl">
          Carrinho
          {count > 0 && <span className="ml-2 font-sans text-sm font-semibold not-italic text-muted">({count})</span>}
        </h2>
        <button
          type="button"
          onClick={close}
          aria-label="Fechar carrinho"
          className="grid size-11 place-items-center rounded-full text-fg transition-colors hover:bg-white/10"
        >
          <X className="size-5" />
        </button>
      </div>

      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-raised text-muted">
            <ShoppingBag className="size-7" />
          </span>
          <p className="mt-5 text-lg font-semibold">Seu carrinho está vazio</p>
          <p className="mt-1.5 text-sm text-muted">Adicione produtos e finalize o pedido pelo WhatsApp.</p>
          <Link href="/produtos" onClick={close} className={buttonClass("primary", "md", "mt-6")}>
            Ver produtos
          </Link>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-5">
            <CartLines onNavigate={close} />
          </div>

          <div className="shrink-0 space-y-3 border-t border-line bg-ink/40 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <div className="flex items-baseline justify-between">
              <span className="text-muted">Total</span>
              <span className="text-2xl font-bold tabular-nums">{formatPrice(total)}</span>
            </div>
            <CheckoutButton className="w-full" />
            <div className="flex gap-2">
              <button type="button" onClick={close} className={buttonClass("secondary", "sm", "flex-1")}>
                Continuar comprando
              </button>
              <Link href="/carrinho" onClick={close} className={buttonClass("ghost", "sm", "flex-1")}>
                Ver carrinho
              </Link>
            </div>
          </div>
        </>
      )}
    </Dialog>
  );
}
