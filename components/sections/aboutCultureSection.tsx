import Image from "next/image"

import type { AboutPageContent } from "@/mock/aboutPageMock"

type AboutCultureSectionProps = {
  content: AboutPageContent["culture"]
}

export function AboutCultureSection({ content }: AboutCultureSectionProps) {
  return (
    <section
      aria-labelledby="about-culture-title"
      className="px-4 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      id="culture"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto max-w-[700px] text-center">
          <p className="text-[10px] font-bold tracking-[0.2em] text-brand-gray-5 uppercase sm:text-xs">
            {content.eyebrow}
          </p>
          <h2
            className="mt-3 font-serif text-[32px] leading-[1.05] tracking-[-0.05em] text-brand sm:text-[42px] lg:text-[48px]"
            id="about-culture-title"
          >
            {content.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[620px] text-[13px] leading-7 text-brand-light sm:text-sm sm:leading-8">
            {content.description}
          </p>
        </div>

        <div className="mt-10 sm:mt-14 grid gap-2  sm:grid-cols-2 lg:grid-cols-3">
          {content.cards.map((card) => (
            <article
              className="flex flex-col gap-3 rounded-[5px] border border-[#e4e8e1] bg-white/30 p-1"
              key={card.id}
            >
              <div className="relative min-h-[160px] overflow-hidden rounded-[5px] bg-[#e8eee5] sm:min-h-[200px]">
                <Image
                  alt={card.imageAlt}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  src={card.image}
                />
              </div>
              {/* <h3 className="text-sm font-semibold text-brand-6">
                {card.title}
              </h3>
              <p className="mt-1 text-xs leading-6 text-brand-light">
                {card.description}
              </p> */}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
