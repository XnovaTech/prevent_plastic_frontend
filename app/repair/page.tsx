import type { Metadata } from "next"

import "leaflet/dist/leaflet.css"
import "react-leaflet-cluster/dist/assets/MarkerCluster.css"
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css"

import { RepairMapExperience } from "@/components/repair/repairMapExperience"
import { AosInitializer } from "@/components/shared/aosInitializer"
import { SiteFooter } from "@/components/shared/siteFooter"
import { SiteHeader } from "@/components/shared/siteHeader"

export const metadata: Metadata = {
  title: "Repair & care map — Prevent Plastic",
  description:
    "Search and explore repair, reuse, recycling, and green services across Myanmar.",
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
      <SiteHeader activeHref="/repair" />
      <main id="main-content">
        <section
          aria-labelledby="repair-title"
          className="px-4 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-14"
        >
          <RepairMapExperience />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
