export type AuthUser = {
  id: number
  name: string
  email: string
  phone?: string | null
  avatar?: string | null
  status?: string
  roles?: string[]
  permissions?: string[]
  vendor?: {
    id: number
    status: string
  } | null
}

export type AuthResult = {
  user: AuthUser
}

export type LoginInput = {
  email: string
  password: string
}

export type RegisterInput = {
  name: string
  email: string
  phone?: string
  password: string
  password_confirmation: string
}

export type ApiResponse<T> = {
  status: string
  statusCode: number
  message: string
  data: T
}
