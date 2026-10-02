import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { fullAddress, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Condições de uso do site da Energy Power Suplementos.",
  alternates: { canonical: "/termos" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Termos de Uso">
      <p>
        Este site pertence à {site.name}, com loja física em {fullAddress}. Ao usá-lo, você concorda com as condições
        abaixo.
      </p>

      <h2>Como funcionam os pedidos</h2>
      <p>
        O site é uma vitrine com carrinho. O pedido é enviado para a loja pelo WhatsApp e só é confirmado depois que a
        equipe responde, confirmando disponibilidade, valor final, forma de pagamento e entrega ou retirada.
      </p>

      <h2>Preços e disponibilidade</h2>
      <p>
        Preços, promoções e estoque podem mudar sem aviso. Vale sempre o valor confirmado pela loja no momento do
        atendimento.
      </p>

      <h2>Uso dos produtos</h2>
      <p>
        As informações do site têm caráter informativo e não substituem a orientação de nutricionista ou médico.
        Leia o rótulo e siga as recomendações do fabricante.
      </p>

      <h2>Marcas</h2>
      <p>As marcas de produtos citadas pertencem aos seus respectivos fabricantes.</p>
    </LegalPage>
  );
}
