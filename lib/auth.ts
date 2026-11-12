import type { AuthUser } from "@/types/auth"

export type AppRole = "admin" | "vendor" | "customer"

export function getAppRole(user: AuthUser | null): AppRole | null {
  if (!user) {
    return null
  }

  if (user.roles?.includes("admin")) {
    return "admin"
  }

  if (
    user.roles?.includes("vendor") ||
    user.vendor?.status === "active"
  ) {
    return "vendor"
  }

  return "customer"
}

export function getDashboardPath(role: AppRole): string {
  return `/${role}`
}
