"use client"

import Image from "next/image"
import { useState } from "react"

import type { ProductGalleryImage } from "@/mock/productDetailMock"

type ProductGalleryProps = {
  images: ProductGalleryImage[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = images[activeIndex] ?? images[0]

  if (!activeImage) {
    return null
  }

  return (
    <div>
      <div className="relative aspect-[4/4.45] overflow-hidden rounded-[28px] border border-white/75 bg-white/55 backdrop-blur-xl sm:rounded-[32px]">
        <Image
          alt={activeImage.alt}
          className="object-cover"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 56vw"
          src={activeImage.src}
        />
        <span className="absolute top-4 left-4 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-[9px] font-bold tracking-[0.12em] text-[#38684f] uppercase backdrop-blur-md">
          {activeIndex + 1} / {images.length} photos
        </span>
        <span className="absolute right-4 bottom-4 rounded-full border border-white/60 bg-brand-2/80 px-3 py-1.5 text-[9px] font-semibold tracking-[0.08em] text-white uppercase backdrop-blur-md">
          Design preview
        </span>
      </div>

      <div className="mt-3 grid grid-cols-5 gap-2.5">
        {images.map((image, index) => (
          <button
            aria-label={`View image ${index + 1} of ${images.length}`}
            aria-pressed={index === activeIndex}
            className="group relative aspect-square overflow-hidden rounded-[16px] border border-white/60 bg-white/35 opacity-75 transition-all outline-none hover:opacity-100 focus-visible:ring-3 focus-visible:ring-[#7fa88c]/40 aria-pressed:border-[#39745b] aria-pressed:opacity-100 aria-pressed:ring-2 aria-pressed:ring-[#39745b]/25"
            key={`${image.src}-${index}`}
            onClick={() => setActiveIndex(index)}
            type="button"
          >
            <Image
              alt=""
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              fill
              sizes="(max-width: 640px) 18vw, 120px"
              src={image.src}
            />
          </button>
        ))}
      </div>
      <p className="mt-2 px-1 text-[9px] leading-4 text-brand-gray-3">
        Gallery images are mock alternatives for this design preview.
      </p>
    </div>
  )
}
