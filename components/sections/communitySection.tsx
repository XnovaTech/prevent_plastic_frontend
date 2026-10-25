"use client"

import Link from "next/link"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { SectionBrowseLink } from "@/components/shared/sectionBrowseLink"
import { homePageMock } from "@/mock/homePageMock"

const merchantToneClasses = {
  sage: "bg-[#e8eee5]",
  peach: "bg-[#f8ebe5]",
  lavender: "bg-[#f0edf6]",
  butter: "bg-[#f5f1df]",
}

export function CommunitySection() {
  const featured = homePageMock.featuredMerchants.slice(0, 8)

  return (
    <section className="py-12 sm:py-14" id="community">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="mb-7 flex items-center justify-between gap-4 sm:mb-8" data-aos="fade-up">
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
              LOCAL SHOPS AND SELLERS
            </p>
            <h2 className="font-serif text-[32px] leading-tight tracking-[-0.04em] text-brand sm:text-[40px]">
              Trusted shops
            </h2>
          </div>
          <SectionBrowseLink
            href="/sme"
            label="Browse shops"
            placement="header"
            screen="desktop"
          />
        </div>

        <Carousel
          aria-label="Official stores"
          autoPlay
          className="overflow-hidden relative"
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent className="-ml-0">
            {featured.map((merchant) => {
              const slug = merchant.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/-+/g, "-")
                .replace(/^-|-$/g, "")
              return (
                <Link
                  key={merchant.id}
                  href={`/shop/${slug}`}
                  className="block"
                >
                  <CarouselItem
                    key={merchant.id}
                    className="basis-1/2 sm:basis-1/3 lg:basis-1/5 pl-4"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        aria-hidden="true"
                        className={`flex size-20 shrink-0 items-center justify-center rounded-[22px] border border-[#e9e9e1] text-base font-semibold text-brand-2 shadow-sm sm:size-24 sm:rounded-[26px] ${merchantToneClasses[merchant.tone]}`}
                      >
                        {merchant.initials}
                      </div>
                      <p className="text-[11px] font-medium text-brand-6 text-center leading-snug mt-2">
                        {merchant.name}
                      </p>
                    </div>
                  </CarouselItem>
                </Link>
              )
            })}
          </CarouselContent>

          <CarouselPrevious
            className="absolute inset-y-0 -left-3 z-20 my-auto"
            variant="outline"
            size="icon-sm"
          />
          <CarouselNext
            className="absolute inset-y-0 -right-3 z-20 my-auto"
            variant="outline"
            size="icon-sm"
          />
        </Carousel>
        <SectionBrowseLink
          href="/sme"
          label="Browse shops"
          placement="footer"
          screen="mobile"
        />
      </div>
    </section>
  )
}
