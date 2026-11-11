"use client"

import { useCallback, useEffect, useState } from "react"
import axios from "axios"

import { categoryService } from "@/services/categoryService"
import type { Category, CategoryInput } from "@/types/category"

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    const errors = error.response?.data?.errors as
      Record<string, string[]> | undefined
    return errors
      ? Object.values(errors).flat()[0]
      : (error.response?.data?.message ?? fallback)
  }
  return fallback
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError("")
    try {
      setCategories(await categoryService.list())
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to load categories."))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => void refresh())
    return () => window.cancelAnimationFrame(frame)
  }, [refresh])

  const create = async (input: CategoryInput) => {
    const category = await categoryService.create(input)
    setCategories((current) => [category, ...current])
    return category
  }

  const remove = async (id: number) => {
    await categoryService.remove(id)
    setCategories((current) => current.filter((category) => category.id !== id))
  }

  return { categories, create, error, isLoading, refresh, remove }
}

export function useCategory(id: number) {
  const [category, setCategory] = useState<Category | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError("")
    try {
      setCategory(await categoryService.show(id))
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to load this category."))
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => void refresh())
    return () => window.cancelAnimationFrame(frame)
  }, [refresh])

  const update = async (input: CategoryInput) => {
    const updated = await categoryService.update(id, input)
    setCategory(updated)
    return updated
  }

  const remove = async () => {
    await categoryService.remove(id)
  }

  return { category, error, isLoading, refresh, remove, update }
}
