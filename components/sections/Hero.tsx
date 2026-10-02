import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { ProductVisual } from "@/components/products/ProductVisual";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { hero } from "@/data/content";
import { fullAddress, site } from "@/lib/site";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Fundo: luz amarela discreta e linhas de velocidade. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[20%] top-[-10%] aspect-square w-[80%] rounded-full bg-[radial-gradient(closest-side,rgb(255_214_10/0.13),transparent)] lg:-right-[5%] lg:w-[55%]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0_46px,rgb(255_255_255/0.022)_46px_47px)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="container-page grid items-center gap-6 pb-14 pt-10 sm:pt-14 lg:min-h-[min(46rem,calc(100dvh-4.5rem))] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-20 lg:pt-12">
        <div>
          <p className="eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-brand" aria-hidden="true" />
            {hero.eyebrow}
          </p>

          <h1 id="hero-title" className="display text-[clamp(3.25rem,13.5vw,6.75rem)] lg:text-[clamp(4.5rem,7.2vw,7.5rem)]">
            {hero.headline.map((line, index) => (
              <span key={line} className={index === hero.headline.length - 1 ? "block text-brand" : "block"}>
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">{hero.subheadline}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/produtos" className={buttonClass("primary", "lg", "group")}>
              Comprar agora
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={whatsappUrl(whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("whatsapp", "lg")}
            >
              <WhatsAppIcon className="size-5 text-whats" />
              Falar no WhatsApp
            </a>
          </div>

          <a
            href={site.maps.directions}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            <MapPin className="size-4 shrink-0 text-brand" />
            {fullAddress}
          </a>
        </div>

        {/* Composição de produtos sobre o círculo vermelho da logo. */}
        <div aria-hidden="true" className="relative mx-auto aspect-[10/9] w-full max-w-md lg:max-w-none">
          <div className="absolute left-1/2 top-1/2 aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
          <div className="absolute left-1/2 top-1/2 aspect-square w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/90 shadow-[0_0_120px_-20px_var(--color-accent)]" />
          <svg viewBox="0 0 24 24" className="absolute left-[18%] top-[4%] w-[64%] rotate-[8deg] fill-brand opacity-95">
            <path d="M14.5 1 4 14h6.2L8.6 23 20 9.5h-6.6L14.5 1Z" />
          </svg>

          <ProductVisual shape="jar" label="CREATINA" tone="graphite" className="absolute bottom-[4%] left-[2%] w-[36%] drop-shadow-[0_24px_30px_rgb(0_0_0/0.6)]" />
          <ProductVisual shape="bottle" label="VITAMINAS" tone="white" className="absolute bottom-[5%] right-[3%] w-[33%] drop-shadow-[0_24px_30px_rgb(0_0_0/0.6)]" />
          <div className="absolute bottom-0 left-1/2 w-[52%] -translate-x-1/2">
            <ProductVisual shape="tub" label="WHEY" tone="yellow" className="w-full animate-float drop-shadow-[0_30px_40px_rgb(0_0_0/0.7)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
