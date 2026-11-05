"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Storefront } from "@phosphor-icons/react"

import { SeedlingIcon } from "@/components/ui/seedlingIcon"
import type { HomeProduct } from "@/mock/homePageMock"

type ProductCardProps = {
  product: HomeProduct
  layout?: "grid" | "row"
  sellerType?: "sme" | "individual"
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

export function ProductCard({
  product,
  layout = "grid",
  sellerType,
}: ProductCardProps) {
  const [saved, setSaved] = useState(false)
  const discount =
    product.originalPrice && product.price < product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0

  return (
    <article className="group flex h-full min-w-0 flex-col">
      <Link
        aria-label={`View ${product.name}`}
        className={`block rounded-[26px] border border-white/65 bg-white/50 p-2.5 backdrop-blur-xl transition-[background-color,box-shadow,transform] duration-200 outline-none hover:-translate-y-0.5 hover:bg-white/75 hover:shadow-[0_16px_36px_-22px_rgba(38,74,55,0.3)] focus-visible:ring-3 focus-visible:ring-[#7fa88c]/40 ${
          layout === "row"
            ? "flex flex-row items-stretch gap-3"
            : "flex h-full flex-col"
        }`}
        href={`/products/${product.id}`}
      >
        <div
          className={`relative shrink-0 overflow-hidden rounded-[22px] bg-[#f0eee6] ${
            layout === "row"
              ? "h-[120px] w-[120px] sm:h-[150px] sm:w-[150px]"
              : "aspect-[4/4.35]"
          }`}
        >
          <Image
            alt={`${product.name}, ${product.condition.toLowerCase()} condition`}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            fill
            sizes={
              layout === "row"
                ? "(max-width: 640px) 120px, 150px"
                : "(max-width: 639px) 45vw, (max-width: 1024px) 42vw, 25vw"
            }
            src={product.image}
          />

          {product.badge && (
            <span
              className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-[9px] font-bold tracking-[0.08em] uppercase shadow-sm ${
                badgeToneClass[
                  product.badgeTone ?? ("green" as keyof typeof badgeToneClass)
                ]
              }`}
            >
              {product.badge}
            </span>
          )}

          {sellerType && (
            <span
              className={`absolute top-3 right-3 rounded-full px-2 py-1 text-[9px] font-bold tracking-[0.06em] uppercase shadow-sm ring-1 ring-white/70 backdrop-blur-md sm:px-2.5 ${
                sellerType === "sme"
                  ? "bg-[#eef4e8]/90 text-[#38684f]"
                  : "bg-[#fbeee7]/90 text-[#a65e46]"
              }`}
            >
              {sellerType === "sme" ? "Shops" : "Products"}
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
            aria-label={
              saved
                ? `Remove ${product.name} from wishlist`
                : `Add ${product.name} to wishlist`
            }
            aria-pressed={saved}
            className={`absolute right-3 bottom-3 flex size-10 items-center justify-center rounded-full ring-1 backdrop-blur-md transition-[color,background-color,box-shadow,transform] duration-200 outline-none hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              saved
                ? "bg-white/80 shadow-[0_4px_14px_-8px_rgba(57,116,91,0.6)] ring-white/80"
                : "bg-white/70 shadow-[0_4px_14px_-6px_rgba(20,50,38,0.55)] ring-white/70 hover:bg-white/90"
            }`}
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              setSaved((prev) => !prev)
            }}
            type="button"
          >
            <SeedlingIcon size={26} variant={saved ? "color" : "line"} />
          </button>
        </div>
        <div
          className={`flex flex-1 flex-col px-0.5 pt-3 ${layout === "row" ? "py-1.5 pt-1.5 pr-1.5" : ""}`}
        >
          <div className="mb-1 flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-[14px] leading-snug font-semibold text-brand-6 sm:text-[15px]">
                {product.name}
              </p>
              <p className="mt-1 flex min-w-0 items-center gap-1 text-[11px] leading-snug text-brand-6">
                <Storefront
                  aria-hidden="true"
                  className="shrink-0 text-[#5c7a6b]"
                  size={11}
                  weight="duotone"
                />
                <span className="truncate font-medium text-brand">
                  {product.merchant}
                </span>
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
                <p className="mt-0.5 text-[10px] leading-none font-bold text-brand-orange-3">
                  Save Ks{" "}
                  {(product.originalPrice - product.price).toLocaleString(
                    "en-US"
                  )}
                </p>
              )}
              {product.originalPrice && (
                <p className="mt-0.5 text-[11px] leading-none text-brand-gray-4 line-through">
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
