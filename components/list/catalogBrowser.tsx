"use client"

import { useMemo, useState } from "react"
import { FunnelSimple, X } from "@phosphor-icons/react"

import { CatalogFilterSheet } from "@/components/list/catalogFilterSheet"
import { CatalogResults } from "@/components/list/catalogResults"
import { Button } from "@/components/ui/button"
import type { CatalogFilters, CatalogPageConfig } from "@/mock/catalogPageMock"

type CatalogBrowserProps = {
  config: CatalogPageConfig
}

const emptyFilters: CatalogFilters = {
  categories: [],
  conditions: [],
  priceRange: null,
}

export function CatalogBrowser({ config }: CatalogBrowserProps) {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState<CatalogFilters>(emptyFilters)

  const { copy } = config

  const filteredProducts = useMemo(() => {
    const priceRange = filters.priceRange
      ? config.priceRanges.find((range) => range.id === filters.priceRange)
      : null

    return config.products.filter((product) => {
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category)
      const matchesCondition =
        filters.conditions.length === 0 ||
        filters.conditions.includes(product.condition)
      const matchesPrice =
        !priceRange ||
        (product.price >= priceRange.min &&
          (priceRange.max === undefined || product.price <= priceRange.max))

      return matchesCategory && matchesCondition && matchesPrice
    })
  }, [config.priceRanges, config.products, filters])

  const filterKey = useMemo(
    () =>
      [
        [...filters.categories].sort().join(","),
        [...filters.conditions].sort().join(","),
        filters.priceRange ?? "all",
      ].join("|"),
    [filters]
  )

  const activeFilterCount =
    filters.categories.length +
    filters.conditions.length +
    (filters.priceRange ? 1 : 0)

  const priceRangeLabel = filters.priceRange
    ? config.priceRanges.find((range) => range.id === filters.priceRange)?.label
    : null

  const activeChips = [
    ...filters.categories.map((category) => ({
      key: `category-${category}`,
      label: category,
      onRemove: () => toggleCategory(category),
    })),
    ...filters.conditions.map((condition) => ({
      key: `condition-${condition}`,
      label: condition,
      onRemove: () => toggleCondition(condition),
    })),
    ...(priceRangeLabel
      ? [
          {
            key: "price",
            label: priceRangeLabel,
            onRemove: () => setPriceRange(null),
          },
        ]
      : []),
  ]

  function toggleCategory(category: string) {
    setFilters((current) => ({
      ...current,
      categories: current.categories.includes(category)
        ? current.categories.filter((item) => item !== category)
        : [...current.categories, category],
    }))
  }

  function toggleCondition(condition: string) {
    setFilters((current) => ({
      ...current,
      conditions: current.conditions.includes(condition)
        ? current.conditions.filter((item) => item !== condition)
        : [...current.conditions, condition],
    }))
  }

  function setPriceRange(priceRange: string | null) {
    setFilters((current) => ({ ...current, priceRange }))
  }

  function resetFilters() {
    setFilters(emptyFilters)
  }

  return (
    <section className="py-10 sm:py-14" id="catalog">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div
          className="mb-6 flex flex-wrap items-end justify-between gap-4"
          data-aos="fade-up"
        >
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-[#69927b] uppercase">
              {copy.catalogEyebrow}
            </p>
            <h2 className="font-serif text-[30px] leading-tight tracking-[-0.04em] text-[#203c33] sm:text-[38px]">
              {copy.catalogTitle}
            </h2>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="hidden rounded-full bg-[#edf2e9] px-3.5 py-2 text-[10px] font-semibold text-[#557360] sm:inline-flex">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? copy.findSingular
                : copy.findPlural}
            </span>
            <Button
              className="h-10 rounded-full border-[#cfdccb] bg-white px-4 text-[11px] font-semibold text-[#245b4d] hover:bg-[#f1f5ed]"
              onPress={() => setFiltersOpen(true)}
              type="button"
              variant="outline"
            >
              <FunnelSimple aria-hidden="true" size={15} />
              {copy.filterButton}
              {activeFilterCount > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-[#174e46] text-[9px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {activeChips.length > 0 && (
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold tracking-[0.14em] text-[#8a938b] uppercase">
              {copy.activeFilters}
            </span>
            {activeChips.map((chip) => (
              <button
                aria-label={`Remove ${chip.label} filter`}
                className="inline-flex h-7 items-center gap-1.5 rounded-full border border-[#d8e5d3] bg-[#edf4e8] px-3 text-[10px] font-medium text-[#427054] transition-colors hover:bg-[#e1ecda]"
                key={chip.key}
                onClick={chip.onRemove}
                type="button"
              >
                {chip.label}
                <X aria-hidden="true" size={11} />
              </button>
            ))}
            <button
              className="ml-1 text-[10px] font-semibold text-[#8a938b] underline underline-offset-4 transition-colors hover:text-[#a34d35]"
              onClick={resetFilters}
              type="button"
            >
              {copy.resetFilters}
            </button>
          </div>
        )}

        <CatalogResults
          copy={copy}
          key={filterKey}
          onResetFilters={resetFilters}
          products={filteredProducts}
        />
      </div>

      <CatalogFilterSheet
        config={config}
        filters={filters}
        onOpenChange={setFiltersOpen}
        onPriceRangeChange={setPriceRange}
        onReset={resetFilters}
        onToggleCategory={toggleCategory}
        onToggleCondition={toggleCondition}
        open={filtersOpen}
        resultCount={filteredProducts.length}
      />
    </section>
  )
}
