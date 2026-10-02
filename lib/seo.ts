import { brandName, categoryName } from "./products";
import { site } from "./site";
import type { Product } from "@/types";

/** Remove sequências que poderiam fechar a tag <script> do JSON-LD. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Dados estruturados da loja física (busca local do Google). */
export function storeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${site.url}/#loja`,
    name: site.name,
    description: site.description,
    url: site.url,
    image: `${site.url}/images/logo.jpg`,
    logo: `${site.url}/images/logo.jpg`,
    telephone: site.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: "BR",
    },
    areaServed: { "@type": "City", name: site.address.city },
    sameAs: [site.instagram.url],
    ...(site.hours ? { openingHours: site.hours.map((h) => h.schema) } : {}),
  };
}

/**
 * Dados estruturados de produto.
 * O preço só é publicado quando o catálogo é real, para não informar
 * ao Google valores ilustrativos.
 */
export function productJsonLd(product: Product) {
  const url = `${site.url}/produtos/${product.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: categoryName(product),
    brand: { "@type": "Brand", name: brandName(product) },
    url,
    ...(product.images.length > 0
      ? { image: product.images.map((src) => (src.startsWith("http") ? src : `${site.url}${src}`)) }
      : {}),
    ...(site.catalogIsDemo
      ? {}
      : {
          offers: {
            "@type": "Offer",
            url,
            priceCurrency: "BRL",
            price: (product.price / 100).toFixed(2),
            availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            seller: { "@id": `${site.url}/#loja` },
          },
        }),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
