import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductVisual, type VisualTone } from "@/components/products/ProductVisual";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  tone: VisualTone;
  count: number;
}

export function CategoryCard({ category, tone, count }: CategoryCardProps) {
  return (
    <Link
      href={`/produtos?categoria=${category.slug}`}
      className="group relative flex h-full min-h-56 flex-col overflow-hidden rounded-2xl border border-line bg-surface p-4 transition-colors duration-300 hover:border-brand/60 sm:min-h-64 sm:p-6"
    >
      <span
        aria-hidden="true"
        className="absolute -bottom-24 -right-24 size-64 rounded-full bg-brand/0 blur-3xl transition-colors duration-500 group-hover:bg-brand/10"
      />

      <div className="relative flex items-start justify-between gap-3">
        <p className="text-xs font-semibold tabular-nums text-muted">
          {count} {count === 1 ? "produto" : "produtos"}
        </p>
        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-[background-color,color,border-color,transform] duration-300 group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-black">
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      <ProductVisual
        shape={category.shape}
        label={category.label}
        tone={tone}
        className="relative mx-auto my-2 h-28 w-auto transition-transform duration-500 ease-out-quint group-hover:-translate-y-1.5 group-hover:-rotate-3 sm:absolute sm:-bottom-4 sm:right-2 sm:my-0 sm:h-48"
      />

      <div className="relative mt-auto sm:max-w-[58%]">
        <h3 className="display text-2xl sm:text-3xl">{category.name}</h3>
        <p className="mt-2 text-sm leading-snug text-muted">{category.description}</p>
      </div>
    </Link>
  );
}
