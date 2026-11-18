"use client"

import axios from "axios"
import { useCallback, useEffect, useState } from "react"

import { contentCategoryService } from "@/services/contentCategoryService"
import type {
  ContentCategory,
  ContentCategoryInput,
} from "@/types/contentCategory"

function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const errors = error.response?.data?.errors as
      | Record<string, string[]>
      | undefined
    const validationError = errors ? Object.values(errors).flat()[0] : undefined

    return validationError ?? error.response?.data?.message ?? fallback
  }

  return fallback
}

export function useContentCategories() {
  const [categories, setCategories] = useState<ContentCategory[]>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError("")

    try {
      setCategories(await contentCategoryService.list())
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to load blog categories."))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const create = async (input: ContentCategoryInput) => {
    setIsSaving(true)
    setError("")

    try {
      const category = await contentCategoryService.create(input)
      setCategories((current) =>
        [...current, category].sort((first, second) =>
          first.name.localeCompare(second.name)
        )
      )

      return category
    } catch (requestError) {
      const message = getErrorMessage(
        requestError,
        "Unable to create the blog category."
      )
      setError(message)
      throw new Error(message)
    } finally {
      setIsSaving(false)
    }
  }

  const update = async (id: number, input: ContentCategoryInput) => {
    setIsSaving(true)
    setError("")

    try {
      const category = await contentCategoryService.update(id, input)
      setCategories((current) =>
        current
          .map((item) => (item.id === id ? category : item))
          .sort((first, second) => first.name.localeCompare(second.name))
      )

      return category
    } catch (requestError) {
      const message = getErrorMessage(
        requestError,
        "Unable to update the blog category."
      )
      setError(message)
      throw new Error(message)
    } finally {
      setIsSaving(false)
    }
  }

  const remove = async (id: number) => {
    setError("")

    try {
      await contentCategoryService.remove(id)
      setCategories((current) => current.filter((item) => item.id !== id))
    } catch (requestError) {
      const message = getErrorMessage(
        requestError,
        "Unable to delete the blog category."
      )
      setError(message)
      throw new Error(message)
    }
  }

  return { categories, create, error, isLoading, isSaving, remove, update }
}
