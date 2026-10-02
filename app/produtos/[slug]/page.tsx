import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MapPin, MessageCircle, Zap } from "lucide-react";
import { Price } from "@/components/products/Price";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductPurchase } from "@/components/products/ProductPurchase";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { goals } from "@/data/categories";
import { brandName, categoryName, getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { breadcrumbJsonLd, jsonLd, productJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const title = `${product.name} ${brandName(product)}`;
  const description = `${product.shortDescription} Compre na Energy Power, em Juiz de Fora, ou peça pelo WhatsApp.`;
  return {
    title,
    description,
    alternates: { canonical: `/produtos/${product.slug}` },
    openGraph: { title, description, url: `/produtos/${product.slug}`, type: "website" },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const category = categoryName(product);
  const productGoals = goals.filter((goal) => product.goals.includes(goal.slug));

  const breadcrumb = [
    { name: "Início", path: "/" },
    { name: "Produtos", path: "/produtos" },
    { name: category, path: `/produtos?categoria=${product.category}` },
  ];

  return (
    <div className="container-page pb-20 pt-6 sm:pt-8">
      <nav aria-label="Você está em" className="scrollbar-none -mx-4 mb-6 overflow-x-auto px-4 sm:mb-8">
        <ol className="flex items-center gap-1.5 whitespace-nowrap text-sm text-muted">
          {breadcrumb.map((item) => (
            <li key={item.path} className="flex items-center gap-1.5">
              <Link href={item.path} className="py-2 transition-colors hover:text-fg">
                {item.name}
              </Link>
              <ChevronRight className="size-3.5" aria-hidden="true" />
            </li>
          ))}
          <li aria-current="page" className="py-2 text-fg">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <ProductGallery product={product} />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">{brandName(product)}</p>
          <h1 className="display mt-3 text-4xl sm:text-5xl">{product.name}</h1>
          <p className="mt-4 text-pretty text-muted sm:text-lg">{product.shortDescription}</p>

          <Price product={product} size="lg" className="mt-6" />
          {site.catalogIsDemo && (
            <p className="mt-2 text-xs text-muted">Preço ilustrativo. Confirme o valor pelo WhatsApp.</p>
          )}

          <div className="mt-7">
            <ProductPurchase product={product} />
          </div>

          <ul className="mt-7 grid gap-3 border-y border-line py-5 text-sm text-muted sm:grid-cols-3">
            <li className="flex items-center gap-2.5">
              <MessageCircle className="size-4 shrink-0 text-brand" aria-hidden="true" />
              Pedido pelo WhatsApp
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-brand" aria-hidden="true" />
              Loja no Centro de JF
            </li>
            <li className="flex items-center gap-2.5">
              <Zap className="size-4 shrink-0 text-brand" aria-hidden="true" />
              Sem cadastro para pedir
            </li>
          </ul>

          <section aria-labelledby="descricao-title" className="mt-8">
            <h2 id="descricao-title" className="text-lg font-semibold">
              Descrição
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted">{product.description}</p>
            {productGoals.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Indicado para">
                {productGoals.map((goal) => (
                  <li key={goal.slug}>
                    <Link
                      href={`/produtos?objetivo=${goal.slug}`}
                      className="inline-flex h-9 items-center rounded-full border border-line bg-raised px-3.5 text-sm text-fg transition-colors hover:border-brand/60"
                    >
                      {goal.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section aria-labelledby="info-title" className="mt-8">
            <h2 id="info-title" className="text-lg font-semibold">
              Informações do produto
            </h2>
            <dl className="mt-3 divide-y divide-line border-y border-line text-[0.9375rem]">
              {[
                { label: "Marca", value: brandName(product) },
                { label: "Categoria", value: category },
                ...product.specs,
              ].map((spec) => (
                <div key={spec.label} className="flex justify-between gap-6 py-3">
                  <dt className="text-muted">{spec.label}</dt>
                  <dd className="text-right font-medium">{spec.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              Suplementos não substituem uma alimentação equilibrada. Em caso de dúvida, consulte um nutricionista ou médico.
            </p>
          </section>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="relacionados-title" className="mt-20 sm:mt-28">
          <SectionHeading id="relacionados-title" eyebrow="Combine com" title="Produtos relacionados" />
          <ProductGrid products={related} />
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(productJsonLd(product)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(breadcrumbJsonLd([...breadcrumb, { name: product.name, path: `/produtos/${product.slug}` }])),
        }}
      />
    </div>
  );
}
