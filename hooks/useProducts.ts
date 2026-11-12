"use client"

import { useCallback, useEffect, useState } from "react"
import axios from "axios"

import { productService, type Product } from "@/services/productService"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState("")

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError("")
    try {
      setProducts(await productService.list())
    } catch (requestError) {
      setError(
        axios.isAxiosError(requestError)
          ? (requestError.response?.data?.message ?? "Unable to load products.")
          : "Unable to load products."
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => void refresh())
    return () => window.cancelAnimationFrame(frame)
  }, [refresh])

  const create = async (formData: FormData): Promise<Product> => {
    setIsCreating(true)
    setError("")
    try {
      return await productService.create(formData)
    } catch (requestError) {
      setError(
        axios.isAxiosError(requestError)
          ? (requestError.response?.data?.message ?? "Unable to save product.")
          : "Unable to save product."
      )
      throw requestError
    } finally {
      setIsCreating(false)
    }
  }

  const remove = async (id: number) => {
    await productService.remove(id)
    setProducts((current) => current.filter((product) => product.id !== id))
  }

  return { create, error, isCreating, isLoading, products, refresh, remove }
}
