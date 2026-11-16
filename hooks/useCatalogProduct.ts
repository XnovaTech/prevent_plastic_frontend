"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import { productService, type Product } from "@/services/productService"

export function useCatalogProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsLoading(true)
      setError("")
      void productService
        .catalogShow(id)
        .then(setProduct)
        .catch((requestError: unknown) => {
          setProduct(null)
          setError(
            axios.isAxiosError(requestError)
              ? (requestError.response?.data?.message ??
                  "Unable to load this product.")
              : "Unable to load this product."
          )
        })
        .finally(() => setIsLoading(false))
    })

    return () => window.cancelAnimationFrame(frame)
  }, [id])

  return { error, isLoading, product }
}
