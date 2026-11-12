"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  CheckCircle,
  FileText,
  PencilSimple,
  Tag,
  Trash,
} from "@phosphor-icons/react"

import { CategoryForm } from "@/components/category/categoryForm"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button, LinkButton } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCategory } from "@/hooks/useCategories"
import { useProductFormTemplates } from "@/hooks/useProductFormTemplates"

export default function CategoryDetailPage() {
  const params = useParams<{ categoryId: string }>()
  const router = useRouter()
  const id = Number(params.categoryId)
  const { category, error, isLoading, remove, update } = useCategory(id)
  const {
    error: templateError,
    isLoading: templatesLoading,
    templates,
  } = useProductFormTemplates(id)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState("")
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(
    null
  )
  const [selectedTab, setSelectedTab] = useState("list")
  const selectedTemplate =
    templates.find((template) => template.id === selectedTemplateId) ??
    templates[0]

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
    return <Skeleton className="mx-auto h-[620px] max-w-6xl rounded-[26px]" />
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
  if (isEditing)
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

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <LinkButton
          className="text-xs font-semibold text-brand-light"
          href="/admin/categories"
          variant="ghost"
        >
          <ArrowLeft size={14} /> Back to categories
        </LinkButton>
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

      <section className="relative mb-7 overflow-hidden rounded-[30px] bg-[#edf5e9] px-6 py-7 sm:px-9 sm:py-9">
        <div className="absolute -top-20 -right-10 size-64 rounded-full bg-white/45" />
        <div className="absolute -bottom-24 left-1/3 size-56 rounded-full bg-[#f4e6dc]/55" />
        <div className="relative z-10 grid items-center gap-7 lg:grid-cols-[1fr_240px]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                className="border-0 bg-white/75 text-brand-3"
                variant="outline"
              >
                Category workspace
              </Badge>
              <Badge
                className="border-0 bg-[#dcebd7] text-brand-3"
                variant="outline"
              >
                {category.status}
              </Badge>
            </div>
            <h1 className="mt-4 font-serif text-4xl leading-none tracking-[-0.06em] text-brand sm:text-6xl">
              {category.name}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-brand-light">
              {category.description ||
                "Shape a clear, welcoming shelf for the marketplace."}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-brand-3">
              <span className="rounded-full bg-white/75 px-3 py-1.5">
                /{category.slug}
              </span>
              <span className="rounded-full bg-white/75 px-3 py-1.5">
                {templates.length} template{" "}
                {templates.length === 1 ? "version" : "versions"}
              </span>
            </div>
          </div>
          <div className="relative hidden aspect-square overflow-hidden rounded-[26px] border border-white/70 bg-[#dfead9] shadow-[0_20px_50px_-30px_rgba(23,62,54,0.45)] lg:block">
            {category.image ? (
              <img
                alt={`${category.name} category`}
                className="h-full w-full object-cover"
                src={category.image}
              />
            ) : (
              <div className="grid h-full place-items-center text-brand-2">
                <Tag size={78} weight="duotone" />
              </div>
            )}
          </div>
        </div>
      </section>

      <Tabs
        className="gap-5"
        onSelectionChange={(key) => setSelectedTab(String(key))}
        selectedKey={selectedTab}
      >
        <TabsList
          aria-label="Category workspace tabs"
          className="w-full justify-start rounded-2xl bg-white p-1 sm:w-fit"
          variant="line"
        >
          <TabsTrigger id="list">
            <FileText size={16} /> Template list
          </TabsTrigger>
          <TabsTrigger id="detail">
            <CheckCircle size={16} /> Template detail
          </TabsTrigger>
        </TabsList>
        <TabsContent className="outline-none" id="list">
          <Card className="rounded-[26px] border-[#e3e9df] bg-white shadow-none">
            <CardContent className="p-5 sm:p-7">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.15em] text-brand-gray-3 uppercase">
                    Template history
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-brand">
                    Versions for {category.name}
                  </h2>
                  <p className="mt-1 text-sm text-brand-light">
                    Keep each version so old product listings remain
                    understandable.
                  </p>
                </div>
                <LinkButton
                  href={`/admin/categories/${category.id}/template/new`}
                  size="sm"
                >
                  Create version
                </LinkButton>
              </div>
              {templateError ? (
                <Alert
                  className="border-red-200 bg-red-50 text-red-800"
                  variant="destructive"
                >
                  <AlertDescription>{templateError}</AlertDescription>
                </Alert>
              ) : templatesLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-16 rounded-2xl" />
                  <Skeleton className="h-16 rounded-2xl" />
                </div>
              ) : templates.length === 0 ? (
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <FileText size={22} />
                    </EmptyMedia>
                    <EmptyTitle>No template versions yet</EmptyTitle>
                    <EmptyDescription>
                      Create the first category-specific product form.
                    </EmptyDescription>
                  </EmptyHeader>
                  <LinkButton
                    href={`/admin/categories/${category.id}/template/new`}
                  >
                    Create template
                  </LinkButton>
                </Empty>
              ) : (
                <div className="space-y-2">
                  {templates.map((template) => (
                    <button
                      className={`flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-colors ${selectedTemplate?.id === template.id ? "border-brand-2 bg-[#f0f7ed]" : "border-[#edf0ea] hover:bg-[#fafbf7]"}`}
                      key={template.id}
                      onClick={() => {
                        setSelectedTemplateId(Number(template.id))
                        setSelectedTab("detail")
                      }}
                      type="button"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-yellow-bg text-xs font-bold text-brand-3">
                          v{template.version}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-semibold text-brand">
                            {template.name}
                          </span>
                          <span className="mt-1 block text-xs text-brand-gray-3">
                            Updated{" "}
                            {template.updated_at
                              ? new Date(
                                  template.updated_at
                                ).toLocaleDateString()
                              : "—"}
                          </span>
                        </span>
                      </div>
                      <Badge
                        className={
                          template.status === "active"
                            ? "border-0 bg-[#dcebd7] text-brand-3"
                            : ""
                        }
                        variant="outline"
                      >
                        {template.status}
                      </Badge>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent className="outline-none" id="detail">
          {!selectedTemplate ? (
            <Card className="rounded-[26px] border-[#e3e9df] bg-white shadow-none">
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <FileText size={22} />
                  </EmptyMedia>
                  <EmptyTitle>Select a template version</EmptyTitle>
                  <EmptyDescription>
                    Choose a version from the template list to inspect its
                    sections and fields.
                  </EmptyDescription>
                </EmptyHeader>
                <Button
                  onPress={() => setSelectedTab("list")}
                  variant="outline"
                >
                  Open template list
                </Button>
              </Empty>
            </Card>
          ) : (
            <div className="space-y-5">
              <Card className="rounded-[26px] border-[#e3e9df] bg-white shadow-none">
                <CardContent className="flex flex-wrap items-center justify-between gap-4 p-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className="border-0 bg-brand-yellow-bg text-brand-3"
                        variant="outline"
                      >
                        Version {selectedTemplate.version}
                      </Badge>
                      <Badge variant="outline">{selectedTemplate.status}</Badge>
                    </div>
                    <h2 className="mt-3 text-2xl font-bold text-brand">
                      {selectedTemplate.name}
                    </h2>
                  </div>
                  <LinkButton
                    href={`/admin/categories/${category.id}/template/new`}
                    size="sm"
                    variant="outline"
                  >
                    <PencilSimple size={15} /> Create next version
                  </LinkButton>
                </CardContent>
              </Card>
              {selectedTemplate.sections.map((section, index) => (
                <Card
                  className="rounded-[26px] border-[#e3e9df] bg-white shadow-none"
                  key={section.id}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-yellow-bg text-xs font-bold text-brand-3">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-bold text-brand">
                          {section.title}
                        </h3>
                        {section.description && (
                          <p className="mt-1 text-sm text-brand-light">
                            {section.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {section.fields.map((field) => (
                        <div
                          className="rounded-2xl border border-[#edf0ea] bg-[#fafbf7] p-4"
                          key={field.id}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-semibold text-brand">
                              {field.label}
                            </p>
                            {field.is_required && (
                              <Badge
                                className="border-0 bg-[#f9e9e3] text-brand-orange"
                                variant="outline"
                              >
                                Required
                              </Badge>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-brand-gray-3">
                            {field.field_type} · {field.field_key}
                          </p>
                          {field.help_text && (
                            <p className="mt-3 text-sm leading-5 text-brand-light">
                              {field.help_text}
                            </p>
                          )}
                          {field.options.length > 0 && (
                            <p className="mt-3 text-xs text-brand-gray-3">
                              Options:{" "}
                              {field.options
                                .map((option) => option.label)
                                .join(", ")}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
