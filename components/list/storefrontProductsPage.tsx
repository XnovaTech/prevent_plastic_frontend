"use client"

import { useMemo } from "react"

import { CatalogBrowser } from "@/components/list/catalogBrowser"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { catalogPageMock } from "@/mock/catalogPageMock"
import type { HomeProduct } from "@/mock/homePageMock"
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
    name: product.name,
    category: product.category?.name ?? "Everyday things",
    price: prices.length > 0 ? Math.min(...prices) : 0,
    merchant: product.vendor?.display_name ?? "Local seller",
    condition: label(condition || "Good"),
    image: image ?? "/products/ceramicPlates.jpg",
    badge: product.status === "active" ? "LIVE" : undefined,
    badgeTone: "green",
  }
}

export function StorefrontProductsPage() {
  const { error, isLoading, products } = useCatalogProducts()
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
    <CatalogBrowser
      config={{
        ...config,
        categories: categories.length > 0 ? categories : config.categories,
        conditions: conditions.length > 0 ? conditions : config.conditions,
        products: mappedProducts,
      }}
    />
  )
}
