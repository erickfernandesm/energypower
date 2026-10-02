import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { buttonClass } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedProducts } from "@/lib/products";

export function Featured() {
  const products = getFeaturedProducts(8);

  return (
    <section aria-labelledby="destaques-title" className="border-y border-line bg-surface/50">
      <div className="container-page py-16 sm:py-24">
        <SectionHeading
          id="destaques-title"
          eyebrow="Destaques Energy Power"
          title="Mais procurados"
          action={
            <Link href="/produtos" className={buttonClass("secondary", "sm", "group max-sm:hidden")}>
              Ver todos os produtos
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          }
        />
        <ProductGrid products={products} />
        <Link href="/produtos" className={buttonClass("secondary", "md", "mt-8 w-full sm:hidden")}>
          Ver todos os produtos
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
