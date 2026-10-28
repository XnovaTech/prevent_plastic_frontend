"use client"

import {
  EnvelopeSimple,
  InstagramLogo,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr"

import { contactPageMock, type ContactMethod } from "@/mock/contactPageMock"

const methodIcons = {
  email: EnvelopeSimple,
  phone: Phone,
  visit: MapPin,
  social: InstagramLogo,
}

const methodToneClass = {
  sage: "bg-[#e8f0e3] text-[#3c6950]",
  peach: "bg-[#f9e8df] text-[#a65e46]",
  lavender: "bg-[#eee9f5] text-[#705b89]",
  butter: "bg-[#f6f0d8] text-[#8a7440]",
}

export function ContactMethodsSection() {
  const { methods: rawMethods, methodsIntro } = contactPageMock
  const methods: readonly ContactMethod[] = rawMethods

  return (
    <div className="mx-auto max-w-[520px] space-y-6 lg:mx-0" data-aos="fade-up">
      <div>
      
        <h1 className="mt-1.5 font-serif text-[30px] leading-tight tracking-[-0.04em] text-brand sm:text-[38px]">
          {methodsIntro.title}
        </h1>
        <p className="mt-3 max-w-[480px] text-[12px] leading-6 text-brand-light sm:mt-4 sm:text-[13px]">
          {methodsIntro.note}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1" data-aos="fade-up" data-aos-delay="100">
        {methods.map((method) => {
          const Icon = methodIcons[method.icon]
          const tone = methodToneClass[method.tone]

          return (
            <article
              className="group rounded-[20px] border border-[#e1e8df] bg-white/80 p-4 shadow-[0_8px_24px_-22px_rgba(27,65,56,0.5)] transition duration-200 hover:-translate-y-0.5 hover:border-[#c7d8c7] hover:bg-white hover:shadow-[0_14px_30px_-22px_rgba(27,65,56,0.45)] sm:p-5"
              key={method.id}
            >
              <div className="flex items-start gap-3.5">
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-[13px] ${tone}`}
                >
                  <Icon aria-hidden="true" size={18} weight="duotone" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-[13px] font-semibold text-[#263d34]">
                    {method.title}
                  </h2>
                  <p className="mt-1 text-[11px] leading-5 text-brand-lighter">
                    {method.description}
                  </p>
                  {method.href ? (
                    <a
                      className="mt-2 inline-block break-words text-[12px] font-semibold text-brand-3 underline decoration-transparent underline-offset-4 transition-colors hover:text-brand-orange hover:decoration-current focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2"
                      href={method.href}
                      rel={method.href.startsWith("https:") ? "noreferrer" : undefined}
                    >
                      {method.value}
                    </a>
                  ) : (
                    <p className="mt-2 break-words text-[12px] font-semibold text-brand-3">
                      {method.value}
                    </p>
                  )}
                  <p className="mt-1 text-[10px] leading-4 text-brand-gray-3">
                    {method.note}
                  </p>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
