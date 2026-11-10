import type {
  ApiResponse,
  AuthResult,
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
}
