import type { Product } from "@/types";

/**
 * CATÁLOGO DEMONSTRATIVO
 * ----------------------------------------------------------------------
 * Os itens abaixo são exemplos para o site funcionar de ponta a ponta.
 * Nomes são genéricos e os PREÇOS SÃO ILUSTRATIVOS: não representam o
 * catálogo nem os valores reais da Energy Power.
 *
 * Para publicar o catálogo real:
 * 1. Substitua os itens deste arquivo (ou troque /lib/products.ts para
 *    buscar de uma API ou banco de dados).
 * 2. Coloque as fotos em /public/images/produtos e preencha `images`.
 * 3. Mude `catalogIsDemo` para `false` em /lib/site.ts.
 *
 * Preços em centavos: 14990 = R$ 149,90.
 */

type Seed = Omit<Product, "id" | "images" | "inStock" | "createdAt" | "tags"> &
  Partial<Pick<Product, "images" | "inStock" | "tags">>;

const seeds: Seed[] = [
  // Whey Protein
  {
    slug: "whey-protein-concentrado-900g",
    name: "Whey Protein Concentrado 900g",
    brand: "integralmedica",
    category: "whey-protein",
    goals: ["ganho-de-massa", "recuperacao"],
    price: 14990,
    oldPrice: 17990,
    shortDescription: "Proteína concentrada para o pós-treino e para completar a meta diária.",
    description:
      "Whey protein concentrado em pote de 900g. Boa opção para quem quer aumentar a ingestão de proteína com praticidade, no pós-treino ou entre as refeições.",
    specs: [
      { label: "Conteúdo", value: "900g" },
      { label: "Tipo", value: "Concentrado" },
      { label: "Sabores", value: "Consulte disponibilidade" },
    ],
    badge: "mais-vendido",
    featured: true,
  },
  {
    slug: "whey-protein-isolado-900g",
    name: "Whey Protein Isolado 900g",
    brand: "dymatize",
    category: "whey-protein",
    goals: ["ganho-de-massa", "recuperacao"],
    price: 32990,
    shortDescription: "Proteína isolada com alta concentração e rápida absorção.",
    description:
      "Whey protein isolado em pote de 900g. Maior concentração de proteína por dose e menos carboidratos e gorduras, indicado para quem busca definição.",
    specs: [
      { label: "Conteúdo", value: "900g" },
      { label: "Tipo", value: "Isolado" },
      { label: "Sabores", value: "Consulte disponibilidade" },
    ],
    featured: true,
  },
  {
    slug: "whey-protein-blend-2kg",
    name: "Whey Protein Blend 2kg",
    brand: "optimum-nutrition",
    category: "whey-protein",
    goals: ["ganho-de-massa", "recuperacao"],
    price: 44990,
    oldPrice: 49990,
    shortDescription: "Blend de proteínas em embalagem econômica.",
    description:
      "Blend de whey concentrado, isolado e hidrolisado em embalagem de 2kg. Rende mais doses e costuma ter o melhor custo por porção.",
    specs: [
      { label: "Conteúdo", value: "2kg" },
      { label: "Tipo", value: "Blend 3W" },
      { label: "Sabores", value: "Consulte disponibilidade" },
    ],
    badge: "oferta",
  },
  {
    slug: "whey-protein-hidrolisado-900g",
    name: "Whey Protein Hidrolisado 900g",
    brand: "essential",
    category: "whey-protein",
    goals: ["recuperacao", "performance"],
    price: 38990,
    shortDescription: "Proteína hidrolisada de digestão leve.",
    description:
      "Whey protein hidrolisado em pote de 900g. As proteínas já passam por quebra parcial, o que facilita a digestão para quem sente desconforto com outros tipos.",
    specs: [
      { label: "Conteúdo", value: "900g" },
      { label: "Tipo", value: "Hidrolisado" },
      { label: "Sabores", value: "Consulte disponibilidade" },
    ],
    badge: "novo",
  },

  // Creatina
  {
    slug: "creatina-monohidratada-300g",
    name: "Creatina Monohidratada 300g",
    brand: "integralmedica",
    category: "creatina",
    goals: ["performance", "ganho-de-massa"],
    price: 8990,
    oldPrice: 10990,
    shortDescription: "Creatina pura para força e potência.",
    description:
      "Creatina monohidratada em pó, pote de 300g. O suplemento mais estudado para ganho de força e desempenho em treinos de alta intensidade.",
    specs: [
      { label: "Conteúdo", value: "300g" },
      { label: "Forma", value: "Pó, sem sabor" },
      { label: "Porção sugerida", value: "3g ao dia" },
    ],
    badge: "mais-vendido",
    featured: true,
  },
  {
    slug: "creatina-monohidratada-150g",
    name: "Creatina Monohidratada 150g",
    brand: "atlhetica",
    category: "creatina",
    goals: ["performance", "ganho-de-massa"],
    price: 5490,
    shortDescription: "Tamanho de entrada para começar o uso.",
    description:
      "Creatina monohidratada em pó, pote de 150g. Tamanho ideal para quem está começando ou quer experimentar antes de levar a embalagem maior.",
    specs: [
      { label: "Conteúdo", value: "150g" },
      { label: "Forma", value: "Pó, sem sabor" },
      { label: "Porção sugerida", value: "3g ao dia" },
    ],
  },
  {
    slug: "creatina-micronizada-500g",
    name: "Creatina Micronizada 500g",
    brand: "dymatize",
    category: "creatina",
    goals: ["performance", "ganho-de-massa"],
    price: 13990,
    shortDescription: "Partículas menores, mistura mais fácil.",
    description:
      "Creatina micronizada em pote de 500g. As partículas menores dissolvem melhor na água e a embalagem rende vários meses de uso.",
    specs: [
      { label: "Conteúdo", value: "500g" },
      { label: "Forma", value: "Pó micronizado" },
      { label: "Porção sugerida", value: "3g ao dia" },
    ],
    featured: true,
  },
  {
    slug: "creatina-em-capsulas-120",
    name: "Creatina em Cápsulas 120 caps",
    brand: "vitapower",
    category: "creatina",
    goals: ["performance"],
    price: 7990,
    shortDescription: "Praticidade para levar na bolsa.",
    description:
      "Creatina em cápsulas, frasco com 120 unidades. Para quem prefere não misturar pó e quer levar a dose para qualquer lugar.",
    specs: [
      { label: "Conteúdo", value: "120 cápsulas" },
      { label: "Forma", value: "Cápsulas" },
    ],
    badge: "novo",
  },

  // Pré-treino
  {
    slug: "pre-treino-300g",
    name: "Pré-treino Intenso 300g",
    brand: "iridium-labs",
    category: "pre-treino",
    goals: ["energia", "performance"],
    price: 12990,
    oldPrice: 14990,
    shortDescription: "Cafeína, beta-alanina e foco para treinos pesados.",
    description:
      "Pré-treino em pó, pote de 300g. Fórmula com cafeína e aminoácidos para dar disposição e foco antes do treino.",
    specs: [
      { label: "Conteúdo", value: "300g" },
      { label: "Contém", value: "Cafeína" },
      { label: "Sabores", value: "Consulte disponibilidade" },
    ],
    badge: "mais-vendido",
    featured: true,
  },
  {
    slug: "pre-treino-sem-cafeina-250g",
    name: "Pré-treino Pump sem Cafeína 250g",
    brand: "integralmedica",
    category: "pre-treino",
    goals: ["performance"],
    price: 11990,
    shortDescription: "Vasodilatação sem estimulantes, para treinar à noite.",
    description:
      "Pré-treino sem cafeína, pote de 250g. Focado em vasodilatação, é uma opção para quem treina à noite ou é sensível a estimulantes.",
    specs: [
      { label: "Conteúdo", value: "250g" },
      { label: "Contém", value: "Sem cafeína" },
    ],
  },
  {
    slug: "cafeina-200mg-90-caps",
    name: "Cafeína 200mg 90 caps",
    brand: "atlhetica",
    category: "pre-treino",
    goals: ["energia"],
    price: 4990,
    shortDescription: "Energia e atenção em cápsulas.",
    description:
      "Cafeína anidra em cápsulas de 200mg, frasco com 90 unidades. Simples e direta para quem quer mais disposição antes do treino.",
    specs: [
      { label: "Conteúdo", value: "90 cápsulas" },
      { label: "Dose", value: "200mg por cápsula" },
    ],
    featured: true,
  },
  {
    slug: "beta-alanina-200g",
    name: "Beta-alanina 200g",
    brand: "optimum-nutrition",
    category: "pre-treino",
    goals: ["performance"],
    price: 9990,
    oldPrice: 11490,
    shortDescription: "Mais resistência nas séries longas.",
    description:
      "Beta-alanina em pó, pote de 200g. Ajuda a retardar a fadiga muscular em esforços intensos e repetidos.",
    specs: [
      { label: "Conteúdo", value: "200g" },
      { label: "Forma", value: "Pó, sem sabor" },
    ],
    badge: "oferta",
  },

  // Vitaminas e saúde
  {
    slug: "multivitaminico-60-caps",
    name: "Multivitamínico A-Z 60 caps",
    brand: "vitapower",
    category: "vitaminas-e-saude",
    goals: ["saude"],
    price: 5990,
    shortDescription: "Vitaminas e minerais para o dia a dia.",
    description:
      "Multivitamínico completo, frasco com 60 cápsulas. Complementa a alimentação com vitaminas e minerais essenciais.",
    specs: [
      { label: "Conteúdo", value: "60 cápsulas" },
      { label: "Uso sugerido", value: "1 cápsula ao dia" },
    ],
    featured: true,
  },
  {
    slug: "omega-3-120-caps",
    name: "Ômega 3 120 caps",
    brand: "essential",
    category: "vitaminas-e-saude",
    goals: ["saude", "recuperacao"],
    price: 8990,
    oldPrice: 9990,
    shortDescription: "EPA e DHA para saúde cardiovascular.",
    description:
      "Ômega 3 em cápsulas, frasco com 120 unidades. Fonte de EPA e DHA para quem não consome peixe com frequência.",
    specs: [
      { label: "Conteúdo", value: "120 cápsulas" },
      { label: "Fonte", value: "Óleo de peixe" },
    ],
    badge: "oferta",
  },
  {
    slug: "colageno-tipo-2-60-caps",
    name: "Colágeno Tipo 2 60 caps",
    brand: "fullife",
    category: "vitaminas-e-saude",
    goals: ["saude", "recuperacao"],
    price: 7990,
    shortDescription: "Cuidado com as articulações.",
    description:
      "Colágeno tipo 2 em cápsulas, frasco com 60 unidades. Indicado para quem quer cuidar das articulações na rotina de treinos.",
    specs: [
      { label: "Conteúdo", value: "60 cápsulas" },
      { label: "Uso sugerido", value: "1 cápsula ao dia" },
    ],
  },
  {
    slug: "vitamina-d3-60-caps",
    name: "Vitamina D3 2000UI 60 caps",
    brand: "fullife",
    category: "vitaminas-e-saude",
    goals: ["saude"],
    price: 3990,
    shortDescription: "Suporte para ossos e imunidade.",
    description:
      "Vitamina D3 em cápsulas de 2000UI, frasco com 60 unidades. Importante para a saúde óssea e o sistema imune.",
    specs: [
      { label: "Conteúdo", value: "60 cápsulas" },
      { label: "Dose", value: "2000UI por cápsula" },
    ],
    badge: "novo",
  },

  // Barras e snacks
  {
    slug: "barra-de-proteina-caixa-12",
    name: "Barra de Proteína Caixa com 12",
    brand: "integralmedica",
    category: "barras-e-snacks",
    goals: ["ganho-de-massa"],
    price: 9990,
    oldPrice: 11990,
    shortDescription: "Lanche proteico para a correria.",
    description:
      "Caixa com 12 barras de proteína. Lanche prático para levar na mochila e garantir proteína entre as refeições.",
    specs: [
      { label: "Conteúdo", value: "12 unidades" },
      { label: "Sabores", value: "Consulte disponibilidade" },
    ],
    badge: "oferta",
    featured: true,
  },
  {
    slug: "barra-de-proteina-unidade",
    name: "Barra de Proteína Unidade",
    brand: "exceed",
    category: "barras-e-snacks",
    goals: ["ganho-de-massa", "energia"],
    price: 1090,
    shortDescription: "Para experimentar um sabor novo.",
    description:
      "Barra de proteína avulsa. Boa para experimentar um sabor antes de levar a caixa fechada.",
    specs: [
      { label: "Conteúdo", value: "1 unidade" },
      { label: "Sabores", value: "Consulte disponibilidade" },
    ],
  },
  {
    slug: "pasta-de-amendoim-integral-500g",
    name: "Pasta de Amendoim Integral 500g",
    brand: "vitapower",
    category: "barras-e-snacks",
    goals: ["ganho-de-massa", "energia"],
    price: 2990,
    shortDescription: "Gorduras boas e energia para a dieta.",
    description:
      "Pasta de amendoim integral, pote de 500g. Fonte de gorduras boas e energia para acompanhar frutas, pães e receitas.",
    specs: [
      { label: "Conteúdo", value: "500g" },
      { label: "Tipo", value: "Integral" },
    ],
  },
  {
    slug: "gel-de-carboidrato-caixa-10",
    name: "Gel de Carboidrato Caixa com 10",
    brand: "exceed",
    category: "barras-e-snacks",
    goals: ["energia", "performance"],
    price: 6990,
    shortDescription: "Energia rápida para corrida e pedal.",
    description:
      "Caixa com 10 sachês de gel de carboidrato. Energia de rápida absorção para treinos longos de corrida, ciclismo e outros esportes de resistência.",
    specs: [
      { label: "Conteúdo", value: "10 sachês" },
      { label: "Sabores", value: "Consulte disponibilidade" },
    ],
    badge: "novo",
  },

  // Acessórios
  {
    slug: "coqueteleira-600ml",
    name: "Coqueteleira 600ml",
    brand: "integralmedica",
    category: "acessorios",
    goals: ["performance"],
    price: 2490,
    shortDescription: "Para misturar seu shake sem grumos.",
    description:
      "Coqueteleira de 600ml com tampa de rosca e misturador. Fecha bem e cabe na mochila.",
    specs: [
      { label: "Capacidade", value: "600ml" },
      { label: "Material", value: "Plástico livre de BPA" },
    ],
    featured: true,
  },
  {
    slug: "coqueteleira-com-compartimento-500ml",
    name: "Coqueteleira com Compartimento 500ml",
    brand: "atlhetica",
    category: "acessorios",
    goals: ["performance"],
    price: 3490,
    oldPrice: 3990,
    shortDescription: "Leve a dose de pó separada da água.",
    description:
      "Coqueteleira de 500ml com compartimento para pó e cápsulas. Dá para levar a dose pronta e misturar só na hora.",
    specs: [
      { label: "Capacidade", value: "500ml" },
      { label: "Extras", value: "Compartimento para pó" },
    ],
    badge: "oferta",
  },
];

export const products: Product[] = seeds.map((seed, index) => ({
  images: [],
  inStock: true,
  tags: [],
  ...seed,
  id: `demo-${String(index + 1).padStart(3, "0")}`,
  // Datas decrescentes apenas para a ordenação "Novidades" funcionar no demo.
  createdAt: new Date(Date.UTC(2026, 0, 1 + (seed.badge === "novo" ? 200 + index : index))).toISOString(),
}));
