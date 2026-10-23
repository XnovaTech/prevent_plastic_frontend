import Image from "next/image"
import Link from "next/link"
import { Heart, Storefront } from "@phosphor-icons/react/dist/ssr"

import type { HomeProduct } from "@/mock/homePageMock"

type ProductCardProps = {
  product: HomeProduct
}

const badgeToneClass = {
  coral: "bg-[#fff0e9] text-[#a34d35]",
  green: "bg-[#e8f1e3] text-[#38684f]",
  lavender: "bg-[#f0ebf8] text-[#695381]",
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group min-w-0">
      <Link
        aria-label={`View ${product.name}`}
        className="block rounded-[26px] border border-white/65 bg-white/50 p-2.5 backdrop-blur-xl transition-colors outline-none hover:bg-white/65 focus-visible:ring-3 focus-visible:ring-[#7fa88c]/40"
        href={`/products/${product.id}`}
      >
        <div className="relative aspect-[4/4.35] overflow-hidden rounded-[22px] bg-[#f0eee6]">
          <Image
            alt={`${product.name}, ${product.condition.toLowerCase()} condition`}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            fill
            sizes="(max-width: 640px) 75vw, (max-width: 1024px) 42vw, 25vw"
            src={product.image}
          />
          {product.badge && (
            <span
              className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-[9px] font-bold tracking-[0.08em] uppercase ${
                badgeToneClass[product.badgeTone ?? "green"]
              }`}
            >
              {product.badge}
            </span>
          )}
          <span
            aria-hidden="true"
            className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full border border-white/70 bg-white/85 text-[#29443a] backdrop-blur"
          >
            <Heart size={17} weight="regular" />
          </span>
        </div>
        <div className="px-0.5 pt-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold text-[#243b33] sm:text-[15px]">
                {product.name}
              </p>
              <p className="mt-1 flex min-w-0 items-center gap-1 text-[11px] text-[#7a837c]">
                <Storefront
                  aria-hidden="true"
                  className="shrink-0 text-[#8aa18e]"
                  size={11}
                  weight="duotone"
                />
                <span className="truncate">{product.merchant}</span>
                <span className="shrink-0">·</span>
                <span className="shrink-0">{product.condition}</span>
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[14px] font-bold text-[#174e46]">
                Ks {product.price.toLocaleString("en-US")}
              </p>
              {product.originalPrice && (
                <p className="mt-0.5 text-[11px] text-[#929a92] line-through">
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
