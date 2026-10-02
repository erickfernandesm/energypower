"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/format";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  /** Nome acessível do diálogo. */
  label: string;
  /** Classes de alinhamento do painel dentro da tela (flex). */
  className?: string;
  /** Classes do painel. */
  panelClassName?: string;
  /** Direção de entrada do painel. */
  from?: "right" | "bottom" | "top";
  children: ReactNode;
}

const origins = {
  right: "translateX(32px)",
  bottom: "translateY(32px)",
  top: "translateY(-12px)",
};

/**
 * Wrapper sobre o <dialog> nativo: o navegador cuida do foco preso,
 * do Esc e da camada superior, sem biblioteca extra.
 */
export function Dialog({ open, onClose, label, className, panelClassName, from = "top", children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(event) => {
        // Clique fora do painel (no próprio <dialog>) fecha.
        if (event.target === ref.current) onClose();
      }}
      className={cn("ep-dialog", className)}
      style={{ "--ep-from": origins[from] } as React.CSSProperties}
    >
      <div className={cn("ep-panel", panelClassName)}>{children}</div>
    </dialog>
  );
}
