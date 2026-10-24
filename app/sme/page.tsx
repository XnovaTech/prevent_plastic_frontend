import type { Metadata } from "next"

import { CatalogBrowser } from "@/components/list/catalogBrowser"
import { CatalogIntro } from "@/components/list/catalogIntro"
import { AosInitializer } from "@/components/shared/aosInitializer"
import { SiteFooter } from "@/components/shared/siteFooter"
import { SiteHeader } from "@/components/shared/siteHeader"
import { catalogPageMock } from "@/mock/catalogPageMock"

export const metadata: Metadata = {
  title: "SME finds — Prevent Plastic",
  description:
    "Browse good finds from local small businesses and makers giving useful things another chapter.",
}

export default function Page() {
  const config = catalogPageMock.sme

  return (
    <div className="min-h-screen bg-transparent text-[#203c33]">
      <AosInitializer />
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        href="#main-content"
      >
        Skip to content
      </a>
      <SiteHeader activeHref={config.href} />
      <main id="main-content">
        <CatalogIntro config={config} />
        <CatalogBrowser config={config} />
      </main>
      <SiteFooter />
    </div>
  )
}
