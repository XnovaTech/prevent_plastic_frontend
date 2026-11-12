import { api } from "@/lib/api"
import type { CategoryApiResponse } from "@/types/category"
import type { ProductFormTemplate } from "@/types/productFormTemplate"

export const productFormTemplateService = {
  async list(categoryId: number) {
    const response = await api.get<CategoryApiResponse<ProductFormTemplate[]>>(
      `/categories/${categoryId}/product-form-templates`
    )
    return response.data.data
  },

  async active(categoryId: number) {
    const response = await api.get<CategoryApiResponse<ProductFormTemplate>>(
      `/categories/${categoryId}/product-form-templates/active`
    )
    return response.data.data
  },

  async create(categoryId: number, template: ProductFormTemplate) {
    const response = await api.post<CategoryApiResponse<ProductFormTemplate>>(
      `/categories/${categoryId}/product-form-templates`,
      templatePayload(template)
    )
    return response.data.data
  },

  async createVersion(id: number, template: ProductFormTemplate) {
    const response = await api.post<CategoryApiResponse<ProductFormTemplate>>(
      `/product-form-templates/${id}/versions`,
      templatePayload(template)
    )
    return response.data.data
  },
}

function templatePayload(template: ProductFormTemplate) {
  return {
    name: template.name,
    version: template.version,
    status: template.status,
    sections: template.sections.map((section, sectionIndex) => ({
      title: section.title,
      description: section.description || null,
      sort_order: sectionIndex,
      fields: section.fields.map((field, fieldIndex) => ({
        field_key: field.field_key,
        label: field.label,
        help_text: field.help_text || null,
        field_type: field.field_type,
        placeholder: field.placeholder || null,
        is_required: field.is_required,
        is_filterable: field.is_filterable,
        is_searchable: field.is_searchable,
        sort_order: fieldIndex,
        options: field.options.map((option, optionIndex) => ({
          label: option.label,
          value: option.value,
          sort_order: optionIndex,
        })),
      })),
    })),
  }
}
