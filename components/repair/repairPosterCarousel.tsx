"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"
import { EffectCoverflow, Keyboard } from "swiper/modules"
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"

import { Button } from "@/components/ui/button"

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

export function RepairPosterCarousel() {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section
      aria-labelledby="repair-posters-title"
      className="mt-12 sm:mt-16"
    >
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
            Swipe through posters from the Green Consumption and Production map.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            aria-label="Previous poster"
            className="size-9 rounded-full border-[#d8e0d7] bg-white text-brand-3 hover:bg-[#f1f5ed]"
            onPress={() => swiper?.slidePrev()}
            size="icon"
            variant="outline"
          >
            <ArrowLeft aria-hidden="true" size={15} />
          </Button>
          <Button
            aria-label="Next poster"
            className="size-9 rounded-full border-[#d8e0d7] bg-white text-brand-3 hover:bg-[#f1f5ed]"
            onPress={() => swiper?.slideNext()}
            size="icon"
            variant="outline"
          >
            <ArrowRight aria-hidden="true" size={15} />
          </Button>
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
        {posters.map((poster) => (
          <SwiperSlide className="!h-auto" key={poster.src}>
            <figure className="relative aspect-[1414/2000] w-full overflow-hidden rounded-[22px] border border-white/80 bg-white shadow-[0_30px_60px_-40px_rgba(27,65,56,0.7)]">
              <Image
                alt={poster.alt}
                className="object-cover"
                fill
                sizes="(max-width: 640px) 62vw, (max-width: 1024px) 34vw, 320px"
                src={poster.src}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-brand/25 transition-opacity duration-500 [.swiper-slide-active_&]:opacity-0"
              />
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        aria-label="Choose a poster"
        className="mt-5 flex items-center justify-center gap-1.5"
      >
        {posters.map((poster, index) => (
          <button
            aria-label={`Go to poster ${index + 1}`}
            aria-pressed={index === activeIndex}
            className={`h-2 rounded-full transition-[width,background-color] ${
              index === activeIndex
                ? "w-6 bg-[#39745b]"
                : "w-2 bg-[#cbd5c8] hover:bg-[#8ba38f]"
            }`}
            key={poster.src}
            onClick={() => swiper?.slideToLoop(index)}
            type="button"
          />
        ))}
      </div>
    </section>
  )
}
