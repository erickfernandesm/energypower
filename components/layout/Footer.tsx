import Link from "next/link";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { categories } from "@/data/categories";
import { fullAddress, site } from "@/lib/site";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import { Logo } from "./Logo";

const linkClass = "inline-block py-1.5 text-sm text-muted transition-colors hover:text-fg";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-fg">{title}</h2>
      <ul>{children}</ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page grid gap-x-8 gap-y-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo size={48} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Loja de suplementos no Centro de {site.address.city}, com atendimento direto pelo WhatsApp.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${site.instagram.handle}`}
              className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-fg/40 hover:text-fg"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href={whatsappUrl(whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp da Energy Power"
              className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-whats/60 hover:text-whats"
            >
              <WhatsAppIcon className="size-5" />
            </a>
          </div>
        </div>

        <Column title="Energy Power">
          <li><Link href="/#sobre" className={linkClass}>Sobre</Link></li>
          <li><Link href="/produtos" className={linkClass}>Produtos</Link></li>
          <li><Link href="/#contato" className={linkClass}>Contato</Link></li>
        </Column>

        <Column title="Atendimento">
          <li>
            <a href={whatsappUrl(whatsappMessages.general)} target="_blank" rel="noopener noreferrer" className={linkClass}>
              WhatsApp {site.whatsapp.display}
            </a>
          </li>
          <li>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {site.instagram.handle}
            </a>
          </li>
          <li>
            <a href={site.maps.directions} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {fullAddress}
            </a>
          </li>
          <li>
            {site.hours ? (
              site.hours.map((h) => (
                <span key={h.days} className="block py-1.5 text-sm text-muted">
                  {h.days}: {h.hours}
                </span>
              ))
            ) : (
              <Link href="/#contato" className={linkClass}>Horários</Link>
            )}
          </li>
        </Column>

        <Column title="Produtos">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link href={`/produtos?categoria=${category.slug}`} className={linkClass}>
                {category.name}
              </Link>
            </li>
          ))}
        </Column>

        <Column title="Institucional">
          <li><Link href="/politica-de-privacidade" className={linkClass}>Política de Privacidade</Link></li>
          <li><Link href="/termos" className={linkClass}>Termos de Uso</Link></li>
          <li><Link href="/trocas-e-devolucoes" className={linkClass}>Trocas e Devoluções</Link></li>
        </Column>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 pr-24 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
          </p>
          <p>
            {site.address.city} - {site.address.state}
          </p>
        </div>
      </div>
    </footer>
  );
}
