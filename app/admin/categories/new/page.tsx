"use client"

import { useRouter } from "next/navigation"

import { CategoryForm } from "@/components/category/categoryForm"
import { categoryService } from "@/services/categoryService"

export default function NewCategoryPage() {
  const router = useRouter()

  return (
    <CategoryForm
      onSubmit={async (input) => {
        const category = await categoryService.create(input)
        router.push(`/admin/categories/${category.id}`)
        return category
      }}
    />
  )
}
