import Link from "next/link"
import { ArrowRight, MapPin, Star } from "@phosphor-icons/react/dist/ssr"

import { homePageMock } from "@/mock/homePageMock"

const merchantToneClass = {
  sage: "bg-[#dfeede] text-[#42694f]",
  peach: "bg-[#f8e3d9] text-[#a65e46]",
  lavender: "bg-[#e9e3f2] text-[#6e5c82]",
}

export function MerchantSection() {
  return (
    <section className="bg-[#f1f3eb] py-16 sm:py-20" id="sme">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div
          className="mb-8 flex items-end justify-between gap-5 sm:mb-10"
          data-aos="fade-up"
        >
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-[#69927b] uppercase">
              PEOPLE BEHIND THE FINDS
            </p>
            <h2 className="font-serif text-[32px] leading-tight tracking-[-0.04em] text-[#203c33] sm:text-[40px]">
              Good things, good people
            </h2>
            <p className="mt-2 max-w-md text-[13px] leading-6 text-[#748078]">
              Meet a few of the local folks giving lovely things another go.
            </p>
          </div>
          <Link
            className="mb-1 hidden shrink-0 items-center gap-2 text-xs font-semibold text-[#245b4d] transition-colors hover:text-[#e17b5d] sm:flex"
            href="/contact"
          >
            Meet the community
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3" data-aos="fade-up">
          {homePageMock.featuredMerchants.map((merchant) => (
            <article
              className="rounded-[22px] border border-[#e5e9df] bg-[#fbfaf6] p-5 sm:p-6"
              key={merchant.id}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`flex size-[52px] items-center justify-center rounded-[18px] text-sm font-bold ${merchantToneClass[merchant.tone]}`}
                >
                  {merchant.initials}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#f8f2df] px-2.5 py-1.5 text-[10px] font-semibold text-[#806c3d]">
                  <Star aria-hidden="true" size={12} weight="fill" />
                  {merchant.rating}
                </span>
              </div>
              <h3 className="mt-5 text-[16px] font-semibold tracking-[-0.02em] text-[#243b33]">
                {merchant.name}
              </h3>
              <p className="mt-1 text-xs text-[#748078]">
                {merchant.specialty}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-[#e9ece4] pt-4">
                <span className="inline-flex items-center gap-1.5 text-[10px] text-[#77817a]">
                  <MapPin aria-hidden="true" size={13} />
                  {merchant.location}
                </span>
                <span className="text-[10px] font-medium text-[#557360]">
                  {merchant.listings} good finds
                </span>
              </div>
            </article>
          ))}
        </div>
        <Link
          className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-[#d4dfd0] px-5 py-3 text-xs font-semibold text-[#245b4d] transition-colors hover:bg-white sm:hidden"
          href="/contact"
        >
          Meet the community
          <ArrowRight aria-hidden="true" size={15} />
        </Link>
      </div>
    </section>
  )
}
