"use client"

import { useState } from "react"
import Image from "next/image"

import type { BlogImage } from "@/mock/blogPageMock"

type BlogGalleryProps = {
  images: readonly BlogImage[]
}

export function BlogGallery({ images }: BlogGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (images.length === 0) {
    return null
  }

  const activeImage = images[activeIndex] ?? images[0]

  return (
    <figure className="mx-auto w-full max-w-[900px]">
      <div className="relative aspect-[16/9] overflow-hidden rounded-[24px] bg-[#edf1ea] sm:rounded-[28px]">
        <Image
          key={activeImage.src}
          alt={activeImage.alt}
          className="object-cover motion-safe:animate-in motion-safe:duration-300 motion-safe:fade-in-0"
          fill
          loading={activeIndex === 0 ? "eager" : "lazy"}
          sizes="(max-width: 767px) 80vw, 720px"
          src={activeImage.src}
        />

        <span className="absolute bottom-4 left-4 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-[9px] font-semibold text-brand-3 backdrop-blur-sm sm:bottom-6 sm:left-6">
          {activeIndex + 1} / {images.length}
        </span>
        <figcaption className="absolute right-4 bottom-4 max-w-[60%] truncate rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-[9px] font-medium text-brand-3 backdrop-blur-sm sm:right-6 sm:bottom-6">
          {activeImage.alt}
        </figcaption>
      </div>

      {images.length > 1 && (
        <ul
          aria-label="Story images"
          className="mt-3 flex gap-2.5 overflow-x-auto px-0.5 pb-1 sm:mt-4 sm:justify-center"
        >
          {images.map((image, index) => {
            const isActive = index === activeIndex

            return (
              <li key={image.src}>
                <button
                  aria-current={isActive}
                  aria-label={`Show image ${index + 1} of ${images.length}: ${image.alt}`}
                  className={`relative size-14 shrink-0 overflow-hidden rounded-[12px] border-2 transition sm:size-16 ${
                    isActive
                      ? "border-brand-2 ring-2 ring-brand-2/25"
                      : "border-transparent opacity-65 hover:opacity-100"
                  }`}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                >
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="object-cover"
                    fill
                    sizes="64px"
                    src={image.src}
                  />
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </figure>
  )
}
