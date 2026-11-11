import { api } from "@/lib/api"
import type {
  Category,
  CategoryApiResponse,
  CategoryInput,
} from "@/types/category"

function toFormData(input: CategoryInput) {
  const formData = new FormData()
  formData.append("name", input.name)
  formData.append("status", input.status)

  if (input.slug) formData.append("slug", input.slug)
  if (input.description) formData.append("description", input.description)
  if (input.image) formData.append("image", input.image)

  return formData
}

export const categoryService = {
  async list(): Promise<Category[]> {
    const response =
      await api.get<CategoryApiResponse<Category[]>>("/categories")
    return response.data.data
  },

  async show(id: number): Promise<Category> {
    const response = await api.get<CategoryApiResponse<Category>>(
      `/categories/${id}`
    )
    return response.data.data
  },

  async create(input: CategoryInput): Promise<Category> {
    const response = await api.post<CategoryApiResponse<Category>>(
      "/categories",
      toFormData(input),
      { headers: { "Content-Type": "multipart/form-data" } }
    )
    return response.data.data
  },

  async update(id: number, input: CategoryInput): Promise<Category> {
    const formData = toFormData(input)
    formData.append("_method", "PUT")
    const response = await api.post<CategoryApiResponse<Category>>(
      `/categories/${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    )
    return response.data.data
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/categories/${id}`)
  },
}
