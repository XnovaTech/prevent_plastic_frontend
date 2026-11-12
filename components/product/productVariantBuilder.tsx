"use client"

import { useState } from "react"
import { Plus, Sparkle, Trash } from "@phosphor-icons/react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type VariationDimension = {
  id: string
  name: string
  optionsText: string
}

type VariantOptionValue = {
  attributeCode: string
  attributeName: string
  value: string
}

type VariantRow = {
  id: string
  combinationKey: string
  optionValues: VariantOptionValue[]
  price: string
  stockQuantity: string
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function parseOptions(value: string) {
  return Array.from(
    new Set(
      value
        .split(",")
        .map((option) => option.trim())
        .filter(Boolean)
    )
  )
}

function cartesian<T>(groups: T[][]): T[][] {
  return groups.reduce<T[][]>(
    (combinations, group) =>
      combinations.flatMap((combination) =>
        group.map((value) => [...combination, value])
      ),
    [[]]
  )
}

export function ProductVariantBuilder() {
  const [dimensions, setDimensions] = useState<VariationDimension[]>([])
  const [variantRows, setVariantRows] = useState<VariantRow[]>([
    {
      id: "default",
      combinationKey: "default",
      optionValues: [],
      price: "",
      stockQuantity: "",
    },
  ])
  const [builderError, setBuilderError] = useState("")

  const addDimension = () => {
    setDimensions((current) => [
      ...current,
      {
        id: `dimension-${Date.now()}-${current.length}`,
        name: "",
        optionsText: "",
      },
    ])
    setBuilderError("")
  }

  const updateDimension = (
    id: string,
    key: "name" | "optionsText",
    value: string
  ) => {
    setDimensions((current) =>
      current.map((dimension) =>
        dimension.id === id ? { ...dimension, [key]: value } : dimension
      )
    )
  }

  const removeDimension = (id: string) => {
    setDimensions((current) =>
      current.filter((dimension) => dimension.id !== id)
    )
    setVariantRows([
      {
        id: "default",
        combinationKey: "default",
        optionValues: [],
        price: "",
        stockQuantity: "",
      },
    ])
    setBuilderError("")
  }

  const generateVariants = () => {
    const rawDimensions = dimensions.map((dimension) => ({
      ...dimension,
      code: slugify(dimension.name),
      options: parseOptions(dimension.optionsText),
    }))

    if (rawDimensions.some((dimension) => !dimension.name || !dimension.code)) {
      setBuilderError("Add a name for every variant option group.")
      return
    }
    if (rawDimensions.some((dimension) => dimension.options.length === 0)) {
      setBuilderError("Add at least one value to every option group.")
      return
    }

    // Let users enter one value per row if that feels more natural.
    // Duplicate groups such as Size / Medium and Size / Large are merged.
    const groupedDimensions = new Map<
      string,
      { id: string; name: string; options: string[]; code: string }
    >()
    rawDimensions.forEach((dimension) => {
      const existing = groupedDimensions.get(dimension.code)
      groupedDimensions.set(dimension.code, {
        id: existing?.id ?? dimension.id,
        name: existing?.name ?? dimension.name,
        code: dimension.code,
        options: Array.from(
          new Set([...(existing?.options ?? []), ...dimension.options])
        ),
      })
    })

    const prepared = Array.from(groupedDimensions.values())
    setDimensions(
      prepared.map((dimension) => ({
        id: dimension.id,
        name: dimension.name,
        optionsText: dimension.options.join(", "),
      }))
    )

    const combinations = cartesian(
      prepared.map((dimension) =>
        dimension.options.map((value) => ({
          attributeCode: dimension.code,
          attributeName: dimension.name,
          value,
        }))
      )
    )

    if (combinations.length > 100) {
      setBuilderError(
        "Please keep the total variant combinations at 100 or fewer."
      )
      return
    }

    setVariantRows(
      combinations.map((optionValues, index) => {
        const combinationKey = optionValues
          .map((option) => `${option.attributeCode}:${option.value}`)
          .join("|")
        const existing = variantRows.find(
          (row) => row.combinationKey === combinationKey
        )

        return {
          id: `variant-${index}-${combinationKey}`,
          combinationKey,
          optionValues,
          price: existing?.price ?? "",
          stockQuantity: existing?.stockQuantity ?? "",
        }
      })
    )
    setBuilderError("")
  }

  const updateRow = (
    id: string,
    key: "price" | "stockQuantity",
    value: string
  ) => {
    setVariantRows((current) =>
      current.map((row) => (row.id === id ? { ...row, [key]: value } : row))
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#edf0ea] bg-[#fafbf7] p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Label>What makes this product different?</Label>
            <p className="mt-1 max-w-2xl text-xs leading-5 text-brand-gray-3">
              Add options such as Size, Type, or Color. Each generated
              combination gets its own price and stock quantity.
            </p>
          </div>
          <Button onPress={addDimension} size="sm" variant="outline">
            <Plus size={14} /> Add option group
          </Button>
        </div>
        {dimensions.length > 0 && (
          <div className="mt-4 space-y-3">
            {dimensions.map((dimension, index) => (
              <div
                className="grid gap-3 rounded-2xl border border-[#e3e9df] bg-white p-3 sm:grid-cols-[0.7fr_1.3fr_auto]"
                key={dimension.id}
              >
                <div className="space-y-2">
                  <Label htmlFor={`${dimension.id}-name`}>
                    Option {index + 1}
                  </Label>
                  <Input
                    id={`${dimension.id}-name`}
                    name={`variation_attributes[${index}][name]`}
                    onChange={(event) =>
                      updateDimension(dimension.id, "name", event.target.value)
                    }
                    placeholder="e.g. Size"
                    value={dimension.name}
                  />
                  <input
                    name={`variation_attributes[${index}][code]`}
                    type="hidden"
                    value={slugify(dimension.name)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${dimension.id}-values`}>Values</Label>
                  <Input
                    id={`${dimension.id}-values`}
                    onChange={(event) =>
                      updateDimension(
                        dimension.id,
                        "optionsText",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Small, Medium, Large"
                    value={dimension.optionsText}
                  />
                  {parseOptions(dimension.optionsText).map(
                    (option, optionIndex) => (
                      <input
                        key={`${dimension.id}-option-${optionIndex}`}
                        name={`variation_attributes[${index}][options][${optionIndex}]`}
                        type="hidden"
                        value={option}
                      />
                    )
                  )}
                </div>
                <div className="flex items-end">
                  <Button
                    aria-label={`Remove option group ${index + 1}`}
                    onPress={() => removeDimension(dimension.id)}
                    size="icon"
                    variant="ghost"
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              </div>
            ))}
            <Button onPress={generateVariants} variant="secondary">
              <Sparkle size={16} /> Generate combinations
            </Button>
          </div>
        )}
      </div>

      {builderError && (
        <Alert
          className="border-red-200 bg-red-50 text-red-800"
          variant="destructive"
        >
          <AlertDescription>{builderError}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-3">
        <div>
          <Label>Prices and stock</Label>
          <p className="mt-1 text-xs text-brand-gray-3">
            Price is attached to the option combination, not to the SKU.
          </p>
        </div>
        <div className="space-y-3">
          {variantRows.map((row, index) => (
            <div
              className="grid gap-3 rounded-2xl border border-[#edf0ea] bg-[#fafbf7] p-4 sm:grid-cols-[1.5fr_1fr_1fr]"
              key={row.id}
            >
              <div className="space-y-2">
                <Label>Combination {index + 1}</Label>
                <div className="flex min-h-10 flex-wrap items-center gap-2 rounded-3xl bg-input/50 px-3 py-2">
                  {row.optionValues.length > 0 ? (
                    row.optionValues.map((option) => (
                      <span
                        className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-brand-3"
                        key={`${option.attributeCode}-${option.value}`}
                      >
                        {option.attributeName}: {option.value}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-brand-gray-3">
                      One standard option
                    </span>
                  )}
                </div>
                {row.optionValues.map((option, optionIndex) => (
                  <div key={`${row.id}-${option.attributeCode}`}>
                    <input
                      name={`variants[${index}][option_values][${optionIndex}][attribute_code]`}
                      type="hidden"
                      value={option.attributeCode}
                    />
                    <input
                      name={`variants[${index}][option_values][${optionIndex}][value]`}
                      type="hidden"
                      value={option.value}
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${row.id}-price`}>Price</Label>
                <Input
                  id={`${row.id}-price`}
                  min="0"
                  name={`variants[${index}][price]`}
                  onChange={(event) =>
                    updateRow(row.id, "price", event.target.value)
                  }
                  placeholder="0"
                  required
                  type="number"
                  value={row.price}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${row.id}-stock`}>Stock</Label>
                <Input
                  id={`${row.id}-stock`}
                  min="0"
                  name={`variants[${index}][stock_quantity]`}
                  onChange={(event) =>
                    updateRow(row.id, "stockQuantity", event.target.value)
                  }
                  placeholder="0"
                  type="number"
                  value={row.stockQuantity}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {dimensions.length === 0 && (
        <p className="text-xs text-brand-gray-3">
          SKU is optional and is not used to calculate price. Add option groups
          when size, type, or color changes the price.
        </p>
      )}
    </div>
  )
}
