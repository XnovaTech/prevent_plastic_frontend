import Link from "next/link"
import {
  ArrowUpRight,
  Basket,
  House,
  Needle,
  TShirt,
} from "@phosphor-icons/react/dist/ssr"

import { homePageMock } from "@/mock/homePageMock"

const categoryIcons = {
  home: House,
  fashion: TShirt,
  everyday: Basket,
  repair: Needle,
}

const categoryToneClass = {
  sage: "bg-[#e8f0e3] text-[#3c6950]",
  peach: "bg-[#f9e8df] text-[#a65e46]",
  lavender: "bg-[#eee9f5] text-[#705b89]",
  butter: "bg-[#f6f0d8] text-[#8a7440]",
}

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
              FIND YOUR KIND OF GOOD
            </p>
            <h2 className="font-serif text-[30px] leading-tight tracking-[-0.04em] text-brand sm:text-[38px]">
              A little something for everyone
            </h2>
          </div>
          <p className="hidden max-w-[260px] pb-1 text-right text-xs leading-5 text-[#77817a] sm:block">
            Browse thoughtful finds by the way you like to live.
          </p>
        </div>
        <div
          className="grid grid-cols-2 gap-3 lg:grid-cols-4"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {homePageMock.categories.map((category) => {
            const Icon = categoryIcons[category.icon]

            return (
              <Link
                className="group rounded-[20px] border border-[#e9e9e1] bg-white/70 p-4 transition-all hover:-translate-y-1 hover:border-[#c7d8c7] hover:bg-white sm:p-5"
                href={category.href}
                id={category.id === "repair" ? "repair" : undefined}
                key={category.id}
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`flex size-11 items-center justify-center rounded-[15px] ${categoryToneClass[category.tone]}`}
                  >
                    <Icon aria-hidden="true" size={22} weight="duotone" />
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="text-[#a4aaa1] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#3b765f]"
                    size={16}
                  />
                </div>
                <h3 className="mt-4 text-[14px] font-semibold text-[#263d34] sm:text-[15px]">
                  {category.title}
                </h3>
                <p className="mt-1 text-[11px] text-brand-lighter">
                  {category.description}
                </p>
                <p className="mt-4 text-[10px] font-medium text-[#578069]">
                  {category.count}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
