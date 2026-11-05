import type { Metadata } from "next"

import { ShopListSection } from "@/components/shop/shopListSection"
import { AosInitializer } from "@/components/shared/aosInitializer"
import { SiteFooter } from "@/components/shared/siteFooter"
import { SiteHeader } from "@/components/shared/siteHeader"

export const metadata: Metadata = {
  title: "Shops — Prevent Plastic",
  description:
    "Browse good finds from local small businesses and makers giving useful things another chapter.",
}

export default function Page() {
  return (
    <div className="min-h-screen bg-transparent text-brand">
      <AosInitializer />
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        href="#main-content"
      >
        Skip to content
      </a>
      <SiteHeader activeHref="/shops" />
      <main id="main-content">
        <ShopListSection
          title="Small &amp; mighty finds."
          eyebrow="SMALL BUSINESSES, GOOD FINDS"
          description={
            "Meet the small businesses and makers giving useful things another chapter. Every find supports a local shop, studio, or workshop."
          }
        />
      </main>
      <SiteFooter />
    </div>
  )
}
