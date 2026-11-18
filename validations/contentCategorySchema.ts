import { z } from "zod"

export const contentCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name must be at least 2 characters.")
    .max(150, "Category name must be 150 characters or fewer."),
  slug: z
    .string()
    .trim()
    .max(180, "URL slug must be 180 characters or fewer.")
    .optional(),
})

export type ContentCategoryFormValues = z.infer<typeof contentCategorySchema>
