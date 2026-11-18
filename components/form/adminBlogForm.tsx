"use client"

import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { ImageUploader } from "@/components/shared/imageUploader"
import { RichTextEditor } from "@/components/shared/richTextEditor"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAdminBlogForm, useBlogCategories } from "@/hooks/useBlogs"

export function AdminBlogForm() {
  const router = useRouter()
  const categories = useBlogCategories()
  const { create, isSaving, error } = useAdminBlogForm()
  const [image, setImage] = useState<File | null>(null)
  const [categoryId, setCategoryId] = useState<string | null>(null)

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
        content_category_id: categoryId ? Number(categoryId) : undefined,
        images: image ? [image] : [],
        status,
      })
      router.push(`/admin/blog/${post.id}`)
    } catch {
      // The hook exposes a user-safe API error message.
    }
  }

  return (
    <form
      className="mx-auto max-w-3xl space-y-5 rounded-[26px] border border-[#e3e9df] bg-white p-6"
      onSubmit={save}
    >
      <div>
        <p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">
          Journal control
        </p>
        <h2 className="mt-2 font-serif text-3xl text-brand">Create blog</h2>
      </div>
      <label className="block">
        <Label>Title *</Label>
        <Input name="title" placeholder="For example: Five easy ways to reduce plastic" required />
      </label>
      <div className="block">
        <Label>Category</Label>
        <Select
          aria-label="Blog category"
          onSelectionChange={(key) => setCategoryId(key === "none" ? null : String(key))}
          selectedKey={categoryId}
        >
          <SelectTrigger className="mt-1 h-12 rounded-[14px] border-[#dfe6dc] bg-[#f7f9f7] px-3.5 text-[13px] text-brand-6 shadow-sm shadow-[#274b3e]/[0.02] hover:bg-white focus-visible:border-[#7fa88c] focus-visible:ring-[#7fa88c]/20">
            <SelectValue>No category</SelectValue>
          </SelectTrigger>
          <SelectContent className="rounded-[18px] border border-[#dfe6dc] bg-white text-brand shadow-[0_18px_45px_-28px_rgba(27,65,56,0.45)]">
            <SelectItem id="none">No category</SelectItem>
            {categories.map((category) => (
              <SelectItem id={String(category.id)} key={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <label className="block">
        <Label>Short summary</Label>
        <p className="mb-1 text-xs text-brand-gray-3">A brief preview readers see before opening the article.</p>
        <textarea className="min-h-20 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" name="excerpt" placeholder="Summarize your article in one or two sentences." rows={2} />
      </label>
      <div>
        <Label htmlFor="blog-body">Full article *</Label>
        <p className="mb-2 text-xs text-brand-gray-3">Write the complete story, guide, or announcement here.</p>
        <RichTextEditor height={480} id="blog-body" minHeight={360} name="body" placeholder="Start writing your article…" />
      </div>
      <div>
        <Label>Cover image</Label>
        <p className="mb-2 text-xs text-brand-gray-3">Choose an image to appear at the top of this article.</p>
        <ImageUploader label="Add a cover image" onChange={setImage} previewAlt="Blog cover preview" value={image} />
      </div>
      <div className="flex gap-3">
        <Button isDisabled={isSaving} type="submit" value="draft">Save draft</Button>
        <Button className="bg-brand-2 text-white" isDisabled={isSaving} type="submit" value="published">Publish now</Button>
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
    </form>
  )
}
