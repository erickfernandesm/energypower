import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/produtos", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/politica-de-privacidade", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/termos", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/trocas-e-devolucoes", priority: 0.2, changeFrequency: "yearly" as const },
  ];

  return [
    ...pages.map((page) => ({
      url: `${site.url}${page.path}`,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...getAllProducts().map((product) => ({
      url: `${site.url}/produtos/${product.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
