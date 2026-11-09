import { create } from "zustand"
import { persist } from "zustand/middleware"

export type AuthUser = {
  id: number
  name: string
  email: string
  phone?: string | null
  avatar?: string | null
  status?: string
  roles?: string[]
  permissions?: string[]
}

type AuthState = {
  user: AuthUser | null
  token: string | null
  setAuth: (user: AuthUser, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: "prevent-plastic-auth" }
  )
)
