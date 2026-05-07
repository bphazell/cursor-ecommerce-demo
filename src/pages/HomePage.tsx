import { Link } from "react-router-dom";
import { ArrowRight, Leaf, ShieldCheck, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductGrid } from "@/components/products/ProductGrid";
import { categories } from "@/data/categories";
import { getFeaturedProducts, getNewArrivals } from "@/data/products";
import { cn } from "@/lib/utils";

const valueProps = [
  {
    icon: Truck,
    title: "Free shipping over $100",
    body: "Carbon-neutral, shipped within two business days.",
    iconClass: "text-[var(--color-accent)]",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime warranty",
    body: "If it breaks, we'll repair it or replace it.",
    iconClass: "text-[var(--color-success)]",
  },
  {
    icon: Leaf,
    title: "Responsibly made",
    body: "Recycled fibers, RDS down, and PFC-free finishes.",
    iconClass: "text-[var(--color-info)]",
  },
] as const;

const CATEGORY_CARD_RINGS = [
  "group-hover:ring-[var(--color-category-accent-1)]",
  "group-hover:ring-[var(--color-category-accent-2)]",
  "group-hover:ring-[var(--color-category-accent-3)]",
  "group-hover:ring-[var(--color-category-accent-4)]",
  "group-hover:ring-[var(--color-category-accent-5)]",
  "group-hover:ring-[var(--color-category-accent-6)]",
] as const;

export function HomePage() {
  const featured = getFeaturedProducts(4);
  const newArrivals = getNewArrivals(4);

  return (
    <div className="flex flex-col gap-24 pb-12">
      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--color-hero-mesh-from)] via-[var(--color-background)] to-[var(--color-hero-mesh-to)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 top-1/3 h-[22rem] w-[22rem] rounded-full bg-[var(--color-hero-orb-accent)]/35 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-16 bottom-0 h-[18rem] w-[18rem] rounded-full bg-[var(--color-hero-orb-info)]/30 blur-3xl"
          aria-hidden
        />
        <Container className="relative">
          <div className="grid gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
            <div className="flex flex-col justify-center">
              <p className="inline-flex w-fit items-center rounded-full bg-[var(--color-accent)]/15 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[var(--color-accent)]">
                Spring Collection
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Built for the long walk home.
              </h1>
              <p className="mt-5 max-w-md text-base text-[var(--color-muted-foreground)]">
                Considered apparel, durable goods, and small objects for
                grounded, intentional living. Made in small batches and meant to
                last.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/products">
                  <Button size="lg">
                    Shop the Collection
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline">
                    Our Story
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-card)] shadow-lg ring-1 ring-[var(--color-accent)]/25">
              <img
                src="/images/heroes/home.jpg" // unsplash:1764622737791-5d1d914a366c
                alt="Misty mountains in the Pacific Northwest"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                <span
                  className="hidden h-8 w-1 shrink-0 rounded-full bg-[var(--color-section-accent-bar)] sm:block"
                  aria-hidden
                />
                Shop by category
              </h2>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                Browse the full range, organized by where you'll wear it.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group flex flex-col"
              >
                <div
                  className={cn(
                    "aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-muted)] ring-2 ring-transparent transition-[box-shadow,transform] duration-300 group-hover:-translate-y-0.5",
                    CATEGORY_CARD_RINGS[index % CATEGORY_CARD_RINGS.length],
                  )}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="mt-3 text-sm font-medium text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] group-hover:underline underline-offset-4">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                <span
                  className="hidden h-8 w-1 shrink-0 rounded-full bg-[var(--color-section-accent-bar)] sm:block"
                  aria-hidden
                />
                Bestsellers
              </h2>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                The pieces our customers come back for.
              </p>
            </div>
            <Link
              to="/products"
              className="hidden text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] sm:inline-flex sm:items-center sm:gap-1"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ProductGrid products={featured} />
        </Container>
      </section>

      <section className="relative overflow-hidden border-y border-[var(--color-border)] py-16">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--color-value-strip-from)] to-[var(--color-value-strip-to)]"
          aria-hidden
        />
        <Container className="relative">
          <div className="grid gap-10 md:grid-cols-3">
            {valueProps.map((prop) => (
              <div key={prop.title} className="flex gap-4">
                <prop.icon
                  className={cn(
                    "h-6 w-6 flex-shrink-0",
                    prop.iconClass,
                  )}
                />
                <div>
                  <h3 className="text-base font-semibold">{prop.title}</h3>
                  <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                    {prop.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                <span
                  className="hidden h-8 w-1 shrink-0 rounded-full bg-[var(--color-section-accent-bar)] sm:block"
                  aria-hidden
                />
                New arrivals
              </h2>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                Just dropped this season.
              </p>
            </div>
            <Link
              to="/products"
              className="hidden text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] sm:inline-flex sm:items-center sm:gap-1"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ProductGrid products={newArrivals} />
        </Container>
      </section>
    </div>
  );
}
