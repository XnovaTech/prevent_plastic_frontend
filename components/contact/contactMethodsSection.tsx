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
    <div className="max-w-[520px] mx-auto space-y-8" data-aos="fade-up">
      <div className="text-center sm:text-start">
        <p className="text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
          {methodsIntro.eyebrow}
        </p>
        <h2 className="mt-1.5 font-serif text-[30px] leading-tight tracking-[-0.04em] text-brand sm:text-[38px]">
          {methodsIntro.title}
        </h2>
        <p className="mt-3 max-w-[480px] text-[12px] leading-6 text-brand-light sm:mt-4 sm:text-[13px]">
          {methodsIntro.note}
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:gap-6" data-aos="fade-up" data-aos-delay="100">
        {methods.map((method) => {
          const Icon = methodIcons[method.icon]
          const tone = methodToneClass[method.tone]

          return (
            <article
              className="group rounded-[22px] border border-[#e0e9dd] bg-white/80 p-5 transition-all hover:-translate-y-1 hover:border-[#c7d8c7] hover:bg-white shadow-sm flex flex-col sm:flex-row sm:items-center sm:gap-4 justify-between"
              key={method.id}
            >
              <div className="flex flex-row items-center sm:items-start">
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-[14px] mb-4 ${tone}`}>
                <Icon aria-hidden="true" size={18} weight="duotone" />
              </div>
              <h3 className="text-[13px] font-semibold text-[#263d34] mt-3 ml-3">
                {method.title}
              </h3>
             </div>

              <div className="">
                <p className="text-[12px] font-medium text-brand break-words">
                  {method.value}
                </p>
                <p className="mt-1 text-[10px] leading-4 text-brand-gray-3">
                  {method.note}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
