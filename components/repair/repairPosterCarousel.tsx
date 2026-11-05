"use client"

import Image from "next/image"
import { useCallback, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  ArrowsCounterClockwise,
  ArrowUpRight,
  CaretDown,
  MapPin,
  Phone,
  Tag,
} from "@phosphor-icons/react"
import { Autoplay, EffectCoverflow, Keyboard } from "swiper/modules"
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"

import { Button } from "@/components/ui/button"

import { repairShops, type RepairShop } from "@/mock/repairShopsMock"

const sizeTone: Record<RepairShop["size"], string> = {
  Small: "bg-[#e8f1e3] text-[#38684f]",
  Medium: "bg-[#f0ebf8] text-[#695381]",
  Large: "bg-[#f9e8df] text-[#a65e46]",
}

const categoryTone: Record<string, string> = {
  "Thrift Fashion": "bg-[#f0edf6] text-[#695381]",
  "Repair Clothing": "bg-[#e8f1e3] text-[#38684f]",
  "Repair Bag": "bg-[#f9e8df] text-[#a65e46]",
  "Repair Umbrella": "bg-[#f5f1df] text-[#8a7440]",
  "Repair Bike": "bg-[#e2eef0] text-[#3e6f78]",
  "Repair Phone": "bg-[#ebe9f3] text-[#6d718e]",
}

const defaultCategoryTone = "bg-[#e8f1e3] text-[#38684f]"

const metaIconClassName =
  "grid size-5 shrink-0 place-items-center rounded-md bg-brand-yellow-bg text-brand-3"

const ctaFocusClassName =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2"

