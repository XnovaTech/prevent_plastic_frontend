"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, Plus, Trash } from "@phosphor-icons/react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button, LinkButton } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { productService, type Product } from "@/services/productService"
import { RichTextEditor } from "@/components/shared/richTextEditor"

type ProductEditFormProps = { product: Product }

export function ProductEditForm({ product }: ProductEditFormProps) {
  const router = useRouter()
  const [name, setName] = useState(product.name)
  const [description, setDescription] = useState(product.description ?? "")
  const isModerated =
    product.status === "disabled" || product.status === "banned"
  const [status, setStatus] = useState<"draft" | "active">(
    product.status === "draft" ? "draft" : "active"
  )
  const [variants, setVariants] = useState(
    (product.variants ?? []).map((variant) => ({
      price: Number(variant.price),
      stock_quantity: variant.stock_quantity,
      is_active: variant.is_active ?? true,
    }))
  )
  const [error, setError] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const save = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSaving(true)
    setError("")
    try {
      await productService.update(product.id, {
        name,
        description,
        status,
        variants,
      })
      router.push(`/vendor/products/${product.id}`)
      router.refresh()
    } catch {
      setError(
        "Unable to update product. Please check the values and try again."
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form className="mx-auto max-w-4xl" onSubmit={save}>
      <div className="mb-7">
        <LinkButton
          className="text-xs font-semibold text-brand-light"
          href={`/vendor/products/${product.id}`}
          variant="ghost"
        >
          <ArrowLeft size={14} /> Back to product
        </LinkButton>
        <p className="mt-5 text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
          Edit product
        </p>
        <h2 className="mt-1 font-serif text-4xl tracking-[-0.05em] text-brand">
          Keep the details true.
        </h2>
      </div>
      {error && (
        <Alert
          className="mb-5 border-red-200 bg-red-50 text-red-800"
          variant="destructive"
        >
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Card className="mb-5 rounded-[26px] border-[#e3e9df] bg-white shadow-none">
        <CardHeader>
          <CardTitle className="text-base text-brand">Product basics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="edit-product-name">Name</Label>
            <Input
              id="edit-product-name"
              onChange={(event) => setName(event.target.value)}
              required
              value={name}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-product-description">Description</Label>
            <RichTextEditor
              id="edit-product-description"
              nullable
              onChange={(value) => setDescription(value ?? "")}
              placeholder="Tell the story honestly and clearly."
              value={description}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-product-status">Status</Label>
            <select
              className="h-10 w-full rounded-3xl border border-transparent bg-input/50 px-3 text-sm"
              disabled={isModerated}
              id="edit-product-status"
              onChange={(event) =>
                setStatus(event.target.value as typeof status)
              }
              value={status}
            >
              <option value="draft">Draft</option>
              <option value="active">Published</option>
            </select>
          </div>
          <p className="text-xs text-brand-gray-3">
            Category and template version are fixed after product creation.
            {isModerated && " Admin moderation status cannot be changed here."}
          </p>
        </CardContent>
      </Card>
      <Card className="rounded-[26px] border-[#e3e9df] bg-white shadow-none">
        <CardHeader>
          <CardTitle className="text-base text-brand">
            Variants and pricing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {variants.map((variant, index) => (
            <div
              className="grid gap-3 rounded-2xl border border-[#edf0ea] bg-[#fafbf7] p-4 sm:grid-cols-[1.5fr_1fr_1fr_auto]"
              key={index}
            >
              <div className="space-y-2">
                <Label>Combination</Label>
                <div className="flex min-h-10 flex-wrap items-center gap-2 rounded-3xl bg-input/50 px-3 py-2">
                  {product.variants?.[index]?.option_values?.length ? (
                    product.variants[index].option_values.map((option) => (
                      <span
                        className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-brand-3"
                        key={`${option.attribute_code}-${option.value}`}
                      >
                        {option.attribute_name ?? option.attribute_code}:{" "}
                        {option.value}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-brand-gray-3">
                      Standard product
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Price</Label>
                <Input
                  min="0"
                  onChange={(event) =>
                    setVariants((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, price: Number(event.target.value) }
                          : item
                      )
                    )
                  }
                  type="number"
                  value={variant.price}
                />
              </div>
              <div className="space-y-2">
                <Label>Stock</Label>
                <Input
                  min="0"
                  onChange={(event) =>
                    setVariants((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index
                          ? {
                              ...item,
                              stock_quantity: Number(event.target.value),
                            }
                          : item
                      )
                    )
                  }
                  type="number"
                  value={variant.stock_quantity}
                />
              </div>
              <div className="flex items-end">
                <Button
                  aria-label={`Remove variant ${index + 1}`}
                  isDisabled={variants.length === 1}
                  onPress={() =>
                    setVariants((current) =>
                      current.filter((_, itemIndex) => itemIndex !== index)
                    )
                  }
                  size="icon"
                  variant="ghost"
                >
                  <Trash size={16} />
                </Button>
              </div>
            </div>
          ))}
          <Button
            onPress={() =>
              setVariants((current) => [
                ...current,
                { sku: "", price: 0, stock_quantity: 0, is_active: true },
              ])
            }
            variant="outline"
          >
            <Plus size={15} /> Add variant
          </Button>
        </CardContent>
      </Card>
      <div className="mt-5 flex justify-end">
        <Button isDisabled={isSaving || variants.length === 0} type="submit">
          <Check size={16} /> {isSaving ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  )
}
