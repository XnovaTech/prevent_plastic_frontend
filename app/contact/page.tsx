import type { Metadata } from "next"

import { ContactForm } from "@/components/contact/contactForm"
import { ContactMethodsSection } from "@/components/contact/contactMethodsSection"

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
    <div className="min-h-screen bg-transparent text-brand">
      <AosInitializer />
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        href="#main-content"
      >
        Skip to content
      </a>
      <SiteHeader activeHref="/contact" />
      <main id="main-content">
        <section
          className="px-4 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-14"
          id="contact"
        >
          <div className="mx-auto max-w-[1440px]">
            <div
              className="grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-5 lg:items-start lg:gap-10"
              data-aos="fade-up"
            >
              <div className="min-w-0 lg:col-span-2">
                <ContactMethodsSection />
              </div>
              <div className="min-w-0 lg:col-span-3">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
