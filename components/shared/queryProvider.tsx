"use client"

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useEffect, useState } from "react"

import { Toast } from "@/components/ui/toast"
import { notifyError, useNotificationStore } from "@/lib/notifications"

function GlobalErrorNotifications() {
  const notification = useNotificationStore((state) => state.notification)
  const dismiss = useNotificationStore((state) => state.dismiss)

  useEffect(() => {
    const handled = new WeakSet<HTMLElement>()
    const isInlineError = (element: HTMLElement) => {
      if (element.closest("[data-notification-toast]")) return false
      const classes = typeof element.className === "string" ? element.className : ""
      const text = element.textContent?.trim() ?? ""
      const errorText = /\b(error|failed|unable|required|invalid|missing|unavailable|denied|cannot|could not|please try again)\b/i.test(text)
      return (element.getAttribute("role") === "alert" || classes.includes("text-red") || classes.includes("bg-red")) && errorText
    }
    const reportInlineError = (element: HTMLElement) => {
      const container = element.closest<HTMLElement>('[role="alert"], [data-slot="alert"]') ?? element
      if (handled.has(container) || !isInlineError(container)) return
      handled.add(container)
      const message = container.textContent?.trim()
      if (!message) return
      container.hidden = true
      notifyError(message)
    }
    const scanInlineErrors = (root: ParentNode) => {
      if (root instanceof HTMLElement) reportInlineError(root)
      root.querySelectorAll<HTMLElement>('[role="alert"], [data-slot="alert"], [class*="text-red"], [class*="bg-red"]').forEach(reportInlineError)
    }
    scanInlineErrors(document.body)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) scanInlineErrors(node)
      }))
    })
    observer.observe(document.body, { childList: true, subtree: true })
    const onError = (event: ErrorEvent) => notifyError(event.error ?? event.message)
    const onRejection = (event: PromiseRejectionEvent) => notifyError(event.reason)
    const onInvalid = (event: Event) => {
      const target = event.target as HTMLInputElement | null
      if (target?.validationMessage) {
        event.preventDefault()
        notifyError(target.validationMessage)
      }
    }
    window.addEventListener("error", onError)
    window.addEventListener("unhandledrejection", onRejection)
    window.addEventListener("invalid", onInvalid, true)
    return () => {
      observer.disconnect()
      window.removeEventListener("error", onError)
      window.removeEventListener("unhandledrejection", onRejection)
      window.removeEventListener("invalid", onInvalid, true)
    }
  }, [])

  return notification ? <Toast key={notification.id} message={notification.message} onClose={dismiss} variant={notification.variant} /> : null
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({ onError: (error) => notifyError(error) }),
        mutationCache: new MutationCache({ onError: (error) => notifyError(error) }),
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            gcTime: 5 * 60_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}><GlobalErrorNotifications />{children}</QueryClientProvider>
  )
}
