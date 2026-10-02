import { site } from "@/lib/site";

/**
 * Aviso de catálogo demonstrativo.
 * Desaparece sozinho quando `catalogIsDemo` vira `false` em /lib/site.ts.
 */
export function DemoNotice() {
  if (!site.catalogIsDemo) return null;
  return (
    <p className="border-b border-line bg-raised px-4 py-2 text-center text-xs text-muted">
      <strong className="font-semibold text-fg">Catálogo demonstrativo.</strong> Produtos e preços são ilustrativos.
      Consulte valores e disponibilidade pelo WhatsApp.
    </p>
  );
}
