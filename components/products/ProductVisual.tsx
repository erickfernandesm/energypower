import { useId } from "react";
import type { VisualShape } from "@/types";

/**
 * Ilustração vetorial de embalagem, usada enquanto o produto não tem foto.
 * É SVG puro: não pesa na página e fica nítida em qualquer tamanho.
 */

export type VisualTone = "yellow" | "red" | "white" | "graphite";

const tones: Record<VisualTone, { label: string; ink: string; body: string; lid: string }> = {
  yellow: { label: "#ffd60a", ink: "#0a0a0a", body: "#141416", lid: "#0c0c0d" },
  red: { label: "#e5231b", ink: "#ffffff", body: "#141416", lid: "#0c0c0d" },
  white: { label: "#f1f1ee", ink: "#0a0a0a", body: "#1b1b1f", lid: "#ffd60a" },
  graphite: { label: "#2b2b31", ink: "#ffd60a", body: "#0f0f11", lid: "#ffd60a" },
};

const toneOrder: VisualTone[] = ["yellow", "graphite", "red", "white"];

/** Escolhe um tom estável a partir de um texto (ex.: slug do produto). */
export function toneFor(seed: string): VisualTone {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return toneOrder[hash % toneOrder.length];
}

interface ProductVisualProps {
  shape: VisualShape;
  label: string;
  tone?: VisualTone;
  className?: string;
  /** Texto alternativo. Sem ele, a ilustração é decorativa. */
  title?: string;
}

interface Cylinder {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  lid: { x: number; y: number; w: number; h: number };
  band: { y: number; h: number };
}

const cylinders: Record<"tub" | "jar" | "bottle", Cylinder> = {
  tub: { x: 34, y: 58, w: 132, h: 162, r: 14, lid: { x: 40, y: 26, w: 120, h: 34 }, band: { y: 92, h: 96 } },
  jar: { x: 30, y: 96, w: 140, h: 124, r: 14, lid: { x: 36, y: 66, w: 128, h: 32 }, band: { y: 122, h: 72 } },
  bottle: { x: 56, y: 62, w: 88, h: 158, r: 16, lid: { x: 68, y: 26, w: 64, h: 30 }, band: { y: 100, h: 88 } },
};

function labelSize(label: string, width: number, max: number) {
  return Math.min(max, (width / Math.max(label.length, 4)) * 1.75);
}

const Bolt = ({ x, y, size, fill }: { x: number; y: number; size: number; fill: string }) => (
  <path
    d="M14.5 1 4 14h6.2L8.6 23 20 9.5h-6.6L14.5 1Z"
    fill={fill}
    transform={`translate(${x} ${y}) scale(${size / 24})`}
  />
);

