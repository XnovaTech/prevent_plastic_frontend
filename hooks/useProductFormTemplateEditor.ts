"use client"

import { useCallback, useEffect, useState } from "react"
import axios from "axios"

import { productFormTemplateService } from "@/services/productFormTemplateService"
import type { ProductFormTemplate } from "@/types/productFormTemplate"

export function useProductFormTemplateEditor(templateId: number) {
  const [template, setTemplate] = useState<ProductFormTemplate | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState("")

  const load = useCallback(async () => {
    setIsReady(false)
    setError("")
    try {
      setTemplate(await productFormTemplateService.show(templateId))
    } catch (requestError) {
      setTemplate(null)
      setError(
        axios.isAxiosError(requestError)
          ? (requestError.response?.data?.message ??
              "Unable to load this template.")
          : "Unable to load this template."
      )
    } finally {
      setIsReady(true)
    }
  }, [templateId])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => void load())
    return () => window.cancelAnimationFrame(frame)
  }, [load])

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
      template?.status === "active"
        ? await productFormTemplateService.createVersion(templateId, next)
        : await productFormTemplateService.update(templateId, next)
    setTemplate(saved)
    return saved
  }

  return { error, isReady, save, template }
}
