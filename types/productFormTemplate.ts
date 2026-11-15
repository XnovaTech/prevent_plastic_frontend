export type ProductFormFieldType =
  "text" | "textarea" | "number" | "select" | "checkbox" | "date"

export type ProductFormFieldOption = {
  id: number | string
  label: string
  value: string
}

export type ProductFormField = {
  id: number | string
  field_key: string
  label: string
  help_text: string
  field_type: ProductFormFieldType
  placeholder: string
  is_required: boolean
  is_filterable: boolean
  is_searchable: boolean
  validation_rules?: Record<string, unknown> | null
  default_value?: unknown
  sort_order?: number
  options: ProductFormFieldOption[]
}

export type ProductFormSection = {
  id: number | string
  title: string
  description: string
  fields: ProductFormField[]
}

export type ProductFormTemplate = {
  id: number | string
  category_id: number
  name: string
  version: number
  status: "draft" | "active" | "archived"
  sections: ProductFormSection[]
  updated_at?: string
}
