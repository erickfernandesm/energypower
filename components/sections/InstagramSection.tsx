import { ArrowUpRight } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { brands } from "@/data/brands";
import { site } from "@/lib/site";

/**
 * O Instagram não permite carregar posts sem a API oficial (que exige
 * login da conta da loja). Por isso a seção reproduz os destaques do
 * perfil e leva o visitante para lá.
 * Futuro: com um token da Instagram Graph API, dá para trocar os
 * destaques por posts reais buscados no servidor.
 */
export function InstagramSection() {
  const initials = (name: string) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <section aria-labelledby="instagram-title" className="container-page py-16 sm:py-24">
      <Reveal className="overflow-hidden rounded-3xl border border-line bg-surface">
        <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:p-14">
          <div>
            <p className="eyebrow mb-3">Instagram</p>
            <h2 id="instagram-title" className="display text-4xl sm:text-5xl">
              Siga a Energy Power
            </h2>
            <p className="mt-4 max-w-md text-pretty text-muted sm:text-lg">
              Novidades, reposições e as marcas que chegam na loja aparecem primeiro no perfil.
            </p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("primary", "md", "group mt-7 max-w-full")}
            >
              <InstagramIcon className="size-5 shrink-0" />
              <span className="truncate">{site.instagram.handle}</span>
              <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Destaques do perfil</p>
            <ul className="grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-5 lg:grid-cols-5">
              {brands.map((brand) => (
                <li key={brand.slug}>
                  <a
                    href={site.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${brand.name}: ver destaque no Instagram`}
                    className="group flex flex-col items-center gap-2 text-center"
                  >
                    <span className="grid aspect-square w-full max-w-20 place-items-center rounded-full bg-[conic-gradient(from_210deg,var(--color-brand),var(--color-accent),var(--color-brand))] p-[2px] transition-transform duration-300 ease-out-quint group-hover:scale-105">
                      <span className="grid size-full place-items-center rounded-full bg-raised font-display text-xl font-bold italic text-fg ring-[3px] ring-surface">
                        {initials(brand.name)}
                      </span>
                    </span>
                    <span className="w-full truncate text-xs text-muted transition-colors group-hover:text-fg">{brand.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
