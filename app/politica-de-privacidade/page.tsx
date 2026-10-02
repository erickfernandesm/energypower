import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como o site da Energy Power Suplementos trata os seus dados.",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de Privacidade">
      <p>
        Esta página explica, de forma direta, quais dados o site da {site.name} utiliza e para quê.
      </p>

      <h2>O que fica no seu navegador</h2>
      <p>
        O carrinho e a lista de favoritos são salvos apenas no seu próprio navegador (armazenamento local). Essas
        informações não são enviadas para nenhum servidor nosso e você pode apagá-las limpando os dados do site.
      </p>

      <h2>Pedidos pelo WhatsApp</h2>
      <p>
        Ao finalizar um pedido, o site monta uma mensagem com os itens escolhidos e abre o WhatsApp. A partir daí, a
        conversa acontece no WhatsApp e segue as regras de privacidade daquele serviço. Usamos os dados informados na
        conversa (nome, telefone, endereço de entrega) somente para atender o seu pedido.
      </p>

      <h2>Serviços de terceiros</h2>
      <p>
        A página inicial exibe um mapa do Google Maps. Ao carregá-lo, o Google pode coletar dados conforme a política
        de privacidade dele.
      </p>

      <h2>Seus direitos</h2>
      <p>
        Você pode pedir informações, correção ou exclusão dos dados que nos forneceu, conforme a Lei Geral de Proteção
        de Dados (LGPD). Basta falar com a loja pelo <a href={whatsappUrl()}>WhatsApp {site.whatsapp.display}</a>.
      </p>
    </LegalPage>
  );
}
