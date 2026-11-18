"use client"

import Link from "next/link"
import { useState, type FormEvent } from "react"

import { ArrowRight } from "@phosphor-icons/react"

import { ImageUploader } from "@/components/shared/imageUploader"
import { RichTextEditor } from "@/components/shared/richTextEditor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useBlogCategories, useBlogSubmission } from "@/hooks/useBlogs"
import { useAuthStore } from "@/stores/authStore"

const fieldClassName =
  "h-12 rounded-[14px] border-[#dfe6dc] bg-white px-3.5 text-[13px] text-brand-6 shadow-sm shadow-[#274b3e]/[0.02] placeholder:text-[#98a49a]"
const labelClassName = "text-[12px] font-semibold tracking-[0.01em] text-[#344d42]"

export function BlogStorySubmitForm() {
  const user = useAuthStore((state) => state.user)
  const categories = useBlogCategories()
  const { submit, isSubmitting, error } = useBlogSubmission()
  const [image, setImage] = useState<File | null>(null)
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [success, setSuccess] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!user) return

    const form = new FormData(event.currentTarget)
    try {
      await submit({
        title: String(form.get("title") ?? ""),
        excerpt: String(form.get("excerpt") ?? ""),
        body: String(form.get("body") ?? ""),
        content_category_id: categoryId ? Number(categoryId) : undefined,
        images: image ? [image] : [],
      })
      event.currentTarget.reset()
      setImage(null)
      setSuccess("Thank you — your story was submitted for review.")
    } catch {
      // The feature hook exposes a user-safe error message.
    }
  }

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-[960px] px-4 sm:px-8 lg:px-12">
        <div className="mb-6">
          <p className="text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">Submit a story</p>
          <h1 className="mt-1.5 font-serif text-[27px] leading-tight tracking-[-0.04em] text-brand sm:text-[32px]">Share your story with the Journal</h1>
          <p className="mt-2 max-w-md text-[12px] leading-6 text-brand-light">Tell us about a secondhand find, a repair win, or a maker you love. We review every submission before publishing.</p>
        </div>

        <form className="scroll-mt-28 rounded-[24px] border border-[#e6eae2] bg-white/85 p-5 shadow-[0_16px_50px_-40px_rgba(27,65,56,0.5)] sm:rounded-[28px] sm:p-7 lg:p-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5 sm:gap-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <div className="flex flex-col gap-2"><Label className={labelClassName} htmlFor="blog-title">Story title <span aria-hidden="true">*</span></Label><Input className={fieldClassName} id="blog-title" name="title" placeholder="A short, catchy title" required /></div>
              <div className="flex flex-col gap-2"><Label className={labelClassName}>Category</Label><Select aria-label="Story category" onSelectionChange={(key) => setCategoryId(key === "none" ? null : String(key))} selectedKey={categoryId}><SelectTrigger className="h-12 rounded-[14px] border-[#dfe6dc] bg-white px-3.5 text-[13px] text-brand-6 shadow-sm shadow-[#274b3e]/[0.02] hover:bg-[#fbfcf8] focus-visible:border-[#7fa88c] focus-visible:ring-[#7fa88c]/20"><SelectValue>Choose a category</SelectValue></SelectTrigger><SelectContent className="rounded-[18px] border border-[#dfe6dc] bg-white text-brand shadow-[0_18px_45px_-28px_rgba(27,65,56,0.45)]"><SelectItem id="none">Choose a category</SelectItem>{categories.map((category) => <SelectItem id={String(category.id)} key={category.id}>{category.name}</SelectItem>)}</SelectContent></Select></div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <div className="flex flex-col gap-2"><Label className={labelClassName} htmlFor="blog-author">Your name</Label><Input autoComplete="name" className={fieldClassName} defaultValue={user?.name ?? ""} id="blog-author" readOnly /></div>
              <div className="flex flex-col gap-2"><Label className={labelClassName} htmlFor="blog-email">Email address</Label><Input autoComplete="email" className={fieldClassName} defaultValue={user?.email ?? ""} id="blog-email" readOnly type="email" /></div>
            </div>
            <div className="flex flex-col gap-2"><Label className={labelClassName} htmlFor="blog-excerpt">Short excerpt</Label><Textarea className="min-h-[80px] rounded-[16px] border-[#dfe6dc] bg-white px-3.5 py-3 text-[13px] leading-6 text-brand-6" id="blog-excerpt" name="excerpt" placeholder="A one or two sentence summary of your story…" rows={2} /></div>
            <div className="flex flex-col gap-2"><Label className={labelClassName} htmlFor="blog-content">Your story <span aria-hidden="true">*</span></Label><p className="text-[11px] leading-5 text-brand-gray-3">Use headings, lists, links, and paragraphs to make your story easy to read.</p><RichTextEditor height={440} id="blog-content" minHeight={320} name="body" placeholder="Tell your story here…" /></div>
            <div className="flex flex-col gap-2"><Label className={labelClassName}>Cover image (optional)</Label><ImageUploader label="Add a cover image" onChange={setImage} previewAlt="Story cover preview" value={image} /></div>
          </div>
          <div className="mt-6 flex flex-col gap-4 border-t border-[#e9ece4] pt-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
            <Button className="h-11 w-full rounded-full bg-brand-2 px-5 text-xs font-bold text-white hover:bg-[#1f6157] sm:w-auto" isDisabled={isSubmitting} type="submit">{isSubmitting ? "Submitting…" : "Submit for review"}</Button>
            <Link className="inline-flex min-h-10 items-center justify-center gap-2 text-xs font-semibold text-brand-3 transition-colors hover:text-brand-orange sm:justify-end" href="/blog">Back to journal <ArrowRight aria-hidden="true" size={15} /></Link>
          </div>
          <p className="mt-4 flex items-center gap-2 text-[10px] leading-5 text-brand-gray-3"><span aria-hidden="true" className="size-1.5 rounded-full bg-[#c7d89c]" />Submissions are reviewed before publishing. We&apos;ll email you once your story is live.</p>
          {(error || success) && <p className="mt-3 text-xs text-brand-3" role="status">{error || success}</p>}
        </form>
      </div>
    </section>
  )
}
