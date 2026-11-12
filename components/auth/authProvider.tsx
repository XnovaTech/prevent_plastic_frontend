"use client"

import { useEffect } from "react"

import { authService } from "@/services/authService"
import { useAuthStore } from "@/stores/authStore"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser)
  const clearUser = useAuthStore((state) => state.clearUser)
  const setReady = useAuthStore((state) => state.setReady)

  useEffect(() => {
    // Remove the old bearer-token storage once after migrating to cookie auth.
    window.localStorage.removeItem("prevent-plastic-auth")

    let cancelled = false

    void authService
      .me()
      .then((user) => {
        if (!cancelled) {
          setUser(user)
        }
      })
      .catch(() => {
        if (!cancelled) {
          clearUser()
        }
      })
      .finally(() => {
        if (!cancelled) {
          setReady()
        }
      })

    return () => {
      cancelled = true
    }
  }, [clearUser, setReady, setUser])

  return children
}
