"use client";

import { Heart } from "lucide-react";
import { brands } from "@/data/brands";
import { categories, goals } from "@/data/categories";
import { cn, formatPrice } from "@/lib/format";
import type { CategorySlug, GoalSlug } from "@/types";

export interface FilterState {
  category: CategorySlug | null;
  brands: string[];
  goals: GoalSlug[];
  /** Preço máximo em centavos; `null` = sem limite. */
  maxPrice: number | null;
  favoritesOnly: boolean;
}

interface ProductFiltersProps {
  state: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
  /** Limites de preço do catálogo, em centavos. */
  priceRange: { min: number; max: number };
  /** Marcas que existem no catálogo atual. */
  availableBrands: string[];
  /** Prefixo dos ids, para a versão desktop e mobile coexistirem. */
  idPrefix: string;
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-line py-5 first:border-t-0 first:pt-0">
      <legend className="float-left mb-3 w-full text-xs font-semibold uppercase tracking-[0.16em] text-fg">{title}</legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  );
}

const optionRow = "flex min-h-10 cursor-pointer items-center gap-3 rounded-lg text-[0.9375rem] text-muted transition-colors hover:text-fg has-[:checked]:text-fg";
const checkbox = "size-[18px] shrink-0 rounded border border-line bg-raised accent-brand";

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function ProductFilters({ state, onChange, priceRange, availableBrands, idPrefix }: ProductFiltersProps) {
  const step = 1000;
  const sliderMin = Math.floor(priceRange.min / step) * step;
  const sliderMax = Math.ceil(priceRange.max / step) * step;
  const sliderValue = state.maxPrice ?? sliderMax;

  return (
    <div>
      <Group title="Categoria">
        <div role="radiogroup" aria-label="Categoria" className="flex flex-wrap gap-2">
          {[{ slug: null, name: "Todas" }, ...categories].map((category) => {
            const active = state.category === category.slug;
            return (
              <button
                key={category.slug ?? "todas"}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onChange({ category: category.slug })}
                className={cn(
                  "h-10 rounded-full border px-4 text-sm font-medium transition-colors",
                  active ? "border-brand bg-brand text-black" : "border-line bg-raised text-fg hover:border-fg/40",
                )}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </Group>

      <Group title="Objetivo">
        {goals.map((goal) => (
          <label key={goal.slug} htmlFor={`${idPrefix}-goal-${goal.slug}`} className={optionRow}>
            <input
              id={`${idPrefix}-goal-${goal.slug}`}
              type="checkbox"
              className={checkbox}
              checked={state.goals.includes(goal.slug)}
              onChange={() => onChange({ goals: toggle(state.goals, goal.slug) })}
            />
            {goal.name}
          </label>
        ))}
      </Group>

      <Group title="Marca">
        {brands
          .filter((brand) => availableBrands.includes(brand.slug))
          .map((brand) => (
            <label key={brand.slug} htmlFor={`${idPrefix}-brand-${brand.slug}`} className={optionRow}>
              <input
                id={`${idPrefix}-brand-${brand.slug}`}
                type="checkbox"
                className={checkbox}
                checked={state.brands.includes(brand.slug)}
                onChange={() => onChange({ brands: toggle(state.brands, brand.slug) })}
              />
              {brand.name}
            </label>
          ))}
      </Group>

      <Group title="Preço">
        <label htmlFor={`${idPrefix}-price`} className="flex items-baseline justify-between text-[0.9375rem] text-muted">
          Até
          <output className="font-semibold tabular-nums text-fg">
            {state.maxPrice === null ? "Qualquer valor" : formatPrice(sliderValue)}
          </output>
        </label>
        <input
          id={`${idPrefix}-price`}
          type="range"
          className="ep-range mt-2"
          min={sliderMin}
          max={sliderMax}
          step={step}
          value={sliderValue}
          onChange={(event) => {
            const value = Number(event.target.value);
            onChange({ maxPrice: value >= sliderMax ? null : value });
          }}
          aria-valuetext={state.maxPrice === null ? "Qualquer valor" : `Até ${formatPrice(sliderValue)}`}
        />
        <div className="flex justify-between text-xs tabular-nums text-muted">
          <span>{formatPrice(sliderMin)}</span>
          <span>{formatPrice(sliderMax)}</span>
        </div>
      </Group>

      <Group title="Favoritos">
        <label htmlFor={`${idPrefix}-favorites`} className={optionRow}>
          <input
            id={`${idPrefix}-favorites`}
            type="checkbox"
            className={checkbox}
            checked={state.favoritesOnly}
            onChange={() => onChange({ favoritesOnly: !state.favoritesOnly })}
          />
          <Heart className="size-4" aria-hidden="true" />
          Somente meus favoritos
        </label>
      </Group>
    </div>
  );
}
