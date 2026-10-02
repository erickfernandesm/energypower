import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ShopProvider } from "@/components/cart/ShopProvider";
import { Toast } from "@/components/cart/Toast";
import { DemoNotice } from "@/components/layout/DemoNotice";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { SearchDialog } from "@/components/search/SearchDialog";
import { jsonLd, storeJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const body = Manrope({ subsets: ["latin"], variable: "--ff-body", display: "swap" });
const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--ff-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Loja de suplementos em Juiz de Fora`,
    template: `%s | ${site.shortName} Juiz de Fora`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title: `${site.name} | Loja de suplementos em Juiz de Fora`,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#09090a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${body.variable} ${display.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:font-semibold focus:text-black"
        >
          Pular para o conteúdo
        </a>
        <ShopProvider>
          <DemoNotice />
          <Header />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
          <SearchDialog />
          <CartDrawer />
          <Toast />
        </ShopProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(storeJsonLd()) }} />
      </body>
    </html>
  );
}
