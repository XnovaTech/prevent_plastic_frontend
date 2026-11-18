import { api } from "@/lib/api"
import type { ApiResponse } from "@/types/auth"
import type {
  ContentCategory,
  ContentCategoryInput,
} from "@/types/contentCategory"

export const contentCategoryService = {
  async list(): Promise<ContentCategory[]> {
    const response = await api.get<ApiResponse<ContentCategory[]>>(
      "/content-categories"
    )

    return response.data.data
  },

  async create(input: ContentCategoryInput): Promise<ContentCategory> {
    const response = await api.post<ApiResponse<ContentCategory>>(
      "/admin/content-categories",
      input
    )

    return response.data.data
  },

  async update(
    id: number,
    input: ContentCategoryInput
  ): Promise<ContentCategory> {
    const response = await api.patch<ApiResponse<ContentCategory>>(
      `/admin/content-categories/${id}`,
      input
    )

    return response.data.data
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/admin/content-categories/${id}`)
  },
}
