"use client"

import { useCallback, useEffect, useState } from "react"
import axios from "axios"

import { productFormTemplateService } from "@/services/productFormTemplateService"
import type { ProductFormTemplate } from "@/types/productFormTemplate"

export function useProductFormTemplates(categoryId: number) {
  const [templates, setTemplates] = useState<ProductFormTemplate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError("")
    try {
      setTemplates(await productFormTemplateService.list(categoryId))
    } catch (requestError) {
      setError(
        axios.isAxiosError(requestError)
          ? (requestError.response?.data?.message ??
              "Unable to load template versions.")
          : "Unable to load template versions."
      )
    } finally {
      setIsLoading(false)
    }
  }, [categoryId])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => void refresh())
    return () => window.cancelAnimationFrame(frame)
  }, [refresh])

  return { error, isLoading, refresh, templates }
}
