import { api } from "@/lib/api"
import type { CategoryApiResponse } from "@/types/category"
import type { Cart } from "@/types/order"

export const cartService = {
  async get(): Promise<Cart> {
    const response = await api.get<CategoryApiResponse<Cart>>("/cart")
    return response.data.data
  },
  async setItem(input: {
    product_id: number
    variant_id?: number | null
    quantity: number
  }): Promise<Cart> {
    const response = await api.post<CategoryApiResponse<Cart>>(
      "/cart/items",
      input
    )
    return response.data.data
  },
  async removeItem(id: number): Promise<Cart> {
    const response = await api.delete<CategoryApiResponse<Cart>>(
      `/cart/items/${id}`
    )
    return response.data.data
  },
}
