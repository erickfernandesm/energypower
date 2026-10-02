"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { CartLines } from "./CartLines";
import { CheckoutButton } from "./CheckoutButton";
import { useShop } from "./ShopProvider";

export function CartView() {
  const { ready, lines, count, subtotal, total, clearCart } = useShop();

  if (!ready) {
    return <div aria-busy="true" className="h-64 animate-pulse rounded-3xl bg-surface" />;
  }

  if (lines.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-line px-6 py-20 text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-raised text-muted">
          <ShoppingBag className="size-7" />
        </span>
        <p className="display mt-6 text-3xl">Seu carrinho está vazio</p>
        <p className="mx-auto mt-3 max-w-sm text-muted">Escolha seus produtos e finalize o pedido em uma mensagem no WhatsApp.</p>
        <Link href="/produtos" className={buttonClass("primary", "md", "mt-7")}>
          Ver produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_24rem] lg:gap-10">
      <section aria-label="Itens do carrinho" className="rounded-3xl border border-line bg-surface p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-muted">
            {count} {count === 1 ? "item" : "itens"}
          </p>
          <button type="button" onClick={clearCart} className="h-10 px-2 text-sm font-medium text-muted transition-colors hover:text-accent">
            Esvaziar carrinho
          </button>
        </div>
        <CartLines />
      </section>

      <aside aria-label="Resumo do pedido" className="rounded-3xl border border-line bg-surface p-5 sm:p-7 lg:sticky lg:top-24">
        <h2 className="display text-2xl">Resumo</h2>
        <dl className="mt-5 space-y-3 text-[0.9375rem]">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Entrega ou retirada</dt>
            <dd className="text-right text-muted">A combinar</dd>
          </div>
          <div className="flex items-baseline justify-between border-t border-line pt-4">
            <dt className="font-semibold">Total</dt>
            <dd className="text-2xl font-bold tabular-nums">{formatPrice(total)}</dd>
          </div>
        </dl>

        <CheckoutButton className="mt-6 w-full" />
        <p className="mt-3 text-center text-xs leading-relaxed text-muted">
          O pedido abre pronto no WhatsApp da loja. Pagamento e entrega são combinados na conversa.
          {site.catalogIsDemo && " Valores ilustrativos, sujeitos a confirmação."}
        </p>

        <Link href="/produtos" className={buttonClass("ghost", "sm", "mt-4 w-full")}>
          <ArrowLeft className="size-4" />
          Continuar comprando
        </Link>
      </aside>
    </div>
  );
}
