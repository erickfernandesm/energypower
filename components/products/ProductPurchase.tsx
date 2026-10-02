"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useShop } from "@/components/cart/ShopProvider";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import type { Product } from "@/types";
import { FavoriteButton } from "./FavoriteButton";

/** Bloco de compra da página de produto: quantidade e as três formas de comprar. */
export function ProductPurchase({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  function handleBuy() {
    addItem(product.id, quantity, { silent: true });
    router.push("/carrinho");
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <QuantityStepper value={quantity} onChange={setQuantity} label={product.name} />
        <button type="button" onClick={handleBuy} className={buttonClass("primary", "md", "min-w-0 flex-1 px-4")}>
          Comprar agora
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button type="button" onClick={handleAdd} className={buttonClass("secondary", "md", "min-w-0 flex-1 px-4")}>
          {added ? <Check className="size-4 text-brand" /> : <ShoppingBag className="size-4" />}
          <span aria-live="polite">{added ? "Adicionado ao carrinho" : "Adicionar ao carrinho"}</span>
        </button>
        <FavoriteButton productId={product.id} productName={product.name} className="size-12 shrink-0 bg-raised" />
      </div>

      <a
        href={whatsappUrl(whatsappMessages.product(product, quantity))}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass("whatsapp", "md", "w-full")}
      >
        <WhatsAppIcon className="size-5 text-whats" />
        Comprar pelo WhatsApp
      </a>
    </div>
  );
}
