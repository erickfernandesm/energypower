export type CategorySlug =
  | "whey-protein"
  | "creatina"
  | "pre-treino"
  | "vitaminas-e-saude"
  | "barras-e-snacks"
  | "acessorios";

export type GoalSlug =
  | "ganho-de-massa"
  | "performance"
  | "energia"
  | "recuperacao"
  | "saude";

/** Formato da ilustração usada enquanto o produto não tem foto real. */
export type VisualShape = "tub" | "bottle" | "bar" | "jar" | "shaker";

export type ProductBadge = "mais-vendido" | "oferta" | "novo";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  shape: VisualShape;
  /** Texto curto impresso no rótulo da ilustração. */
  label: string;
}

export interface Goal {
  slug: GoalSlug;
  name: string;
}

export interface Brand {
  slug: string;
  name: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Slug da marca (ver /data/brands.ts). */
  brand: string;
  category: CategorySlug;
  goals: GoalSlug[];
  /** Preço em centavos (evita erros de ponto flutuante). */
  price: number;
  /** Preço anterior em centavos, quando houver promoção. */
  oldPrice?: number;
  /** Fotos reais (caminho em /public ou URL). Vazio = usa a ilustração. */
  images: string[];
  shortDescription: string;
  description: string;
  specs: ProductSpec[];
  tags: string[];
  badge?: ProductBadge;
  featured?: boolean;
  inStock: boolean;
  /** Data de cadastro, usada na ordenação "Novidades". */
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartLine {
  product: Product;
  quantity: number;
  lineTotal: number;
}
