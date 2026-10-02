"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

/** Botão flutuante de atendimento. Some no carrinho, onde o CTA já é o WhatsApp. */
export function WhatsAppFloat() {
  const pathname = usePathname();
  if (pathname === "/carrinho") return null;

  return (
    <a
      href={whatsappUrl(whatsappMessages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Tirar dúvidas pelo WhatsApp"
      className="group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 flex h-14 items-center rounded-full bg-whats text-black shadow-lg shadow-black/50 transition-transform duration-200 hover:scale-[1.04] active:scale-95 sm:bottom-6 sm:right-6"
    >
      <span className="grid size-14 place-items-center">
        <WhatsAppIcon className="size-7" />
      </span>
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-[max-width,padding] duration-300 ease-out-quint group-hover:max-w-52 group-hover:pr-5 group-focus-visible:max-w-52 group-focus-visible:pr-5 md:block">
        Tirar dúvidas pelo WhatsApp
      </span>
    </a>
  );
}
