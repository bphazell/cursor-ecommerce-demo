import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useCart, cartTotals } from "@/store/cart";
import { formatPrice, generateOrderNumber } from "@/lib/utils";
import type { Order, OrderLine } from "@/lib/types";

export const ORDER_STORAGE_KEY = "cascade-last-order";

export function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCart((s) => s.items);
  const clearCart = useCart((s) => s.clearCart);
  const totals = cartTotals(items);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");

  if (items.length === 0) {
    return (
      <div className="py-20">
        <Container>
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Your cart is empty.
            </h1>
            <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
              Add something to your cart before checking out.
            </p>
            <Link to="/products" className="mt-8">
              <Button size="lg">Start shopping</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const orderLines: OrderLine[] = items.map((item) => ({
      productId: item.product.id,
      productSlug: item.product.slug,
      productName: item.product.name,
      productImage: item.product.image,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor,
      quantity: item.quantity,
      unitPrice: item.product.price,
      lineTotal: item.product.price * item.quantity,
    }));

    const order: Order = {
      orderNumber: generateOrderNumber(),
      placedAt: new Date().toISOString(),
      items: orderLines,
      shipping: { name, email, address, zip },
      subtotal: totals.subtotal,
      shippingCost: totals.shipping,
      tax: totals.tax,
      total: totals.total,
    };

    sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
    clearCart();
    navigate("/checkout/success");
  };

  const inputClass =
    "mt-1.5 block w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)]";

  return (
    <div className="py-10">
      <Container>
        <Link
          to="/cart"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to cart
        </Link>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
          Demo storefront — no payment will be processed.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-10 lg:grid-cols-3 lg:gap-12"
        >
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold">Shipping information</h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium">
                  Shipping address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="street-address"
                  placeholder="123 Main St, Apt 4B, City, State"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="zip" className="block text-sm font-medium">
                  ZIP code
                </label>
                <input
                  id="zip"
                  name="zip"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  pattern="[0-9]{5}"
                  placeholder="12345"
                  required
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-muted)]/30 p-6">
              <h2 className="text-lg font-semibold">Order summary</h2>

              <ul className="mt-5 divide-y divide-[var(--color-border)]">
                {items.map((item) => {
                  const variant = [item.selectedColor, item.selectedSize]
                    .filter(Boolean)
                    .join(" / ");
                  return (
                    <li
                      key={`${item.product.id}-${item.selectedSize ?? ""}-${
                        item.selectedColor ?? ""
                      }`}
                      className="flex items-start gap-3 py-3 text-sm"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-12 w-12 flex-shrink-0 rounded-[var(--radius-md)] object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium leading-tight">
                          {item.product.name}
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--color-muted-foreground)]">
                          Qty {item.quantity}
                          {variant ? ` • ${variant}` : ""}
                        </p>
                      </div>
                      <span className="font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <dl className="mt-5 space-y-2 border-t border-[var(--color-border)] pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[var(--color-muted-foreground)]">
                    Subtotal
                  </dt>
                  <dd className="font-medium">{formatPrice(totals.subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--color-muted-foreground)]">
                    Shipping
                  </dt>
                  <dd className="font-medium">
                    {totals.shipping === 0
                      ? "Free"
                      : formatPrice(totals.shipping)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--color-muted-foreground)]">
                    Estimated tax
                  </dt>
                  <dd className="font-medium">{formatPrice(totals.tax)}</dd>
                </div>
                <div className="flex justify-between border-t border-[var(--color-border)] pt-3 text-base">
                  <dt className="font-semibold">Total</dt>
                  <dd className="font-semibold">{formatPrice(totals.total)}</dd>
                </div>
              </dl>

              <Button type="submit" size="lg" className="mt-6 w-full">
                <Lock className="h-4 w-4" />
                Place order
              </Button>

              <p className="mt-3 text-center text-xs text-[var(--color-muted-foreground)]">
                Demo checkout — no payment required.
              </p>
            </div>
          </aside>
        </form>
      </Container>
    </div>
  );
}
