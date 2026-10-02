/**
 * Configuração central da loja.
 * Tudo que é dado da empresa fica aqui: basta editar este arquivo.
 *
 * Fontes dos dados (pesquisa em out/2026):
 * - Endereço, telefone e WhatsApp: bio do Instagram @energypowersuplementosjf
 * - Marcas: destaques do mesmo perfil
 * Campos com `null` não foram encontrados em fonte oficial e devem ser
 * preenchidos pela loja. O site já trata o caso vazio.
 */

export interface OpeningHours {
  days: string;
  hours: string;
  /** Formato schema.org, ex.: "Mo-Fr 09:00-18:00". */
  schema: string;
}

/**
 * TODO(loja): horário não encontrado em fonte oficial.
 * Exemplo: [{ days: "Segunda a sexta", hours: "09h às 18h", schema: "Mo-Fr 09:00-18:00" }]
 */
const hours: OpeningHours[] | null = null;

export const site = {
  name: "Energy Power Suplementos",
  shortName: "Energy Power",
  /** Domínio de produção. Defina NEXT_PUBLIC_SITE_URL no deploy. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  description:
    "Loja de suplementos no Centro de Juiz de Fora. Whey protein, creatina, pré-treino, vitaminas e acessórios de marcas reconhecidas, com atendimento pelo WhatsApp.",

  address: {
    street: "Av. Rio Branco, 2099",
    district: "Centro",
    city: "Juiz de Fora",
    state: "MG",
    postalCode: "36013-020",
  },

  phone: {
    display: "(32) 3212-4022",
    e164: "+553232124022",
  },

  whatsapp: {
    display: "(32) 3212-4022",
    /** Somente dígitos, com DDI. */
    number: "553232124022",
  },

  instagram: {
    handle: "@energypowersuplementosjf",
    url: "https://www.instagram.com/energypowersuplementosjf/",
  },

  hours: hours as OpeningHours[] | null,

  // O mapa aponta para o endereço (e não para o nome) porque existe outra
  // loja de nome parecido na cidade e a busca por nome marcava as duas.
  maps: {
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Av.%20Bar%C3%A3o%20do%20Rio%20Branco%2C%202099%20-%20Centro%2C%20Juiz%20de%20Fora%20-%20MG",
    embed:
      "https://www.google.com/maps?q=Av.%20Bar%C3%A3o%20do%20Rio%20Branco%2C%202099%20-%20Centro%2C%20Juiz%20de%20Fora%20-%20MG&z=17&output=embed",
  },

  /**
   * Enquanto `true`, o site mostra um aviso de catálogo demonstrativo e
   * não publica preços no schema.org. Mude para `false` quando o catálogo
   * real estiver em /data/products.ts.
   */
  catalogIsDemo: true,
};

export const fullAddress = `${site.address.street} - ${site.address.district}, ${site.address.city} - ${site.address.state}`;
