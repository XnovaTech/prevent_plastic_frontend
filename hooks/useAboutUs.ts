"use client"

import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import { aboutUsService } from "@/services/aboutUsService"
import type { AboutUs } from "@/types/aboutUs"

export function useAboutUs(scope: "public" | "admin") {
  const [about, setAbout] = useState<AboutUs | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const refresh = useCallback(async () => { setIsLoading(true); setError(""); try { setAbout(scope === "admin" ? await aboutUsService.adminShow() : await aboutUsService.publicShow()) } catch (requestError) { setError(axios.isAxiosError(requestError) ? (requestError.response?.data?.message ?? "Unable to load About Us.") : "Unable to load About Us.") } finally { setIsLoading(false) } }, [scope])
  useEffect(() => { const frame = window.requestAnimationFrame(() => void refresh()); return () => window.cancelAnimationFrame(frame) }, [refresh])
  return { about, error, isLoading, refresh }
}
