import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Basket,
  House,
  MapPin,
  Needle,
  Star,
  TShirt,
} from "@phosphor-icons/react/dist/ssr"

import { HomeHeroSlider } from "@/components/home/homeHeroSlider"
import { ProductFeedSection } from "@/components/home/productFeedSection"
import { ProductSection } from "@/components/home/productSection"
import { AosInitializer } from "@/components/shared/aosInitializer"
import { SiteFooter } from "@/components/shared/siteFooter"
import { SiteHeader } from "@/components/shared/siteHeader"
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

const merchantToneClass = {
  sage: "bg-[#dfeede] text-[#42694f]",
  peach: "bg-[#f8e3d9] text-[#a65e46]",
  lavender: "bg-[#e9e3f2] text-[#6e5c82]",
}

function CategorySection() {
  return (
    <section className="pt-12 pb-14 sm:pt-16 sm:pb-20" id="individual">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div
          className="mb-7 flex items-end justify-between gap-4"
          data-aos="fade-up"
        >
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-[#69927b] uppercase">
              FIND YOUR KIND OF GOOD
            </p>
            <h2 className="font-serif text-[30px] leading-tight tracking-[-0.04em] text-[#203c33] sm:text-[38px]">
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
                <p className="mt-1 text-[11px] text-[#7d867f]">
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

function MerchantSection() {
  return (
    <section className="bg-[#f1f3eb] py-16 sm:py-20" id="sme">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div
          className="mb-8 flex items-end justify-between gap-5 sm:mb-10"
          data-aos="fade-up"
        >
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-[#69927b] uppercase">
              PEOPLE BEHIND THE FINDS
            </p>
            <h2 className="font-serif text-[32px] leading-tight tracking-[-0.04em] text-[#203c33] sm:text-[40px]">
              Good things, good people
            </h2>
            <p className="mt-2 max-w-md text-[13px] leading-6 text-[#748078]">
              Meet a few of the local folks giving lovely things another go.
            </p>
          </div>
          <Link
            className="mb-1 hidden shrink-0 items-center gap-2 text-xs font-semibold text-[#245b4d] transition-colors hover:text-[#e17b5d] sm:flex"
            href="/contact"
          >
            Meet the community
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3" data-aos="fade-up">
          {homePageMock.featuredMerchants.map((merchant) => (
            <article
              className="rounded-[22px] border border-[#e5e9df] bg-[#fbfaf6] p-5 sm:p-6"
              key={merchant.id}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`flex size-[52px] items-center justify-center rounded-[18px] text-sm font-bold ${merchantToneClass[merchant.tone]}`}
                >
                  {merchant.initials}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#f8f2df] px-2.5 py-1.5 text-[10px] font-semibold text-[#806c3d]">
                  <Star aria-hidden="true" size={12} weight="fill" />
                  {merchant.rating}
                </span>
              </div>
              <h3 className="mt-5 text-[16px] font-semibold tracking-[-0.02em] text-[#243b33]">
                {merchant.name}
              </h3>
              <p className="mt-1 text-xs text-[#748078]">
                {merchant.specialty}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-[#e9ece4] pt-4">
                <span className="inline-flex items-center gap-1.5 text-[10px] text-[#77817a]">
                  <MapPin aria-hidden="true" size={13} />
                  {merchant.location}
                </span>
                <span className="text-[10px] font-medium text-[#557360]">
                  {merchant.listings} good finds
                </span>
              </div>
            </article>
          ))}
        </div>
        <Link
          className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-[#d4dfd0] px-5 py-3 text-xs font-semibold text-[#245b4d] transition-colors hover:bg-white sm:hidden"
          href="/contact"
        >
          Meet the community
          <ArrowRight aria-hidden="true" size={15} />
        </Link>
      </div>
    </section>
  )
}

function ImpactSection() {
  return (
    <section className="px-4 py-16 sm:px-8 sm:py-20 lg:px-12" id="about">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[30px] bg-[#174e46] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-16">
        <span className="pointer-events-none absolute -top-12 right-[8%] size-44 rounded-full border border-white/10" />
        <span className="pointer-events-none absolute top-8 right-[12%] text-4xl text-[#d9f09b]/80">
          ✳
        </span>
        <div
          className="relative grid gap-10 md:grid-cols-[1fr_0.85fr] md:items-center"
          data-aos="fade-up"
        >
          <div className="max-w-xl">
            <p className="mb-3 text-[10px] font-bold tracking-[0.18em] text-[#d9f09b] uppercase">
              A SMALLER FOOTPRINT, TOGETHER
            </p>
            <h2 className="font-serif text-[36px] leading-[1.08] tracking-[-0.04em] whitespace-pre-line sm:text-[48px]">
              {homePageMock.impact.heading}
            </h2>
            <p className="mt-5 max-w-lg text-[13px] leading-7 text-[#d8e6dc]/85">
              {homePageMock.impact.description}
            </p>
            <Link
              className="mt-7 inline-flex items-center gap-2 text-xs font-semibold text-[#d9f09b] transition-colors hover:text-white"
              href="/contact"
            >
              Get to know us
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-1">
            {homePageMock.impact.stats.map((stat) => (
              <div
                className="rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-4"
                key={stat.label}
              >
                <p className="font-serif text-2xl tracking-[-0.03em] text-[#d9f09b]">
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] text-[#d8e6dc]/80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomePage() {
  return (
    <div className="min-h-screen bg-transparent text-[#203c33]">
      <AosInitializer />
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        href="#main-content"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <HomeHeroSlider />
        <CategorySection />
        <ProductSection
          actionLabel="Browse all finds"
          description="Pre-loved pieces with plenty of life left in them. Picked with care, ready for their next chapter."
          eyebrow="POPULAR RIGHT NOW"
          id="popular"
          products={homePageMock.popularProducts}
          title="Finds worth falling for"
        />
        <MerchantSection />
        <ProductFeedSection />
        <ProductSection
          actionLabel="See all good deals"
          description="A little easier on your wallet, and still full of character. These lovely finds have a new price."
          eyebrow="A LITTLE PRICE DROP"
          id="discounts"
          products={homePageMock.saleProducts}
          title="Good things, gentler prices"
          tone="sale"
        />
        <ImpactSection />
      </main>
      <SiteFooter />
    </div>
  )
}
