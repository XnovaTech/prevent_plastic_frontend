"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  MapPin,
  SealCheck,
  Star,
  Storefront,
} from "@phosphor-icons/react"

import { shops } from "@/mock/shopDetailMock"
import type { ShopDetail } from "@/mock/shopDetailMock"

function getShopInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}

const shopToneClasses = {
  sme: "bg-[#e8eee5] text-brand-2",
  individual: "bg-[#f8ebe5] text-brand-orange-2",
}

type ShopListCardProps = {
  shop: ShopDetail
}

export function ShopListCard({ shop }: ShopListCardProps) {
  const featuredProduct = shop.products[0]

  return (
    <article className="h-full">
      <Link
        aria-label={`Visit ${shop.name}`}
        className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#e3e9df] bg-white shadow-[0_12px_35px_-28px_rgba(27,65,56,0.35)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#cbd9c8] hover:shadow-[0_22px_48px_-30px_rgba(27,65,56,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-3"
        href={`/shop/${shop.slug}`}
      >
        <div
          className={`relative aspect-[1.55] overflow-hidden ${shopToneClasses[shop.type]}`}
        >
          {featuredProduct ? (
            <Image
              alt={featuredProduct.name}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              src={featuredProduct.image}
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <span className="font-serif text-5xl font-semibold text-brand-2/35">
                {getShopInitials(shop.name)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#172c24]/65 via-transparent to-[#172c24]/15" />
          <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
            <span className="rounded-full border border-white/50 bg-white/90 px-3 py-1.5 text-[10px] font-semibold text-brand-6 shadow-sm backdrop-blur">
              {shop.kind}
            </span>
            {shop.badges.includes("Verified Seller") && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f0e2] px-2.5 py-1.5 text-[10px] font-semibold text-[#38684f] shadow-sm">
                <SealCheck aria-hidden="true" size={14} weight="fill" />
                Verified
              </span>
            )}
          </div>
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white">
            <div className="min-w-0">
              <p className="truncate text-[10px] font-medium text-white/80">
                {featuredProduct
                  ? `Featured find · ${featuredProduct.category}`
                  : "Local small business"}
              </p>
              {featuredProduct && (
                <p className="mt-1 truncate text-sm font-semibold">
                  {featuredProduct.name}
                </p>
              )}
            </div>
            <span className="shrink-0 rounded-full bg-white/15 px-3 py-1.5 text-[10px] font-semibold backdrop-blur">
              {shop.products.length} finds
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="font-serif text-[21px] leading-tight tracking-[-0.035em] text-brand sm:text-[24px]">
                {shop.name}
              </h2>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-brand-gray-4">
                <MapPin aria-hidden="true" size={13} weight="fill" />
                <span>{shop.location}</span>
              </div>
            </div>
            <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#faf7ed] px-2.5 py-1.5">
              <Star
                aria-hidden="true"
                className="text-[#b7823e]"
                size={14}
                weight="fill"
              />
              <span className="text-xs font-bold text-brand-6">
                {shop.rating.toFixed(1)}
              </span>
            </div>
          </div>

          <p className="mt-4 line-clamp-2 min-h-10 text-xs leading-5 text-brand-light">
            {shop.description}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-[#edf0e9] pt-4">
            <span className="text-[10px] text-brand-gray-4">
              {shop.reviewCount} customer reviews
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-3 transition-colors group-hover:text-brand-orange">
              Visit shop
              <ArrowUpRight
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                size={15}
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

type ShopListSectionProps = {
  title: string
  eyebrow?: string
  description?: string
}

export function ShopListSection({
  title,
  eyebrow,
  description,
}: ShopListSectionProps) {
  const smeShops = shops.filter((shop) => shop.type === "sme")

  return (
    <section
      className="px-4 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-28"
      id="shops"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto max-w-[700px] text-center">
          {eyebrow && (
            <p className="text-[10px] font-bold tracking-[0.2em] text-brand-gray-5 uppercase sm:text-xs">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-3 font-serif text-[34px] leading-[1.05] tracking-[-0.05em] text-brand sm:text-[46px] lg:text-[56px]">
            {title}
          </h2>
          {description && (
            <p className="mx-auto mt-4 max-w-[560px] text-[13px] leading-7 text-brand-light sm:text-sm sm:leading-8">
              {description}
            </p>
          )}
        </div>

        {smeShops.length === 0 ? (
          <div className="mt-14 flex flex-col items-center justify-center rounded-[26px] border-2 border-dashed border-[#d8e0d7] bg-white/60 px-8 py-16 text-center sm:mt-20">
            <Storefront
              aria-hidden="true"
              className="mx-auto mb-4 text-brand-3"
              size={40}
            />
            <h3 className="font-serif text-2xl text-brand">
              No shops listed yet
            </h3>
            <p className="mt-2 text-sm text-brand-light">
              Check back soon for local small businesses.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {smeShops.map((shop) => (
              <ShopListCard key={shop.slug} shop={shop} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
