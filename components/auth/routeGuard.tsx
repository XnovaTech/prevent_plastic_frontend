"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { getAppRole, getDashboardPath, type AppRole } from "@/lib/auth"
import { useAuthStore } from "@/stores/authStore"

type RouteGuardProps = {
  children: React.ReactNode
  role: AppRole
}

export function RouteGuard({ children, role: requiredRole }: RouteGuardProps) {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const isReady = useAuthStore((state) => state.isReady)

  const actualRole = getAppRole(user)

  useEffect(() => {
    if (!isReady) {
      return
    }

    if (!user) {
      router.replace("/login")
      return
    }

    if (actualRole !== requiredRole && actualRole) {
      router.replace(getDashboardPath(actualRole))
    }
  }, [actualRole, isReady, requiredRole, router, user])

  if (!isReady || !user || actualRole !== requiredRole) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f9f4]">
        <p className="text-sm font-medium text-brand-gray-3">Checking access…</p>
      </div>
    )
  }

  return children
}
