"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import { createStarterTemplate } from "@/mock/productFormTemplates"
import { productFormTemplateService } from "@/services/productFormTemplateService"
import type { ProductFormTemplate } from "@/types/productFormTemplate"

export function useProductFormTemplate(categoryId: number) {
  const [template, setTemplate] = useState<ProductFormTemplate | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setError("")
      void productFormTemplateService
        .active(categoryId)
        .then((activeTemplate) => setTemplate(activeTemplate))
        .catch((requestError: unknown) => {
          if (axios.isAxiosError(requestError) && requestError.response?.status === 404) {
            setTemplate(createStarterTemplate(categoryId))
            return
          }

          setTemplate(null)
          setError("Unable to load the active template. Please try again.")
        })
        .finally(() => setIsReady(true))
    })
    return () => window.cancelAnimationFrame(frame)
  }, [categoryId])

  const save = async (
    nextTemplate: ProductFormTemplate,
    status: ProductFormTemplate["status"]
  ) => {
    const next = {
      ...nextTemplate,
      status,
      updated_at: new Date().toISOString(),
    }
    const saved =
      typeof next.id !== "number"
        ? await productFormTemplateService.create(categoryId, next)
        : template?.status === "active"
          ? await productFormTemplateService.createVersion(next.id, next)
          : await productFormTemplateService.update(next.id, next)
    setTemplate(saved)
    return saved
  }

  return { error, isReady, save, template }
}
