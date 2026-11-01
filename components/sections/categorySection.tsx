"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  Basket,
  CaretLeft,
  CaretRight,
  House,
  TShirt,
  Wrench,
} from "@phosphor-icons/react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { homePageMock, type HomeCategory } from "@/mock/homePageMock"

const categoryIcons = {
  home: House,
  fashion: TShirt,
  everyday: Basket,
  repair: Wrench,
} satisfies Record<HomeCategory["icon"], typeof House>

const categoryTones = {
  sage: "bg-[#e8eee5] text-[#4c6b53]",
  peach: "bg-[#f8ebe5] text-[#8a5a43]",
  lavender: "bg-[#f0edf6] text-[#5b5378]",
  butter: "bg-[#f5f1df] text-[#7c6c33]",
} satisfies Record<HomeCategory["tone"], string>

export function CategorySection() {
  const [api, setApi] = useState<CarouselApi | null>(null)

  return (
    <section className="pt-12 pb-14 sm:pt-16 sm:pb-20" id="categories">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div
          className="mb-5 flex items-end justify-between gap-4 sm:mb-7"
          data-aos="fade-up"
        >
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
              SHOP BY CATEGORY
            </p>
            <h2 className="font-serif text-[30px] leading-tight tracking-[-0.04em] text-brand sm:text-[38px]">
              Find what you need
            </h2>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Button
              aria-label="Previous categories"
              className="size-9 rounded-full border-[#d8e0d7] bg-white text-brand-3 hover:border-brand-3 hover:bg-[#f1f5ed]"
              onPress={() => api?.scrollPrev()}
              size="icon"
              variant="outline"
            >
              <CaretLeft aria-hidden="true" size={15} />
            </Button>
            <Button
              aria-label="Next categories"
              className="size-9 rounded-full border-[#d8e0d7] bg-white text-brand-3 hover:border-brand-3 hover:bg-[#f1f5ed]"
              onPress={() => api?.scrollNext()}
              size="icon"
              variant="outline"
            >
              <CaretRight aria-hidden="true" size={15} />
            </Button>
          </div>
        </div>

        <Carousel
          aria-label="Shop by category"
          className="relative"
          opts={{ align: "start", loop: true }}
          setApi={setApi}
        >
          <CarouselContent className="-ml-3 sm:-ml-4">
            {homePageMock.categories.map((category) => {
              const Icon = categoryIcons[category.icon]

              return (
                <CarouselItem
                  className="basis-[30%] pl-3 min-[480px]:basis-[23.5%] sm:basis-[calc(100%/3)] sm:pl-4 lg:basis-[calc(100%/4)] xl:basis-[calc(100%/5)]"
                  key={category.id}
                >
                  <Link
                    className="group flex h-full flex-col items-center justify-between gap-2 rounded-[16px] border border-[#e9e9e1] bg-white/70 p-2.5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c7d8c7] hover:bg-white hover:shadow-[0_18px_40px_-32px_rgba(27,65,56,0.5)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-2 sm:gap-3 sm:rounded-[20px] sm:p-4"
                    href={category.href}
                  >
                    <span className="relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-full border border-white/60 bg-[#f0eee6] max-[359px]:size-14 sm:size-20 lg:size-24">
                      {category.image ? (
                        <Image
                          alt=""
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          fill
                          sizes="(max-width: 639px) 64px, (max-width: 1023px) 80px, 96px"
                          src={category.image}
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className={`grid size-full place-items-center rounded-full ${categoryTones[category.tone]}`}
                        >
                          <Icon size={22} />
                        </span>
                      )}
                    </span>
                    <h3 className="line-clamp-2 text-[12px] leading-[1.25] font-semibold text-brand-6 min-[480px]:text-[13px] sm:text-[14px]">
                      {category.title}
                    </h3>
                  </Link>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
