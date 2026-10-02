import type { ReactNode } from "react";
import { cn } from "@/lib/format";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Ação à direita (ex.: "Ver todos"). */
  action?: ReactNode;
  id?: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, action, id, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 sm:mb-10", className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 id={id} className="display text-4xl sm:text-5xl">
          {title}
        </h2>
        {description && <p className="mt-4 text-pretty text-muted sm:text-lg">{description}</p>}
      </div>
      {action}
    </div>
  );
}
