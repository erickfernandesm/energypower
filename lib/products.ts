import { products } from "@/data/products";
import { brandBySlug } from "@/data/brands";
import { categoryBySlug } from "@/data/categories";
import { normalize } from "./format";
import type { CategorySlug, Product } from "@/types";

/**
 * Repositório de produtos.
 * Os componentes só falam com estas funções. Para conectar um banco ou API
 * no futuro, troque a implementação aqui e mantenha as assinaturas.
 */

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter((p) => p.id !== product.id && p.category === product.category);
  const sameGoal = products.filter(
    (p) =>
      p.id !== product.id &&
      p.category !== product.category &&
      p.goals.some((g) => product.goals.includes(g)),
  );
  return [...sameCategory, ...sameGoal].slice(0, limit);
}

export function brandName(product: Product): string {
  return brandBySlug[product.brand]?.name ?? product.brand;
}

export function categoryName(product: Product): string {
  return categoryBySlug[product.category].name;
}

/** Texto pesquisável de um produto: nome, marca, categoria e tags. */
function haystack(product: Product): string {
  return normalize(
    [product.name, brandName(product), categoryName(product), product.shortDescription, ...product.tags].join(" "),
  );
}

export function searchProducts(query: string, source: Product[] = products): Product[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return source;
  return source.filter((p) => {
    const text = haystack(p);
    return terms.every((t) => text.includes(t));
  });
}
