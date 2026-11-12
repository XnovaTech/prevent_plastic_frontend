"use client"

import { useCallback, useEffect, useState } from "react"
import axios from "axios"

import { blogService } from "@/services/blogService"
import type { BlogInput, BlogPost, BlogStatus } from "@/types/blog"

function errorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) return error.response?.data?.message ?? fallback
  return fallback
}

export function usePublicBlogs() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const refresh = useCallback(async () => {
    setIsLoading(true); setError("")
    try { setPosts((await blogService.publicList()).items) } catch (requestError) { setError(errorMessage(requestError, "Unable to load journal stories.")) } finally { setIsLoading(false) }
  }, [])
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => void refresh())
    return () => window.cancelAnimationFrame(frame)
  }, [refresh])
  return { posts, isLoading, error, refresh }
}

export function usePublicBlog(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const refresh = useCallback(async () => {
    setIsLoading(true); setError("")
    try { setPost(await blogService.publicPost(slug)) } catch (requestError) { setError(errorMessage(requestError, "This story is unavailable.")) } finally { setIsLoading(false) }
  }, [slug])
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => void refresh())
    return () => window.cancelAnimationFrame(frame)
  }, [refresh])
  return { post, isLoading, error, refresh }
}

export function useAdminBlogs() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const refresh = useCallback(async (status?: BlogStatus) => {
    setIsLoading(true); setError("")
    try { setPosts((await blogService.adminList({ status })).items) } catch (requestError) { setError(errorMessage(requestError, "Unable to load blogs.")) } finally { setIsLoading(false) }
  }, [])
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => void refresh())
    return () => window.cancelAnimationFrame(frame)
  }, [refresh])
  const transition = async (id: number, action: "approve" | "publish" | "reject", reason?: string) => { const updated = await blogService.transition(id, action, reason); setPosts((current) => current.map((post) => post.id === id ? updated : post)); return updated }
  const remove = async (id: number) => { await blogService.removeAdmin(id); setPosts((current) => current.filter((post) => post.id !== id)) }
  return { posts, isLoading, error, refresh, transition, remove }
}

export function useBlogSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const submit = async (input: BlogInput) => { setIsSubmitting(true); setError(""); try { return await blogService.submit(input) } catch (requestError) { const message = errorMessage(requestError, "Unable to submit your story."); setError(message); throw requestError } finally { setIsSubmitting(false) } }
  return { submit, isSubmitting, error }
}

export function useBlogCategories() {
  const [categories, setCategories] = useState<import("@/types/blog").BlogCategory[]>([])
  useEffect(() => { void blogService.categories().then(setCategories).catch(() => setCategories([])) }, [])
  return categories
}

export function useAdminBlogForm() {
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  const create = async (input: BlogInput) => {
    setIsSaving(true)
    setError("")
    try {
      return await blogService.createAdmin(input)
    } catch (requestError) {
      setError(errorMessage(requestError, "Unable to save blog."))
      throw requestError
    } finally {
      setIsSaving(false)
    }
  }

  return { create, isSaving, error }
}

export function useAdminBlogDetail(id: number) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [comments, setComments] = useState<import("@/types/blog").BlogComment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const refresh = useCallback(async () => {
    setIsLoading(true); setError("")
    try {
      const [blog, commentPage] = await Promise.all([blogService.adminPost(id), blogService.adminComments(id)])
      setPost(blog); setComments(commentPage.items)
    } catch (requestError) { setError(errorMessage(requestError, "Unable to load this blog.")) } finally { setIsLoading(false) }
  }, [id])
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => void refresh())
    return () => window.cancelAnimationFrame(frame)
  }, [refresh])
  const transition = async (action: "approve" | "publish" | "reject", reason?: string) => { const updated = await blogService.transition(id, action, reason); setPost(updated) }
  const update = async (input: BlogInput) => {
    const updated = await blogService.updateAdmin(id, input)
    setPost(updated)
    return updated
  }
  const approveComment = async (commentId: number) => { const updated = await blogService.approveComment(id, commentId); setComments((current) => current.map((comment) => comment.id === commentId ? updated : comment)) }
  const removeComment = async (commentId: number) => { await blogService.removeComment(id, commentId); setComments((current) => current.filter((comment) => comment.id !== commentId)) }
  return { post, comments, isLoading, error, transition, update, approveComment, removeComment }
}
