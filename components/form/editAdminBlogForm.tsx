"use client"

import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { ImageUploader } from "@/components/shared/imageUploader"
import { RichTextEditor } from "@/components/shared/richTextEditor"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

  return (
    <form className="mx-auto max-w-3xl space-y-5 rounded-[26px] border border-[#e3e9df] bg-white p-6" onSubmit={save}>
      <div><p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">Journal control</p><h2 className="mt-2 font-serif text-3xl text-brand">Edit blog</h2></div>
      <label className="block"><Label>Title *</Label><Input defaultValue={post.title} name="title" required /></label>
      <label className="block"><Label>Short summary</Label><p className="mb-1 text-xs text-brand-gray-3">A brief preview readers see before opening the article.</p><textarea className="min-h-20 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" defaultValue={post.excerpt ?? ""} name="excerpt" rows={2} /></label>
      <div><Label htmlFor="blog-body">Full article *</Label><p className="mb-2 text-xs text-brand-gray-3">Use the editor to format headings, links, lists, and paragraphs.</p><RichTextEditor defaultValue={post.body} height={480} id="blog-body" minHeight={360} name="body" /></div>
      <div><Label>Cover image</Label><p className="mb-2 text-xs text-brand-gray-3">Select a replacement image to update the cover preview.</p><ImageUploader existingImage={post.images[0]?.url} label="Replace cover image" onChange={setImage} previewAlt="Blog cover preview" value={image} /></div>
      <Button className="bg-brand-2 text-white" isDisabled={isSaving} type="submit">{isSaving ? "Saving…" : "Save changes"}</Button>
      {error && <p className="text-sm text-red-700">{error}</p>}
    </form>
  )
}
