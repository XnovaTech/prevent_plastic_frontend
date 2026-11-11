"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, PencilSimple, Tag, Trash } from "@phosphor-icons/react"

import { CategoryForm } from "@/components/category/categoryForm"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button, LinkButton } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useCategory } from "@/hooks/useCategories"

export default function CategoryDetailPage() {
  const params = useParams<{ categoryId: string }>()
  const router = useRouter()
  const id = Number(params.categoryId)
  const { category, error, isLoading, remove, update } = useCategory(id)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState("")

  const deleteCategory = async () => {
    if (!category || !window.confirm(`Delete “${category.name}”?`)) return

    setIsDeleting(true)
    setDeleteError("")
    try {
      await remove()
      router.push("/admin/categories")
    } catch {
      setDeleteError("Unable to delete this category. Please try again.")
      setIsDeleting(false)
    }
  }

  if (isLoading)
    return <Skeleton className="mx-auto h-[620px] max-w-5xl rounded-[26px]" />
  if (error || !category)
    return (
      <Card className="mx-auto max-w-2xl rounded-[26px] border-[#e3e9df] bg-white shadow-none">
        <CardContent className="p-8">
          <Alert
            className="border-red-200 bg-red-50 text-red-800"
            variant="destructive"
          >
            <Tag size={18} />
            <AlertDescription>
              {error || "Category not found."}
            </AlertDescription>
          </Alert>
          <LinkButton
            className="mt-5"
            href="/admin/categories"
            variant="outline"
          >
            <ArrowLeft size={16} /> Back to categories
          </LinkButton>
        </CardContent>
      </Card>
    )

  if (isEditing) {
    return (
      <CategoryForm
        category={category}
        onSubmit={async (input) => {
          const updated = await update(input)
          setIsEditing(false)
          return updated
        }}
        submitLabel="Save changes"
      />
    )
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <LinkButton
            className="text-xs font-semibold text-brand-light"
            href="/admin/categories"
            variant="ghost"
          >
            <ArrowLeft size={14} /> Back to categories
          </LinkButton>
          <p className="mt-5 text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
            Category details
          </p>
          <h2 className="mt-1 font-serif text-4xl tracking-[-0.05em] text-brand">
            {category.name}
          </h2>
          <p className="mt-2 text-sm text-brand-light">/{category.slug}</p>
        </div>
        <div className="flex gap-2">
          <Button onPress={() => setIsEditing(true)} variant="outline">
            <PencilSimple size={16} /> Edit
          </Button>
          <Button
            isDisabled={isDeleting}
            onPress={deleteCategory}
            variant="destructive"
          >
            <Trash size={16} /> {isDeleting ? "Deleting…" : "Delete"}
          </Button>
        </div>
      </div>

      {deleteError && (
        <Alert
          className="mb-5 border-red-200 bg-red-50 text-red-800"
          variant="destructive"
        >
          <AlertDescription>{deleteError}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden rounded-[26px] border-[#e3e9df] bg-white py-0 shadow-none">
          <div className="h-72 bg-[#edf3e9]">
            {category.image ? (
              <img
                alt={`${category.name} category`}
                className="h-full w-full object-cover"
                src={category.image}
              />
            ) : (
              <div className="grid h-full place-items-center text-brand-2">
                <Tag size={72} weight="duotone" />
              </div>
            )}
          </div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
                Storefront shelf
              </p>
              <Badge
                className="border-0 bg-brand-yellow-bg text-brand-3"
                variant="outline"
              >
                {category.status}
              </Badge>
            </div>
            <p className="mt-4 text-sm leading-7 text-brand-light">
              {category.description || "No description yet."}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-[26px] border-[#e3e9df] bg-white shadow-none">
          <CardContent className="space-y-6 p-6">
            <div>
              <p className="text-xs font-semibold text-brand-gray-3">
                Category ID
              </p>
              <p className="mt-1 font-semibold text-brand">#{category.id}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-brand-gray-3">Slug</p>
              <p className="mt-1 font-semibold text-brand">/{category.slug}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-brand-gray-3">Created</p>
              <p className="mt-1 font-semibold text-brand">
                {category.created_at
                  ? new Date(category.created_at).toLocaleDateString()
                  : "—"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-brand-gray-3">
                Last updated
              </p>
              <p className="mt-1 font-semibold text-brand">
                {category.updated_at
                  ? new Date(category.updated_at).toLocaleDateString()
                  : "—"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
