"use client"

import { useCallback, useEffect, useState } from "react"

import type { CarouselApi } from "@/components/ui/carousel"

export function useHeroSlider(slideCount: number) {
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  const handleApiChange = useCallback((carouselApi: CarouselApi) => {
    setApi(carouselApi)
  }, [])

  const goToSlide = useCallback((index: number) => api?.scrollTo(index), [api])

  useEffect(() => {
    if (!api) return

    const updateActiveIndex = () => setActiveIndex(api.selectedScrollSnap())

    updateActiveIndex()
    api.on("select", updateActiveIndex)

    return () => {
      api.off("select", updateActiveIndex)
    }
  }, [api])

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    )
    const updateMotionPreference = () =>
      setIsReducedMotion(motionPreference.matches)

    updateMotionPreference()
    motionPreference.addEventListener("change", updateMotionPreference)

    return () => {
      motionPreference.removeEventListener("change", updateMotionPreference)
    }
  }, [])

  useEffect(() => {
    if (
      !api ||
      isHovered ||
      isFocused ||
      isAutoPlayPaused ||
      isReducedMotion ||
      slideCount < 2
    ) {
      return
    }

    const intervalId = window.setInterval(() => api.scrollNext(), 6500)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [api, isAutoPlayPaused, isFocused, isHovered, isReducedMotion, slideCount])

  return {
    activeIndex,
    api,
    goToSlide,
    handleApiChange,
    isAutoPlayPaused,
    isPaused: isAutoPlayPaused || isFocused || isHovered || isReducedMotion,
    isReducedMotion,
    setIsAutoPlayPaused,
    setIsFocused,
    setIsHovered,
  }
}
