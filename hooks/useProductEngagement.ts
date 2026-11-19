"use client"

import { useCallback, useEffect, useState } from "react"
import axios from "axios"

import {
  productEngagementService,
  type ProductEngagement,
} from "@/services/productEngagementService"

export function useProductEngagement(
  productId: number,
  scope: "public" | "vendor" | "admin"
) {
  const [engagement, setEngagement] = useState<ProductEngagement | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError("")
    try {
      setEngagement(
        scope === "vendor"
          ? await productEngagementService.vendorIndex(productId)
          : scope === "admin"
            ? await productEngagementService.adminIndex(productId)
            : await productEngagementService.publicIndex(productId)
      )
    } catch (requestError) {
      setError(
        axios.isAxiosError(requestError)
          ? (requestError.response?.data?.message ??
              "Unable to load reviews and comments.")
          : "Unable to load reviews and comments."
      )
    } finally {
      setIsLoading(false)
    }
  }, [productId, scope])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => void refresh())

    return () => window.cancelAnimationFrame(frame)
  }, [refresh])

  return { engagement, error, isLoading, refresh, setEngagement }
}
