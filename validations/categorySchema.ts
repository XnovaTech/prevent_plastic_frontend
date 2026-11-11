import { z } from "zod"

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(180),
  slug: z.string().trim().max(200).optional(),
  description: z.string().trim().max(1000).optional(),
  status: z.enum(["active", "inactive"]),
})

export type CategoryFormValues = z.infer<typeof categorySchema>
