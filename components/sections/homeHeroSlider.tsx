"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Pause, Play } from "@phosphor-icons/react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { useHeroSlider } from "@/hooks/useHeroSlider"
import { homePageMock } from "@/mock/homePageMock"

const heroCarouselOptions = {
  align: "start" as const,
  duration: 24,
  loop: true,
}

export function HomeHeroSlider() {
  const {
    activeIndex,
    api,
    goToSlide,
    handleApiChange,
    isAutoPlayPaused,
    isPaused,
    isReducedMotion,
    setIsAutoPlayPaused,
    setIsFocused,
    setIsHovered,
  } = useHeroSlider(homePageMock.hero.slides.length)

  return (
    <section
      className="bg-transparent px-4 pt-4 pb-5 sm:px-8 sm:pt-6 sm:pb-7 lg:px-12"
      id="home"
    >
      <div
        className="relative mx-auto max-w-[1440px]"
        onBlurCapture={(event) => {
          if (
            event.relatedTarget instanceof Node &&
            event.currentTarget.contains(event.relatedTarget)
          ) {
            return
          }

          setIsFocused(false)
        }}
        onFocusCapture={() => setIsFocused(true)}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <Carousel
          aria-label="Featured marketplace stories"
          className="overflow-hidden rounded-[28px] sm:rounded-[32px]"
          opts={heroCarouselOptions}
          setApi={handleApiChange}
        >
          <CarouselContent
            aria-live={isPaused ? "polite" : "off"}
            className="-ml-0"
          >
            {homePageMock.hero.slides.map((slide, index) => {
              const HeadingTag = activeIndex === index ? "h1" : "h2"

              return (
                <CarouselItem
                  aria-hidden={activeIndex !== index}
                  aria-label={`${index + 1} of ${homePageMock.hero.slides.length}: ${slide.heading} ${slide.highlight}`}
                  className="pl-0"
                  inert={activeIndex !== index}
                  key={slide.id}
                >
                  <div
                    className={`relative grid min-h-[400px] grid-cols-1 items-center gap-4 px-5 py-5 sm:px-8 md:min-h-[385px] md:grid-cols-[1.08fr_0.92fr] md:gap-7 md:px-12 md:py-8 ${slide.background}`}
                  >
                    <div className="relative z-10 max-w-[620px]">
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#31594a]/15 bg-white/45 px-3 py-1.5 text-[9px] font-bold tracking-[0.15em] text-[#496b57] uppercase sm:text-[10px]">
                        <span className="size-1.5 rounded-full bg-brand-orange-2" />
                        {slide.eyebrow}
                      </span>
                      <HeadingTag className="mt-4 font-serif text-[38px] leading-[1.02] tracking-[-0.055em] text-brand sm:text-[46px] md:mt-5 md:text-[52px] lg:text-[60px]">
                        {slide.heading}
                        <br />
                        <span className="relative inline-block text-[#39745b] italic">
                          {slide.highlight}
                          <span className="absolute right-0 -bottom-1 h-1.5 w-[94%] -rotate-2 rounded-[50%] border-b-2 border-[#e9a27e]" />
                        </span>
                      </HeadingTag>
                      <p className="mt-3 max-w-[440px] text-[12px] leading-5 text-brand-light sm:mt-4 sm:text-[13px] sm:leading-6">
                        {slide.description}
                      </p>
                      <Link
                        className="mt-4 inline-flex h-10 items-center gap-3 rounded-full bg-brand-2 px-4 text-[11px] font-bold text-white transition-transform hover:-translate-y-0.5 sm:mt-5 sm:h-11 sm:px-5 sm:text-xs"
                        href={slide.actionHref}
                      >
                        {slide.actionLabel}
                        <span className="flex size-6 items-center justify-center rounded-full bg-[#d9f09b] text-brand-2">
                          <ArrowRight aria-hidden="true" size={14} />
                        </span>
                      </Link>
                    </div>
                    <div className="relative mx-auto h-[126px] w-full max-w-[510px] overflow-hidden rounded-[20px] bg-white/50 sm:h-[160px] md:h-[285px] md:max-w-none md:rounded-[24px]">
                      <Image
                        alt={slide.imageAlt}
                        className="object-cover"
                        fill
                        preload={index === 0}
                        sizes="(max-width: 767px) 90vw, (max-width: 1200px) 42vw, 520px"
                        src={slide.image}
                      />
                      <span className="absolute right-3 bottom-3 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[9px] font-semibold tracking-[0.1em] text-[#365b49] uppercase backdrop-blur sm:right-4 sm:bottom-4 sm:px-3.5 sm:py-2 sm:text-[10px]">
                        {slide.imageLabel}
                      </span>
                    </div>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>

        <Image
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-3 right-4 z-10 h-10 w-16 object-contain md:top-[31%] md:right-[43%] md:h-[76px] md:w-[112px]"
          height={100}
          src="/illustrations/marketDoodle.svg"
          width={150}
        />

        <div className="mt-2 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Button
              aria-label="Previous featured story"
              className="size-9 rounded-full border-[#d8e0d7] bg-white text-brand-3 hover:bg-[#f1f5ed]"
              onPress={() => api?.scrollPrev()}
              size="icon"
              variant="outline"
            >
              <ArrowLeft aria-hidden="true" size={15} />
            </Button>
            <Button
              aria-label="Next featured story"
              className="size-9 rounded-full border-[#d8e0d7] bg-white text-brand-3 hover:bg-[#f1f5ed]"
              onPress={() => api?.scrollNext()}
              size="icon"
              variant="outline"
            >
              <ArrowRight aria-hidden="true" size={15} />
            </Button>
          </div>
          <div aria-label="Choose a featured story" className="flex gap-1.5">
            {homePageMock.hero.slides.map((slide, index) => (
              <button
                aria-label={`Go to story ${index + 1}`}
                aria-pressed={activeIndex === index}
                className={`h-2 rounded-full transition-[width,background-color] ${
                  activeIndex === index
                    ? "w-6 bg-[#39745b]"
                    : "w-2 bg-[#cbd5c8] hover:bg-[#8ba38f]"
                }`}
                key={slide.id}
                onClick={() => goToSlide(index)}
                type="button"
              />
            ))}
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button
              aria-label={
                isAutoPlayPaused
                  ? "Resume automatic slides"
                  : "Pause automatic slides"
              }
              className="size-9 rounded-full border-[#d8e0d7] bg-white text-brand-3 hover:bg-[#f1f5ed]"
              isDisabled={isReducedMotion}
              onPress={() => setIsAutoPlayPaused(!isAutoPlayPaused)}
              size="icon"
              variant="outline"
            >
              {isAutoPlayPaused ? (
                <Play aria-hidden="true" size={14} />
              ) : (
                <Pause aria-hidden="true" size={14} />
              )}
            </Button>
            <span className="w-[46px] text-right text-[10px] font-medium text-[#77817a]">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(homePageMock.hero.slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
