"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useShop } from "@/components/cart/ShopProvider";
import { buttonClass } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { brandBySlug } from "@/data/brands";
import { categories, categoryBySlug, goals } from "@/data/categories";
import { searchProducts } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { whatsappUrl } from "@/lib/whatsapp";
import type { CategorySlug, GoalSlug, Product } from "@/types";
import { ProductFilters, type FilterState } from "./ProductFilters";
import { ProductGrid } from "./ProductGrid";

const PAGE_SIZE = 9;

const sortOptions = [
  { value: "relevancia", label: "Mais relevantes" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "novidades", label: "Novidades" },
  { value: "nome", label: "Nome (A-Z)" },
] as const;

type SortValue = (typeof sortOptions)[number]["value"];

const badgeWeight = { "mais-vendido": 3, oferta: 2, novo: 1 } as const;

function sortProducts(list: Product[], sort: SortValue): Product[] {
  const sorted = [...list];
  switch (sort) {
    case "menor-preco":
      return sorted.sort((a, b) => a.price - b.price);
    case "maior-preco":
      return sorted.sort((a, b) => b.price - a.price);
    case "novidades":
      return sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "nome":
      return sorted.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    default:
      return sorted.sort(
        (a, b) =>
          Number(b.featured ?? false) - Number(a.featured ?? false) ||
          (b.badge ? badgeWeight[b.badge] : 0) - (a.badge ? badgeWeight[a.badge] : 0),
      );
  }
}

const list = (value: string | null) => (value ? value.split(",").filter(Boolean) : []);

/**
 * Catálogo com busca, filtros, ordenação e "carregar mais".
 * Todo o estado vive na URL (?categoria=...&marca=...), então qualquer
 * combinação de filtros pode ser compartilhada ou aberta por um link.
 */
