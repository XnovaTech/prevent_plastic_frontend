import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  EnvelopeSimple,
  InstagramLogo,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr"

import { ContactForm } from "@/components/contact/contactForm"
import { AosInitializer } from "@/components/shared/aosInitializer"
import { SiteFooter } from "@/components/shared/siteFooter"
import { SiteHeader } from "@/components/shared/siteHeader"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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

function ContactIntroSection() {
  const { hero, methods: rawMethods, methodsIntro } = contactPageMock
  const methods: readonly ContactMethod[] = rawMethods

  return (
    <section
      className="bg-transparent px-4 pt-4 pb-14 sm:px-8 sm:pt-6 sm:pb-20 lg:px-12"
      id="contact"
    >
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[28px] bg-[#eef2e8] sm:rounded-[32px]">
        <span className="pointer-events-none absolute -top-20 right-[6%] size-56 rounded-full border border-[#174e46]/5" />
        <span className="pointer-events-none absolute top-6 right-[9%] hidden text-2xl text-[#c7d89c] sm:block">
          ✳
        </span>

        <div className="relative grid gap-8 px-5 py-7 sm:px-8 sm:py-9 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:px-12 lg:py-11">
          <div className="max-w-[620px]" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#31594a]/15 bg-white/45 px-3 py-1.5 text-[9px] font-bold tracking-[0.15em] text-[#496b57] uppercase sm:text-[10px]">
              <span className="size-1.5 rounded-full bg-[#df896b]" />
              {hero.eyebrow}
            </span>
            <h1 className="mt-4 font-serif text-[38px] leading-[1.02] tracking-[-0.055em] text-[#203c33] sm:text-[46px] md:mt-5 md:text-[52px] lg:text-[48px] xl:text-[56px]">
              {hero.heading}
              <br />
              <span className="relative inline-block text-[#39745b] italic">
                {hero.highlight}
                <span className="absolute right-0 -bottom-1 h-1.5 w-[94%] -rotate-2 rounded-[50%] border-b-2 border-[#e9a27e]" />
              </span>
            </h1>
            <p className="mt-4 max-w-[470px] text-[12px] leading-5 text-[#617067] sm:text-[13px] sm:leading-6">
              {hero.description}
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:items-center">
              <Link
                className="inline-flex h-11 items-center justify-center gap-3 rounded-full bg-[#174e46] px-4 text-[11px] font-bold text-white transition-transform hover:-translate-y-0.5 sm:px-5 sm:text-xs"
                href={hero.primaryAction.href}
              >
                {hero.primaryAction.label}
                <span className="flex size-6 items-center justify-center rounded-full bg-[#d9f09b] text-[#174e46]">
                  <ArrowRight aria-hidden="true" size={14} />
                </span>
              </Link>
              <Link
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#c9d8c6] bg-white/40 px-4 text-[11px] font-semibold text-[#33594b] transition-colors hover:bg-white sm:px-5 sm:text-xs"
                href={hero.secondaryAction.href}
              >
                {hero.secondaryAction.label}
                <ArrowUpRight aria-hidden="true" size={14} />
              </Link>
            </div>
            <p className="mt-4 flex items-start gap-2 text-[10px] leading-5 text-[#7d867f]">
              <span
                aria-hidden="true"
                className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#df896b]"
              />
              {hero.note}
            </p>

            <div className="mt-7 border-t border-[#d9e4d5] pt-6">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.18em] text-[#69927b] uppercase">
                    {methodsIntro.eyebrow}
                  </p>
                  <h2 className="mt-1.5 font-serif text-[25px] leading-tight tracking-[-0.04em] text-[#203c33] sm:text-[28px]">
                    {methodsIntro.title}
                  </h2>
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
                          <h3 className="text-[11px] font-semibold text-[#263d34]">
                            {method.title}
                          </h3>
                          <p className="mt-0.5 text-[10px] leading-4 text-[#7d867f]">
                            {method.description}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2.5 border-t border-[#edf0e9] pt-2">
                        {method.href ? (
                          <a
                            className="text-[11px] font-semibold break-words text-[#245b4d] transition-colors hover:text-[#e17b5d]"
                            href={method.href}
                          >
                            {method.value}
                          </a>
                        ) : (
                          <p className="text-[11px] font-semibold text-[#245b4d]">
                            {method.value}
                          </p>
                        )}
                        <p className="mt-0.5 text-[9px] leading-4 text-[#8a938b]">
                          {method.note}
                        </p>
                      </div>
                    </article>
                  )
                })}
              </div>
              <p className="mt-3 text-[10px] leading-5 text-[#7d867f]">
                {methodsIntro.note}
              </p>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-[18px] border border-white/70 bg-white/55 p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-[12px] bg-[#e8f0e3] text-[#3c6950]">
                <EnvelopeSimple aria-hidden="true" size={17} />
              </span>
              <div>
                <p className="text-[9px] font-bold tracking-[0.16em] text-[#69927b] uppercase">
                  {hero.card.eyebrow}
                </p>
                <p className="mt-1 font-serif text-[20px] leading-tight tracking-[-0.04em] text-[#203c33]">
                  {hero.card.title}
                </p>
                <p className="mt-1 text-[11px] leading-5 text-[#617067]">
                  {hero.card.body}
                </p>
                <p className="mt-2 text-[10px] font-semibold text-[#3c6950]">
                  {hero.card.signature}
                </p>
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

function ContactFaqSection() {
  return (
    <section className="py-16 sm:py-20" id="faq">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-12">
          <div data-aos="fade-up">
            <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-[#69927b] uppercase">
              A FEW QUICK ANSWERS
            </p>
            <h2 className="font-serif text-[32px] leading-tight tracking-[-0.04em] text-[#203c33] sm:text-[40px]">
              Before you write
            </h2>
            <p className="mt-3 max-w-sm text-[13px] leading-6 text-[#748078]">
              The things people ask us most, gathered in one calm little place.
            </p>
          </div>

          <Accordion
            allowsMultipleExpanded
            className="gap-0 rounded-[22px] border-[#e7eae2] bg-white/70"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {contactPageMock.faqs.map((faq) => (
              <AccordionItem id={faq.id} key={faq.id}>
                <AccordionTrigger className="px-5 py-5 text-left text-[13px] font-semibold text-[#243b33] hover:no-underline sm:text-sm">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5 text-[12px] leading-6 text-[#748078]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

function CommunitySection() {
  const { community } = contactPageMock

  return (
    <section className="px-4 pb-16 sm:px-8 sm:pb-20 lg:px-12" id="community">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[30px] bg-[#174e46] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-16">
        <span className="pointer-events-none absolute -top-12 right-[8%] size-44 rounded-full border border-white/10" />
        <span className="pointer-events-none absolute top-8 right-[12%] text-4xl text-[#d9f09b]/80">
          ✳
        </span>
        <div
          className="relative grid gap-10 md:grid-cols-[1fr_0.85fr] md:items-center"
          data-aos="fade-up"
        >
          <div className="max-w-xl">
            <p className="mb-3 text-[10px] font-bold tracking-[0.18em] text-[#d9f09b] uppercase">
              {community.eyebrow}
            </p>
            <h2 className="font-serif text-[36px] leading-[1.08] tracking-[-0.04em] whitespace-pre-line sm:text-[48px]">
              {community.heading}
            </h2>
            <p className="mt-5 max-w-lg text-[13px] leading-7 text-[#d8e6dc]/85">
              {community.description}
            </p>
            <Link
              className="mt-7 inline-flex items-center gap-2 text-xs font-semibold text-[#d9f09b] transition-colors hover:text-white"
              href={community.actionHref}
            >
              {community.actionLabel}
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-1">
            {community.stats.map((stat) => (
              <div
                className="rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-4"
                key={stat.label}
              >
                <p className="font-serif text-2xl tracking-[-0.03em] text-[#d9f09b]">
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] text-[#d8e6dc]/80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ContactPage() {
  return (
    <div className="min-h-screen bg-transparent text-[#203c33]">
      <AosInitializer />
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        href="#main-content"
      >
        Skip to content
      </a>
      <SiteHeader activeHref="/contact" />
      <main id="main-content">
        <ContactIntroSection />
        <ContactFaqSection />
        <CommunitySection />
      </main>
      <SiteFooter />
    </div>
  )
}
