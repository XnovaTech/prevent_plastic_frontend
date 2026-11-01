"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  ArrowRight,
  ShoppingBagOpen,
  Trash,
} from "@phosphor-icons/react"

import { wishlistPageMock } from "@/mock/wishlistPageMock"
import { SeedlingIcon } from "@/components/ui/seedlingIcon"
import { useCartStore } from "@/stores/cartStore"
import { useWishlistStore } from "@/stores/wishlistStore"

function formatPrice(value: number) {
  return `Ks ${value.toLocaleString("en-US")}`
}

export function WishlistItems() {
  const items = useWishlistStore((state) => state.items)
  const removeItem = useWishlistStore((state) => state.removeItem)
  const addItemToCart = useCartStore((state) => state.addItem)
  const [status, setStatus] = useState("")

  const { empty, notice } = wishlistPageMock

  function handleAddToBag(item: (typeof items)[number]) {
    addItemToCart({ ...item, quantity: 1 })
    removeItem(item.id)
    setStatus(`“${item.name}” moved to your bag.`)
  }

  function handleRemove(id: string, name: string) {
    removeItem(id)
    setStatus(`“${name}” was removed from your wishlist.`)
  }

  return (
    <section className="py-12 sm:py-16" id="wishlist-items">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div
          className="mb-7 flex flex-wrap items-end justify-between gap-4 sm:mb-9"
          data-aos="fade-up"
        >
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
              YOUR WISHLIST
            </p>
            <h1 className="font-serif text-[30px] leading-tight tracking-[-0.04em] text-brand sm:text-[38px]">
              Saved for later
            </h1>
          </div>
          <p className="pb-1 text-[11px] font-medium text-[#557360]">
            {items.length} {items.length === 1 ? "good find" : "good finds"}
          </p>
        </div>

        <p
          aria-live="polite"
          className={
            status
              ? "mb-5 rounded-[14px] border border-[#d8e5d3] bg-[#edf4e8] px-4 py-3 text-[11px] text-brand-4"
              : "sr-only"
          }
          role="status"
        >
          {status}
        </p>

        {items.length === 0 ? (
          <div
            className="rounded-[26px] border border-dashed border-[#d8e0d7] bg-white/60 px-6 py-14 text-center"
            data-aos="fade-up"
          >
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#f9e8df] text-[#a65e46]">
              <SeedlingIcon size={26} />
            </span>
            <h3 className="mt-5 font-serif text-[27px] tracking-[-0.04em] text-brand">
              {empty.title}
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-[12px] leading-6 text-brand-lighter">
              {empty.description}
            </p>
            <Link
              className="mx-auto mt-6 inline-flex h-11 items-center gap-3 rounded-full bg-brand-2 px-5 text-[11px] font-bold text-white transition-transform hover:-translate-y-0.5"
              href={empty.actionHref}
            >
              {empty.actionLabel}
              <span className="flex size-6 items-center justify-center rounded-full bg-[#d9f09b] text-brand-2">
                <ArrowRight aria-hidden="true" size={14} />
              </span>
            </Link>
          </div>
        ) : (
          <>
            <div
              className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {items.map((item) => (
                <article
                  className="group flex min-w-0 flex-col rounded-[26px] border border-white/65 bg-white/50 p-2.5 backdrop-blur-xl transition-colors hover:bg-white/65"
                  key={item.id}
                >
                  <div className="relative aspect-[4/4.35] overflow-hidden rounded-[22px] bg-[#f0eee6]">
                    <Image
                      alt={`${item.name}, ${item.condition.toLowerCase()} condition`}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 24vw"
                      src={item.image}
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-[#e8f1e3] px-2.5 py-1 text-[9px] font-bold tracking-[0.08em] text-[#38684f] uppercase">
                      Saved
                    </span>
                    <button
                      aria-label={`Remove ${item.name} from wishlist`}
                      className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full border border-white/70 bg-white/85 text-[#29443a] backdrop-blur transition-colors hover:bg-[#fbeae3] hover:text-brand-orange-3"
                      onClick={() => handleRemove(item.id, item.name)}
                      type="button"
                    >
                      <Trash aria-hidden="true" size={16} />
                    </button>
                  </div>

                  <div className="flex flex-1 flex-col px-0.5 pt-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate text-[14px] font-semibold text-brand-6 sm:text-[15px]">
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
                          {formatPrice(item.price)}
                        </p>
                        {item.originalPrice && (
                          <p className="mt-0.5 text-[11px] text-brand-gray-4 line-through">
                            {formatPrice(item.originalPrice)}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      className="mt-3 inline-flex h-9 items-center justify-center gap-2 rounded-full bg-brand-2 px-4 text-[10px] font-semibold text-white transition-colors hover:bg-[#1f6157]"
                      onClick={() => handleAddToBag(item)}
                      type="button"
                    >
                      <ShoppingBagOpen aria-hidden="true" size={14} />
                      Move to bag
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-6 text-[10px] leading-5 text-brand-gray-3">
              {notice}
            </p>
          </>
        )}
      </div>
    </section>
  )
}