export function RepairPosterCarousel() {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const total = repairShops.length
  const totalLabel = String(total).padStart(2, "0")

  const formatIndex = useCallback(
    (index: number) => String(index + 1).padStart(2, "0"),
    []
  )

  return (
    <section aria-labelledby="repair-shops-title" className="mt-12 sm:mt-16">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-[560px]">
          <p className="text-[10px] font-bold tracking-[0.2em] text-brand-gray-5 uppercase sm:text-xs">
            GREEN PLACES IN FOCUS
          </p>
          <h2
            className="mt-2 font-serif text-[26px] leading-tight tracking-[-0.04em] text-brand sm:text-[32px]"
            id="repair-shops-title"
          >
            Meet the businesses on the map
          </h2>
          <p className="mt-2 text-[13px] leading-6 text-brand-light sm:text-sm sm:leading-7">
            Local repair, thrift, and reuse businesses keeping good things in
            circulation. Tap a card to bring it forward, then read more for the
            full details.
          </p>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <span
            aria-hidden="true"
            className="hidden text-[11px] font-semibold text-brand-gray-4 tabular-nums sm:inline"
          >
            {formatIndex(activeIndex)}
            <span className="mx-1 text-brand-gray-5/50">/</span>
            {totalLabel}
          </span>
          <div className="flex items-center gap-2">
            <Button
              aria-label="Previous business"
              className="size-10 rounded-full border-[#d8e0d7] bg-white text-brand-3 hover:border-brand-3 hover:bg-[#f1f5ed]"
              onPress={() => swiper?.slidePrev()}
              size="icon"
              variant="outline"
            >
              <ArrowLeft aria-hidden="true" size={15} />
            </Button>
            <Button
              aria-label="Next business"
              className="size-10 rounded-full border-[#d8e0d7] bg-white text-brand-3 hover:border-brand-3 hover:bg-[#f1f5ed]"
              onPress={() => swiper?.slideNext()}
              size="icon"
              variant="outline"
            >
              <ArrowRight aria-hidden="true" size={15} />
            </Button>
          </div>
        </div>
      </div>

      <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: { slidesPerView: 2.6, spaceBetween: 16 },
          1024: { slidesPerView: 3.4, spaceBetween: 20 },
        }}
        centeredSlides
        className="!pb-2"
        coverflowEffect={{
          depth: 120,
          modifier: 1,
          rotate: 0,
          slideShadows: false,
          stretch: 0,
        }}
        effect="coverflow"
        grabCursor
        keyboard={{ enabled: true }}
        loop
        modules={[Autoplay, EffectCoverflow, Keyboard]}
        onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
        onSwiper={setSwiper}
        slidesPerView={1.6}
        spaceBetween={12}
      >
        {repairShops.map((shop, index) => (
          <SwiperSlide className="!h-auto" key={shop.id}>
            {({ isActive }) => {
              const isExpanded = expandedId === shop.id

              return (
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[22px] bg-white transition-all duration-300 ${
                    isActive
                      ? "-translate-y-1 border border-brand-2/30 shadow-[0_30px_60px_-26px_rgba(23,78,70,0.6)] ring-1 ring-brand-2/20"
                      : "border border-white/70 shadow-[0_14px_34px_-20px_rgba(27,65,56,0.45)] hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-22px_rgba(27,65,56,0.55)]"
                  }`}
                  onFocusCapture={() => {
                    if (!isActive) swiper?.slideToLoop(index)
                  }}
                >
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 z-20 h-[3px] bg-gradient-to-r from-brand-2 via-[#3f9b7b] to-[#a8d96b] motion-safe:animate-in motion-safe:duration-300 motion-safe:fade-in-0"
                    />
                  )}

                  <div className="relative aspect-[5/3] w-full shrink-0 overflow-hidden bg-[#e8eee5]">
                    <Image
                      alt={shop.name}
                      className={`object-cover transition-transform duration-700 ${
                        isActive ? "scale-[1.03]" : "group-hover:scale-[1.06]"
                      }`}
                      fill
                      sizes="(max-width: 640px) 60vw, (max-width: 1024px) 36vw, 300px"
                      src={shop.image}
                    />

                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 bg-[#10241d]/25 transition-opacity duration-500 ${
                        isActive ? "opacity-0" : "opacity-100"
                      }`}
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#10241d]/55 to-transparent"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#10241d]/80 via-[#10241d]/30 to-transparent"
                    />

                    <span
                      className={`absolute top-2.5 left-2.5 inline-flex items-center rounded-full border border-white/50 px-2 py-0.5 text-[8.5px] font-bold tracking-[0.1em] uppercase shadow-sm backdrop-blur-sm ${sizeTone[shop.size]}`}
                    >
                      {shop.size}
                    </span>
                    <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full border border-white/40 bg-black/25 px-2 py-0.5 text-[8.5px] font-semibold text-white backdrop-blur-sm">
                      <MapPin aria-hidden="true" size={10} weight="fill" />
                      {shop.city}
                    </span>

                    <span
                      className={`absolute bottom-2.5 left-2.5 inline-flex max-w-[60%] items-center truncate rounded-full px-2.5 py-1 text-[8.5px] font-bold tracking-[0.12em] uppercase shadow-sm ${
                        categoryTone[shop.category] ?? defaultCategoryTone
                      }`}
                    >
                      {shop.category}
                    </span>
                    {isActive && (
                      <span className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1.5 rounded-full bg-brand-2 px-2.5 py-1 text-[8.5px] font-bold tracking-[0.1em] text-white uppercase shadow-lg shadow-brand/30 motion-safe:animate-in motion-safe:duration-300 motion-safe:fade-in-0">
                        <span
                          aria-hidden="true"
                          className="size-1.5 animate-pulse rounded-full bg-brand-green"
                        />
                        In focus
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
                    <h3 className="font-serif text-[16px] leading-[1.15] tracking-[-0.04em] text-brand sm:text-[18px]">
                      {shop.name}
                    </h3>

                    <p
                      className={`text-[11.5px] leading-5 text-brand-light sm:text-[12px] ${
                        isExpanded ? "" : "line-clamp-2"
                      }`}
                    >
                      {shop.description}
                    </p>

                    <button
                      aria-expanded={isExpanded}
                      className="inline-flex w-fit items-center gap-1 text-[10px] font-bold text-brand-3 transition-colors hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2"
                      onClick={() => setExpandedId(isExpanded ? null : shop.id)}
                      type="button"
                    >
                      {isExpanded ? "Show less" : "Read more"}
                      <CaretDown
                        aria-hidden="true"
                        className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                        size={11}
                        weight="bold"
                      />
                    </button>

                    {isExpanded && (shop.social || shop.contact) && (
                      <div className="space-y-1 rounded-xl bg-[#f6f8f4] px-3 py-2.5 text-[10px] leading-4 text-brand-light motion-safe:animate-in motion-safe:duration-300 motion-safe:fade-in-0 motion-safe:slide-in-from-top-1">
                        {shop.contact && (
                          <p>
                            <span className="font-bold text-brand-6">
                              Contact:{" "}
                            </span>
                            {shop.contact}
                          </p>
                        )}
                        {shop.social && (
                          <p>
                            <span className="font-bold text-brand-6">
                              Social:{" "}
                            </span>
                            {shop.social}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="mt-auto flex flex-col gap-2 border-t border-[#e9ede6] pt-3">
                      <div className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className={`${metaIconClassName} mt-0.5`}
                        >
                          <MapPin size={11} weight="fill" />
                        </span>
                        <span className="line-clamp-2 text-[10.5px] leading-4 text-brand-light">
                          {shop.address}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span aria-hidden="true" className={metaIconClassName}>
                          <Phone size={11} weight="fill" />
                        </span>
                        <a
                          className="text-[10.5px] font-semibold text-brand-3 transition-colors hover:text-brand-orange"
                          href={`tel:${shop.phone.replace(/\s/g, "")}`}
                        >
                          {shop.phone}
                        </a>
                      </div>
                      <div className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className={`${metaIconClassName} mt-0.5`}
                        >
                          <Tag size={11} weight="fill" />
                        </span>
                        <span className="line-clamp-2 text-[10.5px] leading-4 text-brand-light">
                          {shop.priceRange}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        className={`inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full bg-brand-2 px-3 text-[10.5px] font-bold text-white transition-colors hover:bg-[#1f6157] ${ctaFocusClassName}`}
                        href={`tel:${shop.phone.replace(/\s/g, "")}`}
                      >
                        <Phone aria-hidden="true" size={13} weight="bold" />
                        Call
                      </a>
                      <a
                        className={`inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full border border-[#d8e0d7] bg-white px-3 text-[10.5px] font-bold text-brand-3 transition-colors hover:border-brand-3 hover:bg-[#f1f5ed] ${ctaFocusClassName}`}
                        href={shop.mapUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Directions
                        <ArrowUpRight aria-hidden="true" size={13} />
                      </a>
                    </div>
                  </div>

                  {!isActive && (
                    <button
                      aria-label={`Bring ${shop.name} to the front`}
                      className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-[22px] bg-transparent outline-none"
                      onClick={() => swiper?.slideToLoop(index)}
                      tabIndex={-1}
                      type="button"
                    >
                      <span className="inline-flex translate-y-1.5 items-center gap-1.5 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-[10px] font-bold text-brand-3 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        Bring to front
                        <ArrowRight aria-hidden="true" size={12} />
                      </span>
                    </button>
                  )}
                </article>
              )
            }}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-4 flex flex-col items-center gap-3">
        <div
          aria-label="Choose a business"
          className="flex items-center gap-0.5"
          role="group"
        >
          {repairShops.map((shop, index) => (
            <button
              aria-current={index === activeIndex ? "true" : undefined}
              aria-label={`Show ${shop.name}`}
              className="group grid size-7 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand-2"
              key={shop.id}
              onClick={() => swiper?.slideToLoop(index)}
              type="button"
            >
              <span
                className={`relative flex h-1.5 items-center justify-center rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-6 h-6 rounded-full bg-[#39745b] shadow-[0_0_0_3px_rgba(57,116,91,0.14)]"
                    : "w-3 h-3 bg-[#cbd5c8] group-hover:w-3 group-hover:bg-[#8ba38f]"
                }`}
              >
                <ArrowsCounterClockwise
                  aria-hidden="true"
                  className={`absolute transition-transform duration-300 ${
                    index === activeIndex ? "scale-100 text-white" : "scale-0"
                  }`}
                  size={10}
                  weight="bold"
                />
              </span>
            </button>
          ))}
        </div>
        <p aria-live="polite" className="sr-only">
          Business {formatIndex(activeIndex)} of {totalLabel} shown
        </p>
      </div>
    </section>
  )
}
