import type { Brand } from "@/types";

/**
 * Marcas que aparecem nos destaques do Instagram @energypowersuplementosjf.
 * TODO(loja): revisar a lista e a grafia de cada marca.
 */
export const brands: Brand[] = [
  { slug: "integralmedica", name: "Integralmédica" },
  { slug: "dymatize", name: "Dymatize" },
  { slug: "optimum-nutrition", name: "Optimum Nutrition" },
  { slug: "iridium-labs", name: "Iridium Labs" },
  { slug: "atlhetica", name: "Atlhetica Nutrition" },
  { slug: "essential", name: "Essential Nutrition" },
  { slug: "fullife", name: "Fullife" },
  { slug: "vitapower", name: "Vitapower" },
  { slug: "exceed", name: "Exceed" },
];

export const brandBySlug: Record<string, Brand> = Object.fromEntries(brands.map((b) => [b.slug, b]));
