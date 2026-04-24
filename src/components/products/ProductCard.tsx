import { Link } from "react-router-dom";
import type { Product } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-muted)]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && <Badge variant="brand">New</Badge>}
          {product.isBestseller && !product.isNew && (
            <Badge variant="accent">Bestseller</Badge>
          )}
          {product.compareAtPrice && (
            <Badge variant="success">Sale</Badge>
          )}
          {!product.inStock && <Badge variant="outline">Sold Out</Badge>}
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-1">
        <h3 className="text-sm font-medium leading-tight text-[var(--color-foreground)] group-hover:underline underline-offset-2">
          {product.name}
        </h3>
        <p className="line-clamp-1 text-xs text-[var(--color-muted-foreground)]">
          {product.tagline}
        </p>
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-[var(--color-muted-foreground)] line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          <StarRating rating={product.rating} size="sm" />
        </div>
      </div>
    </Link>
  );
}
