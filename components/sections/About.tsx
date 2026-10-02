import Image from "next/image";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/data/content";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="border-y border-line bg-surface">
      <div className="container-page grid gap-10 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="relative mx-auto flex aspect-square w-full max-w-64 items-center justify-center lg:max-w-sm">
          <span aria-hidden="true" className="absolute inset-0 rounded-full border border-white/10" />
          <span aria-hidden="true" className="absolute inset-[9%] rounded-full border border-dashed border-brand/30" />
          <Image
            src="/images/logo.jpg"
            alt="Logo da Energy Power Suplementos"
            width={150}
            height={150}
            className="relative w-[58%] rounded-full shadow-[0_0_80px_-20px_var(--color-brand)]"
          />
        </Reveal>

        <Reveal>
          <p className="eyebrow mb-3">{about.eyebrow}</p>
          <h2 id="sobre-title" className="display max-w-2xl text-4xl sm:text-5xl">
            {about.title}
          </h2>
          <div className="mt-6 max-w-2xl space-y-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className="mt-9 grid max-w-2xl grid-cols-3 gap-4 border-t border-line pt-7">
            {about.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col-reverse gap-1">
                <dt className="text-xs leading-snug text-muted sm:text-sm">{fact.label}</dt>
                <dd className="display text-2xl text-fg sm:text-4xl">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <a
            href={whatsappUrl(whatsappMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("whatsapp", "md", "mt-9 w-full sm:w-auto")}
          >
            <WhatsAppIcon className="size-5 text-whats" />
            Tirar dúvidas pelo WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
