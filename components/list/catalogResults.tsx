"use client"

import { CircleNotch, MagnifyingGlass } from "@phosphor-icons/react"

import { ProductCard } from "@/components/product/productCard"
import { Button } from "@/components/ui/button"
import { useInfiniteProducts } from "@/hooks/useInfiniteProducts"
import type { CatalogPageConfig } from "@/mock/catalogPageMock"
import type { HomeProduct } from "@/mock/homePageMock"

type CatalogResultsProps = {
  products: readonly HomeProduct[]
  copy: CatalogPageConfig["copy"]
  onResetFilters: () => void
}

export function CatalogResults({
  products,
  copy,
  onResetFilters,
}: CatalogResultsProps) {
  const {
    hasMore,
    loadMore,
    products: visibleProducts,
    sentinelRef,
    total,
    visibleCount,
  } = useInfiniteProducts(products)

  if (products.length === 0) {
    return (
      <div className="rounded-[26px] border border-dashed border-[#d8e0d7] bg-white/60 px-6 py-14 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#f3e6e0] text-[#a65e46]">
          <MagnifyingGlass aria-hidden="true" size={25} weight="duotone" />
        </span>
        <h3 className="mt-5 font-serif text-[27px] tracking-[-0.04em] text-brand">
          {copy.emptyTitle}
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-[12px] leading-6 text-brand-lighter">
          {copy.emptyDescription}
        </p>
        <Button
          className="mt-5 h-10 rounded-full border-[#d8e0d7] px-5 text-[11px] font-semibold text-brand-3 hover:bg-white"
          onPress={onResetFilters}
          type="button"
          variant="outline"
        >
          {copy.emptyAction}
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-[10px] text-brand-lighter">
        <p aria-live="polite">
          {copy.showing} {visibleCount} {copy.of} {total}{" "}
          {total === 1 ? copy.findSingular : copy.findPlural}
        </p>
        <p className="text-[#9aa39b]">
          {hasMore ? copy.keepScrolling : copy.caughtUp}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 lg:grid-cols-4">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div
        aria-live="polite"
        className="flex min-h-28 flex-col items-center justify-center gap-3 pt-8 text-center"
        ref={sentinelRef}
      >
        {hasMore ? (
          <>
            <CircleNotch
              aria-hidden="true"
              className="animate-spin text-[#71947c] motion-reduce:animate-none"
              size={20}
            />
            <p className="text-[11px] font-medium text-[#738078]">
              {copy.keepScrolling}
            </p>
            <Button
              className="h-9 rounded-full border-[#d8e0d7] bg-white px-4 text-[11px] font-semibold text-brand-3 hover:bg-[#f1f5ed]"
              onPress={loadMore}
              type="button"
              variant="outline"
            >
              {copy.loadMore}
            </Button>
          </>
        ) : (
          <p className="rounded-full bg-[#edf2e9] px-4 py-2 text-[11px] font-medium text-[#557360]">
            {copy.caughtUp}
          </p>
        )}
      </div>
    </div>
  )
}
