import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useCart, cartTotals } from "@/store/cart";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/products", label: "Shop All" },
  { to: "/products?category=outerwear", label: "Outerwear" },
  { to: "/products?category=tops", label: "Tops" },
  { to: "/products?category=footwear", label: "Footwear" },
  { to: "/about", label: "About" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = useCart((s) => s.items);
  const openCart = useCart((s) => s.openCart);
  const { itemCount } = cartTotals(items);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-background)]/80">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold tracking-tight"
            >
              <span
                className="inline-block h-6 w-6 rounded-sm bg-[var(--color-brand)]"
                aria-hidden
              />
              Cascade Goods
            </Link>
            <nav className="hidden items-center gap-6 md:flex">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/products"}
                  className={({ isActive }) =>
                    cn(
                      "text-sm transition-colors",
                      isActive
                        ? "text-[var(--color-foreground)] font-medium"
                        : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Search"
              className="hidden h-10 w-10 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)] sm:inline-flex"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={openCart}
              aria-label="Open cart"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-brand)] px-1 text-[10px] font-semibold text-[var(--color-brand-foreground)]">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)] md:hidden"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="border-t border-[var(--color-border)] py-3 md:hidden">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/products"}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "block rounded-[var(--radius-md)] px-3 py-2 text-sm",
                        isActive
                          ? "bg-[var(--color-muted)] text-[var(--color-foreground)] font-medium"
                          : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Container>
    </header>
  );
}
