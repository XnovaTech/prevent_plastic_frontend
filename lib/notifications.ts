"use client"

import axios from "axios"
import { create } from "zustand"

export type Notification = {
  id: number
  message: string
  variant: "error" | "success"
}

let lastError = ""
let lastErrorAt = 0
let lastSuccess = ""
let lastSuccessAt = 0

type NotificationState = {
  notification: Notification | null
  show: (notification: Notification) => void
  dismiss: () => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notification: null,
  show: (notification) => set({ notification }),
  dismiss: () => set({ notification: null }),
}))

function fallbackMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) return "We couldn’t reach the server. Check your connection and try again."
    const errors = error.response.data?.errors as Record<string, string[]> | undefined
    return Object.values(errors ?? {}).flat()[0] ?? error.response.data?.message ?? "The request could not be completed. Please try again."
  }
  if (error instanceof Error && error.message) return error.message
  if (typeof error === "string" && error) return error
  return "Something unexpected went wrong. Please try again."
}

export function notifyError(error: unknown, fallback?: string) {
  const message = fallback ?? fallbackMessage(error)
  const now = Date.now()
  if (message === lastError && now - lastErrorAt < 1_000) return
  lastError = message
  lastErrorAt = now
  useNotificationStore.getState().show({ id: now, message, variant: "error" })
}

export function notifySuccess(message: string) {
  const now = Date.now()
  if (message === lastSuccess && now - lastSuccessAt < 1_000) return
  lastSuccess = message
  lastSuccessAt = now
  useNotificationStore.getState().show({ id: now, message, variant: "success" })
}
