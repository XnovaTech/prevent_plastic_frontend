import { api } from "@/lib/api"
import type { CategoryApiResponse } from "@/types/category"

export type ManagedComment = {
  id: number
  body: string
  created_at: string
  commenter: { id: number | null; name: string }
  subject: { type: "Product" | "Blog post"; title: string }
  replies: {
    id: number
    body: string
    author: { name: string; role: "Admin" | "Vendor" }
    created_at: string
  }[]
}

export const commentManagementService = {
  async list(scope: "admin" | "vendor"): Promise<ManagedComment[]> {
    const response = await api.get<CategoryApiResponse<ManagedComment[]>>(
      `/${scope}/comments`
    )
    const payload = response.data.data as
      | ManagedComment[]
      | { data?: ManagedComment[] }
    return Array.isArray(payload) ? payload : (payload.data ?? [])
  },
  async reply(scope: "admin" | "vendor", commentId: number, body: string) {
    await api.post(`/${scope}/comments/${commentId}/replies`, { body })
  },
}
