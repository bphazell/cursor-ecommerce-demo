import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useCart, cartTotals } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export function CartPage() {
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const clearCart = useCart((s) => s.clearCart);

  const { subtotal, shipping, tax, total, itemCount } = cartTotals(items);

  if (items.length === 0) {
    return (
      <div className="py-20">
        <Container>
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            <ShoppingBag className="h-12 w-12 text-[var(--color-muted-foreground)]" />
            <h1 className="mt-6 text-2xl font-semibold tracking-tight">
              Your cart is empty.
            </h1>
            <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
              Once you add something, you'll see it here.
            </p>
            <Link to="/products" className="mt-8">
              <Button size="lg">Start shopping</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Cart
          </h1>
          <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {items.map((item) => {
                const lineTotal = item.product.price * item.quantity;
                return (
                  <li
                    key={`${item.product.id}-${item.selectedSize ?? ""}-${
                      item.selectedColor ?? ""
                    }`}
                    className="flex gap-5 py-6"
                  >
                    <Link
                      to={`/products/${item.product.slug}`}
                      className="block h-28 w-28 flex-shrink-0 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-muted)] sm:h-32 sm:w-32"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            to={`/products/${item.product.slug}`}
                            className="text-base font-medium hover:underline"
                          >
                            {item.product.name}
                          </Link>
                          <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                            {[item.selectedColor, item.selectedSize]
                              .filter(Boolean)
                              .join(" / ")}
                          </p>
                          <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                            {formatPrice(item.product.price)} each
                          </p>
                        </div>
                        <span className="text-base font-semibold">
                          {formatPrice(lineTotal)}
                        </span>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-4">
                        <div className="inline-flex items-center rounded-[var(--radius-md)] border border-[var(--color-border)]">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.selectedSize,
                                item.selectedColor
                              )
                            }
                            aria-label="Decrease quantity"
                            className="inline-flex h-8 w-8 items-center justify-center text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.selectedSize,
                                item.selectedColor
                              )
                            }
                            aria-label="Increase quantity"
                            className="inline-flex h-8 w-8 items-center justify-center text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            removeItem(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor
                            )
                          }
                          className="inline-flex items-center gap-1.5 text-xs text-[var(--color-muted-foreground)] hover:text-[var(--color-destructive)]"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-[var(--color-muted-foreground)] underline-offset-2 hover:text-[var(--color-foreground)] hover:underline"
              >
                Clear cart
              </button>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-muted)]/30 p-6">
              <h2 className="text-lg font-semibold">Order summary</h2>

              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[var(--color-muted-foreground)]">
                    Subtotal
                  </dt>
                  <dd className="font-medium">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--color-muted-foreground)]">
                    Shipping
                  </dt>
                  <dd className="font-medium">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--color-muted-foreground)]">
                    Estimated tax
                  </dt>
                  <dd className="font-medium">{formatPrice(tax)}</dd>
                </div>
                <div className="flex justify-between border-t border-[var(--color-border)] pt-3 text-base">
                  <dt className="font-semibold">Total</dt>
                  <dd className="font-semibold">{formatPrice(total)}</dd>
                </div>
              </dl>

              {subtotal < 100 && (
                <p className="mt-4 text-xs text-[var(--color-muted-foreground)]">
                  Spend {formatPrice(100 - subtotal)} more for free shipping.
                </p>
              )}

              <Button size="lg" className="mt-6 w-full">
                Checkout
              </Button>

              <p className="mt-3 text-center text-xs text-[var(--color-muted-foreground)]">
                Secure checkout. Free returns within 30 days.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
