"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBagOpen,
  Trash,
} from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { cartPageMock } from "@/mock/cartPageMock"
import { useCartStore } from "@/stores/cartStore"

function formatPrice(value: number) {
  return `Ks ${value.toLocaleString("en-US")}`
}

export function CartContent() {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  const { summary, empty } = cartPageMock

  return (
    <section className="py-12 sm:py-16" id="bag">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div
          className="mb-7 flex flex-wrap items-end justify-between gap-4 sm:mb-9"
          data-aos="fade-up"
        >
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
              YOUR BAG
            </p>
            <h1 className="font-serif text-[30px] leading-tight tracking-[-0.04em] text-brand sm:text-[38px]">
              A few good things, waiting
            </h1>
          </div>
          <p className="pb-1 text-[11px] font-medium text-[#557360]">
            {itemCount} {itemCount === 1 ? "find" : "finds"} in your bag
          </p>
        </div>

        {items.length === 0 ? (
          <div
            className="rounded-[26px] border border-dashed border-[#d8e0d7] bg-white/60 px-6 py-14 text-center"
            data-aos="fade-up"
          >
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#e8f0e3] text-[#3c6950]">
              <ShoppingBagOpen aria-hidden="true" size={26} weight="duotone" />
            </span>
            <h3 className="mt-5 font-serif text-[27px] tracking-[-0.04em] text-brand">
              {empty.title}
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-[12px] leading-6 text-brand-lighter">
              {empty.description}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                className="inline-flex h-11 items-center gap-3 rounded-full bg-brand-2 px-5 text-[11px] font-bold text-white transition-transform hover:-translate-y-0.5"
                href={empty.actionHref}
              >
                {empty.actionLabel}
                <span className="flex size-6 items-center justify-center rounded-full bg-[#d9f09b] text-brand-2">
                  <ArrowRight aria-hidden="true" size={14} />
                </span>
              </Link>
              <Link
                className="inline-flex h-11 items-center rounded-full border border-[#d8e0d7] px-5 text-[11px] font-semibold text-brand-3 transition-colors hover:bg-white"
                href="/wishlist"
              >
                Visit your wishlist
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-8">
            <ul className="space-y-3" data-aos="fade-up">
              {items.map((item) => (
                <li
                  className="rounded-[22px] border border-[#e9e9e1] bg-white/70 p-3.5 transition-colors hover:border-[#d7e2d3] sm:p-4"
                  key={item.id}
                >
                  <div className="flex gap-3.5 sm:gap-5">
                    <div className="relative size-[92px] shrink-0 overflow-hidden rounded-[16px] bg-[#f0eee6] sm:size-[116px]">
                      <Image
                        alt={`${item.name}, ${item.condition.toLowerCase()} condition`}
                        className="object-cover"
                        fill
                        sizes="116px"
                        src={item.image}
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[9px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase">
                            {item.category}
                          </p>
                          <h3 className="mt-0.5 truncate text-[14px] font-semibold text-brand-6">
                            <Link
                              className="transition-colors hover:text-brand-2"
                              href={`/products/${item.id}`}
                            >
                              {item.name}
                            </Link>
                          </h3>
                          <p className="mt-1 text-[11px] text-brand-gray-2">
                            {item.merchant} <span className="mx-1">·</span>{" "}
                            {item.condition}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-[14px] font-bold text-brand-2">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="mt-0.5 text-[10px] text-brand-gray-3">
                              {formatPrice(item.price)} each
                            </p>
                          )}
                          {item.originalPrice && item.quantity === 1 && (
                            <p className="mt-0.5 text-[10px] text-brand-gray-4 line-through">
                              {formatPrice(item.originalPrice)}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                        <div className="inline-flex items-center rounded-full border border-[#dce4da] bg-white">
                          <button
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="flex size-8 items-center justify-center rounded-full text-brand-3 transition-colors hover:bg-[#f1f5ed] disabled:cursor-not-allowed disabled:opacity-35"
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            type="button"
                          >
                            <Minus aria-hidden="true" size={13} />
                          </button>
                          <span
                            aria-live="polite"
                            className="min-w-6 text-center text-[11px] font-semibold text-brand-6"
                          >
                            {item.quantity}
                          </span>
                          <button
                            aria-label={`Increase quantity of ${item.name}`}
                            className="flex size-8 items-center justify-center rounded-full text-brand-3 transition-colors hover:bg-[#f1f5ed]"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            type="button"
                          >
                            <Plus aria-hidden="true" size={13} />
                          </button>
                        </div>
                        <button
                          className="inline-flex items-center gap-1.5 text-[10px] font-medium text-brand-gray-3 transition-colors hover:text-brand-orange-3"
                          onClick={() => removeItem(item.id)}
                          type="button"
                        >
                          <Trash aria-hidden="true" size={13} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside
              className="rounded-[24px] border border-white/80 bg-white/60 p-5 backdrop-blur-xl sm:p-6 lg:sticky lg:top-28"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <p className="text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
                {summary.eyebrow}
              </p>
              <h3 className="mt-1.5 font-serif text-[26px] leading-tight tracking-[-0.04em] text-brand">
                {summary.title}
              </h3>

              <dl className="mt-5 space-y-3 border-b border-[#e9ece4] pb-5 text-[12px]">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-[#748078]">
                    Subtotal · {itemCount} {itemCount === 1 ? "item" : "items"}
                  </dt>
                  <dd className="font-semibold text-brand-6">
                    {formatPrice(subtotal)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-[#748078]">Delivery</dt>
                  <dd className="text-brand-gray-3">{summary.deliveryLabel}</dd>
                </div>
              </dl>

              <div className="mt-4 flex items-center justify-between gap-3 text-[13px] font-semibold text-brand-6">
                <span>{summary.totalLabel}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <Button
                aria-describedby="cart-checkout-pending"
                className="mt-5 h-11 w-full rounded-full bg-brand-2 px-5 text-xs font-bold text-white"
                isDisabled
                type="button"
              >
                {summary.checkoutLabel}
              </Button>
              <p
                className="mt-3 rounded-[14px] border border-brand-yellow-border bg-[#faf5e8] px-3.5 py-3 text-[10px] leading-5 text-brand-yellow-text"
                id="cart-checkout-pending"
              >
                {summary.pendingNote}
              </p>
              <p className="mt-3 rounded-[14px] bg-[#edf2e9] px-3.5 py-3 text-[10px] leading-5 text-[#557360]">
                {summary.guestNote}
              </p>
              <p className="mt-2 text-[9px] leading-4 text-brand-gray-3">
                {summary.sessionNote}
              </p>
              <Link
                className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold text-brand-3 transition-colors hover:text-brand-orange"
                href={summary.continueHref}
              >
                {summary.continueLabel}
                <ArrowRight aria-hidden="true" size={14} />
              </Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  )
}
