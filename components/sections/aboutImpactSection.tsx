import Image from "next/image"
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr"

import type { AboutPageContent } from "@/mock/aboutPageMock"

type AboutImpactSectionProps = {
  content: AboutPageContent["impact"]
}

export function AboutImpactSection({ content }: AboutImpactSectionProps) {
  return (
    <section
      aria-labelledby="about-impact-title"
      className="bg-[#f5f6f1] px-4 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      id="impact"
    >
      <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="relative min-h-[300px] overflow-hidden rounded-[24px] bg-[#e8eee5] sm:min-h-[420px] sm:rounded-[30px] lg:min-h-[500px]">
          <Image
            alt={content.imageAlt}
            className="object-cover"
            fill
            sizes="(max-width: 1024px) 100vw, 52vw"
            src={content.image}
          />
        </div>

        <div className="lg:py-6">
          <p className="text-[10px] font-bold tracking-[0.2em] text-brand-gray-5 uppercase">
            {content.eyebrow}
          </p>
          <h2
            className="mt-3 max-w-[560px] font-serif text-[34px] leading-[1.05] tracking-[-0.05em] text-brand sm:text-[46px]"
            id="about-impact-title"
          >
            {content.title}
          </h2>
          <p className="mt-4 max-w-[560px] text-[13px] leading-7 text-brand-light sm:text-sm">
            {content.description}
          </p>

          <ol className="mt-7 space-y-4 sm:mt-9">
            {content.points.map((point, index) => (
              <li className="flex items-start gap-4" key={point.id}>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#d8e2d4] bg-white/80 font-serif text-sm text-brand-3">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 border-b border-[#e1e7dd] pb-4">
                  <h3 className="text-sm font-semibold text-brand-6">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-xs leading-6 text-brand-light">
                    {point.description}
                  </p>
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-brand-gray-4"
                  size={16}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
