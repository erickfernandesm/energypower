"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/format";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  /** Nome do produto, para leitores de tela. */
  label: string;
}

export function QuantityStepper({ value, onChange, min = 1, max = 99, size = "md", label }: QuantityStepperProps) {
  const button = cn(
    "grid place-items-center text-fg transition-colors hover:bg-white/10 disabled:opacity-35 disabled:hover:bg-transparent",
    size === "sm" ? "size-9" : "size-12",
  );
  return (
    <div
      role="group"
      aria-label={`Quantidade de ${label}`}
      className="inline-flex items-center overflow-hidden rounded-full border border-line bg-raised"
    >
      <button type="button" className={button} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Diminuir quantidade">
        <Minus className="size-4" />
      </button>
      <span aria-live="polite" className={cn("text-center font-semibold tabular-nums", size === "sm" ? "w-7 text-sm" : "w-9")}>
        {value}
      </span>
      <button type="button" className={button} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Aumentar quantidade">
        <Plus className="size-4" />
      </button>
    </div>
  );
}
