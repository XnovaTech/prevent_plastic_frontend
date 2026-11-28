"use client"

import { useMemo } from "react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { ShopDetailView } from "@/components/shop/shopDetailView"
import { useCatalogProducts } from "@/hooks/useCatalogProducts"
import type { HomeProduct } from "@/mock/homePageMock"
import type { ShopDetail } from "@/mock/shopDetailMock"

function label(value: unknown) {
  return String(value ?? "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

type CatalogShopDetailProps = {
  shopSlug: string
}

export function CatalogShopDetail({ shopSlug }: CatalogShopDetailProps) {
  const { error, isLoading, products } = useCatalogProducts(null, shopSlug)
  const vendor = products[0]?.vendor

  const shop = useMemo<ShopDetail | null>(() => {
    if (!vendor) return null

    const mappedProducts: HomeProduct[] = products.map((product) => {
      const prices = (product.variants ?? [])
        .map((variant) => Number(variant.price))
        .filter(Number.isFinite)
      const condition = product.attributes?.find(
        (attribute) => attribute.field_key === "condition"
      )?.value
      const image = product.images?.find((item) => item.is_primary)?.url ?? product.images?.[0]?.url

      return {
        id: String(product.id),
        slug: product.slug,
        name: product.name,
        category: product.category?.name ?? "Everyday things",
        price: prices.length ? Math.min(...prices) : 0,
        merchant: vendor.display_name,
        condition: label(condition || "Good"),
        image: image ?? "/products/ceramicPlates.jpg",
      }
    })

    return {
      slug: vendor.slug ?? shopSlug,
      name: vendor.display_name,
      type: "individual",
      kind: "Independent seller",
      location: "Local seller",
      description: "Browse this seller's currently available products.",
      rating: 0,
      reviewCount: 0,
      joinedYear: "",
      visitors: 0,
      coverImage: "/prevent/cover.avif",
      avatarImage: vendor.logo ?? "/products/ceramicPlates.jpg",
      products: mappedProducts,
      reviews: [],
      badges: [],
    }
  }, [products, shopSlug, vendor])

  if (isLoading) {
    return <Skeleton className="mx-auto mt-8 h-[620px] max-w-6xl rounded-[30px]" />
  }

  if (error || !shop) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 sm:px-8">
        <Alert className="border-red-200 bg-red-50 text-red-800" variant="destructive">
          <AlertDescription>{error || "Shop not found."}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return <ShopDetailView shop={shop} />
}
