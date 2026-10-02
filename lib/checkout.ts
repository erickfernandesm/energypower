import type { CartLine } from "@/types";
import { buildOrderMessage, whatsappUrl } from "./whatsapp";

/**
 * Camada de checkout.
 *
 * Hoje o pedido é finalizado pelo WhatsApp. Para ligar um checkout online
 * (Mercado Pago, Stripe, Pix...), crie outro CheckoutProvider que chame a
 * sua API e troque `activeCheckout` abaixo. O carrinho e a interface não
 * precisam mudar.
 */
export interface CheckoutResult {
  /** URL para onde o cliente deve ser levado para concluir o pedido. */
  redirectUrl: string;
  /** Abrir em nova aba (WhatsApp) ou na mesma (gateway de pagamento). */
  newTab: boolean;
}

export interface CheckoutProvider {
  id: string;
  label: string;
  start(lines: CartLine[], total: number): CheckoutResult;
}

export const whatsappCheckout: CheckoutProvider = {
  id: "whatsapp",
  label: "Finalizar pedido no WhatsApp",
  start(lines, total) {
    return { redirectUrl: whatsappUrl(buildOrderMessage(lines, total)), newTab: true };
  },
};

export const activeCheckout: CheckoutProvider = whatsappCheckout;
