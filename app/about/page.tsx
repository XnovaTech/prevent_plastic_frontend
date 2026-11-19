import type { Metadata } from "next"

import { AboutLiveLayoutPage } from "@/components/about/aboutMockLayoutPage"
import { AosInitializer } from "@/components/shared/aosInitializer"
import { SiteFooter } from "@/components/shared/siteFooter"
import { SiteHeader } from "@/components/shared/siteHeader"

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
        <AboutLiveLayoutPage />
      </main>
      <SiteFooter />
    </div>
  )
}
