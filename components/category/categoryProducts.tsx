"use client"

import { useMemo, useRef, useState, type KeyboardEvent } from "react"
import Link from "next/link"
import { ArrowRight, Basket, Storefront, User } from "@phosphor-icons/react"

import { ProductCard } from "@/components/product/productCard"
import type {
  CategoryPageConfig,
  CategoryProduct,
  CategorySellerType,
} from "@/mock/categoryPageMock"
import type { HomeProduct } from "@/mock/homePageMock"

type CategoryProductsProps = {
  category: CategoryPageConfig
  products: CategoryProduct[]
  fallbackProducts: HomeProduct[]
}

type TabId = "all" | CategorySellerType

const tabLabels: Record<TabId, { label: string; shortLabel: string }> = {
  all: { label: "All finds", shortLabel: "All finds" },
  sme: { label: "Small businesses", shortLabel: "Small business" },
  individual: { label: "Individuals", shortLabel: "Individual" },
}

export function CategoryProducts({
  category,
  products,
  fallbackProducts,
}: CategoryProductsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("all")
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const tabIds = Object.keys(tabLabels) as TabId[]

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    tabId: TabId
  ) {
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
    setActiveTab(tabIds[nextIndex])
    tabRefs.current[nextIndex]?.focus()
  }

  const counts = useMemo(
    () => ({
      all: products.length,
      sme: products.filter((item) => item.sellerType === "sme").length,
      individual: products.filter((item) => item.sellerType === "individual")
        .length,
    }),
    [products]
  )

  const visibleProducts = useMemo(
    () =>
      activeTab === "all"
        ? products
        : products.filter((item) => item.sellerType === activeTab),
    [activeTab, products]
  )

  if (products.length === 0) {
    return (
      <div>
        <div
          className="rounded-[26px] border border-dashed border-[#d8e0d7] bg-white/60 px-5 py-12 text-center sm:px-8"
          data-aos="fade-up"
        >
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#eef3ea] text-brand-2">
            <Basket aria-hidden="true" size={26} weight="duotone" />
          </span>
          <p className="mt-5 text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
            SHELF BEING RESTOCKED
          </p>
          <h2 className="mt-2 font-serif text-[27px] leading-tight tracking-[-0.04em] text-brand sm:text-[32px]">
            We&apos;re restocking {category.title.toLowerCase()}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[12px] leading-6 text-brand-lighter">
            Our sellers are still photographing pieces for this shelf. In the
            meantime, these good things are ready to go home with someone.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
            <Link
              className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-brand-2 px-5 text-[11px] font-semibold text-white transition-transform hover:-translate-y-0.5"
              href="/sme"
            >
              <Storefront aria-hidden="true" size={14} />
              Browse small businesses
            </Link>
            <Link
              className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-[#d8e0d7] bg-white px-5 text-[11px] font-semibold text-brand-3 transition-colors hover:bg-[#f1f5ed]"
              href="/individual"
            >
              <User aria-hidden="true" size={14} />
              Browse individuals
            </Link>
          </div>
        </div>

        {fallbackProducts.length > 0 && (
          <div className="mt-12" data-aos="fade-up">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
                  WHILE YOU WAIT
                </p>
                <h2 className="font-serif text-[26px] leading-tight tracking-[-0.04em] text-brand sm:text-[32px]">
                  Popular right now
                </h2>
              </div>
              <Link
                className="hidden items-center gap-1 text-[11px] font-semibold text-brand-3 transition-colors hover:text-brand-2 sm:inline-flex"
                href="/#popular"
              >
                See everything
                <ArrowRight aria-hidden="true" size={13} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-4">
              {fallbackProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div
          aria-label="Filter finds by seller type"
          className="flex w-fit max-w-full flex-wrap gap-1.5 rounded-full border border-[#e6ebe1] bg-white/70 p-1"
          role="tablist"
        >
          {tabIds.map((tabId, index) => {
            const isActive = tabId === activeTab
            const { label, shortLabel } = tabLabels[tabId]

            return (
              <button
                aria-controls="category-results"
                aria-selected={isActive}
                className={`inline-flex min-h-9 items-center gap-1.5 rounded-full px-3.5 text-[11px] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2 ${
                  isActive
                    ? "bg-brand-2 text-white shadow-sm"
                    : "text-[#5c6a62] hover:bg-[#f0f4ec] hover:text-brand-2"
                }`}
                id={`category-tab-${tabId}`}
                key={tabId}
                onClick={() => setActiveTab(tabId)}
                onKeyDown={(event) => handleTabKeyDown(event, tabId)}
                ref={(node) => {
                  tabRefs.current[index] = node
                }}
                role="tab"
                tabIndex={isActive ? 0 : -1}
                type="button"
              >
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{shortLabel}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold tabular-nums ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[#eef2ea] text-[#7b8a80]"
                  }`}
                >
                  {counts[tabId]}
                </span>
              </button>
            )
          })}
        </div>

        <p aria-live="polite" className="text-[10px] text-brand-lighter">
          Showing {visibleProducts.length}{" "}
          {visibleProducts.length === 1 ? "find" : "finds"}
          {activeTab === "all" ? (
            <>
              {" "}
              from {counts.sme > 0 ? "small businesses" : "individuals"}
              {counts.sme > 0 && counts.individual > 0
                ? " and individuals"
                : ""}
            </>
          ) : (
            <>
              {" "}
              from {activeTab === "sme" ? "small businesses" : "individuals"}
            </>
          )}
        </p>
      </div>

      <div
        aria-labelledby={`category-tab-${activeTab}`}
        id="category-results"
        role="tabpanel"
      >
        {visibleProducts.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-[#d8e0d7] bg-white/60 px-5 py-10 text-center">
            <p className="text-[13px] font-semibold text-brand">
              No {tabLabels[activeTab].label.toLowerCase()} in this category yet
            </p>
            <p className="mx-auto mt-1.5 max-w-sm text-[11px] leading-5 text-brand-lighter">
              They may be restocking. Try the full category to see everything
              available right now.
            </p>
            <button
              className="mt-4 inline-flex min-h-9 items-center rounded-full border border-[#d8e0d7] bg-white px-4 text-[11px] font-semibold text-brand-3 transition-colors hover:bg-[#f1f5ed]"
              onClick={() => setActiveTab("all")}
              type="button"
            >
              Show all finds
            </button>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 sm:gap-y-9 lg:grid-cols-4"
            data-aos="fade-up"
          >
            {visibleProducts.map(({ product, sellerType }) => (
              <ProductCard
                key={product.id}
                product={product}
                sellerType={sellerType}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-12 grid gap-3 sm:grid-cols-2">
        <Link
          className="group flex items-center justify-between gap-4 rounded-[22px] border border-[#e3e8df] bg-white/70 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c7d8c7] hover:bg-white hover:shadow-[0_18px_40px_-32px_rgba(27,65,56,0.5)]"
          href="/sme"
        >
          <span className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e8eee5] text-[#4c6b53]">
              <Storefront aria-hidden="true" size={18} weight="duotone" />
            </span>
            <span>
              <span className="block text-[13px] font-semibold text-brand">
                More from small businesses
              </span>
              <span className="block text-[10px] text-brand-lighter">
                Local shops, studios and makers
              </span>
            </span>
          </span>
          <ArrowRight
            aria-hidden="true"
            className="shrink-0 text-[#9aa89f] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand-2"
            size={15}
          />
        </Link>

        <Link
          className="group flex items-center justify-between gap-4 rounded-[22px] border border-[#e3e8df] bg-white/70 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e2c7ba] hover:bg-white hover:shadow-[0_18px_40px_-32px_rgba(27,65,56,0.5)]"
          href="/individual"
        >
          <span className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f8ebe5] text-[#8a5a43]">
              <User aria-hidden="true" size={18} weight="duotone" />
            </span>
            <span>
              <span className="block text-[13px] font-semibold text-brand">
                More from individuals
              </span>
              <span className="block text-[10px] text-brand-lighter">
                Good things passed on from home
              </span>
            </span>
          </span>
          <ArrowRight
            aria-hidden="true"
            className="shrink-0 text-[#9aa89f] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand-2"
            size={15}
          />
        </Link>
      </div>
    </div>
  )
}
