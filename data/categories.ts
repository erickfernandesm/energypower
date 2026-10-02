import type { Category, CategorySlug, Goal } from "@/types";

/**
 * Categorias baseadas no que a Energy Power divulga publicamente
 * (matéria do Zine Cultural e destaques do Instagram).
 * TODO(loja): confirmar a lista e ajustar as descrições.
 */
export const categories: Category[] = [
  {
    slug: "whey-protein",
    name: "Whey Protein",
    description: "Proteína para bater a meta do dia e recuperar do treino.",
    shape: "tub",
    label: "WHEY",
  },
  {
    slug: "creatina",
    name: "Creatina",
    description: "Mais força e potência nas séries pesadas.",
    shape: "jar",
    label: "CREATINA",
  },
  {
    slug: "pre-treino",
    name: "Pré-treino",
    description: "Foco e disposição para começar o treino ligado.",
    shape: "tub",
    label: "PRÉ-TREINO",
  },
  {
    slug: "vitaminas-e-saude",
    name: "Vitaminas e Saúde",
    description: "Multivitamínicos, ômega 3 e colágeno para o dia a dia.",
    shape: "bottle",
    label: "VITAMINAS",
  },
  {
    slug: "barras-e-snacks",
    name: "Barras e Snacks",
    description: "Barras de proteína e pasta de amendoim para a rotina.",
    shape: "bar",
    label: "PROTEIN BAR",
  },
  {
    slug: "acessorios",
    name: "Acessórios",
    description: "Coqueteleiras e itens para treinar melhor.",
    shape: "shaker",
    label: "SHAKER",
  },
];

export const goals: Goal[] = [
  { slug: "ganho-de-massa", name: "Ganho de massa" },
  { slug: "performance", name: "Performance" },
  { slug: "energia", name: "Energia" },
  { slug: "recuperacao", name: "Recuperação" },
  { slug: "saude", name: "Saúde" },
];

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c])) as Record<
  CategorySlug,
  Category
>;
