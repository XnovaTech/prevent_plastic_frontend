import type { Metadata } from "next"

import { AosInitializer } from "@/components/shared/aosInitializer"
import { SiteFooter } from "@/components/shared/siteFooter"
import { SiteHeader } from "@/components/shared/siteHeader"
import { WishlistClosing } from "@/components/wishlist/wishlistClosing"
import { WishlistItems } from "@/components/wishlist/wishlistItems"

export const metadata: Metadata = {
  title: "Your wishlist — Prevent Plastic",
  description:
    "The good things you've saved for later. A quiet corner for pre-loved finds you love.",
}

export default function Page() {
  return (
    <div className="min-h-screen bg-transparent text-[#203c33]">
      <AosInitializer />
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        href="#main-content"
      >
        Skip to content
      </a>
      <SiteHeader activeHref="" />
      <main id="main-content">
        <WishlistItems />
        <WishlistClosing />
      </main>
      <SiteFooter />
    </div>
  )
}
