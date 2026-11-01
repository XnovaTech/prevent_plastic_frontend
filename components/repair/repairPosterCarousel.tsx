"use client"

import Image from "next/image"
import { useCallback, useState } from "react"
import type { KeyboardEvent } from "react"
import {
  ArrowLeft,
  ArrowRight,
  ArrowsOut,
  XIcon,
} from "@phosphor-icons/react"
import { EffectCoverflow, Keyboard } from "swiper/modules"
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogTitle } from "@/components/ui/dialog"

const posterDirectory = "/repair/Green Consumption and Production Map for Myanmar"

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

const posters = posterFiles.map((file, index) => ({
  alt: `Poster of a green business featured on the Green Consumption and Production map for Myanmar (${index + 1} of ${posterFiles.length})`,
  src: `${encodeURI(posterDirectory)}/${encodeURI(file)}`,
}))

const total = posters.length
const totalLabel = String(total).padStart(2, "0")

function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0")
}

export function RepairPosterCarousel() {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const stepPoster = useCallback((delta: number) => {
    setExpandedIndex((current) =>
      current === null ? current : (current + delta + total) % total
    )
  }, [])

  const handleLightboxKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        event.stopPropagation()
        stepPoster(-1)
      }

      if (event.key === "ArrowRight") {
        event.preventDefault()
        event.stopPropagation()
        stepPoster(1)
      }
    },
    [stepPoster]
  )

  const expandedPoster = expandedIndex === null ? null : posters[expandedIndex]

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
          640: { slidesPerView: 2.4, spaceBetween: 22 },
          1024: { slidesPerView: 3.2, spaceBetween: 26 },
        }}
        centeredSlides
        className="!pb-2"
        coverflowEffect={{
          depth: 180,
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
        slidesPerView={1.55}
        spaceBetween={16}
      >
        {posters.map((poster, index) => (
          <SwiperSlide className="!h-auto" key={poster.src}>
            {({ isActive }) => (
              <button
                aria-label={
                  isActive
                    ? `Read poster ${index + 1} of ${total} full size`
                    : `Bring poster ${index + 1} of ${total} to the front`
                }
                className="group block w-full rounded-[22px] text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f6f0]"
                onClick={() =>
                  isActive ? setExpandedIndex(index) : swiper?.slideToLoop(index)
                }
                type="button"
              >
                <figure className="relative aspect-[1414/2000] w-full overflow-hidden rounded-[22px] border border-white/80 bg-white shadow-[0_30px_60px_-40px_rgba(27,65,56,0.7)] transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_36px_70px_-38px_rgba(27,65,56,0.75)] group-active:translate-y-0">
                  <Image
                    alt={poster.alt}
                    className="object-cover"
                    fill
                    sizes="(max-width: 640px) 62vw, (max-width: 1024px) 40vw, 400px"
                    src={poster.src}
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 bg-brand/25 transition-opacity duration-500 ${
                      isActive ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-2.5 bottom-2.5 flex size-8 items-center justify-center rounded-full bg-white/90 text-brand-3 shadow-sm backdrop-blur-sm transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100"
                    >
                      <ArrowsOut size={13} weight="bold" />
                    </span>
                  )}
                </figure>
              </button>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-4 flex flex-col items-center gap-3">
        <div
          aria-label="Choose a poster"
          className="flex items-center gap-0.5"
          role="group"
        >
          {posters.map((poster, index) => (
            <button
              aria-current={index === activeIndex ? "true" : undefined}
              aria-label={`Show poster ${index + 1} of ${total}`}
              className="group grid size-7 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand-2"
              key={poster.src}
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
          Poster {formatIndex(activeIndex)} of {totalLabel} shown
        </p>
      </div>

      <Dialog
        className="w-full gap-0 overflow-hidden rounded-[26px] bg-[#0d201a] p-0 text-white ring-1 ring-white/10 sm:max-w-[min(94vw,620px)]"
        isOpen={expandedIndex !== null}
        onOpenChange={(open) => {
          if (!open) setExpandedIndex(null)
        }}
        showCloseButton={false}
      >
        {expandedPoster && expandedIndex !== null && (
          <div onKeyDown={handleLightboxKeyDown}>
            <DialogTitle className="sr-only">
              Poster {formatIndex(expandedIndex)} of {totalLabel}
            </DialogTitle>

            <div className="relative bg-[#0d201a]">
              <Image
                alt={expandedPoster.alt}
                className="mx-auto h-auto max-h-[72vh] w-auto max-w-full object-contain"
                height={2000}
                sizes="(max-width: 640px) 96vw, 620px"
                src={expandedPoster.src}
                width={1414}
              />

              <DialogClose
                aria-label="Close poster"
                className="absolute top-3 right-3 size-9 rounded-full border-white/20 bg-white/90 text-brand-3 shadow-md hover:bg-white"
                size="icon"
                variant="outline"
              >
                <XIcon aria-hidden="true" size={15} />
              </DialogClose>

              <Button
                aria-label="Previous poster"
                className="absolute top-1/2 left-3 size-9 -translate-y-1/2 rounded-full border-white/20 bg-white/90 text-brand-3 shadow-md hover:bg-white"
                onPress={() => stepPoster(-1)}
                size="icon"
                variant="outline"
              >
                <ArrowLeft aria-hidden="true" size={15} />
              </Button>
              <Button
                aria-label="Next poster"
                className="absolute top-1/2 right-3 size-9 -translate-y-1/2 rounded-full border-white/20 bg-white/90 text-brand-3 shadow-md hover:bg-white"
                onPress={() => stepPoster(1)}
                size="icon"
                variant="outline"
              >
                <ArrowRight aria-hidden="true" size={15} />
              </Button>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-white/60 uppercase">
                Green Consumption and Production map
              </p>
              <p className="hidden text-[10px] text-white/45 sm:block">
                Use ← → to browse
              </p>
              <p className="text-[11px] font-semibold text-white/80 tabular-nums">
                {formatIndex(expandedIndex)}
                <span className="mx-1 text-white/40">/</span>
                {totalLabel}
              </p>
            </div>
          </div>
        )}
      </Dialog>
    </section>
  )
}
