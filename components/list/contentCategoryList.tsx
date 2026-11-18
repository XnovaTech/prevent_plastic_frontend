"use client"

import { useState } from "react"
import { DotsThree, PencilSimple, Plus, Tag, Trash } from "@phosphor-icons/react"

import { ContentCategoryForm } from "@/components/form/contentCategoryForm"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useContentCategories } from "@/hooks/useContentCategories"
import type { ContentCategory } from "@/types/contentCategory"

export function ContentCategoryList() {
  const { categories, create, error, isLoading, isSaving, remove, update } =
    useContentCategories()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] =
    useState<ContentCategory | null>(null)

  const openCreate = () => {
    setEditingCategory(null)
    setDialogOpen(true)
  }

  const openEdit = (category: ContentCategory) => {
    setEditingCategory(category)
    setDialogOpen(true)
  }

  const save = async (input: { name: string; slug?: string }) => {
    if (editingCategory) {
      const category = await update(editingCategory.id, input)
      setDialogOpen(false)

      return category
    }

    const category = await create(input)
    setDialogOpen(false)

    return category
  }

  const deleteCategory = async (category: ContentCategory) => {
    if (
      !window.confirm(
        `Delete “${category.name}”? Existing blog posts will become uncategorized.`
      )
    ) {
      return
    }

    await remove(category.id)
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">
            Journal control
          </p>
          <h2 className="mt-2 font-serif text-4xl tracking-[-.05em] text-brand">
            Blog categories
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-light">
            Organize Journal stories into clear topics for readers and editors.
          </p>
        </div>
        <Button onPress={openCreate}>
          <Plus size={17} /> Create category
        </Button>
      </div>

      {error && (
        <p className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-[26px] border border-[#e3e9df] bg-white">
        {isLoading ? (
          <p className="p-8 text-center text-sm text-brand-light">
            Loading blog categories…
          </p>
        ) : categories.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-yellow-bg text-brand-2">
              <Tag aria-hidden="true" size={22} />
            </span>
            <h3 className="mt-4 font-serif text-2xl text-brand">
              No blog categories yet
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-brand-light">
              Create your first category before organizing stories in the
              Journal.
            </p>
            <Button className="mt-5" onPress={openCreate}>
              <Plus size={16} /> Create category
            </Button>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#e3e9df] text-xs text-brand-gray-3">
              <tr>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Journal URL name</th>
                <th className="w-28 px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  className="border-b border-[#eef1ea] last:border-0"
                  key={category.id}
                >
                  <td className="px-5 py-4 font-semibold text-brand">
                    {category.name}
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-brand-gray-3">
                    /{category.slug}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <DropdownMenuTrigger>
                      <Button
                        aria-label={`Actions for ${category.name}`}
                        size="sm"
                        variant="outline"
                      >
                        <DotsThree size={18} weight="bold" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuItem onAction={() => openEdit(category)}>
                          <PencilSimple size={15} /> Edit category
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onAction={() => void deleteCategory(category)}
                          variant="destructive"
                        >
                          <Trash size={15} /> Delete category
                        </DropdownMenuItem>
                      </DropdownMenu>
                    </DropdownMenuTrigger>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Dialog isOpen={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl tracking-[-.04em] text-brand">
            {editingCategory ? "Edit blog category" : "Create blog category"}
          </DialogTitle>
          <DialogDescription>
            {editingCategory
              ? "Update how this category appears in the Journal."
              : "Give Journal editors a clear topic for organizing stories."}
          </DialogDescription>
        </DialogHeader>
        <ContentCategoryForm
          category={editingCategory}
          isSaving={isSaving}
          key={editingCategory?.id ?? "new"}
          onCancel={() => setDialogOpen(false)}
          onSave={save}
        />
      </Dialog>
    </div>
  )
}
