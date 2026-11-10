"use client"

import { useState } from "react"
import axios from "axios"

import { authService } from "@/services/authService"
import type { AuthResult, LoginInput, RegisterInput } from "@/types/auth"
import { useAuthStore } from "@/stores/authStore"

function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const errors = error.response?.data?.errors as
      Record<string, string[]> | undefined
    const firstValidationError = errors
      ? Object.values(errors).flat()[0]
      : undefined

    return firstValidationError ?? error.response?.data?.message ?? fallback
  }

  return fallback
}

export function useAuth() {
  const setAuth = useAuthStore((state) => state.setAuth)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const run = async (
    request: () => Promise<AuthResult>,
    fallback: string
  ): Promise<AuthResult | null> => {
    setIsLoading(true)
    setError("")

    try {
      const result = await request()
      setAuth(result.user, result.token)

      return result
    } catch (requestError: unknown) {
      setError(getErrorMessage(requestError, fallback))

      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    error,
    isLoading,
    login: (input: LoginInput) =>
      run(() => authService.login(input), "Login failed. Please try again."),
    register: (input: RegisterInput) =>
      run(
        () => authService.register(input),
        "Registration failed. Please try again."
      ),
  }
}
