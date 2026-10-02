import { site } from "./site";
import { formatPrice } from "./format";
import type { CartLine, Product } from "@/types";

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${site.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

const units = (n: number) => `${n} ${n === 1 ? "unidade" : "unidades"}`;

export const whatsappMessages = {
  general: "Olá! Vim pelo site da Energy Power e gostaria de tirar uma dúvida.",
  product: (product: Product, quantity = 1) =>
    `Olá! Tenho interesse neste produto do site da Energy Power:\n\n• ${product.name} — ${units(quantity)}\n\nPode me passar disponibilidade e valor?`,
};

export function buildOrderMessage(lines: CartLine[], total: number): string {
  const items = lines
    .map((l) => `• ${l.product.name} — ${units(l.quantity)} (${formatPrice(l.lineTotal)})`)
    .join("\n");
  return `Olá! Gostaria de fazer um pedido na Energy Power:\n\n${items}\n\nTotal: ${formatPrice(total)}`;
}
