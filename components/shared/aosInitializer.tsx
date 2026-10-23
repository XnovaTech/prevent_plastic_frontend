"use client"

import "@reimujs/aos/dist/aos.css"

import { useAos } from "@/hooks/useAos"

export function AosInitializer() {
  useAos()
  return null
}
