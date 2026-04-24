import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart, cartTotals } from "@/store/cart";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const items = useCart((s) => s.items);
  const closeCart = useCart((s) => s.closeCart);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);

  const { subtotal, itemCount } = cartTotals(items);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-[var(--color-background)] shadow-xl transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <h2 className="text-base font-semibold">
              Your Cart{" "}
              <span className="text-[var(--color-muted-foreground)] font-normal">
                ({itemCount})
              </span>
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-[var(--color-muted-foreground)]" />
            <p className="text-sm text-[var(--color-muted-foreground)]">
              Your cart is empty.
            </p>
            <Button onClick={closeCart} variant="outline" size="sm">
              Keep shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="divide-y divide-[var(--color-border)]">
                {items.map((item) => {
                  const lineTotal = item.product.price * item.quantity;
                  return (
                    <li
                      key={`${item.product.id}-${item.selectedSize ?? ""}-${
                        item.selectedColor ?? ""
                      }`}
                      className="flex gap-4 py-4"
                    >
                      <Link
                        to={`/products/${item.product.slug}`}
                        onClick={closeCart}
                        className="block h-20 w-20 flex-shrink-0 overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-muted)]"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </Link>

                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/products/${item.product.slug}`}
                            onClick={closeCart}
                            className="text-sm font-medium leading-tight hover:underline"
                          >
                            {item.product.name}
                          </Link>
                          <span className="text-sm font-medium">
                            {formatPrice(lineTotal)}
                          </span>
                        </div>

                        <div className="mt-0.5 text-xs text-[var(--color-muted-foreground)]">
                          {[item.selectedColor, item.selectedSize]
                            .filter(Boolean)
                            .join(" / ")}
                        </div>

                        <div className="mt-3 flex items-center justify-between">
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
                              className="inline-flex h-7 w-7 items-center justify-center text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-7 text-center text-sm tabular-nums">
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
                              className="inline-flex h-7 w-7 items-center justify-center text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                            >
                              <Plus className="h-3 w-3" />
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
                            className="text-xs text-[var(--color-muted-foreground)] underline-offset-2 hover:text-[var(--color-foreground)] hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-t border-[var(--color-border)] px-5 py-4">
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-[var(--color-muted-foreground)]">
                  Subtotal
                </span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <p className="mb-4 text-xs text-[var(--color-muted-foreground)]">
                Shipping and taxes calculated at checkout.
              </p>
              <Link to="/cart" onClick={closeCart} className="block">
                <Button className="w-full" size="lg">
                  View Cart &amp; Checkout
                </Button>
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
