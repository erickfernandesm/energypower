import { brands } from "@/data/brands";

/** Faixa com as marcas que a loja trabalha. */
export function BrandStrip() {
  return (
    <section aria-label="Marcas disponíveis na loja" className="border-y border-line bg-surface">
      <div className="container-page py-5">
        <ul className="scrollbar-none -mx-4 flex items-center gap-x-8 gap-y-1 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:justify-center md:gap-x-10 md:overflow-visible md:px-0 xl:flex-nowrap xl:justify-between xl:gap-x-6">
          {brands.map((brand) => (
            <li key={brand.slug} className="shrink-0 font-display text-lg font-semibold uppercase italic tracking-wide text-fg/70">
              {brand.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
