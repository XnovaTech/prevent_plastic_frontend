import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"

import { homePageMock } from "@/mock/homePageMock"

export function ImpactSection() {
  return (
    <section className="px-4 py-16 sm:px-8 sm:py-20 lg:px-12" id="about">
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
              A SMALLER FOOTPRINT, TOGETHER
            </p>
            <h2 className="font-serif text-[36px] leading-[1.08] tracking-[-0.04em] whitespace-pre-line sm:text-[48px]">
              {homePageMock.impact.heading}
            </h2>
            <p className="mt-5 max-w-lg text-[13px] leading-7 text-[#d8e6dc]/85">
              {homePageMock.impact.description}
            </p>
            <Link
              className="mt-7 inline-flex items-center gap-2 text-xs font-semibold text-[#d9f09b] transition-colors hover:text-white"
              href="/contact"
            >
              Get to know us
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-1">
            {homePageMock.impact.stats.map((stat) => (
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
