"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type {
  ContentCategory,
  ContentCategoryInput,
} from "@/types/contentCategory"
import {
  contentCategorySchema,
  type ContentCategoryFormValues,
} from "@/validations/contentCategorySchema"

type ContentCategoryFormProps = {
  category: ContentCategory | null
  isSaving: boolean
  onCancel: () => void
  onSave: (input: ContentCategoryInput) => Promise<ContentCategory>
}

export function ContentCategoryForm({
  category,
  isSaving,
  onCancel,
  onSave,
}: ContentCategoryFormProps) {
  const [submitError, setSubmitError] = useState("")
  const { formState, handleSubmit, register, setError } =
    useForm<ContentCategoryFormValues>({
      defaultValues: {
        name: category?.name ?? "",
        slug: category?.slug ?? "",
      },
    })

  const submit = async (values: ContentCategoryFormValues) => {
    setSubmitError("")
    const parsed = contentCategorySchema.safeParse(values)

    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0]
        if (field === "name" || field === "slug") {
          setError(field, { message: issue.message })
        }
      })

      return
    }

    try {
      await onSave(parsed.data)
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to save the category."
      )
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(submit)}>
      <div className="space-y-2">
        <Label htmlFor="content-category-name">Category name</Label>
        <Input
          id="content-category-name"
          placeholder="For example: Circular living"
          {...register("name")}
        />
        {formState.errors.name && (
          <p className="text-xs text-red-700">{formState.errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="content-category-slug">URL name (optional)</Label>
        <Input
          id="content-category-slug"
          placeholder="circular-living"
          {...register("slug")}
        />
        <p className="text-xs leading-5 text-brand-gray-3">
          Leave this blank to create the URL name automatically from the category
          name.
        </p>
        {formState.errors.slug && (
          <p className="text-xs text-red-700">{formState.errors.slug.message}</p>
        )}
      </div>
      {submitError && <p className="text-sm text-red-700">{submitError}</p>}
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button onPress={onCancel} type="button" variant="outline">
          Cancel
        </Button>
        <Button isDisabled={isSaving} type="submit">
          {isSaving
            ? "Saving…"
            : category
              ? "Save changes"
              : "Create category"}
        </Button>
      </div>
    </form>
  )
}
