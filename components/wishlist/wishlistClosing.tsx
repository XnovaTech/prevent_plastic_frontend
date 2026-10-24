import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"

import { wishlistPageMock } from "@/mock/wishlistPageMock"

export function WishlistClosing() {
  const { closing } = wishlistPageMock

  return (
    <section className="px-4 pb-16 sm:px-8 sm:pb-20 lg:px-12">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[30px] bg-[#174e46] px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-12">
        <span className="pointer-events-none absolute -top-14 right-[10%] size-48 rounded-full border border-white/10" />
        <span className="pointer-events-none absolute top-7 right-[14%] text-4xl text-[#d9f09b]/80">
          ✳
        </span>
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-[#d9f09b] uppercase">
              {closing.eyebrow}
            </p>
            <h2 className="font-serif text-[32px] leading-[1.08] tracking-[-0.04em] sm:text-[40px]">
              {closing.heading}
            </h2>
            <p className="mt-3 max-w-lg text-[13px] leading-6 text-[#d8e6dc]/85">
              {closing.description}
            </p>
          </div>
          <Link
            className="inline-flex h-11 w-fit shrink-0 items-center gap-3 rounded-full bg-[#d9f09b] px-5 text-[11px] font-bold text-[#174e46] transition-transform hover:-translate-y-0.5"
            href={closing.actionHref}
          >
            {closing.actionLabel}
            <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
