import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { AboutPageContent } from "@/mock/aboutPageMock"

type AboutFaqSectionProps = {
  intro: AboutPageContent["faqIntro"]
  faqs: AboutPageContent["faqs"]
}

export function AboutFaqSection({ intro, faqs }: AboutFaqSectionProps) {
  return (
    <section
      aria-labelledby="faq-title"
      className="bg-[#f1f3eb]/60 px-4 py-14 sm:px-8 sm:py-20 lg:px-12"
      id="faq"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-12">
          <div data-aos="fade-up">
            <p className="text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
              {intro.eyebrow}
            </p>
            <h2
              className="mt-3 font-serif text-[34px] leading-[1.02] tracking-[-0.05em] text-brand sm:text-[42px]"
              id="faq-title"
            >
              {intro.title}
            </h2>
            <p className="mt-3 max-w-sm text-[12px] leading-6 text-brand-light sm:text-[13px]">
              {intro.description}
            </p>
            <Link
              className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold text-brand-3 transition-colors hover:text-brand-orange focus-visible:underline focus-visible:outline-none"
              href="/contact"
            >
              Ask us something else
              <ArrowRight aria-hidden="true" size={14} />
            </Link>
          </div>

          <Accordion
            allowsMultipleExpanded
            className="gap-0 rounded-[22px] border-[#e7eae2] bg-white/70"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {faqs.map((faq) => (
              <AccordionItem id={faq.id} key={faq.id}>
                <AccordionTrigger className="px-5 py-5 text-left text-[13px] font-semibold text-brand-6 hover:no-underline sm:text-sm">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5 text-[11px] leading-6 text-brand-light sm:text-[12px]">
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
