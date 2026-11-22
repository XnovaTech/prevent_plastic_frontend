"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, CheckCircle, ShoppingBagOpen } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { SeedlingIcon } from "@/components/ui/seedlingIcon"
import { useCart } from "@/hooks/useCart"
import type { Product } from "@/services/productService"
import { useWishlistStore } from "@/stores/wishlistStore"

type ProductActionsProps = {
  product: Product
}

export function ProductActions({ product }: ProductActionsProps) {
  const [status, setStatus] = useState("")
  const { cart, isUpdating, setItem } = useCart()
  const selectedVariant = product.variants?.find(
    (variant) => variant.is_active !== false
  )
  const inBag =
    cart?.items.some((item) => item.product_id === product.id) ?? false
  const addWishlistItem = useWishlistStore((state) => state.addItem)
  const saved = useWishlistStore((state) =>
    state.items.some((item) => item.id === String(product.id))
  )

  async function handleAddToBag() {
    if (!selectedVariant) {
      setStatus("This item is not currently available.")
      return
    }

    await setItem({
      product_id: product.id,
      variant_id: selectedVariant.id,
      quantity: 1,
    })
    setStatus(`“${product.name}” is now in your bag.`)
  }

  function handleSave() {
    if (saved) {
      return
    }

    addWishlistItem({
      id: String(product.id),
      name: product.name,
      category: product.category?.name ?? "Everyday things",
      price: Number(selectedVariant?.price ?? 0),
      merchant: product.vendor?.display_name ?? "Local seller",
      condition: "Good",
      image:
        product.images?.find((image) => image.is_primary)?.url ??
        product.images?.[0]?.url ??
        "/products/ceramicPlates.jpg",
    })
    setStatus(`“${product.name}” was saved to your wishlist.`)
  }

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <Button
          className="h-11 flex-1 rounded-full bg-brand-2 px-5 text-[11px] font-bold text-white hover:bg-[#1f6157]"
          isDisabled={isUpdating || !selectedVariant}
          onPress={() => void handleAddToBag()}
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
            <SeedlingIcon size={16} />
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
