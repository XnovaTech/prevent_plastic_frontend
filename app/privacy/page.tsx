import type { Metadata } from "next"

import { PrivacyPolicySection } from "@/components/privacy/privacyPolicySection"
import { AosInitializer } from "@/components/shared/aosInitializer"
import { SiteFooter } from "@/components/shared/siteFooter"
import { SiteHeader } from "@/components/shared/siteHeader"
import { privacyPageMock } from "@/mock/privacyPageMock"

export const metadata: Metadata = {
  title: "Privacy & Policy — Prevent Plastic",
  description:
    "How Prevent Plastic collects, uses, and protects your information — in plain language, with the choices you always have.",
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
      <SiteHeader activeHref="" />
      <main id="main-content">
        <PrivacyPolicySection content={privacyPageMock} />
      </main>
      <SiteFooter />
    </div>
  )
}
