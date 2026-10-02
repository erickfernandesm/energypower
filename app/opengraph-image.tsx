import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} | Loja de suplementos em Juiz de Fora`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagem de compartilhamento (WhatsApp, Instagram, Google), gerada no build. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#09090a",
          color: "#f5f5f4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, color: "#ffd60a", letterSpacing: 6 }}>
          <div style={{ width: 56, height: 4, background: "#ffd60a" }} />
          SUPLEMENTOS EM JUIZ DE FORA
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 150, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>
          <span>ENERGY</span>
          <span style={{ color: "#ffd60a" }}>POWER</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, color: "#a3a3ad" }}>
          <span>
            {site.address.street}, {site.address.district}
          </span>
          <span>WhatsApp {site.whatsapp.display}</span>
        </div>
      </div>
    ),
    size,
  );
}
