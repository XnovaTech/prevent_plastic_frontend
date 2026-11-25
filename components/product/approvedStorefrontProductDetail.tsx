"use client"

import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Storefront,
} from "@phosphor-icons/react"

import { ChatWithVendor } from "@/components/product/chatWithVendor"
import { ProductActions } from "@/components/product/productActions"
import { ProductCard } from "@/components/product/productCard"
import { ProductGallery } from "@/components/product/productGallery"
import { PublicProductFeedback } from "@/components/product/publicProductFeedback"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { useCatalogProduct } from "@/hooks/useCatalogProduct"
import { useCatalogProducts } from "@/hooks/useCatalogProducts"
import { resolveMediaUrl } from "@/lib/media"
import type { Product } from "@/services/productService"
import type { HomeProduct } from "@/mock/homePageMock"

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

function plainText(value?: string | null) {
  return (
    value
      ?.replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim() ?? ""
  )
}

type ApprovedStorefrontProductDetailProps = { productId: number }

function RelatedProducts({ product }: { product: Product }) {
  const { products } = useCatalogProducts()
  const candidates = products.filter((entry) => entry.id !== product.id)
  const sameCategory = candidates.filter(
    (entry) => product.category && entry.category?.id === product.category.id
  )
  const related = (sameCategory.length ? sameCategory : candidates).slice(0, 4)

  if (!related.length) return null

  return (
    <section className="border-t border-[#dfe7dc] pt-10 pb-14 sm:pb-20">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
            MORE GOOD THINGS
          </p>
          <h2 className="font-serif text-[30px] leading-tight tracking-[-0.04em] text-brand sm:text-[38px]">
            Keep wandering
          </h2>
        </div>
        <Link
          className="inline-flex items-center gap-2 text-[10px] font-semibold text-brand-3 transition-colors hover:text-brand-orange"
          href="/products"
        >
          Browse products <ArrowRight aria-hidden="true" size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 lg:grid-cols-4">
        {related.map((entry) => {
          const image =
            entry.images?.find((asset) => asset.is_primary) ?? entry.images?.[0]
          const prices = (entry.variants ?? [])
            .filter((variant) => variant.is_active !== false)
            .map((variant) => Number(variant.price))
            .filter(Number.isFinite)
          const relatedProduct: HomeProduct = {
            id: String(entry.id),
            name: entry.name,
            category: entry.category?.name ?? "Everyday things",
            price: prices.length ? Math.min(...prices) : 0,
            merchant: entry.vendor?.display_name ?? "Local seller",
            condition: conditionOf(entry),
            image: image
              ? resolveMediaUrl(image.url)
              : "/products/ceramicPlates.jpg",
          }
          return <ProductCard key={entry.id} product={relatedProduct} />
        })}
      </div>
    </section>
  )
}

export function ApprovedStorefrontProductDetail({
  productId,
}: ApprovedStorefrontProductDetailProps) {
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
  const prices = (product.variants ?? [])
    .filter((variant) => variant.is_active !== false)
    .map((variant) => Number(variant.price))
    .filter(Number.isFinite)
  const minimumPrice = prices.length ? Math.min(...prices) : null
  const listingDescription = plainText(product.description)
  const vendorName = product.vendor?.display_name ?? "Local seller"

  return (
    <section className="px-4 pt-5 pb-10 sm:px-8 sm:pt-7 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav
            aria-label="Breadcrumb"
            className="flex min-w-0 flex-wrap items-center gap-2 text-[10px] text-brand-lighter"
          >
            <Link className="transition-colors hover:text-brand-3" href="/">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              className="transition-colors hover:text-brand-3"
              href="/products"
            >
              Browse shops
            </Link>
            <span aria-hidden="true">/</span>
            <span
              aria-current="page"
              className="max-w-[220px] truncate text-brand-5"
            >
              {product.name}
            </span>
          </nav>
          <Link
            className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-brand-3 transition-colors hover:text-brand-orange"
            href="/products"
          >
            <ArrowLeft aria-hidden="true" size={13} /> Back to browse
          </Link>
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-10">
          <ProductGallery images={gallery} />

          <div className="lg:sticky lg:top-28">
            <div className="rounded-[30px] border border-white/75 bg-white/55 p-5 backdrop-blur-2xl sm:p-7">
              <div className="flex flex-wrap items-center gap-2 text-[9px] font-bold tracking-[0.13em] uppercase">
                <span className="rounded-full bg-brand-yellow-bg/80 px-2.5 py-1 text-brand-4 backdrop-blur-md">
                  {product.category?.name ?? "Everyday things"}
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="text-brand-gray">{conditionOf(product)}</span>
              </div>
              <h1 className="mt-3 font-serif text-[34px] leading-[1.02] tracking-[-0.055em] text-brand sm:text-[42px]">
                {product.name}
              </h1>
              <div className="mt-4 flex flex-wrap items-end gap-x-3 gap-y-1">
                <p className="text-[27px] leading-none font-bold text-brand-2">
                  {minimumPrice === null
                    ? "Price unavailable"
                    : price(minimumPrice)}
                </p>
                {prices.length > 1 ? (
                  <span className="text-[10px] text-brand-gray-3">
                    Starting price
                  </span>
                ) : null}
              </div>
              {listingDescription ? (
                <p className="mt-4 text-[12px] leading-6 text-brand-light">
                  {listingDescription}
                </p>
              ) : null}

              <div className="mt-5 flex flex-wrap items-center gap-3 rounded-[20px] border border-white/70 bg-white/40 p-3.5 backdrop-blur-md">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-2 text-brand-green">
                  <Storefront aria-hidden="true" size={21} weight="fill" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-bold tracking-[0.14em] text-brand-gray-3 uppercase">
                    Sold by
                  </p>
                  <p className="truncate text-[13px] font-semibold text-brand-6">
                    {vendorName}
                  </p>
                  <p className="mt-0.5 text-[10px] text-brand-gray-2">
                    Independent seller
                  </p>
                </div>
                <Link
                  className="inline-flex items-center gap-1 text-[10px] font-semibold text-brand-3 transition-colors hover:text-brand-orange"
                  href="/products"
                >
                  Browse seller listings{" "}
                  <ArrowUpRight aria-hidden="true" size={12} />
                </Link>
              </div>

              <ChatWithVendor
                merchant={vendorName}
                productId={product.id}
                productName={product.name}
              />
              <ProductActions product={product} />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[22px] border border-white/65 bg-white/35 p-5 backdrop-blur-xl">
            <p className="text-[9px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase">
              Condition notes
            </p>
            <p className="mt-2 text-[11px] leading-5 text-brand-light">
              {listingDescription ||
                "The seller has not added condition notes yet."}
            </p>
          </div>
          <div className="rounded-[22px] border border-white/65 bg-white/35 p-5 backdrop-blur-xl">
            <p className="text-[9px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase">
              A note on the photos
            </p>
            <p className="mt-2 text-[11px] leading-5 text-brand-light">
              {gallery.length
                ? "Photos are provided by the seller. Please review them carefully before ordering."
                : "No seller photos have been added yet."}
            </p>
          </div>
        </div>

        <PublicProductFeedback productId={product.id} />
        <RelatedProducts product={product} />
      </div>
    </section>
  )
}
