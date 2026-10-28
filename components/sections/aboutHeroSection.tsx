import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"

import type { AboutPageContent } from "@/mock/aboutPageMock"

type AboutHeroSectionProps = {
  content: AboutPageContent["hero"]
}

export function AboutHeroSection({ content }: AboutHeroSectionProps) {
  return (
    <section
      aria-labelledby="about-hero-title"
      className="px-4 pt-8 pb-10 sm:px-8 sm:pt-12 sm:pb-14 lg:px-12 lg:pt-14 lg:pb-16"
      id="about-hero"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid overflow-hidden rounded-[28px] bg-[#f3f5ef] sm:rounded-[36px] lg:min-h-[470px] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col items-start justify-center px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <p className="text-[10px] font-bold tracking-[0.2em] text-brand-gray-5 uppercase sm:text-xs">
              {content.eyebrow}
            </p>
            <h1
              className="mt-4 max-w-[650px] font-serif text-[40px] leading-[1.02] tracking-[-0.055em] text-brand sm:text-[54px] lg:text-[62px]"
              id="about-hero-title"
            >
              {content.title}
              <span className="mt-1 block text-brand-3 italic">
                {content.highlight}
              </span>
            </h1>
            <p className="mt-5 max-w-[540px] text-[13px] leading-7 text-brand-light sm:text-[14px] sm:leading-8">
              {content.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-2 px-5 text-xs font-semibold text-white transition-colors hover:bg-brand-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2"
                href={content.primaryAction.href}
              >
                {content.primaryAction.label}
                <ArrowRight aria-hidden="true" size={15} />
              </Link>
              <Link
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#cfdccb] bg-white/70 px-5 text-xs font-semibold text-brand-3 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2"
                href={content.secondaryAction.href}
              >
                {content.secondaryAction.label}
              </Link>
            </div>
          </div>

          <figure className="group relative min-h-[240px] overflow-hidden bg-[#e6ece3] sm:min-h-[340px] lg:min-h-full">
            <Image
              alt={content.imageAlt}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              fill
              loading="eager"
              sizes="(max-width: 1023px) 100vw, 45vw"
              src={content.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand/35 via-transparent to-transparent" />
            <figcaption className="absolute right-5 bottom-5 rounded-full border border-white/60 bg-white/90 px-4 py-2 text-[9px] font-bold tracking-[0.14em] text-brand-3 uppercase backdrop-blur-sm sm:right-7 sm:bottom-7">
              {content.imageLabel}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
