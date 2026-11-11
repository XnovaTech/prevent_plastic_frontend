export type CategoryStatus = "active" | "inactive"

export type Category = {
  id: number
  name: string
  slug: string
  description: string | null
  image: string | null
  status: CategoryStatus
  created_at: string | null
  updated_at: string | null
}

export type CategoryInput = {
  name: string
  slug?: string
  description?: string
  status: CategoryStatus
  image?: File | null
}

export type CategoryApiResponse<T> = {
  status: string
  statusCode: number
  message: string
  data: T
}
