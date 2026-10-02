import type { Metadata } from "next";
import { Suspense } from "react";
import { Catalog } from "@/components/products/Catalog";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Whey protein, creatina, pré-treino, vitaminas, barras e acessórios na Energy Power, em Juiz de Fora. Filtre por categoria, marca e objetivo.",
  alternates: { canonical: "/produtos" },
  openGraph: { title: "Produtos | Energy Power Suplementos", url: "/produtos" },
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <div className="container-page pb-20 pt-8 sm:pt-12">
      <header className="mb-8 sm:mb-10">
        <p className="eyebrow mb-3">Catálogo</p>
        <h1 className="display text-5xl sm:text-6xl">Produtos</h1>
      </header>

      {/* O fallback já entrega a grade completa no HTML, para SEO e para quem está sem JavaScript. */}
      <Suspense fallback={<ProductGrid products={products} columns={3} priorityCount={3} />}>
        <Catalog products={products} />
      </Suspense>
    </div>
  );
}
