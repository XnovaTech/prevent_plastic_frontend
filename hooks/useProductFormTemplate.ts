"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import { createStarterTemplate } from "@/mock/productFormTemplates"
import { productFormTemplateService } from "@/services/productFormTemplateService"
import type { ProductFormTemplate } from "@/types/productFormTemplate"

export function useProductFormTemplate(
  categoryId: number,
  options: { fallbackToStarter?: boolean } = {}
) {
  const fallbackToStarter = options.fallbackToStarter ?? true
  const [template, setTemplate] = useState<ProductFormTemplate | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setTemplate(null)
      setIsReady(false)
      setError("")
      if (!categoryId) {
        setIsReady(true)
        return
      }

      void productFormTemplateService
        .active(categoryId)
        .then((activeTemplate) => setTemplate(activeTemplate))
        .catch((requestError: unknown) => {
          if (
            fallbackToStarter &&
            axios.isAxiosError(requestError) &&
            requestError.response?.status === 404
          ) {
            setTemplate(createStarterTemplate(categoryId))
            return
          }

          setTemplate(null)
          setError(
            axios.isAxiosError(requestError) && requestError.response?.status === 404
              ? "This category does not have an active product template yet."
              : "Unable to load the active template. Please try again."
          )
        })
        .finally(() => setIsReady(true))
    })
    return () => window.cancelAnimationFrame(frame)
  }, [categoryId, fallbackToStarter])

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
