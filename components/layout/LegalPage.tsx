import type { ReactNode } from "react";

interface LegalPageProps {
  title: string;
  children: ReactNode;
}

/**
 * Moldura das páginas institucionais.
 * TODO(loja): os textos são modelos iniciais e precisam de revisão
 * (de preferência jurídica) antes de o site ir ao ar.
 */
export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <div className="container-page pb-20 pt-8 sm:pt-12">
      <article className="mx-auto max-w-3xl">
        <p className="eyebrow mb-3">Institucional</p>
        <h1 className="display text-4xl sm:text-6xl">{title}</h1>
        <div className="mt-8 space-y-5 text-pretty leading-relaxed text-muted [&_a]:text-fg [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-fg [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          {children}
        </div>
      </article>
    </div>
  );
}
