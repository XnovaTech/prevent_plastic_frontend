"use client"

import { useCallback, useEffect, useState } from "react"
import axios from "axios"

import { productService, type Product } from "@/services/productService"

export function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError("")
    try {
      setProduct(await productService.show(id))
    } catch (requestError) {
      setError(
        axios.isAxiosError(requestError)
          ? (requestError.response?.data?.message ?? "Unable to load product.")
          : "Unable to load product."
      )
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => void refresh())
    return () => window.cancelAnimationFrame(frame)
  }, [refresh])

  return { error, isLoading, product, refresh }
}
