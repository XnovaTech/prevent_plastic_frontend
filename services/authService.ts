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
