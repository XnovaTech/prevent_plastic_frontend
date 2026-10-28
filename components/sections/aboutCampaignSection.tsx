import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkle } from "@phosphor-icons/react/dist/ssr"

import type { AboutPageContent } from "@/mock/aboutPageMock"

type AboutCampaignSectionProps = {
  content: AboutPageContent["campaign"]
}

export function AboutCampaignSection({ content }: AboutCampaignSectionProps) {
  return (
    <section
      aria-labelledby="about-campaign-title"
      className="bg-[#f5f6f1] px-4 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      id="campaign"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="relative overflow-hidden rounded-[30px] bg-brand-2 text-white sm:rounded-[36px]">
          <span className="pointer-events-none absolute -top-20 right-[8%] size-64 rounded-full border border-white/10" />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-8 right-[12%] text-4xl text-brand-green/70"
          >
            ✳
          </span>

          <div className="relative grid lg:grid-cols-[1.02fr_0.98fr]">
            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[9px] font-bold tracking-[0.15em] text-brand-green uppercase">
                <span className="size-1.5 rounded-full bg-brand-green" />
                {content.eyebrow}
              </span>

              <h2
                className="mt-5 max-w-[520px] font-serif text-[38px] leading-[0.98] tracking-[-0.055em] text-white sm:text-[48px] lg:text-[54px]"
                id="about-campaign-title"
              >
                {content.title}
                <span className="mt-1 block text-brand-green italic">
                  {content.highlight}
                </span>
              </h2>

              <p className="mt-5 max-w-[470px] text-[12px] leading-7 text-[#d8e6dc]/80 sm:text-[13px]">
                {content.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-green px-5 text-xs font-bold text-brand-2 transition-all hover:-translate-y-0.5 hover:bg-white focus-visible:ring-3 focus-visible:ring-white/25 focus-visible:outline-none"
                  href={content.primaryAction.href}
                >
                  {content.primaryAction.label}
                  <ArrowRight aria-hidden="true" size={15} />
                </Link>
                <Link
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/25 px-5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-white/20 focus-visible:outline-none"
                  href={content.secondaryAction.href}
                >
                  {content.secondaryAction.label}
                </Link>
              </div>
            </div>

            <figure className="group relative min-h-[340px] overflow-hidden bg-[#284e44] lg:min-h-full">
              <Image
                alt={content.imageAlt}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                fill
                sizes="(max-width: 1023px) 100vw, 48vw"
                src={content.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand/85 via-brand/15 to-transparent" />

              <figcaption className="absolute top-4 left-4 rounded-full border border-white/30 bg-brand/40 px-3 py-1.5 text-[9px] font-bold tracking-[0.14em] text-white uppercase backdrop-blur-md sm:top-5 sm:left-5">
                {content.imageLabel}
              </figcaption>

              <div className="absolute right-4 bottom-4 left-4 max-w-[330px] rounded-[18px] border border-white/20 bg-brand/75 p-4 backdrop-blur-md sm:right-5 sm:bottom-5 sm:left-5 sm:p-5">
                <p className="font-serif text-[19px] leading-[1.2] tracking-[-0.03em] text-white sm:text-[21px]">
                  “{content.quote}”
                </p>
                <p className="mt-2 text-[8px] font-bold tracking-[0.13em] text-brand-green uppercase">
                  {content.quoteAttribution}
                </p>
              </div>
            </figure>
          </div>

          <div className="relative border-t border-white/15 px-6 pt-6 pb-8 sm:px-10 sm:pt-7 sm:pb-9 lg:px-12">
            <div className="grid gap-5 md:grid-cols-3 md:gap-0">
              {content.actions.map((action, index) => (
                <div
                  className={`flex gap-4 md:px-6 ${
                    index > 0
                      ? "border-t border-white/15 pt-5 md:border-t-0 md:border-l md:pt-0"
                      : ""
                  }`}
                  key={action.id}
                >
                  <span className="font-serif text-[28px] leading-none text-brand-green/75">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-[12px] font-semibold text-white">
                      {action.title}
                    </h3>
                    <p className="mt-1 text-[10px] leading-5 text-[#d8e6dc]/65">
                      {action.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 flex items-center gap-2 text-[9px] font-medium tracking-[0.12em] text-brand-green/80 uppercase">
              <Sparkle aria-hidden="true" size={13} />
              One small choice at a time. That is the campaign.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
