import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, ChevronRight, ShoppingBag, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { getReviewsForProduct } from "@/data/reviews";
import { useCart } from "@/store/cart";
import { cn, formatPrice, formatDate } from "@/lib/utils";

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = useMemo(() => (slug ? getProductBySlug(slug) : undefined), [slug]);
  const reviews = useMemo(
    () => (product ? getReviewsForProduct(product.id) : []),
    [product]
  );
  const related = useMemo(
    () => (product ? getRelatedProducts(product.id) : []),
    [product]
  );

  const addItem = useCart((s) => s.addItem);

  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0]
  );
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!product) {
    return (
      <Container>
        <div className="py-24 text-center">
          <h1 className="text-2xl font-semibold">Product not found</h1>
          <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
            The product you're looking for doesn't exist.
          </p>
          <Link to="/products" className="mt-6 inline-block">
            <Button>Back to shop</Button>
          </Link>
        </div>
      </Container>
    );
  }

  const gallery = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  const handleAddToCart = () => {
    addItem(product, {
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
    });
  };

  return (
    <div className="py-8">
      <Container>
        <nav className="mb-6 flex items-center gap-1 text-xs text-[var(--color-muted-foreground)]">
          <Link to="/" className="hover:text-[var(--color-foreground)]">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/products" className="hover:text-[var(--color-foreground)]">
            Shop
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            to={`/products?category=${product.category}`}
            className="capitalize hover:text-[var(--color-foreground)]"
          >
            {product.category}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[var(--color-foreground)]">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-muted)]">
              <img
                src={gallery[activeImageIdx]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-3">
                {gallery.map((src, idx) => (
                  <button
                    type="button"
                    key={src}
                    onClick={() => setActiveImageIdx(idx)}
                    className={cn(
                      "aspect-square overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-muted)] ring-offset-2 transition-all",
                      activeImageIdx === idx &&
                        "ring-2 ring-[var(--color-ring)]"
                    )}
                  >
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              {product.isNew && <Badge variant="brand">New</Badge>}
              {product.isBestseller && <Badge variant="accent">Bestseller</Badge>}
              <span className="text-xs text-[var(--color-muted-foreground)] capitalize">
                {product.category}
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-2 text-base text-[var(--color-muted-foreground)]">
              {product.tagline}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <StarRating rating={product.rating} size="md" showValue />
              <span className="text-sm text-[var(--color-muted-foreground)]">
                ({product.reviewCount.toLocaleString()} reviews)
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-2xl font-semibold">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-base text-[var(--color-muted-foreground)] line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-[var(--color-foreground)]">
              {product.description}
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">Color</span>
                  <span className="text-sm text-[var(--color-muted-foreground)]">
                    {selectedColor}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      type="button"
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "rounded-[var(--radius-md)] border px-3 py-1.5 text-sm transition-colors",
                        selectedColor === color
                          ? "border-[var(--color-foreground)] bg-[var(--color-muted)]"
                          : "border-[var(--color-border)] hover:border-[var(--color-muted-foreground)]"
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {product.sizes && (
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Size</span>
                    <button
                      type="button"
                      className="text-xs text-[var(--color-muted-foreground)] underline-offset-2 hover:text-[var(--color-foreground)] hover:underline"
                    >
                      Size guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "min-w-12 rounded-[var(--radius-md)] border px-3 py-1.5 text-sm transition-colors",
                          selectedSize === size
                            ? "border-[var(--color-foreground)] bg-[var(--color-muted)]"
                            : "border-[var(--color-border)] hover:border-[var(--color-muted-foreground)]"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full"
              >
                <ShoppingBag className="h-4 w-4" />
                {product.inStock
                  ? `Add to Cart — ${formatPrice(product.price)}`
                  : "Sold Out"}
              </Button>

              <div className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
                <Truck className="h-3.5 w-3.5" />
                Free shipping on orders over $100
              </div>
            </div>

            <div className="mt-10 border-t border-[var(--color-border)] pt-6">
              <h3 className="mb-3 text-sm font-semibold">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-[var(--color-muted-foreground)]"
                  >
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-success)]" />
                    {feature}
                  </li>
                ))}
              </ul>
              {product.materials && (
                <div className="mt-5 text-sm">
                  <span className="font-semibold">Materials: </span>
                  <span className="text-[var(--color-muted-foreground)]">
                    {product.materials}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {reviews.length > 0 && (
          <section className="mt-20 border-t border-[var(--color-border)] pt-12">
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <h2 className="text-2xl font-semibold tracking-tight">Reviews</h2>
              <div className="flex items-center gap-2">
                <StarRating rating={product.rating} size="md" showValue />
                <span className="text-sm text-[var(--color-muted-foreground)]">
                  Based on {product.reviewCount.toLocaleString()} reviews
                </span>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-5"
                >
                  <header className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-muted)] text-sm font-medium">
                        {review.author.charAt(0)}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{review.author}</p>
                        <p className="text-xs text-[var(--color-muted-foreground)]">
                          {formatDate(review.date)}
                        </p>
                      </div>
                    </div>
                    {review.verified && (
                      <Badge variant="success">Verified buyer</Badge>
                    )}
                  </header>
                  <div className="mt-3">
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                  <h3 className="mt-2 text-sm font-semibold">{review.title}</h3>
                  <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
                    {review.body}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-8 text-2xl font-semibold tracking-tight">
              You might also like
            </h2>
            <ProductGrid products={related} />
          </section>
        )}
      </Container>
    </div>
  );
}
