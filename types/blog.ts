export type BlogStatus =
  | "draft"
  | "pending_review"
  | "approved"
  | "rejected"
  | "published"
  | "archived"

export type BlogCategory = { id: number; name: string; slug: string }

export type BlogComment = {
  id: number
  body: string
  is_approved: boolean
  commenter: { id: number | null; name: string | null }
  created_at: string
}

export type BlogPost = {
  id: number
  title: string
  slug: string
  excerpt: string | null
  body: string
  status: BlogStatus
  author: { id: number | null; name: string | null }
  category: BlogCategory | null
  images: { id: number; url: string; type: "gallery" | "inline"; sort_order: number }[]
  comments_count: number
  likes_count: number
  likes?: { id: number; user: { id: number | null; name: string | null }; created_at: string }[]
  submitted_at: string | null
  reviewed_at: string | null
  rejection_reason: string | null
  published_at: string | null
  created_at: string
  approval_history?: BlogApprovalHistory[]
}

export type BlogApprovalHistory = {
  id: number
  old_status: BlogStatus | null
  new_status: BlogStatus
  reason: string | null
  action_by: { id: number | null; name: string | null }
  created_at: string
}

export type Paginated<T> = {
  items: T[]
  meta: { current_page: number; per_page: number; last_page: number; total: number }
}

export type BlogInput = {
  title: string
  excerpt?: string
  body: string
  content_category_id?: number
  images?: File[]
  status?: "draft" | "published"
}
