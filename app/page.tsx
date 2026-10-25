import type { Metadata } from "next"

import { CategorySection } from "@/components/sections/categorySection"
import { CommunitySection } from "@/components/sections/communitySection"
import { HomeFaqSection } from "@/components/sections/homeFaqSection"
import { HomeHeroSlider } from "@/components/sections/homeHeroSlider"
import { HomeSearchFilter } from "@/components/sections/homeSearchFilter"
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
    <div className="min-h-screen bg-transparent text-brand">
      <AosInitializer />
      
      <SiteHeader />
      <main id="main-content">
        <HomeHeroSlider />
        <HomeSearchFilter />
        <CategorySection />
        <ProductSection
          actionLabel="Browse all finds"
          description="Popular pre-loved items from local shops and sellers."
          eyebrow="POPULAR ITEMS"
          id="popular"
          products={homePageMock.popularProducts}
          title="Popular finds"
        />

         <ProductSection
          actionLabel="See all discounts"
          description="Save on pre-loved items with reduced prices."
          eyebrow="SPECIAL OFFERS"
          id="discounts"
          products={homePageMock.saleProducts}
          title="Discounted finds"
          tone="sale"
        />

              <CommunitySection />
   
        <ProductFeedSection />
       
        
        <HomeFaqSection />
       
      </main>
      <SiteFooter />
    </div>
  )
}
