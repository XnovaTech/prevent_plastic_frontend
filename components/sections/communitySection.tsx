"use client"

import Link from "next/link"
import { MapPin, Star } from "@phosphor-icons/react"

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
        <Carousel
          aria-label="Featured local shops"
          className="relative"
          opts={{
            align: "start",
            loop: true,
            containScroll: "trimSnaps",
          }}
        >
          <div
            className="mb-6 flex items-end justify-between gap-4 sm:mb-8"
            data-aos="fade-up"
          >
            <div>
              <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
                LOCAL SHOPS AND SELLERS
              </p>
              <h2 className="font-serif text-[32px] leading-tight tracking-[-0.04em] text-brand sm:text-[40px]">
                Trusted shops
              </h2>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <SectionBrowseLink
                href="/shops"
                label="Browse shops"
                placement="header"
                screen="desktop"
              />
              <CarouselPrevious
                aria-label="Previous shops"
                className="!static !m-0 !size-10 !translate-x-0 !translate-y-0"
                size="icon"
                variant="outline"
              />
              <CarouselNext
                aria-label="Next shops"
                className="!static !m-0 !size-10 !translate-x-0 !translate-y-0"
                size="icon"
                variant="outline"
              />
            </div>
          </div>

          <CarouselContent className="-ml-3 sm:-ml-4">
            {featured.map((merchant) => (
              <CarouselItem
                key={merchant.id}
                className="basis-[82%] pl-3 sm:basis-1/2 sm:pl-4 md:basis-1/3 lg:basis-1/4"
              >
                <Link
                  aria-label={`Browse ${merchant.name} shop listings`}
                  className="group flex h-full min-h-[148px] flex-col rounded-[22px] border border-[#e5e9e1] bg-white/70 p-4 shadow-[0_8px_24px_-22px_rgba(38,74,55,0.28)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_36px_-22px_rgba(38,74,55,0.24)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39745b] sm:p-5"
                  href={`/shop/${merchant.shopSlug}`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={`flex size-12 shrink-0 items-center justify-center rounded-[16px] text-sm font-bold text-brand-2 transition-transform duration-200 group-hover:scale-105 ${merchantToneClasses[merchant.tone]}`}
                    >
                      {merchant.initials}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="line-clamp-2 text-sm leading-snug font-semibold text-brand-6">
                        {merchant.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-brand-gray-4">
                        {merchant.specialty}
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-4 text-[10px] font-medium text-brand-gray-4">
                    <span className="inline-flex min-w-0 items-center gap-1">
                      <MapPin
                        aria-hidden="true"
                        className="shrink-0 text-brand-3"
                        size={13}
                      />
                      <span className="truncate">{merchant.location}</span>
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1">
                      <Star
                        aria-hidden="true"
                        className="text-[#b7823e]"
                        size={13}
                        weight="fill"
                      />
                      {merchant.rating}
                    </span>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <SectionBrowseLink
          href="/shops"
          label="Browse shops"
          placement="footer"
          screen="mobile"
        />
      </div>
    </section>
  )
}
