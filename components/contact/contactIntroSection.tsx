import {
  EnvelopeSimple,
  InstagramLogo,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr"

import { ContactForm } from "@/components/contact/contactForm"
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

export function ContactIntroSection() {
  const { methods: rawMethods, methodsIntro } = contactPageMock
  const methods: readonly ContactMethod[] = rawMethods

  return (
    <section
      className="bg-transparent px-4 pt-4 pb-14 sm:px-8 sm:pt-6 sm:pb-20 lg:px-12"
      id="contact"
    >
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[28px] bg-[#eef2e8] sm:rounded-[32px]">
        <div className="relative grid gap-8 px-5 py-7 sm:px-8 sm:py-9 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:px-12 lg:py-11">
          <div className="max-w-[620px]" data-aos="fade-up">
            <div className="border-t border-[#d9e4d5] pt-6">
              <div className="flex items-end justify-between gap-3">
                <div>
                 
                  <h1 className="mt-1.5 font-serif text-[25px] leading-tight tracking-[-0.04em] text-brand sm:text-[28px]">
                    {methodsIntro.title}
                  </h1>
                </div>
                <span
                  aria-hidden="true"
                  className="hidden size-8 items-center justify-center rounded-full bg-white/55 text-sm text-[#8baa78] sm:flex"
                >
                  ✳
                </span>
              </div>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {methods.map((method) => {
                  const Icon = methodIcons[method.icon]

                  return (
                    <article
                      className="group rounded-[16px] border border-[#e0e9dd] bg-white/55 p-3.5 transition-colors hover:border-[#c7d8c7] hover:bg-white"
                      id={method.id === "visit" ? "visit" : undefined}
                      key={method.id}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex size-8 shrink-0 items-center justify-center rounded-[10px] ${methodToneClass[method.tone]}`}
                        >
                          <Icon aria-hidden="true" size={16} weight="duotone" />
                        </span>
                        <div className="min-w-0">
                          <h2 className="text-[11px] font-semibold text-[#263d34]">
                            {method.title}
                          </h2>
                          <p className="mt-0.5 text-[10px] leading-4 text-brand-lighter">
                            {method.description}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2.5 border-t border-[#edf0e9] pt-2">
                        {method.href ? (
                          <a
                            className="text-[11px] font-semibold break-words text-brand-3 transition-colors hover:text-brand-orange"
                            href={method.href}
                          >
                            {method.value}
                          </a>
                        ) : (
                          <p className="text-[11px] font-semibold text-brand-3">
                            {method.value}
                          </p>
                        )}
                        <p className="mt-0.5 text-[9px] leading-4 text-brand-gray-3">
                          {method.note}
                        </p>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
