"use client"

import Link from "next/link"
import Image from "next/image"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { homePageMock } from "@/mock/homePageMock"

export function CategorySection() {
  return (
    <section className="pt-12 pb-14 sm:pt-16 sm:pb-20" id="individual">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div
          className="mb-7 flex items-end justify-between gap-4"
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
       
        </div>

        <Carousel
          aria-label="Shop by category"
          autoPlay
          className="overflow-hidden relative"
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent className="-ml-0">
            {homePageMock.categories.map((category) => {
              return (
                <CarouselItem
                  key={category.id}
                  className="pl-4 basis-[calc(100%/4)] sm:basis-[calc(100%/3)] lg:basis-[calc(100%/4)]"
                >
                  <Link
                    className="group flex flex-col items-center gap-3 rounded-[20px] border border-[#e9e9e1] bg-white/70 p-4 transition-all hover:-translate-y-1 hover:border-[#c7d8c7] hover:bg-white"
                    href={category.href}
                    id={category.id === "repair" ? "repair" : undefined}
                  >
                    <div
                      className="relative size-24 shrink-0 rounded-full overflow-hidden border-2 border-white/40 bg-[#f0eee6]"
                    >
                      {category.image ? (
                        <Image
                          alt={category.title}
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                          fill
                          sizes="120px"
                          src={category.image}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full bg-white/40">
                          <span className="text-[#8aa18e]">{category.title.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-[14px] font-semibold text-brand-6 leading-tight text-center sm:text-[15px]">
                      {category.title}
                    </h3>
                  </Link>
                </CarouselItem>
              )
            })}
          </CarouselContent>

          <CarouselPrevious
            className="absolute inset-y-0 -left-3 z-20 my-auto"
            variant="outline"
            size="icon-sm"
          />
          <CarouselNext
            className="absolute inset-y-0 -right-3 z-20 my-auto"
            variant="outline"
            size="icon-sm"
          />
        </Carousel>
      </div>
    </section>
  )
}
