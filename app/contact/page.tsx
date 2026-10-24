import type { Metadata } from "next"

import { ContactFaqSection } from "@/components/contact/contactFaqSection"
import { ContactIntroSection } from "@/components/contact/contactIntroSection"
import { AosInitializer } from "@/components/shared/aosInitializer"
import { SiteFooter } from "@/components/shared/siteFooter"
import { SiteHeader } from "@/components/shared/siteHeader"

export const metadata: Metadata = {
  title: "Contact — Prevent Plastic",
  description:
    "Say hello to Prevent Plastic. Ask about a find, selling with us, repair and care, or simply share a good idea.",
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
      <SiteHeader activeHref="/contact" />
      <main id="main-content">
        <ContactIntroSection />
        <ContactFaqSection />
      </main>
      <SiteFooter />
    </div>
  )
}
