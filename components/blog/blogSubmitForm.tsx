"use client"

import { ArrowRight, UploadSimple } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect } from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"

const fieldClassName =
  "h-12 rounded-[14px] border-[#dfe6dc] bg-white px-3.5 text-[13px] text-brand-6 shadow-sm shadow-[#274b3e]/[0.02] placeholder:text-[#98a49a] transition-[border-color,box-shadow] focus-visible:border-[#7fa88c] focus-visible:ring-3 focus-visible:ring-[#7fa88c]/20"

const labelClassName =
  "text-[12px] font-semibold tracking-[0.01em] text-[#344d42]"

const categories = [
  "Circular living",
  "Secondhand finds",
  "Local makers",
  "Repair & care",
  "Thoughtful everyday",
]

export function BlogSubmitForm() {
  return (
    <section className="py-8 sm:py-12" data-aos="fade-up" data-aos-delay="100">
      <div className="mx-auto max-w-[960px] px-4 sm:px-8 lg:px-12">
        <div className="mb-6">
          <p className="text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
            SUBMIT A STORY
          </p>
          <h1 className="mt-1.5 font-serif text-[27px] leading-tight tracking-[-0.04em] text-brand sm:text-[32px]">
            Share your story with the Journal
          </h1>
          <p className="mt-2 max-w-md text-[12px] leading-6 text-brand-light">
            Tell us about a secondhand find, a repair win, or a maker you love.
            We review every submission before publishing.
          </p>
        </div>

        <form
          className="scroll-mt-28 rounded-[24px] border border-[#e6eae2] bg-white/85 p-5 shadow-[0_16px_50px_-40px_rgba(27,65,56,0.5)] sm:rounded-[28px] sm:p-7 lg:p-8"
          id="blog-submit-form"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="flex flex-col gap-5 sm:gap-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <div className="flex flex-col gap-2">
                <Label className={labelClassName} htmlFor="blog-title">
                  Story title <span aria-hidden="true">*</span>
                </Label>
                <Input
                  className={fieldClassName}
                  id="blog-title"
                  name="title"
                  placeholder="A short, catchy title"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className={labelClassName} htmlFor="blog-category">
                  Category
                </Label>
                <NativeSelect
                  className="w-full [&_select]:h-12 [&_select]:rounded-[14px] [&_select]:border-[#dfe6dc] [&_select]:bg-white [&_select]:px-3.5 [&_select]:text-[13px] [&_select]:text-brand-6 [&_select]:shadow-sm [&_select]:shadow-[#274b3e]/[0.02] [&_select:focus-visible]:border-[#7fa88c] [&_select:focus-visible]:ring-3 [&_select:focus-visible]:ring-[#7fa88c]/20"
                  defaultValue=""
                  id="blog-category"
                  name="category"
                >
                  <option value="">Choose a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </NativeSelect>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <div className="flex flex-col gap-2">
                <Label className={labelClassName} htmlFor="blog-author">
                  Your name <span aria-hidden="true">*</span>
                </Label>
                <Input
                  autoComplete="name"
                  className={fieldClassName}
                  id="blog-author"
                  name="author"
                  placeholder="What should we call you?"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className={labelClassName} htmlFor="blog-email">
                  Email address <span aria-hidden="true">*</span>
                </Label>
                <Input
                  autoComplete="email"
                  className={fieldClassName}
                  id="blog-email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label className={labelClassName} htmlFor="blog-excerpt">
                Short excerpt
              </Label>
              <Textarea
                className="min-h-[80px] rounded-[16px] border-[#dfe6dc] bg-white px-3.5 py-3 text-[13px] leading-6 text-brand-6 shadow-sm shadow-[#274b3e]/[0.02] transition-[border-color,box-shadow] placeholder:text-[#98a49a] focus-visible:border-[#7fa88c] focus-visible:ring-3 focus-visible:ring-[#7fa88c]/20"
                id="blog-excerpt"
                name="excerpt"
                placeholder="A one or two sentence summary of your story…"
                rows={2}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className={labelClassName} htmlFor="blog-content">
                Your story <span aria-hidden="true">*</span>
              </Label>
              <Textarea
                className="min-h-[200px] rounded-[16px] border-[#dfe6dc] bg-white px-3.5 py-3 text-[13px] leading-6 text-brand-6 shadow-sm shadow-[#274b3e]/[0.02] transition-[border-color,box-shadow] placeholder:text-[#98a49a] focus-visible:border-[#7fa88c] focus-visible:ring-3 focus-visible:ring-[#7fa88c]/20"
                id="blog-content"
                name="content"
                placeholder="Tell your story here…"
                required
                rows={8}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className={labelClassName} htmlFor="blog-image">
                Cover image (optional)
              </Label>
              <label
                className="flex min-h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-[16px] border border-dashed border-[#dfe6dc] bg-[#f7f8f4] px-4 py-6 text-center transition-colors hover:border-[#7fa88c] hover:bg-white"
                htmlFor="blog-image"
              >
                <UploadSimple
                  aria-hidden="true"
                  className="text-brand-3"
                  size={24}
                />
                <span className="text-[12px] font-semibold text-brand-6">
                  Click to upload an image
                </span>
                <span className="text-[10px] text-brand-gray-4">
                  PNG, JPG or WEBP up to 5 MB
                </span>
              </label>
              <input
                accept="image/*"
                className="sr-only"
                id="blog-image"
                name="image"
                type="file"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-[#e9ece4] pt-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
            <Button
              className="h-11 w-full rounded-full bg-brand-2 px-5 text-xs font-bold text-white hover:bg-[#1f6157] disabled:cursor-not-allowed disabled:bg-[#dfe6dc] disabled:text-[#69786f] sm:w-auto"
              isDisabled
              type="button"
            >
              Submitting unavailable in preview
            </Button>
            <a
              className="inline-flex min-h-10 items-center justify-center gap-2 text-xs font-semibold text-brand-3 transition-colors hover:text-brand-orange focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2 sm:justify-end"
              href="/blog"
            >
              Back to journal
              <ArrowRight aria-hidden="true" size={15} />
            </a>
          </div>

          <p className="mt-4 flex items-center gap-2 text-[10px] leading-5 text-brand-gray-3">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-[#c7d89c]"
            />
            Submissions are reviewed before publishing. We&apos;ll email you once
            your story is live.
          </p>
        </form>
      </div>
    </section>
  )
}
