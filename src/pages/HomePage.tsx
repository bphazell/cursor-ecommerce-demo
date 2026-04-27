import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, ShieldCheck, Truck, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductGrid } from "@/components/products/ProductGrid";
import { categories } from "@/data/categories";
import { getFeaturedProducts, getNewArrivals } from "@/data/products";

const PROMO_STORAGE_KEY = "cascade-promo-holiday-2026";

function PromoStrip() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY) !== "1";
    } catch {
      return true;
    }
  });

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(PROMO_STORAGE_KEY, "1");
    } catch {
      /* ignore quota / privacy mode */
    }
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Promotion"
      className="relative flex min-h-10 items-center justify-center border-b border-[var(--color-border)] bg-[var(--color-brand)] px-12 py-2 text-center text-xs text-[var(--color-brand-foreground)] sm:text-sm"
    >
      <p className="leading-snug">
        Free shipping over $75 through Dec 31.{" "}
        <Link
          to="/products"
          className="font-medium underline underline-offset-2 hover:opacity-90"
        >
          Shop the Sale
        </Link>
      </p>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss promo"
        className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-[var(--radius-md)] hover:bg-[var(--color-brand-foreground)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-foreground)]"
      >
        <X className="h-4 w-4 shrink-0" aria-hidden />
      </button>
    </div>
  );
}

const valueProps = [
  {
    icon: Truck,
    title: "Free shipping over $100",
    body: "Carbon-neutral, shipped within two business days.",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime warranty",
    body: "If it breaks, we'll repair it or replace it.",
  },
  {
    icon: Leaf,
    title: "Responsibly made",
    body: "Recycled fibers, RDS down, and PFC-free finishes.",
  },
];

export function HomePage() {
  const featured = getFeaturedProducts(4);
  const newArrivals = getNewArrivals(4);

  return (
    <div className="flex flex-col gap-24 pb-12">
      <div className="flex flex-col">
        <PromoStrip />
        <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-muted)]/40">
          <Container>
            <div className="grid gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
              <div className="flex flex-col justify-center">
                <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted-foreground)]">
                  Holiday Sale
                </p>
                <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                  The gifts that go the distance.
                </h1>
                <p className="mt-5 max-w-md text-base text-[var(--color-muted-foreground)]">
                  Thoughtful picks for everyone on your list—warm layers,
                  essentials, and gear worth wrapping. Limited-time pricing while
                  supplies last.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/products">
                    <Button size="lg">
                      Shop the Sale
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

              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-card)]">
                <img
                  src="/images/heroes/home.jpg" // unsplash:1764622737791-5d1d914a366c
                  alt="Misty mountains in the Pacific Northwest"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Container>
        </section>
      </div>

      <section>
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Shop by category
              </h2>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                Browse the full range, organized by where you'll wear it.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group flex flex-col"
              >
                <div className="aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-muted)]">
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="mt-3 text-sm font-medium group-hover:underline underline-offset-2">
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
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
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

      <section className="border-y border-[var(--color-border)] bg-[var(--color-muted)]/40 py-16">
        <Container>
          <div className="grid gap-10 md:grid-cols-3">
            {valueProps.map((prop) => (
              <div key={prop.title} className="flex gap-4">
                <prop.icon className="h-6 w-6 flex-shrink-0 text-[var(--color-brand)]" />
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
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
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
