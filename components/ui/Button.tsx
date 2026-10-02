import { cn } from "@/lib/format";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap select-none " +
  "transition-[background-color,border-color,color,transform,box-shadow] duration-200 active:scale-[0.97] " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-black hover:bg-brand-strong hover:shadow-[0_0_28px_-6px_var(--color-brand)]",
  secondary: "border border-line bg-raised text-fg hover:border-fg/40 hover:bg-line/60",
  ghost: "text-fg hover:bg-white/5",
  whatsapp: "border border-whats/40 bg-whats/10 text-fg hover:border-whats hover:bg-whats/20",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-8 text-base",
};

/** Classes de botão, para usar em <button>, <a> ou <Link>. */
export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string): string {
  return cn(base, variants[variant], sizes[size], className);
}
