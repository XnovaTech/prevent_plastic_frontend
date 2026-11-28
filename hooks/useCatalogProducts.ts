"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import type { UserLocation } from "@/hooks/useGeolocation"
import { productService, type Product } from "@/services/productService"

export function useCatalogProducts(
  location: UserLocation | null = null,
  vendorSlug?: string
) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const latitude = location?.latitude
  const longitude = location?.longitude

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsLoading(true)
      setError("")
      void productService
        .catalogList(
          latitude !== undefined && longitude !== undefined
            ? { latitude, longitude }
            : undefined,
          vendorSlug
        )
        .then(setProducts)
        .catch((requestError: unknown) => {
          setError(
            axios.isAxiosError(requestError)
              ? (requestError.response?.data?.message ??
                  "Unable to load products.")
              : "Unable to load products."
          )
        })
        .finally(() => setIsLoading(false))
    })

    return () => window.cancelAnimationFrame(frame)
  }, [latitude, longitude, vendorSlug])

  return { error, isLoading, products }
}
