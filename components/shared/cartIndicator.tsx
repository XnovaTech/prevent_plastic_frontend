"use client"

import Link from "next/link"
import { ShoppingBagOpen } from "@phosphor-icons/react"

import { useCartStore } from "@/stores/cartStore"

export function CartIndicator() {
  const itemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  )

  return (
    <Link
      aria-label={`Shopping bag, ${itemCount} items`}
      className="relative flex size-10 items-center justify-center rounded-full bg-[#edf2e9] text-brand-2 transition-colors hover:bg-[#e1eadb]"
      href="/cart"
    >
      <ShoppingBagOpen aria-hidden="true" size={19} />
      {itemCount > 0 && (
        <span className="absolute top-0.5 right-0.5 flex size-[17px] items-center justify-center rounded-full bg-[#e98869] text-[9px] font-bold text-white">
          {itemCount}
        </span>
      )}
    </Link>
  )
}
