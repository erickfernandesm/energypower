import type { VisualTone } from "@/components/products/ProductVisual";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/lib/products";
import { CategoryCard } from "./CategoryCard";

const tones: VisualTone[] = ["yellow", "graphite", "red", "white", "yellow", "graphite"];

export function Categories() {
  return (
    <section id="categorias" aria-labelledby="categorias-title" className="container-page py-16 sm:py-24">
      <SectionHeading
        id="categorias-title"
        eyebrow="Categorias"
        title="Encontre pelo seu objetivo"
        description="Do pós-treino ao dia a dia: escolha a categoria e veja as opções."
      />
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {categories.map((category, index) => (
          <li key={category.slug}>
            <Reveal delay={(index % 3) * 70} className="h-full">
              <CategoryCard
                category={category}
                tone={tones[index % tones.length]}
                count={getProductsByCategory(category.slug).length}
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
