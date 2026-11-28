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
  distance_km?: number | null
  attributes?: {
    field_id: number
    field_key?: string | null
    field_label?: string | null
    value: unknown
  }[]
  category?: { id: number; name: string }
  vendor?: { id: number; display_name: string; slug?: string | null; logo?: string | null; address?: string | null; latitude?: number | null; longitude?: number | null }
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
  attributes?: { field_id: number; value: unknown }[]
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

  async catalogList(
    location?: { latitude: number; longitude: number },
    vendorSlug?: string
  ): Promise<Product[]> {
    const response = await api.get<CategoryApiResponse<Product[]>>(
      "/catalog/products",
      {
        params: {
          ...(location ? { ...location, sort: "nearby" } : { sort: "latest" }),
          ...(vendorSlug ? { vendor_slug: vendorSlug } : {}),
        },
      }
    )
    return response.data.data
  },

  async catalogShow(slug: string): Promise<Product> {
    const response = await api.get<CategoryApiResponse<Product>>(
      `/catalog/products/${slug}`
    )
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

  async uploadImages(id: number, files: File[]): Promise<Product> {
    const formData = new FormData()
    files.forEach((file) => formData.append("images[]", file))
    const response = await api.post<CategoryApiResponse<Product>>(
      `/products/${id}/images`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    )
    return response.data.data
  },

  async updateImage(
    productId: number,
    imageId: number,
    input: { alt_text?: string | null; sort_order?: number; is_primary?: boolean }
  ): Promise<Product> {
    const response = await api.patch<CategoryApiResponse<Product>>(
      `/products/${productId}/images/${imageId}`,
      input
    )
    return response.data.data
  },

  async removeImage(productId: number, imageId: number): Promise<Product> {
    const response = await api.delete<CategoryApiResponse<Product>>(
      `/products/${productId}/images/${imageId}`
    )
    return response.data.data
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
