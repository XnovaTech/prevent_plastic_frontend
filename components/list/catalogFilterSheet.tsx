"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Sheet,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type {
  CatalogFilters,
  CatalogPageConfig,
  CatalogPriceRange,
} from "@/mock/catalogPageMock"

type CatalogFilterSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  config: CatalogPageConfig
  filters: CatalogFilters
  resultCount: number
  onToggleCategory: (category: string) => void
  onToggleCondition: (condition: string) => void
  onPriceRangeChange: (priceRange: string | null) => void
  onReset: () => void
}

function optionId(group: string, value: string) {
  return `${group}-${value.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
}

function matchesPrice(productPrice: number, range: CatalogPriceRange) {
  return (
    productPrice >= range.min &&
    (range.max === undefined || productPrice <= range.max)
  )
}

export function CatalogFilterSheet({
  open,
  onOpenChange,
  config,
  filters,
  resultCount,
  onToggleCategory,
  onToggleCondition,
  onPriceRangeChange,
  onReset,
}: CatalogFilterSheetProps) {
  const { copy } = config

  return (
    <Sheet
      className="border-l border-[#e3e8df] bg-[#fbfaf6]/80 backdrop-blur-2xl"
      isOpen={open}
      onOpenChange={onOpenChange}
      side="right"
    >
      <SheetHeader className="border-b border-[#e9ece4] px-6 pt-6 pr-14 pb-5">
        <p className="text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
          {copy.filterButton}
        </p>
        <SheetTitle className="mt-1 font-serif text-[30px] leading-tight tracking-[-0.045em] text-brand">
          {copy.filterSheetTitle}
        </SheetTitle>
        <SheetDescription className="mt-1 max-w-[300px] text-[11px] leading-5 text-brand-lighter">
          {copy.filterSheetDescription}
        </SheetDescription>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="space-y-6">
          <fieldset>
            <legend className="mb-3 text-[10px] font-bold tracking-[0.16em] text-[#557360] uppercase">
              {copy.categoryLabel}
            </legend>
            <div className="space-y-3">
              {config.categories.map((category) => {
                const id = optionId("category", category)
                const count = config.products.filter(
                  (product) => product.category === category
                ).length

                return (
                  <div
                    className="flex items-center justify-between gap-3"
                    key={category}
                  >
                    <div className="flex items-center gap-2.5">
                      <Checkbox
                        id={id}
                        isSelected={filters.categories.includes(category)}
                        onChange={() => onToggleCategory(category)}
                      />
                      <Label
                        className="cursor-pointer text-[12px] font-medium text-[#4b5d54]"
                        htmlFor={id}
                      >
                        {category}
                      </Label>
                    </div>
                    <span className="text-[10px] text-[#9aa39b]">{count}</span>
                  </div>
                )
              })}
            </div>
          </fieldset>

          <fieldset className="border-t border-[#e9ece4] pt-5">
            <legend className="mb-3 text-[10px] font-bold tracking-[0.16em] text-[#557360] uppercase">
              {copy.conditionLabel}
            </legend>
            <div className="space-y-3">
              {config.conditions.map((condition) => {
                const id = optionId("condition", condition)
                const count = config.products.filter(
                  (product) => product.condition === condition
                ).length

                return (
                  <div
                    className="flex items-center justify-between gap-3"
                    key={condition}
                  >
                    <div className="flex items-center gap-2.5">
                      <Checkbox
                        id={id}
                        isSelected={filters.conditions.includes(condition)}
                        onChange={() => onToggleCondition(condition)}
                      />
                      <Label
                        className="cursor-pointer text-[12px] font-medium text-[#4b5d54]"
                        htmlFor={id}
                      >
                        {condition}
                      </Label>
                    </div>
                    <span className="text-[10px] text-[#9aa39b]">{count}</span>
                  </div>
                )
              })}
            </div>
          </fieldset>

          <fieldset className="border-t border-[#e9ece4] pt-5">
            <legend className="mb-3 text-[10px] font-bold tracking-[0.16em] text-[#557360] uppercase">
              {copy.priceLabel}
            </legend>
            <RadioGroup
              aria-label={copy.priceLabel}
              onChange={onPriceRangeChange}
              value={filters.priceRange}
            >
              {config.priceRanges.map((range) => {
                const id = optionId("price", range.id)
                const count = config.products.filter((product) =>
                  matchesPrice(product.price, range)
                ).length

                return (
                  <div
                    className="flex items-center justify-between gap-3"
                    key={range.id}
                  >
                    <div className="flex items-center gap-2.5">
                      <RadioGroupItem id={id} value={range.id} />
                      <Label
                        className="cursor-pointer text-[12px] font-medium text-[#4b5d54]"
                        htmlFor={id}
                      >
                        {range.label}
                      </Label>
                    </div>
                    <span className="text-[10px] text-[#9aa39b]">{count}</span>
                  </div>
                )
              })}
            </RadioGroup>
          </fieldset>
        </div>
      </div>

      <SheetFooter className="border-t border-[#e9ece4] px-6 py-4">
        <div className="flex gap-2.5">
          <Button
            className="h-11 flex-1 rounded-full border-[#d8e0d7] text-[11px] font-semibold text-brand-3 hover:bg-white"
            onPress={onReset}
            type="button"
            variant="outline"
          >
            {copy.resetFilters}
          </Button>
          <Button
            className="h-11 flex-[1.4] rounded-full bg-brand-2 text-[11px] font-bold text-white hover:bg-[#1f6157]"
            onPress={() => onOpenChange(false)}
            type="button"
          >
            {copy.showResults} ({resultCount})
          </Button>
        </div>
      </SheetFooter>
    </Sheet>
  )
}
