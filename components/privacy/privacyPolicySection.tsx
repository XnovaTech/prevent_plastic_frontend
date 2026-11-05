import Link from "next/link"
import { ArrowRight, ShieldCheck } from "@phosphor-icons/react/dist/ssr"

import type { PrivacyPageContent } from "@/mock/privacyPageMock"

type PrivacyPolicySectionProps = {
  content: PrivacyPageContent
}

export function PrivacyPolicySection({ content }: PrivacyPolicySectionProps) {
  const { hero, sections, contactNote } = content

  return (
    <section
      aria-labelledby="privacy-title"
      className="px-4 py-10 sm:px-8 sm:py-14 lg:px-12"
      id="privacy"
    >
      <div className="mx-auto max-w-[1440px]">
        <header
          className="mx-auto max-w-[720px] text-center"
          data-aos="fade-up"
        >
          <p className="text-[10px] font-bold tracking-[0.2em] text-brand-gray-5 uppercase sm:text-xs">
            {hero.eyebrow}
          </p>
          <h1
            className="mt-3 font-serif text-[34px] leading-[1.05] tracking-[-0.05em] text-brand sm:text-[44px] lg:text-[48px]"
            id="privacy-title"
          >
            {hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-[620px] text-[13px] leading-7 text-brand-light sm:text-sm sm:leading-8">
            {hero.description}
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#dfe6dc] bg-white/70 px-4 py-1.5 text-[10px] font-semibold text-brand-gray-4">
            <ShieldCheck aria-hidden="true" size={13} weight="fill" />
            {hero.updated}
          </p>
        </header>

        <nav
          aria-label="Policy sections"
          className="mx-auto mt-9 flex max-w-[960px] flex-wrap justify-center gap-2"
          data-aos="fade-up"
        >
          {sections.map((section) => (
            <a
              className="rounded-full border border-[#dfe6dc] bg-white/70 px-3.5 py-1.5 text-[11px] font-semibold text-[#557360] transition-colors hover:border-[#b9cfbc] hover:bg-white"
              href={`#${section.id}`}
              key={section.id}
            >
              {section.title}
            </a>
          ))}
        </nav>

        <div className="mx-auto mt-10 flex max-w-[960px] flex-col gap-5">
          {sections.map((section, index) => (
            <article
              className="scroll-mt-24 rounded-[24px] border border-[#e3e9df] bg-white/70 p-6 shadow-[0_20px_60px_-52px_rgba(38,74,55,0.5)] sm:p-8"
              id={section.id}
              key={section.id}
            >
              <p className="text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 font-serif text-[24px] leading-tight tracking-[-0.035em] text-brand sm:text-[28px]">
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  className="mt-3 text-[13px] leading-7 text-brand-light sm:text-sm"
                  key={paragraph.slice(0, 32)}
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {section.bullets.map((bullet) => (
                    <li
                      className="flex items-start gap-2.5 text-[13px] leading-6 text-brand-gray-4"
                      key={bullet}
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-[#8fb89b]"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}

          <div className="mt-1 rounded-[24px] border border-[#d8e5d3] bg-brand-yellow-bg/70 p-6 text-center sm:p-8">
            <h2 className="font-serif text-[24px] leading-tight tracking-[-0.035em] text-brand sm:text-[28px]">
              {contactNote.title}
            </h2>
            <p className="mx-auto mt-2 max-w-[720px] text-[13px] leading-7 text-brand-light sm:text-sm">
              {contactNote.description}
            </p>
            <Link
              className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-brand-2 px-6 text-[11px] font-bold text-white transition-colors hover:bg-[#1f6157]"
              href={contactNote.actionHref}
            >
              {contactNote.actionLabel}
              <ArrowRight aria-hidden="true" size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
