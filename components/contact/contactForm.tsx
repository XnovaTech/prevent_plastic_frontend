"use client"

import { ArrowRight } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect } from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"
import { contactPageMock } from "@/mock/contactPageMock"

const fieldClassName =
  "h-11 rounded-[14px] border-[#e2e8dd] bg-white px-3.5 text-[13px] text-brand-6 shadow-none placeholder:text-[#a1aaa2] focus-visible:border-[#7fa88c] focus-visible:ring-3 focus-visible:ring-[#7fa88c]/25"

const labelClassName =
  "text-[11px] font-semibold tracking-[0.01em] text-[#3b5248]"

export function ContactForm() {
  const { form } = contactPageMock

  return (
    <form
      className="scroll-mt-28 rounded-[26px] border border-white/80 bg-white/60 p-5 backdrop-blur-xl sm:p-7"
      data-aos="fade-up"
      data-aos-delay="100"
      id="contact-form"
      noValidate
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#e9ece4] pb-5">
        <div>
          <h2 className="mt-2 font-serif text-[27px] leading-tight tracking-[-0.04em] text-brand sm:text-[30px]">
            {form.title}
          </h2>
          <p className="mt-2 max-w-md text-[11px] leading-5 text-brand-lighter">
            {form.description}
          </p>
        </div>
        <p className="text-[10px] text-brand-gray-3">
          <span aria-hidden="true">*</span> Required
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label className={labelClassName} htmlFor="contact-name">
            Your name <span aria-hidden="true">*</span>
          </Label>
          <Input
            autoComplete="name"
            className={fieldClassName}
            id="contact-name"
            name="name"
            placeholder="What should we call you?"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className={labelClassName} htmlFor="contact-email">
            Email address <span aria-hidden="true">*</span>
          </Label>
          <Input
            autoComplete="email"
            className={fieldClassName}
            id="contact-email"
            name="email"
            placeholder="you@example.com"
            required
            type="email"
          />
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label className={labelClassName} htmlFor="contact-topic">
            What&apos;s this about?
          </Label>
          <NativeSelect
            className="w-full [&_select]:h-11 [&_select]:rounded-[14px] [&_select]:border-[#e2e8dd] [&_select]:bg-white [&_select]:px-3.5 [&_select]:text-[13px] [&_select]:text-brand-6 [&_select:focus-visible]:border-[#7fa88c] [&_select:focus-visible]:ring-3 [&_select:focus-visible]:ring-[#7fa88c]/25"
            defaultValue=""
            id="contact-topic"
            name="topic"
          >
            <option value="">Choose a topic</option>
            {form.topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </NativeSelect>
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label className={labelClassName} htmlFor="contact-message">
            Your note <span aria-hidden="true">*</span>
          </Label>
          <Textarea
            className="min-h-[132px] rounded-[16px] border-[#e2e8dd] bg-white px-3.5 py-3 text-[13px] leading-6 text-brand-6 shadow-none placeholder:text-[#a1aaa2] focus-visible:border-[#7fa88c] focus-visible:ring-3 focus-visible:ring-[#7fa88c]/25"
            id="contact-message"
            name="message"
            placeholder="A find you're hunting for, a question, or a friendly hello…"
            required
            rows={5}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-[#e9ece4] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <Button
          className="h-11 w-full rounded-full bg-brand-2 px-5 text-xs font-bold text-white hover:bg-[#1f6157] sm:w-auto"
          isDisabled
          type="submit"
        >
          Send your note
          <ArrowRight aria-hidden="true" size={15} />
        </Button>
        <p className="text-[10px] leading-5 text-brand-gray-3">
          {form.privacyNote}
        </p>
      </div>

      <p className="mt-4 flex items-center gap-2 text-[10px] leading-5 text-brand-gray-3">
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-[#c7d89c]"
        />
        {form.responseNote}
      </p>
    </form>
  )
}
