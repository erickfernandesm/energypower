import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 py-4">
      <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full bg-raised text-brand">{icon}</span>
      <div className="min-w-0">
        <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</dt>
        <dd className="mt-1 text-fg">{children}</dd>
      </div>
    </div>
  );
}

const link = "underline decoration-line underline-offset-4 transition-colors hover:text-brand hover:decoration-brand";

export function Location() {
  const hoursMessage = "Olá! Qual é o horário de funcionamento da loja hoje?";

  return (
    <section id="contato" aria-labelledby="contato-title" className="border-t border-line bg-surface/50">
      <div className="container-page py-16 sm:py-24">
        <SectionHeading
          id="contato-title"
          eyebrow="Contato e localização"
          title="Encontre a Energy Power"
          description="Estamos no Centro de Juiz de Fora. Venha até a loja ou fale com a gente agora."
        />

        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="flex flex-col rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <dl className="divide-y divide-line">
              <Row icon={<MapPin className="size-5" />} label="Endereço">
                <address className="not-italic">
                  {site.address.street}
                  <br />
                  {site.address.district}, {site.address.city} - {site.address.state}
                </address>
              </Row>

              <Row icon={<Clock className="size-5" />} label="Horário">
                {site.hours ? (
                  <ul>
                    {site.hours.map((h) => (
                      <li key={h.days}>
                        {h.days}: {h.hours}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <a href={whatsappUrl(hoursMessage)} target="_blank" rel="noopener noreferrer" className={link}>
                    Consulte o horário de hoje pelo WhatsApp
                  </a>
                )}
              </Row>

              <Row icon={<Phone className="size-5" />} label="Telefone">
                <a href={`tel:${site.phone.e164}`} className={link}>
                  {site.phone.display}
                </a>
              </Row>

              <Row icon={<WhatsAppIcon className="size-5" />} label="WhatsApp">
                <a href={whatsappUrl(whatsappMessages.general)} target="_blank" rel="noopener noreferrer" className={link}>
                  {site.whatsapp.display}
                </a>
              </Row>

              <Row icon={<InstagramIcon className="size-5" />} label="Instagram">
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={`${link} break-all`}>
                  {site.instagram.handle}
                </a>
              </Row>
            </dl>

            <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
              <a href={site.maps.directions} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "md", "flex-1")}>
                <Navigation className="size-4" />
                Como chegar
              </a>
              <a
                href={whatsappUrl(whatsappMessages.general)}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("whatsapp", "md", "flex-1")}
              >
                <WhatsAppIcon className="size-5 text-whats" />
                Fale com a Energy Power
              </a>
            </div>
          </Reveal>

          <Reveal delay={80} className="min-h-80 overflow-hidden rounded-3xl border border-line bg-raised lg:min-h-full">
            <iframe
              src={site.maps.embed}
              title="Mapa: Energy Power Suplementos, Av. Rio Branco, 2099, Centro, Juiz de Fora"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full min-h-80 border-0 grayscale-[0.4] contrast-[1.05] [color-scheme:light]"
              allowFullScreen
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
