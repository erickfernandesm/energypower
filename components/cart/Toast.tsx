"use client";

import { Check } from "lucide-react";
import { useShop } from "./ShopProvider";

/** Aviso rápido ao adicionar um produto, com atalho para o carrinho. */
export function Toast() {
  const { toast, dismissToast, setCartOpen } = useShop();

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
    >
      {toast && (
        <div
          key={toast.id}
          className="pointer-events-auto flex w-full max-w-md animate-toast items-center gap-3 rounded-2xl border border-line bg-raised py-2.5 pl-4 pr-2.5 shadow-2xl shadow-black/70"
        >
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-black">
            <Check className="size-4" strokeWidth={3} />
          </span>
          <p className="min-w-0 flex-1 text-sm font-medium leading-snug">{toast.message}</p>
          <button
            type="button"
            onClick={() => {
              dismissToast();
              setCartOpen(true);
            }}
            className="h-10 shrink-0 rounded-full px-3.5 text-sm font-semibold text-brand transition-colors hover:bg-white/10"
          >
            Ver carrinho
          </button>
        </div>
      )}
    </div>
  );
}
