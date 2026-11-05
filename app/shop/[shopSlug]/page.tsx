import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ShopDetailView } from "@/components/shop/shopDetailView"
import { AosInitializer } from "@/components/shared/aosInitializer"
import { SiteFooter } from "@/components/shared/siteFooter"
import { SiteHeader } from "@/components/shared/siteHeader"
import { getShopBySlug } from "@/mock/shopDetailMock"

type ShopPageProps = {
  params: Promise<{ shopSlug: string }>
}

export async function generateMetadata({
  params,
}: ShopPageProps): Promise<Metadata> {
  const { shopSlug } = await params
  const shop = getShopBySlug(shopSlug)

  if (!shop) {
    return {}
  }

  return {
    title: `${shop.name} — Prevent Plastic`,
    description: shop.description,
  }
}

export default async function Page({ params }: ShopPageProps) {
  const { shopSlug } = await params
  const shop = getShopBySlug(shopSlug)

  if (!shop) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-transparent text-brand">
      <AosInitializer />
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        href="#main-content"
      >
        Skip to content
      </a>
      <SiteHeader activeHref={shop.type === "sme" ? "/shops" : "/products"} />
      <main id="main-content">
        <ShopDetailView shop={shop} />
      </main>
      <SiteFooter />
    </div>
  )
}
