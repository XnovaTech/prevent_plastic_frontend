"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { authService } from "@/services/authService"
import { useAuthStore } from "@/stores/authStore"

export function useDashboardLogout() {
  const router = useRouter()
  const clearUser = useAuthStore((state) => state.clearUser)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const logout = async () => {
    setIsLoggingOut(true)

    try {
      await authService.logout()
    } finally {
      clearUser()
      router.replace("/login")
      router.refresh()
      setIsLoggingOut(false)
    }
  }

  return { isLoggingOut, logout }
}
