"use client"

import { useEffect } from "react"
import { CheckCircle, WarningCircle, X } from "@phosphor-icons/react"

type ToastProps = {
  message: string
  onClose: () => void
  duration?: number
  variant?: "success" | "error"
}

export function Toast({ message, onClose, duration = 4000, variant = "success" }: ToastProps) {
  useEffect(() => {
    if (!message) return

    const timeout = window.setTimeout(onClose, duration)
    return () => window.clearTimeout(timeout)
  }, [duration, message, onClose])

  if (!message) return null

  return (
    <div
      aria-live={variant === "error" ? "assertive" : "polite"}
      data-notification-toast
      className={`fixed top-5 left-1/2 z-[100] flex w-[min(92vw,520px)] -translate-x-1/2 items-center gap-3 rounded-2xl border px-4 py-3 text-sm shadow-[0_18px_45px_-20px_rgba(23,62,54,0.45)] ${variant === "error" ? "border-brand-orange/35 bg-brand-peach-bg text-brand-orange-3" : "border-[#cfe2cf] bg-white text-brand"}`}
      role={variant === "error" ? "alert" : "status"}
    >
      {variant === "error" ? <WarningCircle className="shrink-0 text-brand-orange" size={21} weight="fill" /> : <CheckCircle className="shrink-0 text-brand-2" size={21} weight="fill" />}
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
