import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Carrinho",
  description: "Revise seus produtos e finalize o pedido pelo WhatsApp da Energy Power.",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <div className="container-page pb-20 pt-8 sm:pt-12">
      <header className="mb-8 sm:mb-10">
        <p className="eyebrow mb-3">Seu pedido</p>
        <h1 className="display text-5xl sm:text-6xl">Carrinho</h1>
      </header>
      <CartView />
    </div>
  );
}
