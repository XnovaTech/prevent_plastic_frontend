"use client"

import { useParams } from "next/navigation"

import { ApprovedStorefrontProductDetail } from "@/components/product/approvedStorefrontProductDetail"
import { AosInitializer } from "@/components/shared/aosInitializer"
import { SiteFooter } from "@/components/shared/siteFooter"
import { SiteHeader } from "@/components/shared/siteHeader"

export default function ProductPage() {
  const params = useParams<{ productId: string }>()

  return (
    <div className="min-h-screen bg-transparent text-brand">
      <AosInitializer />
      <SiteHeader activeHref="/products" />
      <main>
        <ApprovedStorefrontProductDetail productId={Number(params.productId)} />
      </main>
      <SiteFooter showContactDetails={false} />
    </div>
  )
}
