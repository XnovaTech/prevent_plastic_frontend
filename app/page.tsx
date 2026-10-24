import type { Metadata } from "next"

import { CategorySection } from "@/components/sections/categorySection"
import { HomeHeroSlider } from "@/components/sections/homeHeroSlider"
import { ImpactSection } from "@/components/sections/impactSection"
import { MerchantSection } from "@/components/sections/merchantSection"
import { ProductFeedSection } from "@/components/product/productFeedSection"
import { ProductSection } from "@/components/product/productSection"
import { AosInitializer } from "@/components/shared/aosInitializer"
import { SiteFooter } from "@/components/shared/siteFooter"
import { SiteHeader } from "@/components/shared/siteHeader"
import { homePageMock } from "@/mock/homePageMock"

export const metadata: Metadata = {
  title: "Prevent Plastic — Pre-loved, well loved",
  description:
    "Find thoughtful secondhand goods, discover local makers, and give good things a second life.",
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
      <SiteHeader />
      <main id="main-content">
        <HomeHeroSlider />
        <CategorySection />
        <ProductSection
          actionLabel="Browse all finds"
          description="Pre-loved pieces with plenty of life left in them. Picked with care, ready for their next chapter."
          eyebrow="POPULAR RIGHT NOW"
          id="popular"
          products={homePageMock.popularProducts}
          title="Finds worth falling for"
        />
        <MerchantSection />
        <ProductFeedSection />
        <ProductSection
          actionLabel="See all good deals"
          description="A little easier on your wallet, and still full of character. These lovely finds have a new price."
          eyebrow="A LITTLE PRICE DROP"
          id="discounts"
          products={homePageMock.saleProducts}
          title="Good things, gentler prices"
          tone="sale"
        />
        <ImpactSection />
      </main>
      <SiteFooter />
    </div>
  )
}
