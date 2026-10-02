"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, MapPin, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useShop } from "@/components/cart/ShopProvider";
import { buttonClass } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { categories } from "@/data/categories";
import { cn } from "@/lib/format";
import { fullAddress, site } from "@/lib/site";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import { Logo } from "./Logo";

const nav = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#contato", label: "Contato" },
];

const iconButton =
  "relative grid size-11 place-items-center rounded-full text-fg transition-colors hover:bg-white/10";

export function Header() {
  const pathname = usePathname();
  const { count, ready, setCartOpen, setSearchOpen } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu ao navegar.
  useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));
  const linkClass = (href: string) =>
    cn(
      "rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-fg",
      isActive(href) ? "text-fg" : "text-muted",
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300",
        scrolled ? "border-line bg-ink/85 backdrop-blur-md" : "border-transparent bg-ink",
      )}
    >
      <div className="container-page flex h-16 items-center gap-2 lg:h-[4.5rem]">
        <Logo />

        <nav aria-label="Principal" className="ml-8 hidden items-center lg:flex">
          <Link href="/" className={linkClass("/")} aria-current={isActive("/") ? "page" : undefined}>
            Início
          </Link>
          <Link href="/produtos" className={linkClass("/produtos")} aria-current={isActive("/produtos") ? "page" : undefined}>
            Produtos
          </Link>

          {/* Categorias: abre no hover e também no foco do teclado. */}
          <div className="group relative">
            <Link href="/#categorias" className={cn(linkClass("/#categorias"), "flex items-center gap-1")}>
              Categorias
              <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
            </Link>
            <div className="invisible absolute left-0 top-full w-72 translate-y-1 pt-2 opacity-0 transition-[opacity,transform,visibility] duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <ul className="rounded-2xl border border-line bg-surface p-2 shadow-2xl shadow-black/60">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/produtos?categoria=${category.slug}`}
                      className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-white/5 hover:text-brand"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link href="/#sobre" className={linkClass("/#sobre")}>
            Sobre
          </Link>
          <Link href="/#contato" className={linkClass("/#contato")}>
            Contato
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
          <button type="button" className={iconButton} onClick={() => setSearchOpen(true)} aria-label="Buscar produtos">
            <Search className="size-5" />
          </button>

          <button
            type="button"
            className={iconButton}
            onClick={() => setCartOpen(true)}
            aria-label={ready && count > 0 ? `Abrir carrinho, ${count} ${count === 1 ? "item" : "itens"}` : "Abrir carrinho"}
          >
            <ShoppingBag className="size-5" />
            {ready && count > 0 && (
              <span
                key={count}
                className="absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] animate-pop place-items-center rounded-full bg-brand px-1 text-[0.6875rem] font-bold leading-none text-black"
              >
                {count}
              </span>
            )}
          </button>

          <a
            href={whatsappUrl(whatsappMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("whatsapp", "sm", "ml-2 max-lg:hidden")}
          >
            <WhatsAppIcon className="size-4 text-whats" />
            WhatsApp
          </a>

          <button
            type="button"
            className={cn(iconButton, "lg:hidden")}
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <Dialog
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        label="Menu"
        from="right"
        className="justify-end"
        panelClassName="flex h-full w-full max-w-sm flex-col border-l border-line bg-surface"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
          <Logo />
          <button type="button" className={iconButton} onClick={() => setMenuOpen(false)} aria-label="Fechar menu">
            <X className="size-5" />
          </button>
        </div>

        <nav aria-label="Menu" className="flex-1 overflow-y-auto px-4 py-5">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="display block py-2.5 text-3xl text-fg transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="eyebrow mb-2 mt-7">Categorias</p>
          <ul className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/produtos?categoria=${category.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex h-12 items-center rounded-xl border border-line bg-raised px-3.5 text-sm font-medium text-fg"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 space-y-3 border-t border-line p-4">
          <a
            href={whatsappUrl(whatsappMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("primary", "md", "w-full")}
          >
            <WhatsAppIcon className="size-5" />
            Fale com a Energy Power
          </a>
          <div className="flex items-center justify-between gap-3 text-sm text-muted">
            <a href={site.maps.directions} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-1.5 hover:text-fg">
              <MapPin className="size-4 shrink-0" />
              <span className="truncate">{fullAddress}</span>
            </a>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${site.instagram.handle}`}
              className="grid size-11 shrink-0 place-items-center rounded-full hover:text-fg"
            >
              <InstagramIcon className="size-5" />
            </a>
          </div>
        </div>
      </Dialog>
    </header>
  );
}
