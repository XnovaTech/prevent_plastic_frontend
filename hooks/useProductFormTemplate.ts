"use client"

import { useEffect, useState } from "react"

import { createStarterTemplate } from "@/mock/productFormTemplates"
import { productFormTemplateService } from "@/services/productFormTemplateService"
import type { ProductFormTemplate } from "@/types/productFormTemplate"

const storageKey = (categoryId: number) => `product-form-template:${categoryId}`

export function useProductFormTemplate(categoryId: number) {
  const [template, setTemplate] = useState<ProductFormTemplate | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      void productFormTemplateService
        .active(categoryId)
        .then((activeTemplate) => setTemplate(activeTemplate))
        .catch(() => {
          const saved = window.localStorage.getItem(storageKey(categoryId))
          setTemplate(
            saved ? JSON.parse(saved) : createStarterTemplate(categoryId)
          )
        })
        .finally(() => setIsReady(true))
    })
    return () => window.cancelAnimationFrame(frame)
  }, [categoryId])

  const save = async (nextTemplate: ProductFormTemplate) => {
    const next = { ...nextTemplate, updated_at: new Date().toISOString() }
    const saved =
      typeof next.id === "number"
        ? await productFormTemplateService.createVersion(next.id, next)
        : await productFormTemplateService.create(categoryId, next)
    window.localStorage.setItem(storageKey(categoryId), JSON.stringify(saved))
    setTemplate(saved)
    return saved
  }

  return { isReady, save, template }
}
