"use client"

import Link from "next/link"
import { ArrowLeft, Storefront } from "@phosphor-icons/react"

import { ChatWithVendor } from "@/components/product/chatWithVendor"
import { ProductActions } from "@/components/product/productActions"
import { ProductGallery } from "@/components/product/productGallery"
import { PublicProductFeedback } from "@/components/product/publicProductFeedback"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useCatalogProduct } from "@/hooks/useCatalogProduct"
import type { Product } from "@/services/productService"

function label(value: unknown) {
  return String(value ?? "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

function price(value: string | number) {
  return `Ks ${Number(value).toLocaleString("en-US")}`
}

function conditionOf(product: Product) {
  const condition = product.attributes?.find(
    (attribute) => attribute.field_key === "condition"
  )?.value

  return label(condition || "Good")
}

function formatValue(value: unknown) {
  if (value === null || value === undefined || value === "") return "—"
  if (typeof value === "boolean") return value ? "Yes" : "No"
  if (Array.isArray(value)) return value.join(", ")
  return String(value)
}

type StorefrontProductDetailProps = { productId: number }

export function StorefrontProductDetail({
  productId,
}: StorefrontProductDetailProps) {
  const { error, isLoading, product } = useCatalogProduct(productId)

  if (isLoading) {
    return <Skeleton className="mx-auto h-[620px] max-w-6xl rounded-[30px]" />
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 sm:px-8">
        <Alert
          className="border-red-200 bg-red-50 text-red-800"
          variant="destructive"
        >
          <AlertDescription>{error || "Product not found."}</AlertDescription>
        </Alert>
        <Link
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-3"
          href="/products"
        >
          <ArrowLeft size={16} /> Back to products
        </Link>
      </div>
    )
  }

  const gallery = (product.images ?? []).map((image) => ({
    src: image.url,
    alt: image.alt_text ?? product.name,
  }))
  const variants = product.variants ?? []
  const prices = variants
    .map((variant) => Number(variant.price))
    .filter(Number.isFinite)

  return (
    <div className="mx-auto max-w-[1440px] px-4 pt-5 pb-14 sm:px-8 sm:pt-7 lg:px-12">
      <div className="flex items-center justify-between gap-3">
        <Link
          className="inline-flex items-center gap-2 text-xs font-semibold text-brand-light hover:text-brand-3"
          href="/products"
        >
          <ArrowLeft size={14} /> Back to products
        </Link>
        <Badge
          className="border-0 bg-[#eef8eb] text-[#2f7049]"
          variant="outline"
        >
          Available
        </Badge>
      </div>

      <div className="mt-6 grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-10">
        <ProductGallery images={gallery} />
        <div className="rounded-[30px] border border-white/75 bg-white/55 p-5 backdrop-blur-2xl sm:p-7">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold tracking-[0.13em] text-brand-gray-3 uppercase">
            <span className="rounded-full bg-brand-yellow-bg px-2.5 py-1 text-brand-4">
              {product.category?.name ?? "Everyday things"}
            </span>
            <span>·</span>
            <span>{conditionOf(product)}</span>
          </div>
          <h1 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.055em] text-brand sm:text-5xl">
            {product.name}
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <p className="text-3xl font-bold text-brand-2">
              {prices.length > 0
                ? price(Math.min(...prices))
                : "Price unavailable"}
            </p>
            {variants.length > 1 && (
              <span className="text-xs text-brand-gray-3">Starting price</span>
            )}
          </div>
          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/60 p-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-brand-2 text-brand-green">
              <Storefront size={20} weight="fill" />
            </span>
            <div>
              <p className="text-[10px] font-bold tracking-[0.12em] text-brand-gray-3 uppercase">
                Sold by
              </p>
              <p className="font-semibold text-brand">
                {product.vendor?.display_name ?? "Local seller"}
              </p>
            </div>
          </div>
          <ChatWithVendor
            merchant={product.vendor?.display_name ?? "Local seller"}
            productName={product.name}
          />
          <ProductActions product={product} />
        </div>
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-[26px] border-[#e3e9df] bg-white shadow-none">
          <CardHeader>
            <CardTitle className="text-base text-brand">
              Product details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {product.description ? (
              <p className="text-sm leading-7 whitespace-pre-line text-brand-light">
                {product.description.replace(/<[^>]+>/g, " ").trim()}
              </p>
            ) : (
              <p className="text-sm text-brand-gray-3">
                No description provided.
              </p>
            )}
            {(product.attributes?.length ?? 0) > 0 && (
              <div className="grid gap-3 border-t border-[#edf0ea] pt-4 sm:grid-cols-2">
                {product.attributes?.map((attribute) => (
                  <div
                    className="rounded-2xl bg-[#f7faf4] p-3"
                    key={attribute.field_id}
                  >
                    <p className="text-xs text-brand-gray-3">
                      {attribute.field_label ?? attribute.field_key ?? "Detail"}
                    </p>
                    <p className="mt-1 font-semibold text-brand">
                      {formatValue(attribute.value)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-[26px] border-[#e3e9df] bg-white shadow-none">
          <CardHeader>
            <CardTitle className="text-base text-brand">
              Prices and stock
            </CardTitle>
            <p className="text-sm text-brand-light">
              Each size, color, or type can have its own price and stock.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {variants.map((variant, index) => (
              <div
                className="flex items-center justify-between gap-4 rounded-2xl bg-[#f7faf4] p-4"
                key={variant.id}
              >
                <div>
                  <p className="font-semibold text-brand">
                    {variant.option_values?.length
                      ? variant.option_values
                          .map(
                            (option) =>
                              `${option.attribute_name ?? option.attribute_code}: ${option.value}`
                          )
                          .join(" · ")
                      : `Standard option ${index + 1}`}
                  </p>
                  {variant.sku && (
                    <p className="mt-1 text-xs text-brand-gray-3">
                      SKU: {variant.sku}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand">{price(variant.price)}</p>
                  <p className="mt-1 text-xs text-brand-gray-3">
                    {variant.stock_quantity} in stock
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <PublicProductFeedback productId={product.id} />
    </div>
  )
}
