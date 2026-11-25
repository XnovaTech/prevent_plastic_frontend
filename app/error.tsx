"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import { notifyError } from "@/lib/notifications"

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    notifyError(error, "Something unexpected went wrong. Please try again.")
  }, [error])

  return <main className="mx-auto flex min-h-[45vh] max-w-2xl items-center justify-center px-4 py-16 text-center"><div><p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">Something went wrong</p><h1 className="mt-3 font-serif text-4xl text-brand">Please try again</h1><p className="mt-3 text-sm leading-6 text-brand-light">We couldn’t load this part of the page. Your work has not been changed.</p><Button className="mt-6" onPress={reset}>Try again</Button></div></main>
}
