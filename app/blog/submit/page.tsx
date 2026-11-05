import type { Metadata } from "next"

import { BlogSubmitForm } from "@/components/blog/blogSubmitForm"
import { AosInitializer } from "@/components/shared/aosInitializer"
import { SiteFooter } from "@/components/shared/siteFooter"
import { SiteHeader } from "@/components/shared/siteHeader"

export const metadata: Metadata = {
  title: "Submit a story — Prevent Plastic Journal",
  description:
    "Share your circular living story, secondhand find, or repair tip with the Prevent Plastic community.",
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
      <SiteHeader activeHref="/blog" />
      <main id="main-content">
        <BlogSubmitForm />
      </main>
      <SiteFooter />
    </div>
  )
}
