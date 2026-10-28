import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"

import type { AboutPageContent } from "@/mock/aboutPageMock"

type AboutIntroductionSectionProps = {
  content: AboutPageContent["introduction"]
}

export function AboutIntroductionSection({
  content,
}: AboutIntroductionSectionProps) {
  return (
    <section
      aria-labelledby="about-introduction-title"
      className="px-4 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-24"
      id="why-pre-loved"
    >
      <div className="mx-auto max-w-[1240px]">
        <header className="mx-auto max-w-[700px] text-center">
          <p className="text-[10px] font-bold tracking-[0.2em] text-brand-gray-5 uppercase sm:text-xs">
            {content.eyebrow}
          </p>
          <h2
            className="mt-3 font-serif text-[32px] leading-[1.05] tracking-[-0.05em] text-brand sm:text-[42px] lg:text-[48px]"
            id="about-introduction-title"
          >
            {content.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[620px] text-[13px] leading-7 text-brand-light sm:text-sm sm:leading-8">
            {content.description}
          </p>
        </header>

        <div className="mt-8 grid border-t border-[#e4e8e1] sm:mt-10 sm:grid-cols-2">
          {content.benefits.map((benefit, index) => (
            <article
              className={`flex min-h-[156px] flex-col items-center justify-center border-b border-[#e4e8e1] px-5 py-6 text-center sm:px-8 sm:py-7 ${
                index % 2 === 0 ? "sm:border-r" : ""
              }`}
              key={benefit.id}
            >
              <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-brand-6 sm:text-base">
                {benefit.title}
              </h3>
              <span
                aria-hidden="true"
                className="mt-3 h-0.5 w-7 rounded-full bg-brand-3"
              />
              <p className="mt-3 max-w-[360px] text-[11px] leading-5 text-brand-light sm:text-xs sm:leading-6">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 sm:mt-20 lg:mt-24">
          <div className="mx-auto max-w-[820px]">
            <p className="text-[10px] font-bold tracking-[0.2em] text-brand-gray-5 uppercase sm:text-xs">
              {content.featureEyebrow}
            </p>
            <h2 className="mt-3 font-serif text-[32px] leading-[1.05] tracking-[-0.05em] text-brand sm:text-[42px] lg:text-[48px]">
              {content.featureTitle}
            </h2>
            <p className="mt-4 max-w-[700px] text-[13px] leading-7 text-brand-light sm:text-sm sm:leading-8">
              {content.featureDescription}
            </p>
          </div>

          <div className="relative mt-8 min-h-[300px] sm:mt-10 sm:min-h-[420px] lg:min-h-[500px]">
            <figure className="group relative min-h-[300px] overflow-hidden rounded-[24px] bg-[#e8eee5] sm:min-h-[420px] sm:rounded-[30px] lg:min-h-[500px] lg:w-[72%]">
              <Image
                alt={content.featureImageAlt}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                fill
                sizes="(max-width: 1023px) 100vw, 72vw"
                src={content.featureImage}
              />
              <figcaption className="absolute bottom-4 left-4 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-[9px] font-bold tracking-[0.13em] text-brand-3 uppercase backdrop-blur-sm sm:bottom-5 sm:left-5">
                {content.featureEyebrow}
              </figcaption>
            </figure>

            <aside className="relative mt-[-18px] ml-auto w-[calc(100%-20px)] rounded-[20px] border border-[#edf0e9] bg-[#f7f8f5] p-5 shadow-[0_20px_55px_-35px_rgba(27,65,56,0.28)] sm:mt-0 sm:mr-0 sm:ml-auto sm:w-[min(48%,480px)] sm:p-7 lg:absolute lg:top-1/2 lg:right-0 lg:mr-4 lg:-translate-y-1/2 lg:p-10">
              <h3 className="font-serif text-[24px] leading-tight tracking-[-0.04em] text-brand sm:text-[30px]">
                {content.featureCardTitle}
              </h3>
              <p className="mt-3 text-[12px] leading-6 text-brand-light sm:text-[13px] sm:leading-7">
                {content.featureCardDescription}
              </p>
              <Link
                className="mt-5 inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-brand-3 transition-colors hover:text-brand-orange focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2"
                href={content.featureAction.href}
              >
                {content.featureAction.label}
                <ArrowRight aria-hidden="true" size={15} />
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
