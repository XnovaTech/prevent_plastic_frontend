"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"

import { CatalogBrowser } from "@/components/list/catalogBrowser"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { catalogPageMock } from "@/mock/catalogPageMock"
import type { HomeProduct } from "@/mock/homePageMock"
import { useGeolocation } from "@/hooks/useGeolocation"
import { useCatalogProducts } from "@/hooks/useCatalogProducts"
import type { Product } from "@/services/productService"

function label(value: unknown) {
  return String(value ?? "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

function mapProduct(product: Product): HomeProduct {
  const prices = (product.variants ?? [])
    .map((variant) => Number(variant.price))
    .filter((price) => Number.isFinite(price))
  const condition = product.attributes?.find(
    (attribute) => attribute.field_key === "condition"
  )?.value
  const image = product.images?.find((item) => item.is_primary)?.url ?? product.images?.[0]?.url

  return {
    id: String(product.id),
    slug: product.slug,
    name: product.name,
    category: product.category?.name ?? "Everyday things",
    price: prices.length > 0 ? Math.min(...prices) : 0,
    merchant: product.vendor?.display_name ?? "Local seller",
    condition: label(condition || "Good"),
    image: image ?? "/products/ceramicPlates.jpg",
    badge: product.status === "active" ? "LIVE" : undefined,
    badgeTone: "green",
    distanceKm: product.distance_km,
  }
}

export function StorefrontProductsPage() {
  const geolocation = useGeolocation()
  const vendorSlug = useSearchParams().get("vendor") ?? undefined
  const { error, isLoading, products } = useCatalogProducts(geolocation.location, vendorSlug)
  const config = catalogPageMock.individual
  const mappedProducts = useMemo(() => products.map(mapProduct), [products])
  const categories = useMemo(
    () => Array.from(new Set(mappedProducts.map((product) => product.category))),
    [mappedProducts]
  )
  const conditions = useMemo(
    () => Array.from(new Set(mappedProducts.map((product) => product.condition))),
    [mappedProducts]
  )

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-8 lg:px-12">
        <Skeleton className="h-12 max-w-md rounded-2xl" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton className="aspect-[4/4.35] rounded-[26px]" key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 sm:px-8">
        <Alert className="border-red-200 bg-red-50 text-red-800" variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <>
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 pt-8 sm:px-8 lg:px-12">
        <div>
          <p className="text-sm font-semibold text-brand">Find something close by</p>
          <p className="mt-1 text-xs text-brand-light">
            {geolocation.location
              ? "Nearby listings are shown first."
              : "Allow location to see local finds first."}
          </p>
          {geolocation.errorMessage && (
            <p className="mt-1 text-xs text-brand-orange-3">{geolocation.errorMessage}</p>
          )}
        </div>
        <Button
          className="rounded-full border-[#cfdccb] px-4 text-xs text-brand-3"
          isDisabled={geolocation.status === "locating"}
          onPress={geolocation.locate}
          variant="outline"
        >
          {geolocation.status === "locating"
            ? "Finding nearby…"
            : geolocation.location
              ? "Refresh location"
              : "Use my location"}
        </Button>
      </div>
      <CatalogBrowser
        config={{
          ...config,
          categories: categories.length > 0 ? categories : config.categories,
          conditions: conditions.length > 0 ? conditions : config.conditions,
          products: mappedProducts,
        }}
      />
    </>
  )
}