export function Catalog({ products }: { products: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { favorites } = useShop();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const query = params.get("q") ?? "";
  const [queryInput, setQueryInput] = useState(query);
  useEffect(() => setQueryInput(query), [query]);

  const sortParam = params.get("ordem");
  const sort: SortValue = sortOptions.some((o) => o.value === sortParam) ? (sortParam as SortValue) : "relevancia";

  const categoryParam = params.get("categoria");
  const priceParam = Number(params.get("preco"));
  const state: FilterState = useMemo(
    () => ({
      category: categoryParam && categoryParam in categoryBySlug ? (categoryParam as CategorySlug) : null,
      brands: list(params.get("marca")).filter((slug) => slug in brandBySlug),
      goals: list(params.get("objetivo")).filter((slug) => goals.some((g) => g.slug === slug)) as GoalSlug[],
      maxPrice: priceParam > 0 ? priceParam * 100 : null,
      favoritesOnly: params.get("favoritos") === "1",
    }),
    [params, categoryParam, priceParam],
  );

  const setParams = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(params.toString());
      for (const [key, value] of Object.entries(patch)) {
        if (value) next.set(key, value);
        else next.delete(key);
      }
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      setVisibleCount(PAGE_SIZE);
    },
    [params, pathname, router],
  );

  const onFilterChange = useCallback(
    (patch: Partial<FilterState>) => {
      const next: Record<string, string | null> = {};
      if ("category" in patch) next.categoria = patch.category ?? null;
      if ("brands" in patch) next.marca = patch.brands?.join(",") || null;
      if ("goals" in patch) next.objetivo = patch.goals?.join(",") || null;
      if ("maxPrice" in patch) next.preco = patch.maxPrice ? String(patch.maxPrice / 100) : null;
      if ("favoritesOnly" in patch) next.favoritos = patch.favoritesOnly ? "1" : null;
      setParams(next);
    },
    [setParams],
  );

  // A busca digita rápido: atualiza a URL com um pequeno atraso.
  useEffect(() => {
    if (queryInput === query) return;
    const timer = setTimeout(() => setParams({ q: queryInput.trim() || null }), 250);
    return () => clearTimeout(timer);
  }, [queryInput, query, setParams]);

  const priceRange = useMemo(
    () => ({ min: Math.min(...products.map((p) => p.price)), max: Math.max(...products.map((p) => p.price)) }),
    [products],
  );
  const availableBrands = useMemo(() => [...new Set(products.map((p) => p.brand))], [products]);

  const filtered = useMemo(() => {
    const result = searchProducts(query, products).filter(
      (p) =>
        (!state.category || p.category === state.category) &&
        (state.brands.length === 0 || state.brands.includes(p.brand)) &&
        (state.goals.length === 0 || p.goals.some((g) => state.goals.includes(g))) &&
        (state.maxPrice === null || p.price <= state.maxPrice) &&
        (!state.favoritesOnly || favorites.includes(p.id)),
    );
    return sortProducts(result, sort);
  }, [products, query, state, sort, favorites]);

  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visible.length;

  const chips: { key: string; label: string; clear: () => void }[] = [
    ...(query ? [{ key: "q", label: `“${query}”`, clear: () => setParams({ q: null }) }] : []),
    ...(state.category
      ? [{ key: "cat", label: categoryBySlug[state.category].name, clear: () => onFilterChange({ category: null }) }]
      : []),
    ...state.goals.map((slug) => ({
      key: `goal-${slug}`,
      label: goals.find((g) => g.slug === slug)!.name,
      clear: () => onFilterChange({ goals: state.goals.filter((g) => g !== slug) }),
    })),
    ...state.brands.map((slug) => ({
      key: `brand-${slug}`,
      label: brandBySlug[slug].name,
      clear: () => onFilterChange({ brands: state.brands.filter((b) => b !== slug) }),
    })),
    ...(state.maxPrice !== null
      ? [{ key: "price", label: `Até ${formatPrice(state.maxPrice)}`, clear: () => onFilterChange({ maxPrice: null }) }]
      : []),
    ...(state.favoritesOnly
      ? [{ key: "fav", label: "Favoritos", clear: () => onFilterChange({ favoritesOnly: false }) }]
      : []),
  ];

  const clearAll = () => {
    setQueryInput("");
    router.replace(sort === "relevancia" ? pathname : `${pathname}?ordem=${sort}`, { scroll: false });
    setVisibleCount(PAGE_SIZE);
  };

  const filterProps = { state, onChange: onFilterChange, priceRange, availableBrands };
  const activeCount = chips.filter((chip) => chip.key !== "q").length;

  return (
    <div className="grid gap-8 lg:grid-cols-[16.5rem_1fr] lg:gap-10">
      <aside aria-label="Filtros" className="hidden lg:block">
        <div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pr-2">
          <ProductFilters {...filterProps} idPrefix="desk" />
        </div>
      </aside>

      <div className="min-w-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-muted" aria-hidden="true" />
            <label htmlFor="catalog-search" className="sr-only">
              Buscar no catálogo
            </label>
            <input
              id="catalog-search"
              type="search"
              value={queryInput}
              onChange={(event) => setQueryInput(event.target.value)}
              placeholder="Buscar por nome, marca ou categoria"
              autoComplete="off"
              className="h-12 w-full rounded-full border border-line bg-surface pl-11 pr-4 text-[0.9375rem] text-fg outline-none transition-colors placeholder:text-muted focus:border-brand [&::-webkit-search-cancel-button]:hidden"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className={buttonClass("secondary", "md", "px-5 lg:hidden")}
            >
              <SlidersHorizontal className="size-4" />
              Filtros
              {activeCount > 0 && (
                <span className="grid size-5 place-items-center rounded-full bg-brand text-xs font-bold text-black">{activeCount}</span>
              )}
            </button>

            <div className="relative min-w-0 flex-1 sm:flex-none">
              <label htmlFor="catalog-sort" className="sr-only">
                Ordenar por
              </label>
              <select
                id="catalog-sort"
                value={sort}
                onChange={(event) => setParams({ ordem: event.target.value === "relevancia" ? null : event.target.value })}
                className="h-12 w-full cursor-pointer appearance-none rounded-full border border-line bg-surface pl-5 pr-10 text-[0.9375rem] font-medium text-fg outline-none transition-colors hover:border-fg/40 focus:border-brand"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <svg aria-hidden="true" viewBox="0 0 16 16" className="pointer-events-none absolute right-4 top-1/2 size-3.5 -translate-y-1/2 fill-none stroke-current stroke-2 text-muted">
                <path d="m3 6 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Atalho de categorias no mobile, sem abrir o painel de filtros. */}
        <div className="scrollbar-none -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 lg:hidden">
          {[{ slug: null, name: "Todas" }, ...categories].map((category) => {
            const active = state.category === category.slug;
            return (
              <button
                key={category.slug ?? "todas"}
                type="button"
                aria-pressed={active}
                onClick={() => onFilterChange({ category: category.slug })}
                className={
                  active
                    ? "h-10 shrink-0 rounded-full border border-brand bg-brand px-4 text-sm font-semibold text-black"
                    : "h-10 shrink-0 rounded-full border border-line bg-surface px-4 text-sm font-medium text-fg"
                }
              >
                {category.name}
              </button>
            );
          })}
        </div>

        <div className="mb-5 mt-5 flex flex-wrap items-center gap-2">
          <p className="mr-2 text-sm text-muted" role="status" aria-live="polite">
            <strong className="font-semibold text-fg">{filtered.length}</strong>{" "}
            {filtered.length === 1 ? "produto" : "produtos"}
          </p>
          {chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={chip.clear}
              aria-label={`Remover filtro ${chip.label}`}
              className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line bg-raised pl-3 pr-2 text-xs font-medium text-fg transition-colors hover:border-fg/40"
            >
              {chip.label}
              <X className="size-3.5 text-muted" />
            </button>
          ))}
          {chips.length > 1 && (
            <button type="button" onClick={clearAll} className="h-8 px-2 text-xs font-semibold text-brand hover:underline">
              Limpar tudo
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-line px-6 py-16 text-center">
            <p className="display text-3xl">Nada por aqui</p>
            <p className="mx-auto mt-3 max-w-sm text-muted">
              Nenhum produto combina com esses filtros. A loja pode ter o que você procura: pergunte pelo WhatsApp.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" onClick={clearAll} className={buttonClass("secondary", "md")}>
                Limpar filtros
              </button>
              <a
                href={whatsappUrl(
                  query
                    ? `Olá! Procurei por "${query}" no site da Energy Power e não encontrei. Vocês têm?`
                    : "Olá! Não encontrei o que procurava no site da Energy Power. Podem me ajudar?",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("whatsapp", "md")}
              >
                <WhatsAppIcon className="size-5 text-whats" />
                Perguntar no WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <>
            <ProductGrid products={visible} columns={3} priorityCount={3} />
            {remaining > 0 && (
              <div className="mt-10 flex flex-col items-center gap-3">
                <p className="text-sm text-muted">
                  Mostrando {visible.length} de {filtered.length}
                </p>
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  className={buttonClass("secondary", "md", "w-full sm:w-auto")}
                >
                  Carregar mais {Math.min(remaining, PAGE_SIZE)}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Dialog
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        label="Filtros"
        from="bottom"
        className="items-end lg:hidden"
        panelClassName="flex max-h-[88dvh] w-full flex-col rounded-t-3xl border-t border-line bg-surface"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line pl-5 pr-2.5">
          <h2 className="display text-2xl">Filtros</h2>
          <button
            type="button"
            onClick={() => setSheetOpen(false)}
            aria-label="Fechar filtros"
            className="grid size-11 place-items-center rounded-full hover:bg-white/10"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <ProductFilters {...filterProps} idPrefix="sheet" />
        </div>
        <div className="flex shrink-0 gap-3 border-t border-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button type="button" onClick={clearAll} className={buttonClass("secondary", "md", "flex-1")}>
            Limpar
          </button>
          <button type="button" onClick={() => setSheetOpen(false)} className={buttonClass("primary", "md", "flex-[2]")}>
            Ver {filtered.length} {filtered.length === 1 ? "produto" : "produtos"}
          </button>
        </div>
      </Dialog>
    </div>
  );
}
