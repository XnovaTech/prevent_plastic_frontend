import { api } from "@/lib/api"
import type { CategoryApiResponse } from "@/types/category"

export type Product = {
  id: number
  vendor_id: number
  name: string
  slug: string
  sku?: string | null
  status: "draft" | "active" | "disabled" | "banned" | "archived"
  template_id: number
  description?: string | null
  stock_quantity?: number
  category?: { id: number; name: string }
  variation_attributes?: {
    id: number
    name: string
    code: string
    value_type: string
    options: { id: number; value: string }[]
  }[]
  variants?: {
    id: number
    sku?: string | null
    combination_key: string
    price: string
    compare_at_price?: string | null
    stock_quantity: number
    is_active?: boolean
    option_values?: {
      attribute_id: number
      attribute_code?: string | null
      attribute_name?: string | null
      option_id: number
      value?: string | null
    }[]
  }[]
  images?: {
    id: number
    url: string
    alt_text?: string | null
    is_primary: boolean
  }[]
}

export type ProductUpdateInput = {
  name: string
  description?: string
  status: "draft" | "active"
  variants: {
    sku?: string
    price: number
    stock_quantity: number
    is_active: boolean
  }[]
}

export const productService = {
  async list(): Promise<Product[]> {
    const response = await api.get<CategoryApiResponse<Product[]>>("/products")
    return response.data.data
  },

  async show(id: number): Promise<Product> {
    const response = await api.get<CategoryApiResponse<Product>>(
      `/products/${id}`
    )
    return response.data.data
  },

  async update(id: number, input: ProductUpdateInput): Promise<Product> {
    const response = await api.put<CategoryApiResponse<Product>>(
      `/products/${id}`,
      input
    )
    return response.data.data
  },

  async create(formData: FormData): Promise<Product> {
    const response = await api.post<CategoryApiResponse<Product>>(
      "/products",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    )
    return response.data.data
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/products/${id}`)
  },

  async disable(id: number): Promise<Product> {
    const response = await api.post<CategoryApiResponse<Product>>(
      `/products/${id}/disable`
    )
    return response.data.data
  },

  async ban(id: number): Promise<Product> {
    const response = await api.post<CategoryApiResponse<Product>>(
      `/products/${id}/ban`
    )
    return response.data.data
  },

  async enable(id: number): Promise<Product> {
    const response = await api.post<CategoryApiResponse<Product>>(
      `/products/${id}/enable`
    )
    return response.data.data
  },
}
