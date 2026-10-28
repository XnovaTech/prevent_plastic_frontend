import type { Metadata } from "next"

import { AboutCampaignSection } from "@/components/sections/aboutCampaignSection"
import { AboutCultureSection } from "@/components/sections/aboutCultureSection"
import { AboutFaqSection } from "@/components/sections/aboutFaqSection"
import { AboutHeroSection } from "@/components/sections/aboutHeroSection"
import { AboutIntroductionSection } from "@/components/sections/aboutIntroductionSection"
import { AboutImpactSection } from "@/components/sections/aboutImpactSection"
import { AboutValuesSection } from "@/components/sections/aboutValuesSection"
import { AosInitializer } from "@/components/shared/aosInitializer"
import { SiteFooter } from "@/components/shared/siteFooter"
import { SiteHeader } from "@/components/shared/siteHeader"
import { aboutPageMock } from "@/mock/aboutPageMock"

export const metadata: Metadata = {
  title: "About us — Prevent Plastic",
  description:
    "Discover Prevent Plastic, a local marketplace for pre-loved finds and thoughtful sellers.",
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
      <SiteHeader activeHref="/about" />
      <main id="main-content">
        <AboutHeroSection content={aboutPageMock.hero} />
        
        <AboutIntroductionSection content={aboutPageMock.introduction} />
        {/* <AboutCampaignSection content={aboutPageMock.campaign} /> */}
        <AboutValuesSection content={aboutPageMock.values} />
        <AboutCultureSection content={aboutPageMock.culture} />
        
        {/* <AboutImpactSection content={aboutPageMock.impact} /> */}
        <AboutFaqSection
          faqs={aboutPageMock.faqs}
          intro={aboutPageMock.faqIntro}
        />
      </main>
      <SiteFooter />
    </div>
  )
}
