"use client"

import { useCallback, useEffect, useState } from "react"
import axios from "axios"

import { vendorService, type Vendor } from "@/services/vendorService"

export function useVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const refresh = useCallback(async () => {
    setIsLoading(true)
    try {
      setVendors(await vendorService.list())
    } catch (requestError) {
      setError(
        axios.isAxiosError(requestError)
          ? (requestError.response?.data?.message ?? "Unable to load vendors.")
          : "Unable to load vendors."
      )
    } finally {
      setIsLoading(false)
    }
  }, [])
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => void refresh())
    return () => window.cancelAnimationFrame(frame)
  }, [refresh])
  return { error, isLoading, refresh, vendors }
}
