"use client"

import { ArrowRight } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect } from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"
import { contactPageMock } from "@/mock/contactPageMock"

const fieldClassName =
  "h-12 rounded-[14px] border-[#dfe6dc] bg-white px-3.5 text-[13px] text-brand-6 shadow-sm shadow-[#274b3e]/[0.02] placeholder:text-[#98a49a] transition-[border-color,box-shadow] focus-visible:border-[#7fa88c] focus-visible:ring-3 focus-visible:ring-[#7fa88c]/20"

const labelClassName =
  "text-[12px] font-semibold tracking-[0.01em] text-[#344d42]"

export function ContactForm() {
  const { form } = contactPageMock

  return (
    <section className="py-0" data-aos="fade-up" data-aos-delay="100">
      <div className="w-full">
        <form
          className="scroll-mt-28 rounded-[24px] border border-[#e6eae2] bg-white/85 p-5 shadow-[0_16px_50px_-40px_rgba(27,65,56,0.5)] sm:rounded-[28px] sm:p-7 lg:p-8"
          id="contact-form"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-[#e9ece4] pb-5 sm:mb-7">
            <div>
              <p className="text-[9px] font-bold tracking-[0.16em] text-brand-gray-5 uppercase">
                {form.eyebrow}
              </p>
              <h2 className="mt-1.5 font-serif text-[27px] leading-tight tracking-[-0.04em] text-brand sm:text-[30px]">
                {form.title}
              </h2>
              <p className="mt-2 max-w-md text-[12px] leading-6 text-brand-light">
                {form.description}
              </p>
            </div>
            <p className="text-[10px] text-brand-gray-3">
              <span aria-hidden="true">*</span> Required
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:gap-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
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
            </div>

            <div className="flex flex-col gap-2">
              <Label className={labelClassName} htmlFor="contact-topic">
                What&apos;s this about?
              </Label>
              <NativeSelect
                className="w-full [&_select]:h-12 [&_select]:rounded-[14px] [&_select]:border-[#dfe6dc] [&_select]:bg-white [&_select]:px-3.5 [&_select]:text-[13px] [&_select]:text-brand-6 [&_select]:shadow-sm [&_select]:shadow-[#274b3e]/[0.02] [&_select:focus-visible]:border-[#7fa88c] [&_select:focus-visible]:ring-3 [&_select:focus-visible]:ring-[#7fa88c]/20"
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
            <div className="flex flex-col gap-2">
              <Label className={labelClassName} htmlFor="contact-message">
                Your note <span aria-hidden="true">*</span>
              </Label>
              <Textarea
                className="min-h-[144px] rounded-[16px] border-[#dfe6dc] bg-white px-3.5 py-3 text-[13px] leading-6 text-brand-6 shadow-sm shadow-[#274b3e]/[0.02] transition-[border-color,box-shadow] placeholder:text-[#98a49a] focus-visible:border-[#7fa88c] focus-visible:ring-3 focus-visible:ring-[#7fa88c]/20"
                id="contact-message"
                name="message"
                placeholder="A find you're hunting for, a question, or a friendly hello…"
                required
                rows={5}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-[#e9ece4] pt-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
            <Button
              className="h-11 w-full rounded-full bg-brand-2 px-5 text-xs font-bold text-white hover:bg-[#1f6157] disabled:cursor-not-allowed disabled:bg-[#dfe6dc] disabled:text-[#69786f] sm:w-auto"
              isDisabled
              type="button"
            >
              Sending unavailable in preview
            </Button>
            <a
              className="inline-flex min-h-10 items-center justify-center gap-2 text-xs font-semibold text-brand-3 transition-colors hover:text-brand-orange focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2 sm:justify-end"
              href="mailto:hello@preventplastic.com"
            >
              Email us instead
              <ArrowRight aria-hidden="true" size={15} />
            </a>
          </div>

          <p className="mt-4 flex items-center gap-2 text-[10px] leading-5 text-brand-gray-3">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-[#c7d89c]"
            />
            {form.responseNote}
          </p>
        </form>
      </div>
    </section>
  )
}
