import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/format";

interface LogoProps {
  className?: string;
  /** Mostra o nome ao lado do símbolo. */
  withName?: boolean;
  size?: number;
}

export function Logo({ className, withName = true, size = 40 }: LogoProps) {
  return (
    <Link href="/" aria-label="Energy Power Suplementos, página inicial" className={cn("flex shrink-0 items-center gap-2.5", className)}>
      <Image
        src="/images/logo.jpg"
        alt=""
        width={size}
        height={size}
        priority
        className="rounded-full ring-1 ring-white/10"
      />
      {withName && (
        <span className="font-display text-xl font-bold uppercase italic leading-none tracking-tight">
          Energy <span className="text-brand">Power</span>
        </span>
      )}
    </Link>
  );
}
