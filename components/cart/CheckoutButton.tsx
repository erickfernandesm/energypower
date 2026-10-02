"use client";

import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { activeCheckout } from "@/lib/checkout";
import { useShop } from "./ShopProvider";

/**
 * Botão "Finalizar pedido".
 * Usa o provedor ativo em /lib/checkout.ts. Hoje ele monta a mensagem do
 * pedido e abre o WhatsApp da loja.
 */
export function CheckoutButton({ className }: { className?: string }) {
  const { lines, total } = useShop();
  if (lines.length === 0) return null;

  const { redirectUrl, newTab } = activeCheckout.start(lines, total);

  return (
    <a
      href={redirectUrl}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className={buttonClass("primary", "lg", className)}
    >
      {activeCheckout.id === "whatsapp" && <WhatsAppIcon className="size-5" />}
      Finalizar pedido
    </a>
  );
}
