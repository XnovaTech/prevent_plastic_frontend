"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Phone,
  Storefront,
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

export function RepairPosterCarousel() {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const total = repairShops.length
  const totalLabel = String(total).padStart(2, "0")

  const formatIndex = useCallback(
    (index: number) => String(index + 1).padStart(2, "0"),
    []
  )

  return (
    <section
      aria-labelledby="repair-shops-title"
      className="mt-12 sm:mt-16"
    >
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
            circulation. Tap a card to bring it forward, then again to read it
            full size.
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
        autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
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
            {({ isActive }) => (
              <button
                aria-label={
                  isActive
                    ? `Read ${shop.name} full size`
                    : `Bring ${shop.name} to the front`
                }
                className="group block w-full outline-none focus-visible:ring-2 focus-visible:ring-brand-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f6f0]"
                onClick={() =>
                  isActive ? undefined : swiper?.slideToLoop(index)
                }
                type="button"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-white/80 bg-white shadow-[0_12px_32px_-16px_rgba(27,65,56,0.45)] transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_45px_-18px_rgba(27,65,56,0.55)]">
                  <div className="relative aspect-[5/3] w-full shrink-0 overflow-hidden bg-[#e8eee5]">
                    <Image
                      alt={shop.name}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      fill
                      sizes="(max-width: 640px) 60vw, (max-width: 1024px) 36vw, 300px"
                      src={shop.image}
                    />
                    <span
                      className={`pointer-events-none absolute top-2 left-2 rounded-full px-2 py-0.5 text-[8px] font-bold tracking-[0.08em] uppercase shadow-sm ${sizeTone[shop.size]}`}
                    >
                      {shop.size}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 bg-brand/20 transition-opacity duration-500 ${
                        isActive ? "opacity-0" : "opacity-100"
                      }`}
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
                    <div>
                      <p className="text-[8px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
                        {shop.category}
                      </p>
                      <h3 className="mt-0.5 font-serif text-[16px] leading-tight tracking-[-0.04em] text-brand sm:text-[18px]">
                        {shop.name}
                      </h3>
                    </div>

                    <p className="line-clamp-2 text-[11px] leading-4 text-brand-light sm:text-[12px] sm:leading-5">
                      {shop.description}
                    </p>

                    <div className="mt-auto flex flex-col gap-1.5 border-t border-[#e4e8e1] pt-2.5">
                      <a
                        className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-brand-3 transition-colors hover:text-brand-orange"
                        href={`tel:${shop.phone.replace(/\s/g, "")}`}
                      >
                        <Phone aria-hidden="true" size={12} weight="duotone" />
                        {shop.phone}
                      </a>
                      <div className="flex items-start gap-1.5 text-[10px] text-brand-light">
                        <MapPin
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-[#5c7a6b]"
                          size={12}
                          weight="duotone"
                        />
                        <span className="line-clamp-2">{shop.address}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] font-semibold text-brand-gray-3">
                          {shop.priceRange}
                        </span>
                        <Link
                          className="inline-flex items-center gap-1 text-[9px] font-semibold text-brand-3 hover:text-brand-orange"
                          href={shop.mapUrl}
                          rel="noreferrer"
                          target="_blank"
                        >
                          Map
                          <Storefront aria-hidden="true" size={11} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </button>
            )}
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
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-6 bg-[#39745b]"
                    : "w-1.5 bg-[#cbd5c8] group-hover:w-3 group-hover:bg-[#8ba38f]"
                }`}
              />
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
