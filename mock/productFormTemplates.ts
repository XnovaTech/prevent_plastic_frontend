import type { ProductFormTemplate } from "@/types/productFormTemplate"

export function createStarterTemplate(categoryId: number): ProductFormTemplate {
  return {
    id: `template-${categoryId}`,
    category_id: categoryId,
    name: "Product details",
    version: 1,
    status: "draft",
    updated_at: new Date().toISOString(),
    sections: [
      {
        id: `section-${categoryId}-details`,
        title: "The essentials",
        description: "The details shoppers need before they fall for it.",
        fields: [
          {
            id: `field-${categoryId}-condition`,
            field_key: "condition",
            label: "Condition",
            help_text: "Be honest about wear, marks, or repairs.",
            field_type: "select",
            placeholder: "Choose condition",
            is_required: true,
            is_filterable: true,
            is_searchable: false,
            options: [
              { id: "new", label: "Like new", value: "like-new" },
              { id: "good", label: "Good", value: "good" },
              { id: "loved", label: "Well loved", value: "well-loved" },
            ],
          },
          {
            id: `field-${categoryId}-material`,
            field_key: "material",
            label: "Material",
            help_text: "What is it made from?",
            field_type: "text",
            placeholder: "e.g. solid wood, cotton, ceramic",
            is_required: false,
            is_filterable: true,
            is_searchable: true,
            options: [],
          },
        ],
      },
    ],
  }
}
