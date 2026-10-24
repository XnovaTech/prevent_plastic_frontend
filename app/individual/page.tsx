import type { Metadata } from "next"

import { CatalogBrowser } from "@/components/list/catalogBrowser"
import { CatalogIntro } from "@/components/list/catalogIntro"
import { AosInitializer } from "@/components/shared/aosInitializer"
import { SiteFooter } from "@/components/shared/siteFooter"
import { SiteHeader } from "@/components/shared/siteHeader"
import { catalogPageMock } from "@/mock/catalogPageMock"

export const metadata: Metadata = {
  title: "Individual finds — Prevent Plastic",
  description:
    "Browse good things passed on by individual sellers nearby, from one home to another.",
}

export default function Page() {
  const config = catalogPageMock.individual

  return (
    <div className="min-h-screen bg-transparent text-brand">
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
