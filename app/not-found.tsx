import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-24 text-center sm:py-32">
      <p className="display text-8xl text-brand sm:text-9xl">404</p>
      <h1 className="display mt-4 text-3xl sm:text-4xl">Página não encontrada</h1>
      <p className="mt-4 max-w-md text-muted">O endereço pode ter mudado ou o produto saiu do catálogo.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/produtos" className={buttonClass("primary", "md")}>
          Ver produtos
        </Link>
        <Link href="/" className={buttonClass("secondary", "md")}>
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
