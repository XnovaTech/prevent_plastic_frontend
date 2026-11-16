"use client"

import { useParams } from "next/navigation"

import { StorefrontProductDetail } from "@/components/product/storefrontProductDetail"
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
        <StorefrontProductDetail productId={Number(params.productId)} />
      </main>
      <SiteFooter />
    </div>
  )
}
