import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Trocas e Devoluções",
  description: "Como solicitar troca ou devolução de compras na Energy Power Suplementos.",
  alternates: { canonical: "/trocas-e-devolucoes" },
};

export default function ReturnsPage() {
  return (
    <LegalPage title="Trocas e Devoluções">
      <p>
        Queremos que você fique satisfeito com a sua compra. Se algo não saiu como esperado, fale com a loja e
        resolvemos juntos.
      </p>

      <h2>Compras feitas à distância</h2>
      <p>
        Em compras feitas fora da loja física (por exemplo, pelo WhatsApp com entrega), o Código de Defesa do
        Consumidor garante o direito de arrependimento em até 7 dias corridos após o recebimento. O produto deve estar
        lacrado e sem sinais de uso.
      </p>

      <h2>Produto com defeito ou avaria</h2>
      <p>
        Recebeu um produto danificado, violado ou diferente do pedido? Entre em contato assim que possível, de
        preferência com fotos, para combinarmos a troca.
      </p>

      <h2>Como solicitar</h2>
      <ul>
        <li>
          Chame a loja no <a href={whatsappUrl("Olá! Preciso de ajuda com uma troca ou devolução.")}>WhatsApp {site.whatsapp.display}</a>.
        </li>
        <li>Informe o que foi comprado, a data e o motivo.</li>
        <li>Tenha em mãos o comprovante da compra.</li>
      </ul>
    </LegalPage>
  );
}
