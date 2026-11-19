import { api } from "@/lib/api"
import type { CategoryApiResponse } from "@/types/category"

export type ProductReview = {
  id: number
  rating: number
  title: string | null
  review: string | null
  is_verified_purchase: boolean
  is_approved: boolean
  reviewer: { id: number | null; name: string }
  created_at: string
}

export type ProductComment = {
  id: number
  body: string
  parent_id: number | null
  is_approved: boolean
  commenter: { id: number | null; name: string }
  created_at: string
}

export type ProductEngagement = {
  summary: {
    average: number
    count: number
    distribution: Record<number, number>
  }
  reviews: { items: ProductReview[]; meta: { total?: number } | null }
  comments: { items: ProductComment[]; meta: { total?: number } | null }
}

export const productEngagementService = {
  async publicIndex(productId: number): Promise<ProductEngagement> {
    const response = await api.get<CategoryApiResponse<ProductEngagement>>(
      `/catalog/products/${productId}/engagement`
    )
    return response.data.data
  },

  async vendorIndex(productId: number): Promise<ProductEngagement> {
    const response = await api.get<CategoryApiResponse<ProductEngagement>>(
      `/products/${productId}/engagement`
    )
    return response.data.data
  },

  async adminIndex(productId: number): Promise<ProductEngagement> {
    const response = await api.get<CategoryApiResponse<ProductEngagement>>(
      `/admin/products/${productId}/engagement`
    )
    return response.data.data
  },

  async createReview(
    productId: number,
    input: { rating: number; title?: string; review: string }
  ): Promise<ProductReview> {
    const response = await api.post<CategoryApiResponse<ProductReview>>(
      `/catalog/products/${productId}/reviews`,
      input
    )
    return response.data.data
  },

  async updateReview(
    productId: number,
    reviewId: number,
    input: { rating: number; title?: string; review: string }
  ): Promise<ProductReview> {
    const response = await api.patch<CategoryApiResponse<ProductReview>>(
      `/catalog/products/${productId}/reviews/${reviewId}`,
      input
    )
    return response.data.data
  },

  async createComment(
    productId: number,
    body: string
  ): Promise<ProductComment> {
    const response = await api.post<CategoryApiResponse<ProductComment>>(
      `/catalog/products/${productId}/comments`,
      { body }
    )
    return response.data.data
  },

  async updateComment(
    productId: number,
    commentId: number,
    body: string
  ): Promise<ProductComment> {
    const response = await api.patch<CategoryApiResponse<ProductComment>>(
      `/catalog/products/${productId}/comments/${commentId}`,
      { body }
    )
    return response.data.data
  },

  async removeComment(productId: number, commentId: number): Promise<void> {
    await api.delete(`/products/${productId}/comments/${commentId}`)
  },
}
