"use client"

import Link from "next/link"
import { useState } from "react"
import {
  ArrowRight,
  CheckCircle,
  Heart,
  ShoppingBagOpen,
} from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import type { HomeProduct } from "@/mock/homePageMock"
import { useCartStore } from "@/stores/cartStore"
import { useWishlistStore } from "@/stores/wishlistStore"

type ProductActionsProps = {
  product: HomeProduct
}

export function ProductActions({ product }: ProductActionsProps) {
  const [status, setStatus] = useState("")
  const addItem = useCartStore((state) => state.addItem)
  const inBag = useCartStore((state) =>
    state.items.some((item) => item.id === product.id)
  )
  const addWishlistItem = useWishlistStore((state) => state.addItem)
  const saved = useWishlistStore((state) =>
    state.items.some((item) => item.id === product.id)
  )

  function handleAddToBag() {
    addItem({ ...product, quantity: 1 })
    setStatus(`“${product.name}” is now in your bag.`)
  }

  function handleSave() {
    if (saved) {
      return
    }

    addWishlistItem(product)
    setStatus(`“${product.name}” was saved to your wishlist.`)
  }

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <Button
          className="h-11 flex-1 rounded-full bg-brand-2 px-5 text-[11px] font-bold text-white hover:bg-[#1f6157]"
          onPress={handleAddToBag}
          type="button"
        >
          <ShoppingBagOpen aria-hidden="true" size={16} />
          {inBag ? "Add another to bag" : "Add to bag"}
        </Button>
        <Button
          className="h-11 flex-1 rounded-full border-[#cfdccb] bg-white/45 px-5 text-[11px] font-semibold text-brand-3 backdrop-blur-md hover:bg-white"
          isDisabled={saved}
          onPress={handleSave}
          type="button"
          variant="outline"
        >
          {saved ? (
            <CheckCircle aria-hidden="true" size={16} weight="fill" />
          ) : (
            <Heart aria-hidden="true" size={16} />
          )}
          {saved ? "Saved to wishlist" : "Save for later"}
        </Button>
      </div>

      {inBag && (
        <Link
          className="mt-3 inline-flex items-center gap-2 text-[10px] font-semibold text-brand-3 transition-colors hover:text-brand-orange"
          href="/cart"
        >
          View your bag
          <ArrowRight aria-hidden="true" size={13} />
        </Link>
      )}

      <p
        aria-live="polite"
        className={
          status
            ? "mt-3 rounded-[14px] border border-[#d8e5d3] bg-brand-yellow-bg/80 px-4 py-3 text-[10px] text-brand-4 backdrop-blur-md"
            : "sr-only"
        }
        role="status"
      >
        {status}
      </p>
    </div>
  )
}
