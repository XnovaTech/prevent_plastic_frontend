"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  CalendarBlank,
  ChatCircleDots,
  Eye,
  MapPin,
  Package,
  ShieldCheck,
  Star,
} from "@phosphor-icons/react"

import { ProductCard } from "@/components/product/productCard"
import type { ShopDetail } from "@/mock/shopDetailMock"

type ShopDetailViewProps = {
  shop: ShopDetail
}

export function ShopDetailView({ shop }: ShopDetailViewProps) {
  const [activeTab, setActiveTab] = useState<"products" | "reviews">("products")
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const tabs = [
    { id: "products" as const, label: "Products", count: shop.products.length },
    { id: "reviews" as const, label: "Reviews", count: shop.reviewCount },
  ]

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    tabId: "products" | "reviews"
  ) {
    const tabIds = ["products", "reviews"] as const
    const currentIndex = tabIds.indexOf(tabId)
    let nextIndex = currentIndex

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % tabIds.length
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + tabIds.length) % tabIds.length
    } else if (event.key === "Home") {
      nextIndex = 0
    } else if (event.key === "End") {
      nextIndex = tabIds.length - 1
    } else {
      return
    }

    event.preventDefault()
    const nextTab = tabIds[nextIndex]
    setActiveTab(nextTab)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <section className="py-8 sm:py-12" id="shop-detail">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <Link
          className="mb-5 inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-xs font-semibold text-brand-3 transition-colors hover:bg-white/70 hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39745b]"
          href={shop.type === "sme" ? "/shops" : "/products"}
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Back to shops
        </Link>

        <header className="overflow-hidden rounded-[28px] border border-[#e3e9df] bg-[linear-gradient(125deg,rgba(239,245,235,0.94),rgba(255,255,255,0.88)_58%,rgba(250,243,235,0.82))] shadow-[0_20px_60px_-48px_rgba(38,74,55,0.42)] sm:rounded-[34px]">
          <div className="relative h-40 w-full sm:h-52 lg:h-56">
            <Image
              alt=""
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 1440px, 100vw"
              src={shop.coverImage}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#274b3e]/25 via-transparent to-transparent"
            />
          </div>

          <div className="p-5 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
              <div className="-mt-16 shrink-0 sm:-mt-24">
                <div className="relative size-24 overflow-hidden rounded-full border-[5px] border-white shadow-[0_14px_34px_-18px_rgba(38,74,55,0.75)] sm:size-28">
                  <Image
                    alt={`${shop.name} profile picture`}
                    className="object-cover"
                    fill
                    sizes="112px"
                    src={shop.avatarImage}
                  />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[#cfdccb] bg-white/70 px-3 py-1 text-[10px] font-semibold text-[#557360]">
                    {shop.kind}
                  </span>
                  {shop.badges.map((badge) => (
                    <span
                      className="inline-flex items-center gap-1 rounded-full bg-[#e6f0e2] px-3 py-1 text-[10px] font-semibold text-[#38684f]"
                      key={badge}
                    >
                      {badge === "Top Rated" ? (
                        <Star aria-hidden="true" size={13} weight="fill" />
                      ) : badge === "Quick Responder" ? (
                        <ChatCircleDots
                          aria-hidden="true"
                          size={13}
                          weight="fill"
                        />
                      ) : (
                        <ShieldCheck
                          aria-hidden="true"
                          size={13}
                          weight="fill"
                        />
                      )}
                      {badge}
                    </span>
                  ))}
                </div>

                <h1 className="mt-3 font-serif text-[34px] leading-tight tracking-[-0.04em] break-words text-brand sm:text-[44px] lg:text-[50px]">
                  {shop.name}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-brand-light sm:text-[15px] sm:leading-7">
                  {shop.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-xs text-brand-gray-4">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin
                      aria-hidden="true"
                      className="text-brand-3"
                      size={15}
                    />
                    {shop.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarBlank
                      aria-hidden="true"
                      className="text-brand-3"
                      size={15}
                    />
                    Joined {shop.joinedYear}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Eye
                      aria-hidden="true"
                      className="text-brand-3"
                      size={15}
                    />
                    {shop.visitors.toLocaleString("en-US")} visitors
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3 self-start rounded-[20px] border border-[#dce6d8] bg-white/75 px-4 py-3 sm:min-w-[156px] sm:flex-col sm:items-center sm:gap-1 sm:px-5 sm:py-4">
                <div className="inline-flex items-center gap-1.5">
                  <Star
                    aria-hidden="true"
                    className="text-[#b7823e]"
                    size={20}
                    weight="fill"
                  />
                  <span className="text-[26px] leading-none font-bold text-brand-2">
                    {shop.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-xs text-brand-gray-4">
                  from {shop.reviewCount.toLocaleString("en-US")} reviews
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="mt-8 sm:mt-10">
          <div
            aria-label="Shop information"
            className="flex w-full gap-6 border-b border-[#d8e5d3]"
            role="tablist"
          >
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id

              return (
                <button
                  aria-controls={`shop-panel-${tab.id}`}
                  aria-selected={isSelected}
                  className={`relative inline-flex min-h-12 items-center gap-2 border-b-2 px-1 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39745b] ${
                    isSelected
                      ? "border-brand-2 text-brand-2"
                      : "border-transparent text-brand-gray-4 hover:text-brand-6"
                  }`}
                  id={`shop-tab-${tab.id}`}
                  key={tab.id}
                  onKeyDown={(event) => handleTabKeyDown(event, tab.id)}
                  onClick={() => setActiveTab(tab.id)}
                  ref={(element) => {
                    tabRefs.current[
                      tabs.findIndex((item) => item.id === tab.id)
                    ] = element
                  }}
                  role="tab"
                  tabIndex={isSelected ? 0 : -1}
                  type="button"
                >
                  {tab.id === "products" ? (
                    <Package aria-hidden="true" size={17} />
                  ) : (
                    <Star aria-hidden="true" size={17} />
                  )}
                  {tab.label}
                  <span className="rounded-full bg-[#edf2e9] px-2 py-0.5 text-[10px] font-semibold text-[#557360]">
                    {tab.count}
                  </span>
                </button>
              )
            })}
          </div>

          <>
            <div
              aria-labelledby="shop-tab-products"
              className="pt-6 sm:pt-8"
              hidden={activeTab !== "products"}
              id="shop-panel-products"
              role="tabpanel"
              tabIndex={0}
            >
              {shop.products.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-4">
                  {shop.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-[24px] border border-dashed border-[#d8e0d7] bg-white/60 px-6 py-12 text-center">
                  <Package
                    aria-hidden="true"
                    className="mx-auto text-brand-3"
                    size={28}
                  />
                  <h2 className="mt-3 font-serif text-2xl text-brand">
                    No products listed yet
                  </h2>
                  <p className="mt-2 text-sm text-brand-light">
                    Check back later to see what this shop has to offer.
                  </p>
                </div>
              )}
            </div>
            <div
              aria-labelledby="shop-tab-reviews"
              className="max-w-4xl pt-6 sm:pt-8"
              hidden={activeTab !== "reviews"}
              id="shop-panel-reviews"
              role="tabpanel"
              tabIndex={0}
            >
              <div className="mb-3 rounded-[22px] border border-[#e3e9df] bg-white/70 p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-serif text-3xl tracking-tight text-brand">
                      {shop.rating.toFixed(1)}
                    </p>
                    <p className="mt-1 text-xs text-brand-gray-4">
                      Average shop rating
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-1"
                    aria-label={`${shop.rating} out of 5 stars`}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        aria-hidden="true"
                        className={
                          shop.rating >= star - 0.5
                            ? "text-[#b7823e]"
                            : "text-[#d8ded5]"
                        }
                        key={star}
                        size={18}
                        weight={shop.rating >= star - 0.5 ? "fill" : "regular"}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-brand-gray-4">
                    {shop.reviewCount.toLocaleString("en-US")} customer reviews
                  </p>
                </div>
              </div>

              {shop.reviews.length > 0 ? (
                <div className="divide-y divide-[#e3e9df] rounded-[22px] border border-[#e3e9df] bg-white/70 px-5 sm:px-6">
                  {shop.reviews.map((review) => (
                    <article className="py-5 sm:py-6" key={review.id}>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="text-sm font-semibold text-brand-6">
                          {review.author}
                        </h3>
                        <div
                          aria-label={`${review.rating} out of 5 stars`}
                          className="flex items-center gap-0.5"
                        >
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              aria-hidden="true"
                              className={
                                review.rating >= star
                                  ? "text-[#b7823e]"
                                  : "text-[#d8ded5]"
                              }
                              key={star}
                              size={13}
                              weight={
                                review.rating >= star ? "fill" : "regular"
                              }
                            />
                          ))}
                        </div>
                        <time className="text-xs text-brand-gray-4">
                          {review.date}
                        </time>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-brand-light">
                        {review.comment}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-[24px] border border-dashed border-[#d8e0d7] bg-white/60 px-6 py-12 text-center">
                  <h2 className="font-serif text-2xl text-brand">
                    No reviews yet
                  </h2>
                  <p className="mt-2 text-sm text-brand-light">
                    Customer feedback will appear here when it is available.
                  </p>
                </div>
              )}
            </div>
          </>
        </div>
      </div>
    </section>
  )
}
