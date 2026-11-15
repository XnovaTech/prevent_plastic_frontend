"use client"

import { useParams } from "next/navigation"

import { ProductFormTemplateBuilder } from "@/components/category/productFormTemplateBuilder"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { useCategory } from "@/hooks/useCategories"
import { useProductFormTemplate } from "@/hooks/useProductFormTemplate"

export default function NewProductFormTemplatePage() {
  const params = useParams<{ categoryId: string }>()
  const categoryId = Number(params.categoryId)
  const { category, isLoading } = useCategory(categoryId)
  const { error, isReady, save, template } = useProductFormTemplate(categoryId)

  if (isLoading || !isReady || (!template && !error))
    return <Skeleton className="mx-auto h-[620px] max-w-6xl rounded-[26px]" />

  if (error || !category || !template) {
    return (
      <Alert
        className="mx-auto max-w-2xl border-red-200 bg-red-50 text-red-800"
        variant="destructive"
      >
        <AlertDescription>
          {error || "Unable to load this category template."}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <ProductFormTemplateBuilder
      categoryName={category.name}
      onSave={save}
      template={template}
    />
  )
}
