"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { useShop } from "@/components/cart/ShopProvider";
import { Dialog } from "@/components/ui/Dialog";
import { ProductImage } from "@/components/products/ProductImage";
import { categories } from "@/data/categories";
import { formatPrice } from "@/lib/format";
import { brandName, categoryName, getFeaturedProducts, searchProducts } from "@/lib/products";

const MAX_RESULTS = 6;

export function SearchDialog() {
  const router = useRouter();
  const { searchOpen, setSearchOpen } = useShop();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const trimmed = query.trim();
  const results = useMemo(() => (trimmed ? searchProducts(trimmed) : []), [trimmed]);
  const suggestions = useMemo(() => getFeaturedProducts(4), []);
  const visible = trimmed ? results.slice(0, MAX_RESULTS) : suggestions;

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
    else setQuery("");
  }, [searchOpen]);

  // Atalho: "/" abre a busca.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      const typing = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
      if (event.key === "/" && !typing) {
        event.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const close = () => setSearchOpen(false);
  const catalogHref = `/produtos?q=${encodeURIComponent(trimmed)}`;

  return (
    <Dialog
      open={searchOpen}
      onClose={close}
      label="Buscar produtos"
      from="top"
      className="items-start justify-center sm:px-4 sm:pt-[10vh]"
      panelClassName="flex max-h-dvh w-full max-w-2xl flex-col overflow-hidden border-line bg-surface sm:max-h-[78vh] sm:rounded-3xl sm:border"
    >
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          if (!trimmed) return;
          close();
          router.push(catalogHref);
        }}
        className="flex h-16 shrink-0 items-center gap-3 border-b border-line pl-5 pr-2.5"
      >
        <Search className="size-5 shrink-0 text-muted" aria-hidden="true" />
        <label htmlFor="site-search" className="sr-only">
          Buscar por produto, marca ou categoria
        </label>
        <input
          ref={inputRef}
          id="site-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            // Em campos de busca o Esc só limpa o texto; aqui ele fecha o painel.
            if (event.key === "Escape") {
              event.preventDefault();
              close();
            }
          }}
          placeholder="Busque por produto, marca ou categoria"
          autoComplete="off"
          enterKeyHint="search"
          className="h-full min-w-0 flex-1 bg-transparent text-base text-fg outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
        />
        <button
          type="button"
          onClick={close}
          aria-label="Fechar busca"
          className="grid size-11 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-fg"
        >
          <X className="size-5" />
        </button>
      </form>

      <div className="overflow-y-auto p-3 sm:p-4">
        <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted" aria-live="polite">
          {!trimmed
            ? "Mais procurados"
            : results.length === 0
              ? "Nenhum resultado"
              : `${results.length} ${results.length === 1 ? "resultado" : "resultados"}`}
        </p>

        {trimmed && results.length === 0 ? (
          <div className="px-2 pb-3">
            <p className="text-fg">
              Não encontramos nada para <strong>“{trimmed}”</strong>.
            </p>
            <p className="mt-1 text-sm text-muted">Tente outro termo ou navegue por uma categoria:</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/produtos?categoria=${category.slug}`}
                    onClick={close}
                    className="inline-flex h-10 items-center rounded-full border border-line bg-raised px-4 text-sm font-medium hover:border-brand/60"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <ul>
            {visible.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/produtos/${product.slug}`}
                  onClick={close}
                  className="flex items-center gap-3.5 rounded-2xl p-2 transition-colors hover:bg-white/5 focus-visible:bg-white/5"
                >
                  <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-raised p-1.5">
                    <ProductImage product={product} decorative sizes="56px" className="size-full" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-fg">{product.name}</span>
                    <span className="block truncate text-sm text-muted">
                      {brandName(product)} · {categoryName(product)}
                    </span>
                  </span>
                  <span className="shrink-0 pr-1 text-sm font-bold tabular-nums">{formatPrice(product.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {trimmed && results.length > 0 && (
          <Link
            href={catalogHref}
            onClick={close}
            className="mt-2 flex h-12 items-center justify-center gap-2 rounded-2xl border border-line text-sm font-semibold text-fg transition-colors hover:border-brand/60 hover:text-brand"
          >
            Ver todos os resultados
            <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
    </Dialog>
  );
}
