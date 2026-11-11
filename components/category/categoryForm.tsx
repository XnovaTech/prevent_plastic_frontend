"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { ArrowLeft, CheckCircle } from "@phosphor-icons/react"

import { ImageUploader } from "@/components/shared/imageUploader"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Category, CategoryInput } from "@/types/category"
import {
  categorySchema,
  type CategoryFormValues,
} from "@/validations/categorySchema"

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

type CategoryFormProps = {
  category?: Category | null
  onSubmit: (input: CategoryInput) => Promise<Category>
  submitLabel?: string
}

export function CategoryForm({
  category,
  onSubmit,
  submitLabel = "Save category",
}: CategoryFormProps) {
  const [image, setImage] = useState<File | null>(null)
  const [submitError, setSubmitError] = useState("")
  const [success, setSuccess] = useState(false)
  const [slugEdited, setSlugEdited] = useState(Boolean(category?.slug))
  const { formState, handleSubmit, register, setError, setValue } =
    useForm<CategoryFormValues>({
      defaultValues: {
        name: category?.name ?? "",
        slug: category?.slug ?? "",
        description: category?.description ?? "",
        status: category?.status ?? "active",
      },
    })
  const nameField = register("name")
  const slugField = register("slug")

  const submit = async (values: CategoryFormValues) => {
    setSubmitError("")
    setSuccess(false)
    const parsed = categorySchema.safeParse(values)
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0]
        if (
          field === "name" ||
          field === "slug" ||
          field === "description" ||
          field === "status"
        ) {
          setError(field, { message: issue.message })
        }
      })
      return
    }

    try {
      await onSubmit({ ...parsed.data, image })
      setSuccess(true)
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to save category."
      )
    }
  }

  return (
    <form className="mx-auto max-w-5xl" onSubmit={handleSubmit(submit)}>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-light hover:text-brand-2"
            href="/admin/categories"
          >
            <ArrowLeft size={14} /> Back to categories
          </Link>
          <div className="mt-4 flex items-center gap-3">
            <div>
              <p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
                Category studio
              </p>
              <h2 className="mt-1 font-serif text-4xl tracking-[-0.05em] text-brand">
                {category ? "Shape this shelf." : "Add a new shelf."}
              </h2>
            </div>
            <Badge
              className="border-0 bg-brand-yellow-bg text-brand-3"
              variant="outline"
            >
              {category ? "Editing" : "New"}
            </Badge>
          </div>
        </div>
        <Button isDisabled={formState.isSubmitting} type="submit">
          {formState.isSubmitting ? "Saving…" : submitLabel}
        </Button>
      </div>

      {submitError && (
        <Alert
          className="mb-5 border-red-200 bg-red-50 text-red-800"
          variant="destructive"
        >
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert className="mb-5 border-[#cfe2cf] bg-[#f0f7ed] text-brand-3">
          <CheckCircle size={18} />
          <AlertDescription>Category saved successfully.</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_0.82fr]">
        <Card className="rounded-[26px] border-[#e3e9df] bg-white shadow-none">
          <CardHeader>
            <CardTitle className="text-base text-brand">
              Category details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="category-name">Name</Label>
              <Input
                id="category-name"
                placeholder="Home & living"
                {...nameField}
                onChange={(event) => {
                  nameField.onChange(event)
                  if (!slugEdited) {
                    setValue("slug", slugify(event.target.value), {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                }}
              />
              {formState.errors.name && (
                <p className="text-xs text-red-700">
                  {formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-slug">
                Slug{" "}
                <span className="font-normal text-brand-gray-3">
                  (optional)
                </span>
              </Label>
              <Input
                id="category-slug"
                placeholder="home-living"
                {...slugField}
                onChange={(event) => {
                  setSlugEdited(true)
                  slugField.onChange(event)
                }}
              />
              <p className="text-xs text-brand-gray-3">
                {category
                  ? "Use a stable URL-friendly slug."
                  : "Generated from the name. You can still customize it."}
              </p>
              {formState.errors.slug && (
                <p className="text-xs text-red-700">
                  {formState.errors.slug.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-description">Description</Label>
              <Textarea
                id="category-description"
                placeholder="A short line about what shoppers will find here."
                {...register("description")}
              />
              {formState.errors.description && (
                <p className="text-xs text-red-700">
                  {formState.errors.description.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-status">Status</Label>
              <select
                id="category-status"
                className="h-10 w-full rounded-3xl border border-transparent bg-input/50 px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
                {...register("status")}
              >
                <option value="active">
                  Active — visible in the marketplace
                </option>
                <option value="inactive">Inactive — keep hidden for now</option>
              </select>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[26px] border-[#e3e9df] bg-white shadow-none">
          <CardHeader>
            <CardTitle className="text-base text-brand">Shelf image</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUploader
              existingImage={category?.image}
              onChange={setImage}
              value={image}
            />
          </CardContent>
        </Card>
      </div>
    </form>
  )
}
