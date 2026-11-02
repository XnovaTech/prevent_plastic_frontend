"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"
import { EffectCoverflow, Keyboard } from "swiper/modules"
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"

import { Button } from "@/components/ui/button"

const posterDirectory =
  "/repair/Green Consumption and Production Map for Myanmar"

const posterFiles = [
  "Green Consumption Hotel.png",
  "Green Consumption Hotel (2).png",
  "Green Consumption Hotel (3).png",
  "Green Consumption Hotel (4).png",
  "Green Consumption Hotel (5).png",
  "Green Consumption Hotel (6).png",
  "Green Consumption Hotel (7).png",
  "Green Consumption Hotel (8).png",
  "Green Consumption Hotel (9).png",
  "Green Consumption Hotel (10).png",
]

const total = posterFiles.length
const totalLabel = String(total).padStart(2, "0")

function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0")
}

export function RepairPosterCarousel() {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section aria-labelledby="repair-posters-title" className="mt-12 sm:mt-16">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-[560px]">
          <p className="text-[10px] font-bold tracking-[0.2em] text-brand-gray-5 uppercase sm:text-xs">
            GREEN PLACES IN FOCUS
          </p>
          <h2
            className="mt-2 font-serif text-[26px] leading-tight tracking-[-0.04em] text-brand sm:text-[32px]"
            id="repair-posters-title"
          >
            Meet the businesses on the map
          </h2>
          <p className="mt-2 text-[13px] leading-6 text-brand-light sm:text-sm sm:leading-7">
            Posters from the Green Consumption and Production map. Tap a card to
            bring it forward, then again to read it full size.
          </p>
        </div>

        <div className="flex items-center gap-3">
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
              aria-label="Previous poster"
              className="size-10 rounded-full border-[#d8e0d7] bg-white text-brand-3 hover:border-brand-3 hover:bg-[#f1f5ed]"
              onPress={() => swiper?.slidePrev()}
              size="icon"
              variant="outline"
            >
              <ArrowLeft aria-hidden="true" size={15} />
            </Button>
            <Button
              aria-label="Next poster"
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
        breakpoints={{
          640: { slidesPerView: 2.4, spaceBetween: 20 },
          1024: { slidesPerView: 3.2, spaceBetween: 24 },
        }}
        // removed centeredSlides so navigation is predictable
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
        modules={[EffectCoverflow, Keyboard]}
        onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
        onSwiper={setSwiper}
        // improved: 1 slide at a time, better spacing
        slidesPerView={1}
        spaceBetween={20}
      >
        {posterFiles.map((file, index) => (
          <SwiperSlide
            className="group relative aspect-[1414/2000] overflow-hidden rounded-[22px] border border-white/80 bg-white shadow-[0_12px_24px_-4px_rgba(23,62,54,0.15)] transition-[transform,box-shadow] duration-300"
            key={file}
          >
            <Image
              alt={`Poster ${index + 1} of ${totalLabel}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_24px_50px_-8px_rgba(23,62,54,0.25)]"
              fill
              sizes="(max-width: 640px) 100%, (max-width: 1024px) 60vw, 400px"
              src={`${encodeURI(posterDirectory)}/${encodeURI(file)}`}
            />
            {/* subtle focus state for keyboard navigation */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-brand/10 transition-opacity duration-300 group-focus-within:opacity-100"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Improved bottom navigator - larger, more clickable, always visible */}
      <div
        className="mt-4 flex items-center justify-center gap-1.5"
        role="group"
        aria-label="Poster selection"
      >
        {posterFiles.map((file, index) => (
          <button
            key={file}
            aria-label={`Show poster ${index + 1} of ${total}`}
            className={`flex size-8 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f6f0] ${
              index === activeIndex
                ? "bg-[#39745b] text-white"
                : "bg-white/80 text-brand-2 hover:bg-[#eef4e8] hover:text-brand-2"
            }`}
            onClick={() => swiper?.slideToLoop(index)}
            type="button"
          >
            <span className="size-1.5 rounded-full transition-all duration-200" />
          </button>
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        Poster {formatIndex(activeIndex)} of {totalLabel} shown
      </p>
    </section>
  )
}
