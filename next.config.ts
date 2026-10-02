import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportação estática: o build gera HTML puro na pasta /out, que
  // hospedagens como o Cloudflare Pages servem direto, sem servidor Node.
  // Quando houver backend (login, pagamento), remova esta linha e use um
  // adaptador do Next para a hospedagem escolhida.
  output: "export",
  // Sem servidor não há otimização de imagem sob demanda.
  images: { unoptimized: true },
};

export default nextConfig;
