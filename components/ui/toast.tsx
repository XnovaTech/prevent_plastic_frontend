"use client"

import { useEffect } from "react"
import { CheckCircle, X } from "@phosphor-icons/react"

type ToastProps = {
  message: string
  onClose: () => void
  duration?: number
}

export function Toast({ message, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (!message) return

    const timeout = window.setTimeout(onClose, duration)
    return () => window.clearTimeout(timeout)
  }, [duration, message, onClose])

  if (!message) return null

  return (
    <div
      aria-live="polite"
      className="fixed top-5 right-5 z-50 flex max-w-[min(90vw,380px)] items-center gap-3 rounded-2xl border border-[#cfe2cf] bg-white px-4 py-3 text-sm text-brand shadow-[0_18px_45px_-20px_rgba(23,62,54,0.45)]"
      role="status"
    >
      <CheckCircle className="shrink-0 text-brand-2" size={21} weight="fill" />
      <span className="flex-1">{message}</span>
      <button
        aria-label="Dismiss notification"
        className="rounded-full p-1 text-brand-gray-3 hover:bg-[#f1f5ed] hover:text-brand"
        onClick={onClose}
        type="button"
      >
        <X size={15} />
      </button>
    </div>
  )
}
