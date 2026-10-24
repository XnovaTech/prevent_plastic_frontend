"use client"

import { ArrowDown, ArrowRight, Sparkle } from "@phosphor-icons/react"

import { ProductCard } from "@/components/product/productCard"
import { Button } from "@/components/ui/button"
import { useMockProductFeed } from "@/hooks/useMockProductFeed"

export function ProductFeedSection() {
  const { hasMore, loadMore, products, sentinelRef } = useMockProductFeed()

  return (
    <section className="py-16 sm:py-20" id="more-finds">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div
          className="mb-8 flex items-end justify-between gap-5 sm:mb-10"
          data-aos="fade-up"
        >
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-[#69927b] uppercase">
              A FEW MORE TREASURES
            </p>
            <h2 className="font-serif text-[32px] leading-tight tracking-[-0.04em] text-[#203c33] sm:text-[40px]">
              Keep wandering
            </h2>
            <p className="mt-2 max-w-md text-[13px] leading-6 text-[#748078]">
              The good stuff doesn’t stop here. Take your time and see what
              finds you.
            </p>
          </div>
          <span className="mb-1 hidden size-11 items-center justify-center rounded-full bg-[#e9f0e4] text-[#416c58] sm:flex">
            <Sparkle aria-hidden="true" size={20} />
          </span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div
          aria-live="polite"
          className="flex min-h-24 flex-col items-center justify-center pt-8 text-center"
          ref={sentinelRef}
        >
          {hasMore ? (
            <>
              <ArrowDown
                aria-hidden="true"
                className="mb-2 animate-bounce text-[#71947c] motion-reduce:animate-none"
                size={19}
              />
              <p className="text-xs font-medium text-[#738078]">
                Keep scrolling for more good finds
              </p>
              <Button
                className="mt-3 border-[#d8e0d7] bg-white text-xs font-semibold text-[#245b4d] hover:bg-[#f1f5ed]"
                onPress={loadMore}
                size="sm"
                variant="outline"
              >
                Load more finds
                <ArrowRight aria-hidden="true" size={14} />
              </Button>
            </>
          ) : (
            <p className="rounded-full bg-[#edf2e9] px-4 py-2 text-xs font-medium text-[#557360]">
              You’re all caught up. Good things take time.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
