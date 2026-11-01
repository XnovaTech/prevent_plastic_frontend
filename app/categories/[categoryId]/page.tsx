import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Basket,
  CaretRight,
  House,
  Storefront,
  TShirt,
  User,
  Wrench,
} from "@phosphor-icons/react/dist/ssr"

import { CategoryProducts } from "@/components/category/categoryProducts"
import { AosInitializer } from "@/components/shared/aosInitializer"
import { SiteFooter } from "@/components/shared/siteFooter"
import { SiteHeader } from "@/components/shared/siteHeader"
import {
  categoryIds,
  getCategoryById,
  getCategoryFallbackProducts,
  getCategoryProducts,
  getCategoryStats,
} from "@/mock/categoryPageMock"
import type { HomeCategory } from "@/mock/homePageMock"

type CategoryPageProps = {
  params: Promise<{ categoryId: string }>
}

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

export const dynamicParams = false

export function generateStaticParams() {
  return categoryIds.map((categoryId) => ({ categoryId }))
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categoryId } = await params
  const category = getCategoryById(categoryId)

  if (!category) {
    return {}
  }

  return {
    title: `${category.title} — Prevent Plastic`,
    description: `Shop ${category.title.toLowerCase()} from local small businesses and individual sellers. ${category.description}.`,
  }
}

export default async function Page({ params }: CategoryPageProps) {
  const { categoryId } = await params
  const category = getCategoryById(categoryId)

  if (!category) {
    notFound()
  }

  const products = getCategoryProducts(category.id)
  const stats = getCategoryStats(products)
  const fallbackProducts = getCategoryFallbackProducts(category.id)
  const Icon = categoryIcons[category.icon]

  return (
    <div className="min-h-screen bg-transparent text-brand">
      <AosInitializer />
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        href="#main-content"
      >
        Skip to content
      </a>
      <SiteHeader activeHref="/" />
      <main id="main-content">
        <section className="relative overflow-hidden border-b border-[#e7e9e0] bg-[#f7f8f2]/70 pt-4 pb-10 sm:pt-6 sm:pb-14">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-[#e3eddd]/70 blur-3xl sm:size-96"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-20 size-56 rounded-full bg-[#f6e7dd]/60 blur-3xl sm:size-80"
          />

          <div className="relative mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-[10px] font-medium text-[#8b988f] sm:text-[11px]"
            >
              <Link className="transition-colors hover:text-brand-2" href="/">
                Home
              </Link>
              <CaretRight
                aria-hidden="true"
                size={9}
                className="text-[#b3bdb4]"
              />
              <Link
                className="transition-colors hover:text-brand-2"
                href="/#categories"
              >
                Shop by category
              </Link>
              <CaretRight
                aria-hidden="true"
                size={9}
                className="text-[#b3bdb4]"
              />
              <span aria-current="page" className="text-brand-2">
                {category.title}
              </span>
            </nav>

            <div className="mt-6 grid items-center gap-6 lg:grid-cols-[1.45fr_0.55fr] lg:gap-10">
              <div data-aos="fade-up">
                <div className="flex items-center gap-3">
                  <span className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-full border border-white/70 bg-[#f0eee6] sm:size-14">
                    {category.image ? (
                      <Image
                        alt=""
                        className="object-cover"
                        fill
                        sizes="56px"
                        src={category.image}
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className={`grid size-full place-items-center rounded-full ${categoryTones[category.tone]}`}
                      >
                        <Icon size={20} />
                      </span>
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase sm:text-[10px]">
                      SHOP BY CATEGORY
                    </p>
                    <h1 className="mt-1 font-serif text-[30px] leading-tight tracking-[-0.04em] text-brand sm:text-[42px]">
                      {category.title}
                    </h1>
                  </div>
                </div>

                <p className="mt-3 max-w-xl text-[12px] leading-6 text-brand-lighter sm:mt-4 sm:text-[13px]">
                  {category.description}. Good things from local small
                  businesses and individuals nearby, all in one place.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-1.5 sm:mt-5 sm:gap-2">
                  {stats.total > 0 ? (
                    <>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e3e8df] bg-white/70 px-3 py-1.5 text-[10px] font-semibold text-[#4c6b53]">
                        <Basket aria-hidden="true" size={12} weight="duotone" />
                        {stats.total} {stats.total === 1 ? "find" : "finds"}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e3e8df] bg-white/70 px-3 py-1.5 text-[10px] font-semibold text-[#4c6b53]">
                        <Storefront
                          aria-hidden="true"
                          size={12}
                          weight="duotone"
                        />
                        {stats.sme} from small businesses
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e3e8df] bg-white/70 px-3 py-1.5 text-[10px] font-semibold text-[#8a5a43]">
                        <User aria-hidden="true" size={12} weight="duotone" />
                        {stats.individual} from individuals
                      </span>
                    </>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e3e8df] bg-white/70 px-3 py-1.5 text-[10px] font-semibold text-[#4c6b53]">
                      <Basket aria-hidden="true" size={12} weight="duotone" />
                      New shelf coming soon
                    </span>
                  )}
                </div>
              </div>

              <div
                className="relative hidden overflow-hidden rounded-[28px] border border-white/70 bg-[#eef1e7] shadow-[0_24px_60px_-40px_rgba(23,62,54,0.6)] lg:block"
                data-aos="fade-left"
              >
                {category.image ? (
                  <div className="relative aspect-[4/3]">
                    <Image
                      alt={`${category.title} finds`}
                      className="object-cover"
                      fill
                      sizes="(max-width: 1023px) 0px, 30vw"
                      src={category.image}
                    />
                    <span className="absolute inset-0 bg-[linear-gradient(200deg,rgba(23,62,54,0)_35%,rgba(23,62,54,0.35))]" />
                    <span className="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1.5 text-[9px] font-bold tracking-[0.14em] text-brand-2 uppercase backdrop-blur">
                      {category.count}
                    </span>
                  </div>
                ) : (
                  <div
                    className={`flex aspect-[4/3] flex-col items-center justify-center gap-2.5 ${categoryTones[category.tone]}`}
                  >
                    <Icon aria-hidden="true" size={56} weight="duotone" />
                    <span className="text-[9px] font-bold tracking-[0.16em] uppercase opacity-75">
                      New finds coming soon
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-9 sm:py-12">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
            <CategoryProducts
              category={category}
              fallbackProducts={fallbackProducts}
              products={products}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
