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
    rejection_reason?: string | null
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
  account_type?: "customer" | "vendor"
  vendor_type?: "individual" | "business"
  display_name?: string
  description?: string
  contact_email?: string
  contact_phone?: string
  address?: string
  logo?: File | null
  cover_image?: File | null
  legal_business_name?: string
  registration_number?: string
  tax_number?: string
  contact_person?: string
  business_type?: string
  business_address?: string
  document_type?: string
  supporting_document?: File | null
  certification_name?: string
  certificate_number?: string
  certificate_file?: File | null
}

export type ApiResponse<T> = {
  status: string
  statusCode: number
  message: string
  data: T
}
