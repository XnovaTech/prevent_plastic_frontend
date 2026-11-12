"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Plus, Trash } from "@phosphor-icons/react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type {
  ProductFormField,
  ProductFormFieldType,
  ProductFormSection,
  ProductFormTemplate,
} from "@/types/productFormTemplate"

const fieldTypes: { label: string; value: ProductFormFieldType }[] = [
  { label: "Short text", value: "text" },
  { label: "Long text", value: "textarea" },
  { label: "Number", value: "number" },
  { label: "Select", value: "select" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Date", value: "date" },
]

function id(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function newField(): ProductFormField {
  return {
    id: id("field"),
    field_key: "new_field",
    label: "New field",
    help_text: "",
    field_type: "text",
    placeholder: "",
    is_required: false,
    is_filterable: false,
    is_searchable: false,
    options: [],
  }
}

function newSection(): ProductFormSection {
  return {
    id: id("section"),
    title: "New section",
    description: "",
    fields: [newField()],
  }
}

type BuilderProps = {
  categoryName: string
  template: ProductFormTemplate
  onSave: (template: ProductFormTemplate) => Promise<unknown>
}

export function ProductFormTemplateBuilder({
  categoryName,
  template,
  onSave,
}: BuilderProps) {
  const [draft, setDraft] = useState(template)
  const [saved, setSaved] = useState(false)

  const updateSection = (
    sectionId: number | string,
    update: Partial<ProductFormSection>
  ) => {
    setDraft((current) => ({
      ...current,
      sections: current.sections.map((section) =>
        section.id === sectionId ? { ...section, ...update } : section
      ),
    }))
    setSaved(false)
  }

  const updateField = (
    sectionId: number | string,
    fieldId: number | string,
    update: Partial<ProductFormField>
  ) => {
    setDraft((current) => ({
      ...current,
      sections: current.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.map((field) =>
                field.id === fieldId ? { ...field, ...update } : field
              ),
            }
          : section
      ),
    }))
    setSaved(false)
  }

  const save = async () => {
    await onSave({ ...draft, status: "active", version: draft.version + 1 })
    setSaved(true)
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-light hover:text-brand-2"
            href={`/admin/categories/${template.category_id}`}
          >
            <ArrowLeft size={14} /> Back to category
          </Link>
          <p className="mt-5 text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
            Product form template · {categoryName}
          </p>
          <h2 className="mt-1 font-serif text-4xl tracking-[-0.05em] text-brand">
            Shape the seller’s checklist.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-light">
            Add the category-specific questions vendors should answer when they
            create a product.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            className="border-0 bg-brand-yellow-bg text-brand-3"
            variant="outline"
          >
            v{draft.version}
          </Badge>
          <Button onPress={save}>
            <Check size={16} /> {saved ? "Saved" : "Activate template"}
          </Button>
        </div>
      </div>

      <Card className="mb-5 rounded-[24px] border-[#e3e9df] bg-white shadow-none">
        <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="template-name">Template name</Label>
            <Input
              id="template-name"
              value={draft.name}
              onChange={(event) => {
                setDraft({ ...draft, name: event.target.value })
                setSaved(false)
              }}
            />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <div className="flex h-9 items-center rounded-3xl bg-input/50 px-3 text-sm text-brand-light">
              {categoryName}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-5">
        {draft.sections.map((section, sectionIndex) => (
          <Card
            className="rounded-[24px] border-[#e3e9df] bg-white shadow-none"
            key={section.id}
          >
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div className="grid flex-1 gap-3 sm:grid-cols-2">
                <Input
                  aria-label={`Section ${sectionIndex + 1} title`}
                  className="text-base font-semibold"
                  value={section.title}
                  onChange={(event) =>
                    updateSection(section.id, { title: event.target.value })
                  }
                />
                <Input
                  aria-label={`Section ${sectionIndex + 1} description`}
                  placeholder="Optional section description"
                  value={section.description}
                  onChange={(event) =>
                    updateSection(section.id, {
                      description: event.target.value,
                    })
                  }
                />
              </div>
              <Button
                aria-label={`Remove section ${section.title}`}
                onPress={() =>
                  setDraft({
                    ...draft,
                    sections: draft.sections.filter(
                      (item) => item.id !== section.id
                    ),
                  })
                }
                size="icon"
                variant="ghost"
              >
                <Trash size={17} />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {section.fields.map((field) => (
                <div
                  className="grid gap-3 rounded-2xl border border-[#edf0ea] bg-[#fbfcf8] p-4 lg:grid-cols-[1.1fr_1fr_0.8fr_auto]"
                  key={field.id}
                >
                  <div className="space-y-2">
                    <Label>Field label</Label>
                    <Input
                      value={field.label}
                      onChange={(event) =>
                        updateField(section.id, field.id, {
                          label: event.target.value,
                          field_key: event.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "_")
                            .replace(/^_|_$/g, ""),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Help text</Label>
                    <Input
                      placeholder="What should the seller know?"
                      value={field.help_text}
                      onChange={(event) =>
                        updateField(section.id, field.id, {
                          help_text: event.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Field type</Label>
                    <select
                      className="h-9 w-full rounded-3xl border border-transparent bg-input/50 px-3 text-sm"
                      value={field.field_type}
                      onChange={(event) =>
                        updateField(section.id, field.id, {
                          field_type: event.target
                            .value as ProductFormFieldType,
                        })
                      }
                    >
                      {fieldTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end gap-3 pb-1 text-xs text-brand-light">
                    <label className="flex items-center gap-2">
                      <input
                        checked={field.is_required}
                        onChange={(event) =>
                          updateField(section.id, field.id, {
                            is_required: event.target.checked,
                          })
                        }
                        type="checkbox"
                      />{" "}
                      Required
                    </label>
                    <Button
                      aria-label={`Remove ${field.label}`}
                      onPress={() =>
                        updateSection(section.id, {
                          fields: section.fields.filter(
                            (item) => item.id !== field.id
                          ),
                        })
                      }
                      size="icon-xs"
                      variant="ghost"
                    >
                      <Trash size={14} />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                onPress={() =>
                  updateSection(section.id, {
                    fields: [...section.fields, newField()],
                  })
                }
                variant="outline"
              >
                <Plus size={15} /> Add field
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-5 flex justify-center">
        <Button
          onPress={() =>
            setDraft({ ...draft, sections: [...draft.sections, newSection()] })
          }
          variant="outline"
        >
          <Plus size={16} /> Add section
        </Button>
      </div>
    </div>
  )
}
