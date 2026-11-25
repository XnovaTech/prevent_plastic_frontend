import type {
  ApiResponse,
  AuthResult,
  AuthUser,
  LoginInput,
  RegisterInput,
} from "@/types/auth"
import { api } from "@/lib/api"

export const authService = {
  async login(input: LoginInput): Promise<AuthResult> {
    const response = await api.post<ApiResponse<AuthResult>>(
      "/auth/login",
      input
    )

    return response.data.data
  },

  async register(input: RegisterInput): Promise<AuthResult> {
    const hasFiles = Object.values(input).some((value) => value instanceof File)
    if (hasFiles) {
      const formData = new FormData()
      Object.entries(input).forEach(([key, value]) => {
        if (value instanceof File) formData.append(key, value)
        else if (value !== undefined && value !== null) formData.append(key, String(value))
      })
      const response = await api.post<ApiResponse<AuthResult>>("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return response.data.data
    }
    const response = await api.post<ApiResponse<AuthResult>>(
      "/auth/register",
      input
    )

    return response.data.data
  },

  async me(): Promise<AuthUser> {
    const response = await api.get<ApiResponse<AuthUser>>("/auth/me")

    return response.data.data
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout")
  },
}
