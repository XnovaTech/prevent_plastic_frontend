import type { Metadata } from "next"

import { CartPage } from "@/components/cart/cartPage"

export const metadata: Metadata = {
  title: "Your bag — Prevent Plastic",
  description:
    "A little bag of good things. Review your pre-loved finds before checkout becomes available.",
}

export default function Page() {
  return <CartPage />
}
