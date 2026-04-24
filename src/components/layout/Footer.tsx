import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";

const footerSections = [
  {
    title: "Shop",
    links: [
      { to: "/products", label: "All Products" },
      { to: "/products?category=outerwear", label: "Outerwear" },
      { to: "/products?category=tops", label: "Tops" },
      { to: "/products?category=footwear", label: "Footwear" },
      { to: "/products?category=accessories", label: "Accessories" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/about#sustainability", label: "Sustainability" },
      { to: "/about#stores", label: "Stores" },
      { to: "/about#careers", label: "Careers" },
    ],
  },
  {
    title: "Help",
    links: [
      { to: "/about#shipping", label: "Shipping & Returns" },
      { to: "/about#sizing", label: "Sizing Guide" },
      { to: "/about#contact", label: "Contact" },
      { to: "/about#warranty", label: "Lifetime Warranty" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--color-border)] bg-[var(--color-muted)]/40">
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
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
            <p className="mt-4 max-w-xs text-sm text-[var(--color-muted-foreground)]">
              Considered apparel and goods, made to last and built for the long
              walk home.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold tracking-wide uppercase text-[var(--color-foreground)]">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-[var(--color-border)] py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-[var(--color-muted-foreground)]">
            &copy; {new Date().getFullYear()} Cascade Goods. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-muted-foreground)]">
            Made with care in Portland, OR.
          </p>
        </div>
      </Container>
    </footer>
  );
}
