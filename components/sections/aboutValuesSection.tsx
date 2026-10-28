import Image from "next/image"
import { CheckCircle } from "@phosphor-icons/react/dist/ssr"

import type { AboutPageContent } from "@/mock/aboutPageMock"

type AboutValuesSectionProps = {
  content: AboutPageContent["values"]
}

export function AboutValuesSection({ content }: AboutValuesSectionProps) {
  return (
    <section
      aria-labelledby="about-values-title"
      className="px-4 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      id="values"
    >
      <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
        <div className="relative min-h-[320px] overflow-hidden rounded-[24px] bg-[#e8eee5] sm:min-h-[460px] sm:rounded-[30px] lg:min-h-[560px]">
          <Image
            alt={content.imageAlt}
            className="object-cover"
            fill
            sizes="(max-width: 1024px) 100vw, 52vw"
            src={content.image}
          />
          <span className="absolute bottom-4 left-4 rounded-full border border-white/40 bg-white/90 px-4 py-2 text-[9px] font-bold tracking-[0.14em] text-brand-2 uppercase shadow-sm backdrop-blur-md sm:bottom-6 sm:left-6">
            PRE-LOVED, READY AGAIN
          </span>
        </div>

        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] text-brand-gray-5 uppercase">
            {content.eyebrow}
          </p>
          <h2
            className="mt-3 max-w-[580px] font-serif text-[34px] leading-[1.05] tracking-[-0.05em] text-brand sm:text-[46px]"
            id="about-values-title"
          >
            {content.title}
          </h2>
          <p className="mt-4 max-w-[560px] text-[13px] leading-7 text-brand-light sm:text-sm">
            {content.description}
          </p>

          <ul className="mt-7 divide-y divide-[#e3e9df] border-y border-[#e3e9df]">
            {content.points.map((point) => (
              <li className="flex gap-3 py-4 sm:py-5" key={point.id}>
                <CheckCircle
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-brand-4"
                  size={19}
                  weight="duotone"
                />
                <div>
                  <h3 className="text-sm font-semibold text-brand-6">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-xs leading-6 text-brand-light">
                    {point.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
