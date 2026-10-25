"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Storefront } from "@phosphor-icons/react"

import type { HomeProduct } from "@/mock/homePageMock"

type ProductCardProps = {
  product: HomeProduct
  layout?: "grid" | "row"
}

const badgeToneClass = {
  coral: "bg-brand-peach-bg text-brand-orange-3",
  green: "bg-[#e8f1e3] text-[#38684f]",
  lavender: "bg-[#f0ebf8] text-[#695381]",
}

const conditionToneClass = {
  "Like new": "bg-[#e8f1e3] text-[#38684f]",
  "Very good": "bg-[#f0ebf8] text-[#695381]",
  Good: "bg-[#f9e8df] text-[#a65e46]",
  Fair: "bg-[#f6f0d8] text-[#8a7440]",
}

export function ProductCard({ product, layout = "grid" }: ProductCardProps) {
  const discount =
    product.originalPrice && product.price < product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0

  return (
    <article className="group min-w-0 flex flex-col h-full">
      <Link
        aria-label={`View ${product.name}`}
        className={`block rounded-[26px] border border-white/65 bg-white/50 p-2.5 backdrop-blur-xl transition-[background-color,box-shadow,transform] duration-200 outline-none hover:-translate-y-0.5 hover:bg-white/75 hover:shadow-[0_16px_36px_-22px_rgba(38,74,55,0.3)] focus-visible:ring-3 focus-visible:ring-[#7fa88c]/40 ${
          layout === "row" ? "flex flex-row items-stretch gap-3" : "flex flex-col h-full"
        }`}
        href={`/products/${product.id}`}
      >
        <div
          className={`relative overflow-hidden rounded-[22px] bg-[#f0eee6] shrink-0 ${
            layout === "row" ? "w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]" : "aspect-[4/4.35]"
          }`}
        >
          <Image
            alt={`${product.name}, ${product.condition.toLowerCase()} condition`}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            fill
            sizes={
              layout === "row"
                ? "(max-width: 640px) 120px, 150px"
                : "(max-width: 640px) 75vw, (max-width: 1024px) 42vw, 25vw"
            }
            src={product.image}
          />

          {product.badge && (
            <span
              className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-[9px] font-bold tracking-[0.08em] uppercase shadow-sm ${
                badgeToneClass[product.badgeTone ?? "green" as keyof typeof badgeToneClass]
              }`}
            >
              {product.badge}
            </span>
          )}
       
          {layout === "grid" && (
            <span
              className={`absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-[9px] font-semibold text-primary uppercase shadow-sm ${conditionToneClass[product.condition as keyof typeof conditionToneClass] ?? conditionToneClass.Good}`}
            >
              {product.condition}
            </span>
          )}
          <button
            aria-label={`Add ${product.name} to wishlist`}
            className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full border border-white/70 bg-white/85 text-[#29443a] backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <Heart size={16} weight="regular" />
          </button>
        </div>
        <div className={`px-0.5 pt-3 flex-1 flex flex-col ${layout === "row" ? "py-1.5 pt-1.5 pr-1.5" : ""}`}>
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold text-brand-6 sm:text-[15px] leading-snug">
                {product.name}
              </p>
              <p className="mt-1 flex min-w-0 items-center gap-1 text-[11px] text-brand-6 leading-snug">
                <Storefront
                  aria-hidden="true"
                  className="shrink-0 text-[#5c7a6b]"
                  size={11}
                  weight="duotone"
                />
                <span className="truncate font-medium text-brand">{product.merchant}</span>
               
              </p>
              {layout === "row" && (
                <span
                  className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[8px] font-semibold uppercase ${conditionToneClass[product.condition as keyof typeof conditionToneClass] ?? conditionToneClass.Good}`}
                >
                  {product.condition}
                </span>
              )}
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[14px] font-bold text-brand-2">
                Ks {product.price.toLocaleString("en-US")}
              </p>
              {product.originalPrice && discount > 0 && (
                <p className="mt-0.5 text-[10px] text-brand-orange-3 font-bold leading-none">
                  Save Ks {(product.originalPrice - product.price).toLocaleString("en-US")}
                </p>
              )}
              {product.originalPrice && (
                <p className="mt-0.5 text-[11px] text-brand-gray-4 line-through leading-none">
                  Ks {product.originalPrice.toLocaleString("en-US")}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
