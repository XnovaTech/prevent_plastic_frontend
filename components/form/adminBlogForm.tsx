"use client"

import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect } from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"
import { useAdminBlogForm, useBlogCategories } from "@/hooks/useBlogs"

export function AdminBlogForm() {
  const router = useRouter()
  const categories = useBlogCategories()
  const { create, isSaving, error } = useAdminBlogForm()
  const [image, setImage] = useState<File | null>(null)

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null
    const status = submitter?.value === "published" ? "published" : "draft"
    try {
      const post = await create({
        title: String(form.get("title") ?? ""),
        excerpt: String(form.get("excerpt") ?? ""),
        body: String(form.get("body") ?? ""),
        content_category_id: form.get("category") ? Number(form.get("category")) : undefined,
        images: image ? [image] : [],
        status,
      })
      router.push(`/admin/blog/${post.id}`)
    } catch {
      // The hook exposes a user-safe API error message.
    }
  }

  return <form className="mx-auto max-w-3xl space-y-5 rounded-[26px] border border-[#e3e9df] bg-white p-6" onSubmit={save}><div><p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">Journal control</p><h2 className="mt-2 font-serif text-3xl text-brand">Create blog</h2></div><label className="block"><Label>Title *</Label><Input name="title" placeholder="For example: Five easy ways to reduce plastic" required /></label><label className="block"><Label>Category</Label><NativeSelect className="w-full" name="category"><option value="">No category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</NativeSelect></label><label className="block"><Label>Short summary</Label><p className="mb-1 text-xs text-brand-gray-3">A brief preview readers see before opening the article.</p><Textarea name="excerpt" placeholder="Summarize your article in one or two sentences." rows={2} /></label><label className="block"><Label>Full article *</Label><p className="mb-1 text-xs text-brand-gray-3">Write the complete story, guide, or announcement here.</p><Textarea name="body" placeholder="Start writing your article…" required rows={12} /></label><label className="block"><Label>Cover image</Label><Input accept="image/png,image/jpeg,image/webp" onChange={(event) => setImage(event.target.files?.[0] ?? null)} type="file" /></label><div className="flex gap-3"><Button isDisabled={isSaving} type="submit" value="draft">Save draft</Button><Button className="bg-brand-2 text-white" isDisabled={isSaving} type="submit" value="published">Publish now</Button></div>{error && <p className="text-sm text-red-700">{error}</p>}</form>
}
