import type { Metadata } from "next"

import { CartContent } from "@/components/cart/cartContent"
import { CartReassuranceSection } from "@/components/cart/cartReassuranceSection"
import { AosInitializer } from "@/components/shared/aosInitializer"
import { SiteFooter } from "@/components/shared/siteFooter"
import { SiteHeader } from "@/components/shared/siteHeader"

export const metadata: Metadata = {
  title: "Your bag — Prevent Plastic",
  description:
    "A little bag of good things. Review your pre-loved finds before checkout becomes available.",
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
        <CartContent />
        <CartReassuranceSection />
      </main>
      <SiteFooter />
    </div>
  )
}