export function ProductVisual({ shape, label, tone = "yellow", className, title }: ProductVisualProps) {
  const uid = `v${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const shade = `${uid}-shade`;
  const clip = `${uid}-clip`;
  const t = tones[tone];

  return (
    <svg
      viewBox="0 0 200 240"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        {/* Luz lateral para dar volume cilíndrico. */}
        <linearGradient id={shade} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.45" />
          <stop offset="0.22" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      <ellipse cx="100" cy="224" rx="74" ry="7" fill="#000" opacity="0.5" />

      {(shape === "tub" || shape === "jar" || shape === "bottle") &&
        (() => {
          const c = cylinders[shape];
          const fontSize = labelSize(label, c.w - 24, shape === "bottle" ? 15 : shape === "jar" ? 21 : 24);
          return (
            <g>
              <clipPath id={clip}>
                <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={c.r} />
              </clipPath>
              <rect x={c.lid.x} y={c.lid.y} width={c.lid.w} height={c.lid.h} rx="7" fill={t.lid} />
              <rect x={c.lid.x} y={c.lid.y} width={c.lid.w} height={c.lid.h} rx="7" fill={`url(#${shade})`} />
              {Array.from({ length: 9 }, (_, i) => (
                <rect
                  key={i}
                  x={c.lid.x + 10 + (i * (c.lid.w - 22)) / 8}
                  y={c.lid.y + 7}
                  width="2"
                  height={c.lid.h - 14}
                  fill="#000"
                  opacity="0.28"
                />
              ))}
              <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={c.r} fill={t.body} />
              <g clipPath={`url(#${clip})`}>
                <rect x={c.x} y={c.band.y} width={c.w} height={c.band.h} fill={t.label} />
                {/* Faixa diagonal: movimento. */}
                <path
                  d={`M${c.x + c.w * 0.62} ${c.band.y} h${c.w * 0.16} l${-c.w * 0.3} ${c.band.h} h${-c.w * 0.16} Z`}
                  fill={t.ink}
                  opacity="0.1"
                />
                <Bolt x={c.x + 12} y={c.band.y + (shape === "jar" ? 6 : 10)} size={shape === "tub" ? 20 : 15} fill={t.ink} />
                <text
                  x={c.x + 12}
                  y={c.band.y + c.band.h - 26}
                  fontFamily="var(--font-display)"
                  fontWeight="700"
                  fontStyle="italic"
                  fontSize={fontSize}
                  fill={t.ink}
                >
                  {label}
                </text>
                <rect x={c.x + 12} y={c.band.y + c.band.h - 17} width={c.w * 0.42} height="3" fill={t.ink} opacity="0.75" />
                <rect x={c.x + 12} y={c.band.y + c.band.h - 10} width={c.w * 0.26} height="3" fill={t.ink} opacity="0.4" />
                <rect x={c.x} y={c.y} width={c.w} height={c.h} fill={`url(#${shade})`} />
              </g>
            </g>
          );
        })()}

      {shape === "bar" && (
        <g transform="rotate(-14 100 130)">
          <path d="M12 104 l8 6 -8 6 8 6 -8 6 8 6 -8 6 8 6 -8 6 h16 v-48 Z" fill={t.label} opacity="0.85" />
          <path d="M188 104 l-8 6 8 6 -8 6 8 6 -8 6 8 6 -8 6 8 6 h-16 v-48 Z" fill={t.label} opacity="0.85" />
          <rect x="26" y="100" width="148" height="56" rx="6" fill={t.label} />
          <path d="M112 100 h26 l-22 56 h-26 Z" fill={t.ink} opacity="0.1" />
          <Bolt x={36} y={108} size={18} fill={t.ink} />
          <text
            x="60"
            y="137"
            fontFamily="var(--font-display)"
            fontWeight="700"
            fontStyle="italic"
            fontSize={labelSize(label, 104, 20)}
            fill={t.ink}
          >
            {label}
          </text>
          <rect x="26" y="100" width="148" height="56" rx="6" fill="#fff" opacity="0.07" />
          <rect x="26" y="100" width="148" height="12" rx="6" fill="#fff" opacity="0.14" />
        </g>
      )}

      {shape === "shaker" && (
        <g>
          <clipPath id={clip}>
            <path d="M52 78 h96 l-9 134 a10 10 0 0 1 -10 9 h-58 a10 10 0 0 1 -10 -9 Z" />
          </clipPath>
          <rect x="108" y="18" width="26" height="22" rx="5" fill={t.label} />
          <rect x="46" y="38" width="108" height="42" rx="9" fill={t.lid === "#ffd60a" ? "#0c0c0d" : t.lid} />
          <rect x="46" y="38" width="108" height="42" rx="9" fill={`url(#${shade})`} />
          <path d="M52 78 h96 l-9 134 a10 10 0 0 1 -10 9 h-58 a10 10 0 0 1 -10 -9 Z" fill="#24242a" />
          <g clipPath={`url(#${clip})`}>
            <rect x="40" y="128" width="120" height="100" fill={t.label} opacity="0.92" />
            <Bolt x={86} y={144} size={30} fill={t.ink} />
            <text
              x="100"
              y="198"
              textAnchor="middle"
              fontFamily="var(--font-display)"
              fontWeight="700"
              fontStyle="italic"
              fontSize="17"
              fill={t.ink}
            >
              {label}
            </text>
            {[96, 108, 120].map((y) => (
              <rect key={y} x="118" y={y} width="16" height="2" fill="#fff" opacity="0.35" />
            ))}
            <rect x="40" y="78" width="120" height="150" fill={`url(#${shade})`} />
          </g>
        </g>
      )}
    </svg>
  );
}
