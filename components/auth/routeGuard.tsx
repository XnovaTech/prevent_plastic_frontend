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

  if (requiredRole === "vendor" && user.vendor?.status !== "active") {
    const status = user.vendor?.status
    const isRejected = status === "rejected"
    const isSuspended = status === "suspended"
    const title = isRejected ? "Your vendor application was not approved" : isSuspended ? "Your vendor account is suspended" : "Your account is under review"
    const message = isRejected ? (user.vendor?.rejection_reason || "Please contact support before submitting a new application.") : isSuspended ? "Vendor tools are unavailable while your account is suspended. Please contact support for help." : "An administrator must approve your vendor account before you can manage products, orders, or payments."
    return <div className="flex min-h-screen items-center justify-center bg-[#f7f9f4] px-4"><div className="max-w-md rounded-[28px] border border-[#d8e5d3] bg-white p-7 text-center shadow-sm"><p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">Vendor application</p><h1 className="mt-3 font-serif text-3xl text-brand">{title}</h1><p className="mt-3 text-sm leading-6 text-brand-light">{message}</p></div></div>
  }

  return children
}
