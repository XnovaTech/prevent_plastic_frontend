export type AuthUser = {
  id: number
  name: string
  email: string
  phone?: string | null
  avatar?: string | null
  status?: string
  roles?: string[]
  permissions?: string[]
}

export type AuthResult = {
  token: string
  token_type: string
  user: AuthUser
}

export type LoginInput = {
  email: string
  password: string
  device_name?: string
}

export type RegisterInput = {
  name: string
  email: string
  phone?: string
  password: string
  password_confirmation: string
  device_name?: string
}

export type ApiResponse<T> = {
  status: string
  statusCode: number
  message: string
  data: T
}
