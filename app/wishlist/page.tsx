import type { Metadata } from "next"

import { WishlistPage } from "@/components/wishlist/wishlistPage"

export const metadata: Metadata = {
  title: "Your wishlist — Prevent Plastic",
  description:
    "The good things you've saved for later. A quiet corner for pre-loved finds you love.",
}

export default function Page() {
  return <WishlistPage />
}
