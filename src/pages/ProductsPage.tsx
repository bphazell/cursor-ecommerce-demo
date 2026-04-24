import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/products/ProductGrid";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = (searchParams.get("category") as Category | null) ?? null;
  const sort = (searchParams.get("sort") as SortOption) ?? "featured";

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory) {
      list = list.filter((p) => p.category === activeCategory);
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
        break;
      case "featured":
      default:
        list.sort(
          (a, b) =>
            Number(b.isBestseller ?? false) - Number(a.isBestseller ?? false)
        );
    }

    return list;
  }, [activeCategory, sort]);

  const setCategory = (category: Category | null) => {
    const next = new URLSearchParams(searchParams);
    if (category) next.set("category", category);
    else next.delete("category");
    setSearchParams(next);
  };

  const setSort = (newSort: SortOption) => {
    const next = new URLSearchParams(searchParams);
    if (newSort === "featured") next.delete("sort");
    else next.set("sort", newSort);
    setSearchParams(next);
  };

  const heading = activeCategory
    ? categories.find((c) => c.id === activeCategory)?.name ?? "Shop"
    : "Shop All";

  const subheading = activeCategory
    ? categories.find((c) => c.id === activeCategory)?.description
    : "The full Cascade collection.";

  return (
    <div className="py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {heading}
          </h1>
          {subheading && (
            <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
              {subheading}
            </p>
          )}
        </div>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-10">
          <aside className="lg:w-56 lg:flex-shrink-0">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)]">
              Categories
            </h2>
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              <li>
                <button
                  type="button"
                  onClick={() => setCategory(null)}
                  className={cn(
                    "w-full rounded-[var(--radius-md)] px-3 py-1.5 text-left text-sm transition-colors",
                    !activeCategory
                      ? "bg-[var(--color-muted)] font-medium"
                      : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                  )}
                >
                  All Products
                </button>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    type="button"
                    onClick={() => setCategory(category.id)}
                    className={cn(
                      "w-full rounded-[var(--radius-md)] px-3 py-1.5 text-left text-sm transition-colors",
                      activeCategory === category.id
                        ? "bg-[var(--color-muted)] font-medium"
                        : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                    )}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between border-b border-[var(--color-border)] pb-3">
              <p className="text-sm text-[var(--color-muted-foreground)]">
                {filtered.length} {filtered.length === 1 ? "item" : "items"}
              </p>
              <label className="flex items-center gap-2 text-sm">
                <span className="text-[var(--color-muted-foreground)]">
                  Sort:
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)]"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <ProductGrid products={filtered} />
          </div>
        </div>
      </Container>
    </div>
  );
}
