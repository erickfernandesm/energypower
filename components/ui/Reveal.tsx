"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/format";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Atraso em ms, para escalonar itens de uma grade. */
  delay?: number;
}

/** Entrada suave quando o bloco entra na tela. Um observer por bloco, sem biblioteca. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
