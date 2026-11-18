"use client"

import { useAuthStore } from "@/stores/authStore"

export function useBlogSubmissionAccess() {
  const user = useAuthStore((state) => state.user)
  const isReady = useAuthStore((state) => state.isReady)

  return {
    canSubmit: Boolean(user),
    isReady,
  }
}
