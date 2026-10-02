import Image from "next/image";
import { categoryBySlug } from "@/data/categories";
import { brandName } from "@/lib/products";
import { cn } from "@/lib/format";
import type { Product } from "@/types";
import { ProductVisual, toneFor } from "./ProductVisual";

interface ProductImageProps {
  product: Product;
  /** Índice da foto em `product.images`. */
  index?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Marca a imagem como decorativa quando o nome já está ao lado. */
  decorative?: boolean;
}

/** Foto real do produto quando existe; senão, a ilustração da categoria. */
export function ProductImage({ product, index = 0, sizes, priority, className, decorative }: ProductImageProps) {
  const alt = decorative ? "" : `${product.name} ${brandName(product)}`;
  const src = product.images[index];

  if (src) {
    return (
      <div className={cn("relative", className)}>
        <Image src={src} alt={alt} fill sizes={sizes ?? "(min-width: 1024px) 25vw, 50vw"} priority={priority} className="object-contain" />
      </div>
    );
  }

  const category = categoryBySlug[product.category];
  return (
    <ProductVisual
      shape={category.shape}
      label={category.label}
      tone={toneFor(product.slug)}
      title={decorative ? undefined : alt}
      className={className}
    />
  );
}
