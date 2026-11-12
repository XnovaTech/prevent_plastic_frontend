import { create } from "zustand"
import type { AuthUser } from "@/types/auth"

export type { AuthUser } from "@/types/auth"

type AuthState = {
  user: AuthUser | null
  isReady: boolean
  setUser: (user: AuthUser) => void
  clearUser: () => void
  setReady: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isReady: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setReady: () => set({ isReady: true }),
}))
