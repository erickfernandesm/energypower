import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { differentials } from "@/data/content";

export function Differentials() {
  return (
    <section aria-labelledby="diferenciais-title" className="container-page py-16 sm:py-24">
      <SectionHeading id="diferenciais-title" eyebrow="Por que a Energy Power" title="Comprar suplemento sem dor de cabeça" />
      <ol className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
        {differentials.map((item, index) => (
          <li key={item.title}>
            <Reveal delay={index * 70} className="h-full border-t border-line py-6 lg:py-8">
              <span aria-hidden="true" className="display block text-5xl text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-pretty text-[0.9375rem] leading-relaxed text-muted">{item.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
