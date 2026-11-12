import { api } from "@/lib/api"
import type { ApiResponse } from "@/types/auth"
import type {
  BlogCategory,
  BlogComment,
  BlogInput,
  BlogPost,
  Paginated,
} from "@/types/blog"

function toFormData(input: BlogInput) {
  const formData = new FormData()
  formData.append("title", input.title)
  formData.append("body", input.body)
  if (input.excerpt) formData.append("excerpt", input.excerpt)
  if (input.content_category_id) {
    formData.append("content_category_id", String(input.content_category_id))
  }
  if (input.status) formData.append("status", input.status)
  input.images?.forEach((image) => formData.append("images[]", image))
  return formData
}

function guestHeaders() {
  const key = "prevent-plastic-guest-key"
  let guestKey = window.localStorage.getItem(key)
  if (!guestKey) {
    guestKey = crypto.randomUUID()
    window.localStorage.setItem(key, guestKey)
  }
  return { "X-Guest-Key": guestKey }
}

export const blogService = {
  async categories(): Promise<BlogCategory[]> {
    const response = await api.get<ApiResponse<BlogCategory[]>>("/content-categories")
    return response.data.data
  },
  async publicList(params?: Record<string, string | number | undefined>) {
    const response = await api.get<ApiResponse<Paginated<BlogPost>>>("/posts", { params })
    return response.data.data
  },
  async publicPost(slug: string): Promise<BlogPost> {
    const response = await api.get<ApiResponse<BlogPost>>(`/posts/${slug}`)
    return response.data.data
  },
  async publicComments(slug: string): Promise<Paginated<BlogComment>> {
    const response = await api.get<ApiResponse<Paginated<BlogComment>>>(`/posts/${slug}/comments`)
    return response.data.data
  },
  async submit(input: BlogInput): Promise<BlogPost> {
    const response = await api.post<ApiResponse<BlogPost>>("/posts", toFormData(input), { headers: { "Content-Type": "multipart/form-data" } })
    return response.data.data
  },
  async addComment(slug: string, body: string, guestName?: string): Promise<BlogComment> {
    const response = await api.post<ApiResponse<BlogComment>>(`/posts/${slug}/comments`, { body, guest_name: guestName })
    return response.data.data
  },
  async toggleLike(slug: string): Promise<{ liked: boolean; likes_count: number }> {
    const response = await api.post<ApiResponse<{ liked: boolean; likes_count: number }>>(`/posts/${slug}/like`, undefined, { headers: guestHeaders() })
    return response.data.data
  },
  async myPosts(): Promise<Paginated<BlogPost>> {
    const response = await api.get<ApiResponse<Paginated<BlogPost>>>("/my-posts")
    return response.data.data
  },
  async adminList(params?: Record<string, string | number | undefined>) {
    const response = await api.get<ApiResponse<Paginated<BlogPost>>>("/admin/posts", { params })
    return response.data.data
  },
  async adminPost(id: number): Promise<BlogPost> {
    const response = await api.get<ApiResponse<BlogPost>>(`/admin/posts/${id}`)
    return response.data.data
  },
  async createAdmin(input: BlogInput): Promise<BlogPost> {
    const response = await api.post<ApiResponse<BlogPost>>("/admin/posts", toFormData(input), { headers: { "Content-Type": "multipart/form-data" } })
    return response.data.data
  },
  async updateAdmin(id: number, input: BlogInput): Promise<BlogPost> {
    const formData = toFormData(input)
    formData.append("_method", "PATCH")
    const response = await api.post<ApiResponse<BlogPost>>(`/admin/posts/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
    return response.data.data
  },
  async transition(id: number, action: "approve" | "publish" | "reject", reason?: string): Promise<BlogPost> {
    const response = await api.post<ApiResponse<BlogPost>>(`/admin/posts/${id}/${action}`, reason ? { reason } : undefined)
    return response.data.data
  },
  async removeAdmin(id: number): Promise<void> { await api.delete(`/admin/posts/${id}`) },
  async adminComments(id: number): Promise<Paginated<BlogComment>> {
    const response = await api.get<ApiResponse<Paginated<BlogComment>>>(`/admin/posts/${id}/comments`)
    return response.data.data
  },
  async approveComment(postId: number, commentId: number): Promise<BlogComment> {
    const response = await api.post<ApiResponse<BlogComment>>(`/admin/posts/${postId}/comments/${commentId}/approve`)
    return response.data.data
  },
  async removeComment(postId: number, commentId: number): Promise<void> { await api.delete(`/admin/posts/${postId}/comments/${commentId}`) },
}
