import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Package } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/lib/types";
import { ORDER_STORAGE_KEY } from "@/pages/CheckoutPage";

function readStoredOrder() {
  const raw = sessionStorage.getItem(ORDER_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Order;
  } catch {
    return null;
  }
}

export function CheckoutSuccessPage() {
  const [order] = useState<Order | null>(readStoredOrder);

  if (!order) {
    return (
      <div className="py-20">
        <Container>
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            <Package className="h-12 w-12 text-[var(--color-muted-foreground)]" />
            <h1 className="mt-6 text-2xl font-semibold tracking-tight">
              No recent order to show.
            </h1>
            <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
              Looks like you landed here directly. Browse the catalog and place
              an order to see this page in action.
            </p>
            <Link to="/products" className="mt-8">
              <Button size="lg">Browse products</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const firstName = order.shipping.name.split(" ")[0] || "there";

  return (
    <div className="py-12">
      <Container>
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-success)]/15 text-[var(--color-success)]">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
              Thanks, {firstName}!
            </h1>
            <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
              Your order is confirmed. We've sent a receipt to{" "}
              <span className="text-[var(--color-foreground)]">
                {order.shipping.email}
              </span>
              .
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-muted)]/30 px-4 py-2 text-sm">
              <span className="text-[var(--color-muted-foreground)]">
                Order #
              </span>
              <span className="font-mono font-medium tracking-wider">
                {order.orderNumber}
              </span>
            </div>
          </div>

          <div className="mt-10 rounded-[var(--radius-lg)] border border-[var(--color-border)]">
            <div className="border-b border-[var(--color-border)] px-6 py-4">
              <h2 className="text-base font-semibold">Order details</h2>
            </div>

            <ul className="divide-y divide-[var(--color-border)] px-6">
              {order.items.map((line) => {
                const variant = [line.selectedColor, line.selectedSize]
                  .filter(Boolean)
                  .join(" / ");
                return (
                  <li
                    key={`${line.productId}-${line.selectedSize ?? ""}-${
                      line.selectedColor ?? ""
                    }`}
                    className="flex items-start gap-4 py-4"
                  >
                    <Link
                      to={`/products/${line.productSlug}`}
                      className="block h-16 w-16 flex-shrink-0 overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-muted)]"
                    >
                      <img
                        src={line.productImage}
                        alt={line.productName}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link
                        to={`/products/${line.productSlug}`}
                        className="text-sm font-medium hover:underline"
                      >
                        {line.productName}
                      </Link>
                      <p className="mt-0.5 text-xs text-[var(--color-muted-foreground)]">
                        Qty {line.quantity}
                        {variant ? ` • ${variant}` : ""}
                      </p>
                    </div>
                    <span className="text-sm font-medium">
                      {formatPrice(line.lineTotal)}
                    </span>
                  </li>
                );
              })}
            </ul>

            <dl className="space-y-2 border-t border-[var(--color-border)] px-6 py-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-[var(--color-muted-foreground)]">
                  Subtotal
                </dt>
                <dd className="font-medium">{formatPrice(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[var(--color-muted-foreground)]">
                  Shipping
                </dt>
                <dd className="font-medium">
                  {order.shippingCost === 0
                    ? "Free"
                    : formatPrice(order.shippingCost)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[var(--color-muted-foreground)]">
                  Estimated tax
                </dt>
                <dd className="font-medium">{formatPrice(order.tax)}</dd>
              </div>
              <div className="flex justify-between border-t border-[var(--color-border)] pt-3 text-base">
                <dt className="font-semibold">Total</dt>
                <dd className="font-semibold">{formatPrice(order.total)}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] p-5">
              <h3 className="text-sm font-semibold">Shipping to</h3>
              <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
                {order.shipping.name}
                <br />
                {order.shipping.address}
                <br />
                {order.shipping.zip}
              </p>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] p-5">
              <h3 className="text-sm font-semibold">What's next</h3>
              <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
                You'll receive a shipping confirmation with tracking once your
                order leaves the warehouse — usually within 1–2 business days.
              </p>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link to="/products">
              <Button size="lg" variant="outline">
                Continue shopping
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
