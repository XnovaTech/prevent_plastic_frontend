import type { Metadata } from "next"

import { PublicBlogDetail } from "@/components/blog/publicBlogDetail"
import { AosInitializer } from "@/components/shared/aosInitializer"
import { SiteFooter } from "@/components/shared/siteFooter"
import { SiteHeader } from "@/components/shared/siteHeader"

type BlogDetailPageProps = { params: Promise<{ slug: string }> }

export const metadata: Metadata = { title: "Journal story — Prevent Plastic" }

export default async function Page({ params }: BlogDetailPageProps) {
  const { slug } = await params

  return (
    <div className="min-h-screen bg-transparent text-brand">
      <AosInitializer />
      <SiteHeader activeHref="/blog" />
      <main id="main-content"><PublicBlogDetail slug={slug} /></main>
      <SiteFooter />
    </div>
  )
}
