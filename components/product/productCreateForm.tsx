"use client"

import { useMemo, useState } from "react"
import { ImageSquare, Plus } from "@phosphor-icons/react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCategories } from "@/hooks/useCategories"
import { useProductFormTemplate } from "@/hooks/useProductFormTemplate"
import { useProducts } from "@/hooks/useProducts"
import { useVendors } from "@/hooks/useVendors"
import { ProductImageUploader } from "@/components/product/productImageUploader"
import { ProductVariantBuilder } from "@/components/product/productVariantBuilder"
import { RichTextEditor } from "@/components/shared/richTextEditor"

type ProductCreateFormProps = { adminMode?: boolean }

export function ProductCreateForm({
  adminMode = false,
}: ProductCreateFormProps) {
  const { categories, error: categoryError, isLoading } = useCategories()
  const [categoryId, setCategoryId] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const { create, error: productError, isCreating } = useProducts()
  const {
    error: vendorError,
    isLoading: vendorsLoading,
    vendors,
  } = useVendors()
  const [vendorId, setVendorId] = useState(0)
  const { template } = useProductFormTemplate(categoryId)
  const category = useMemo(
    () => categories.find((item) => item.id === categoryId),
    [categories, categoryId]
  )

  return (
    <form
      className="mx-auto max-w-5xl"
      onSubmit={async (event) => {
        event.preventDefault()
        if (!categoryId || (adminMode && !vendorId)) return
        const formData = new FormData(event.currentTarget)
        formData.set("category_id", String(categoryId))
        if (adminMode) formData.set("vendor_id", String(vendorId))
        formData.set("status", "active")
        try {
          await create(formData)
          setSubmitted(true)
        } catch {
          setSubmitted(false)
        }
      }}
    >
      <div className="mb-7">
        <p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
          New listing
        </p>
        <h2 className="mt-2 font-serif text-4xl tracking-[-0.05em] text-brand">
          Give a good thing a new home.
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-light">
          Choose a category first. We’ll bring in the questions that help
          shoppers understand your item.
        </p>
      </div>
      {submitted && (
        <Alert className="mb-5 border-[#cfe2cf] bg-[#f0f7ed] text-brand-3">
          <AlertDescription>Product published successfully.</AlertDescription>
        </Alert>
      )}
      {categoryError && (
        <Alert
          className="mb-5 border-red-200 bg-red-50 text-red-800"
          variant="destructive"
        >
          <AlertDescription>{categoryError}</AlertDescription>
        </Alert>
      )}
      {productError && (
        <Alert
          className="mb-5 border-red-200 bg-red-50 text-red-800"
          variant="destructive"
        >
          <AlertDescription>{productError}</AlertDescription>
        </Alert>
      )}
      {vendorError && (
        <Alert
          className="mb-5 border-red-200 bg-red-50 text-red-800"
          variant="destructive"
        >
          <AlertDescription>{vendorError}</AlertDescription>
        </Alert>
      )}
      <Card className="mb-6 rounded-[26px] border-[#e3e9df] bg-white shadow-none">
        <CardHeader>
          <CardTitle className="text-base text-brand">
            Start with the basics
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 sm:grid-cols-2">
          {adminMode && (
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="product-vendor">Vendor</Label>
              <select
                className="h-10 w-full rounded-3xl border border-transparent bg-input/50 px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
                disabled={vendorsLoading}
                id="product-vendor"
                name="vendor_id"
                onChange={(event) => setVendorId(Number(event.target.value))}
                value={vendorId || ""}
              >
                <option disabled value="">
                  Choose an active vendor
                </option>
                {vendors
                  .filter((vendor) => vendor.status === "active")
                  .map((vendor) => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.display_name}
                    </option>
                  ))}
              </select>
              <p className="text-xs text-brand-gray-3">
                Admin is creating this listing on behalf of the selected vendor.
              </p>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="product-category">Category</Label>
            <select
              className="h-10 w-full rounded-3xl border border-transparent bg-input/50 px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
              disabled={isLoading}
              id="product-category"
              name="category_id"
              onChange={(event) => {
                setCategoryId(Number(event.target.value))
                setSubmitted(false)
              }}
              value={categoryId || ""}
            >
              <option disabled value="">
                Choose a category
              </option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-brand-gray-3">
              Category-specific fields appear below.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-name">Product name</Label>
            <Input
              id="product-name"
              name="name"
              placeholder="e.g. Woven market bag"
              required
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="product-description">Description</Label>
            <RichTextEditor
              id="product-description"
              name="description"
              nullable
              placeholder="Tell the story honestly and clearly. Add details, care notes, and what makes this item useful."
            />
          </div>
        </CardContent>
      </Card>
      {!categoryId ? (
        <Card className="rounded-[26px] border-dashed border-[#cfdccf] bg-[#f8faf5] shadow-none">
          <CardContent className="flex min-h-40 flex-col items-center justify-center gap-2 text-center">
            <ImageSquare className="text-brand-2" size={28} />
            <p className="font-semibold text-brand">
              Choose a category to continue
            </p>
            <p className="text-sm text-brand-gray-3">
              The right template will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        template && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-[0.14em] text-brand-gray-3 uppercase">
                  {category?.name}
                </p>
                <h3 className="mt-1 text-xl font-bold text-brand">
                  {template.name}
                </h3>
              </div>
              <Badge
                className="border-0 bg-brand-yellow-bg text-brand-3"
                variant="outline"
              >
                {template.status}
              </Badge>
            </div>
            {template.sections.map((section) => (
              <Card
                className="rounded-[26px] border-[#e3e9df] bg-white shadow-none"
                key={section.id}
              >
                <CardHeader>
                  <CardTitle className="text-base text-brand">
                    {section.title}
                  </CardTitle>
                  {section.description && (
                    <p className="text-sm text-brand-light">
                      {section.description}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="grid gap-5 sm:grid-cols-2">
                  {section.fields.map((field) => (
                    <div className="space-y-2" key={field.id}>
                      <input
                        name={`attributes[${field.id}][field_id]`}
                        type="hidden"
                        value={field.id}
                      />
                      <Label htmlFor={String(field.id)}>
                        {field.label}
                        {field.is_required && (
                          <span className="ml-1 text-brand-orange">*</span>
                        )}
                      </Label>
                      {field.field_type === "textarea" ? (
                        <Textarea
                          id={String(field.id)}
                          name={`attributes[${field.id}][value]`}
                          placeholder={field.placeholder}
                          required={field.is_required}
                        />
                      ) : field.field_type === "select" ? (
                        <select
                          className="h-10 w-full rounded-3xl border border-transparent bg-input/50 px-3 text-sm"
                          id={String(field.id)}
                          name={`attributes[${field.id}][value]`}
                          required={field.is_required}
                        >
                          <option value="">
                            {field.placeholder ||
                              `Choose ${field.label.toLowerCase()}`}
                          </option>
                          {field.options.map((option) => (
                            <option key={option.id} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : field.field_type === "checkbox" ? (
                        <label className="flex h-10 items-center gap-2 text-sm text-brand-light">
                          <input
                            id={String(field.id)}
                            name={`attributes[${field.id}][value]`}
                            required={field.is_required}
                            type="checkbox"
                          />{" "}
                          Yes
                        </label>
                      ) : (
                        <Input
                          id={String(field.id)}
                          name={`attributes[${field.id}][value]`}
                          placeholder={field.placeholder}
                          required={field.is_required}
                          type={
                            field.field_type === "number" ||
                            field.field_type === "date"
                              ? field.field_type
                              : "text"
                          }
                        />
                      )}
                      {field.help_text && (
                        <p className="text-xs text-brand-gray-3">
                          {field.help_text}
                        </p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
            <Card className="rounded-[26px] border-[#e3e9df] bg-white shadow-none">
              <CardHeader>
                <CardTitle className="text-base text-brand">
                  Variants and pricing
                </CardTitle>
                <p className="text-sm text-brand-light">
                  Size, type, color, or another option creates the combination.
                  Set the price and stock for each combination.
                </p>
              </CardHeader>
              <CardContent>
                <ProductVariantBuilder />
              </CardContent>
            </Card>
            <Card className="rounded-[26px] border-[#e3e9df] bg-white shadow-none">
              <CardHeader>
                <CardTitle className="text-base text-brand">
                  Product images
                </CardTitle>
                <p className="text-sm text-brand-light">
                  The first photo becomes the primary image.
                </p>
              </CardHeader>
              <CardContent>
                <ProductImageUploader />
              </CardContent>
            </Card>
            <div className="flex justify-end">
              <Button isDisabled={isCreating || !categoryId} type="submit">
                <Plus size={16} />{" "}
                {isCreating ? "Publishing…" : "Publish product"}
              </Button>
            </div>
          </div>
        )
      )}
    </form>
  )
}
