"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import { productService, type Product } from "@/services/productService"

export function useCatalogProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      void productService
        .catalogList()
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
  }, [])

  return { error, isLoading, products }
}
