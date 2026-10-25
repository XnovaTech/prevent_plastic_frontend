"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Storefront } from "@phosphor-icons/react"

import { ProductCard } from "@/components/product/productCard"
import { Button } from "@/components/ui/button"
import type { ShopDetail } from "@/mock/shopDetailMock"

type ShopDetailViewProps = {
  shop: ShopDetail
}

export function ShopDetailView({ shop }: ShopDetailViewProps) {
  const [activeTab, setActiveTab] = useState("products")

  const tabs = [
    { id: "products", label: "Products" },
    { id: "reviews", label: "Reviews" },
  ]

  return (
    <section className="py-12 sm:py-16" id="shop-detail">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4 sm:items-start sm:justify-start mb-12 sm:mb-14">
          <div className="max-w-[560px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#cfdccb] bg-[#edf2e8] px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-[#557360] uppercase">
              {shop.type === "sme" ? "Local small business" : "Independent seller"}
            </div>
            <h1 className="mt-2 font-serif text-[40px] leading-tight tracking-[-0.04em] text-brand sm:text-[48px]">
              {shop.name}
            </h1>
            <p className="mt-3 max-w-[480px] text-[12px] leading-6 text-brand-light sm:text-[13px]">
              {shop.description}
            </p>
          </div>
          <div className="flex flex-col items-end gap-4 sm:flex-row sm:items-start">
            <Link
              className="inline-flex items-center gap-2 text-[12px] font-semibold text-brand-3 transition-colors hover:text-brand-orange-3"
              href={shop.type === "sme" ? "/sme" : "/individual"}
            >
              <ArrowUpRight aria-hidden="true" size={12} /> Back to browse
            </Link>
            <div className="flex items-center gap-4 rounded-full border border-[#cfdccb] bg-[#edf2e8] px-4 py-2 sm:py-2.5">
              <div className="text-center">
                <p className="text-[22px] font-bold text-brand-2">
                  {shop.rating.toFixed(1)}
                </p>
                <p className="text-[9px] font-bold tracking-[0.12em] text-brand-gray-5 uppercase">
                  rating
                </p>
              </div>
              <div className="w-[1px] h-4 bg-[#cfdccb] mx-0 sm:mx-3"></div>
              <div className="text-center">
                <p className="text-[12px] font-bold text-brand-2">
                  {shop.reviewCount}
                </p>
                <p className="text-[9px] font-bold tracking-[0.12em] text-brand-gray-5 uppercase">
                  reviews
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-between gap-3 mb-12 sm:mb-14">
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold tracking-[0.14em] text-brand-gray-3 uppercase">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-2 text-brand-green">
              <Storefront size={16} weight="fill" />
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <p className="text-[10px] font-bold tracking-[0.14em] text-brand-gray-3 uppercase mb-1 sm:mb-0">
                Location
              </p>
              <span className="text-[12px] text-brand-6">{shop.location}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <p className="text-[10px] font-bold tracking-[0.14em] text-brand-gray-3 uppercase mb-1 sm:mb-0">
                Since
              </p>
              <span className="text-[12px] text-brand-6">{shop.joinedYear}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <p className="text-[10px] font-bold tracking-[0.14em] text-brand-gray-3 uppercase mb-1 sm:mb-0">
                Followers
              </p>
              <span className="text-[12px] text-brand-6">
                {shop.followers.toLocaleString("en-US")}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              className="h-10 rounded-full border-[#cfdccb] bg-white px-4 text-[11px] font-semibold text-brand-3 hover:bg-[#f1f5ed]"
              type="button"
              variant="outline"
            >
              Follow shop
            </Button>
            <Button
              className="h-10 rounded-full border-[#cfdccb] bg-white px-4 text-[11px] font-semibold text-brand-3 hover:bg-[#f1f5ed]"
              type="button"
              variant="outline"
            >
              Message
            </Button>
          </div>
        </div>

        <div className="flex gap-2 mb-8 sm:mb-10 border-b border-[#d8e5d3] pb-4 sm:pb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              aria-pressed={activeTab === tab.id}
              className={`border-b-2 px-0 text-[12px] font-semibold tracking-[0.1em] transition-colors ${
                activeTab === tab.id
                  ? "border-brand-2 text-brand-2"
                  : "border-transparent text-brand-gray-4 hover:text-brand-6"
              }`}
              onClick={() => setActiveTab(tab.id)}
              type="button"
            >
              {tab.label} {activeTab === tab.id && <span className="sr-only">active</span>}
            </button>
          ))}
        </div>

        {activeTab === "products" ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 lg:grid-cols-4">
            {shop.products.map((product) => (
              <ProductCard key={product.id} layout="grid" product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6 text-[10px] text-brand-lighter">
              <span className="text-[10px] font-bold tracking-[0.14em] text-brand-gray-3 uppercase">
                {shop.reviewCount} reviews
              </span>
              <div className="flex gap-1 text-[#d8b44e] text-xs">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-[11px]">
                    {shop.rating >= star - 0.5 ? "\u2605" : "\u2606"}
                  </span>
                ))}
              </div>
            </div>
            {shop.reviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col gap-2.5 sm:flex-row sm:gap-4 py-4 border-b border-[#d8e5d3] last:border-b-0"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                  <span className="text-[12px] font-semibold text-brand-6">
                    {review.author}
                  </span>
                  <div className="flex gap-1 text-[#d8b44e] text-xs">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-[11px]">
                        {review.rating >= star - 0.5 ? "\u2605" : "\u2606"}
                      </span>
                    ))}
                  </div>
                  <span className="text-[9px] text-brand-gray-3">
                    {review.date}
                  </span>
                </div>
                <p className="text-[12px] leading-6 text-brand-light">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
