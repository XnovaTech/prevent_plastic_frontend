"use client"

import { useParams } from "next/navigation"

import { ProductFormTemplateBuilder } from "@/components/category/productFormTemplateBuilder"
import { Skeleton } from "@/components/ui/skeleton"
import { useCategory } from "@/hooks/useCategories"
import { useProductFormTemplate } from "@/hooks/useProductFormTemplate"

export default function NewProductFormTemplatePage() {
  const params = useParams<{ categoryId: string }>()
  const categoryId = Number(params.categoryId)
  const { category, isLoading } = useCategory(categoryId)
  const { isReady, save, template } = useProductFormTemplate(categoryId)

  if (isLoading || !isReady || !category || !template)
    return <Skeleton className="mx-auto h-[620px] max-w-6xl rounded-[26px]" />

  return (
    <ProductFormTemplateBuilder
      categoryName={category.name}
      onSave={save}
      template={template}
    />
  )
}
