"use client"

import { useEffect } from "react"

export function useAos() {
  useEffect(() => {
    let isActive = true
    let destroyAos = () => {}

    void import("@reimujs/aos")
      .then(({ default: AOS }) => {
        if (!isActive) return

        AOS.init({
          disable: () =>
            window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          duration: 650,
          easing: "ease-out-cubic",
          offset: 72,
          once: true,
        })
        destroyAos = () => AOS.destroy()
      })
      .catch((error: unknown) => {
        console.error("Unable to initialize scroll animations.", error)
      })

    return () => {
      isActive = false
      destroyAos()
    }
  }, [])
}
