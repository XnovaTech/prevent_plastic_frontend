"use client"

import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAdminBlogDetail } from "@/hooks/useBlogs"

export function EditAdminBlogForm({ id }: { id: number }) {
  const router = useRouter()
  const { post, isLoading, error, update } = useAdminBlogDetail(id)
  const [isSaving, setIsSaving] = useState(false)
  const [image, setImage] = useState<File | null>(null)

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!post) return
    const form = new FormData(event.currentTarget)
    setIsSaving(true)
    try {
      await update({ title: String(form.get("title") ?? ""), excerpt: String(form.get("excerpt") ?? ""), body: String(form.get("body") ?? ""), images: image ? [image] : [] })
      router.push(`/admin/blog/${id}`)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <p className="text-sm text-brand-light">Loading blog…</p>
  if (!post) return <p className="text-sm text-red-700">{error}</p>

  return <form className="mx-auto max-w-3xl space-y-5 rounded-[26px] border border-[#e3e9df] bg-white p-6" onSubmit={save}><div><p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">Journal control</p><h2 className="mt-2 font-serif text-3xl text-brand">Edit blog</h2></div><label className="block"><Label>Title *</Label><Input defaultValue={post.title} name="title" required /></label><label className="block"><Label>Short summary</Label><p className="mb-1 text-xs text-brand-gray-3">A brief preview readers see before opening the article.</p><Textarea defaultValue={post.excerpt ?? ""} name="excerpt" rows={2} /></label><label className="block"><Label>Full article *</Label><Textarea defaultValue={post.body} name="body" required rows={12} /></label><label className="block"><Label>Add another image</Label><Input accept="image/png,image/jpeg,image/webp" onChange={(event) => setImage(event.target.files?.[0] ?? null)} type="file" /></label><Button className="bg-brand-2 text-white" isDisabled={isSaving} type="submit">{isSaving ? "Saving…" : "Save changes"}</Button>{error && <p className="text-sm text-red-700">{error}</p>}</form>
}
